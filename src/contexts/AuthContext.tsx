
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockUsers, updateUser, getUserByEmail } from '@/utils/mockData/users';
import { User, UserRole, MFAMethod } from '@/utils/types/user';
import { useToast } from '@/hooks/use-toast';
import { 
  sendVerificationCode, 
  storeVerificationCode, 
  verifyCode, 
  shouldLockAccount, 
  resetLoginAttempts,
  incrementLoginAttempts,
  isAccountLocked,
  initializeUserSession,
  isSessionValid,
  getClientIPAddress
} from '@/utils/mfaUtils';
import { 
  logSecurityEvent,
  hasPermission,
  canPerformAction,
  generateJWTToken,
  refreshJWTToken
} from '@/utils/securityUtils';

interface AuthContextType {
  user: User | null;
  pendingUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (requiredRoles: UserRole[]) => boolean;
  verifyMFA: (code: string) => Promise<boolean>;
  resendMFACode: () => Promise<boolean>;
  cancelMFA: () => void;
  checkSessionValidity: () => boolean;
  refreshSession: () => boolean;
  userHasPermission: (permissionName: string) => boolean;
  userCanPerformAction: (resource: string, action: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Session checker interval in milliseconds (5 minutes)
const SESSION_CHECK_INTERVAL = 5 * 60 * 1000;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  // Session checking
  useEffect(() => {
    let sessionCheckInterval: number;
    
    if (user) {
      // Check session validity periodically
      sessionCheckInterval = window.setInterval(() => {
        if (!checkSessionValidity()) {
          logout();
          toast({
            title: "Session expired",
            description: "Your session has expired. Please log in again.",
            variant: "destructive",
          });
        }
      }, SESSION_CHECK_INTERVAL);
    }
    
    return () => {
      if (sessionCheckInterval) {
        clearInterval(sessionCheckInterval);
      }
    };
  }, [user]);

  // Check for saved user in localStorage on mount
  useEffect(() => {
    const checkSavedUser = async () => {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser) as User;
          
          // Verify token and session validity
          if (isSessionValid(parsedUser)) {
            setUser(parsedUser);
          } else {
            // Invalid session, clear it
            localStorage.removeItem('currentUser');
            toast({
              title: "Session expired",
              description: "Your previous session has expired. Please log in again.",
            });
          }
        } catch (error) {
          console.error('Failed to parse saved user', error);
          localStorage.removeItem('currentUser');
        }
      }
      setLoading(false);
    };
    
    checkSavedUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, we're using mock authentication
    // In a real app, you would call an API endpoint
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user with matching email (in real app, would verify password too)
    const foundUser = getUserByEmail(email);
    
    if (!foundUser) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }

    // Check if account is locked
    if (isAccountLocked(foundUser)) {
      const lockEndTime = foundUser.lockedUntil ? new Date(foundUser.lockedUntil).toLocaleTimeString() : 'unknown';
      
      toast({
        title: "Account locked",
        description: `Too many failed login attempts. Account locked until ${lockEndTime}.`,
        variant: "destructive",
      });
      
      // Log security event
      logSecurityEvent({
        userId: foundUser.id,
        eventType: 'failed_login',
        ipAddress: getClientIPAddress(),
        userAgent: navigator.userAgent,
        details: 'Login attempt on locked account',
        severity: 'warning'
      });
      
      setLoading(false);
      return false;
    }

    // Check if user needs to change password
    if (foundUser.requirePasswordChange) {
      toast({
        title: "Password change required",
        description: "You need to change your password before continuing.",
        variant: "destructive",
      });
      // In a real app, redirect to password change page
      setLoading(false);
      return false;
    }

    // If MFA is enabled, verify it
    if (foundUser.mfaEnabled) {
      // Generate and send verification code based on user's preferred method
      try {
        const code = await sendVerificationCode(foundUser);
        storeVerificationCode(foundUser.id, code);
        
        // Set pending user - will be fully logged in after MFA verification
        setPendingUser({
          ...foundUser,
          mfaVerified: false
        });
        
        toast({
          title: "Verification required",
          description: `Please enter the verification code sent to your ${foundUser.mfaMethod}`,
        });
        
        setLoading(false);
        return true; // Return true to indicate successful first step
      } catch (error) {
        console.error('MFA error:', error);
        toast({
          title: "MFA error",
          description: "Failed to send verification code",
          variant: "destructive",
        });
        setLoading(false);
        return false;
      }
    } else {
      // No MFA required, proceed with login
      completeLogin(foundUser);
      return true;
    }
  };

  const completeLogin = (userToLogin: User) => {
    // Initialize user session
    const userWithSession = initializeUserSession(userToLogin);
    
    // Update user with reset login attempts and updated session
    const updatedUser = {
      ...resetLoginAttempts(userWithSession),
      lastLogin: new Date(),
    };
    
    // Update in mock database
    updateUser(updatedUser);
    
    // Update local state
    setUser(updatedUser);
    setPendingUser(null);
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    toast({
      title: "Logged in successfully",
      description: `Welcome back, ${updatedUser.name}!`,
    });
    
    setLoading(false);
  };

  const verifyMFA = async (code: string): Promise<boolean> => {
    if (!pendingUser) {
      toast({
        title: "Error",
        description: "No pending user to verify",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isValid = verifyCode(pendingUser.id, code);
    
    if (isValid) {
      // MFA verification successful
      completeLogin(pendingUser);
      
      // Log successful verification
      logSecurityEvent({
        userId: pendingUser.id,
        eventType: 'login',
        ipAddress: getClientIPAddress(),
        userAgent: navigator.userAgent,
        details: 'MFA verification successful',
        severity: 'info'
      });
      
      return true;
    } else {
      // Failed verification - increment login attempts
      const updatedUser = incrementLoginAttempts(pendingUser);
      setPendingUser(updatedUser);
      
      // Check if we need to lock the account
      if (shouldLockAccount(updatedUser)) {
        toast({
          title: "Account locked",
          description: "Too many failed verification attempts. Your account has been temporarily locked.",
          variant: "destructive",
        });
        
        // Log account locked
        logSecurityEvent({
          userId: pendingUser.id,
          eventType: 'account_locked',
          ipAddress: getClientIPAddress(),
          userAgent: navigator.userAgent,
          details: 'Account locked due to too many failed MFA attempts',
          severity: 'warning'
        });
        
        // Update in mock database
        updateUser(updatedUser);
        
        // Clear pending user
        setPendingUser(null);
      } else {
        toast({
          title: "Verification failed",
          description: "Invalid or expired code",
          variant: "destructive",
        });
        
        // Log failed attempt
        logSecurityEvent({
          userId: pendingUser.id,
          eventType: 'failed_login',
          ipAddress: getClientIPAddress(),
          userAgent: navigator.userAgent,
          details: 'Failed MFA verification attempt',
          severity: 'warning'
        });
      }
      
      setLoading(false);
      return false;
    }
  };

  const resendMFACode = async (): Promise<boolean> => {
    if (!pendingUser) {
      toast({
        title: "Error",
        description: "No pending user to verify",
        variant: "destructive",
      });
      return false;
    }

    try {
      const code = await sendVerificationCode(pendingUser);
      storeVerificationCode(pendingUser.id, code);
      
      toast({
        title: "Code resent",
        description: `A new verification code has been sent`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Failed to resend code",
        description: "An error occurred while sending the code",
        variant: "destructive",
      });
      return false;
    }
  };

  const cancelMFA = () => {
    setPendingUser(null);
    toast({
      title: "Verification cancelled",
      description: "MFA verification has been cancelled",
    });
  };

  const logout = () => {
    if (user) {
      // Log security event
      logSecurityEvent({
        userId: user.id,
        eventType: 'logout',
        ipAddress: getClientIPAddress(),
        userAgent: navigator.userAgent,
        details: 'User logged out',
        severity: 'info'
      });
    }
    
    setUser(null);
    setPendingUser(null);
    localStorage.removeItem('currentUser');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const checkSessionValidity = useCallback((): boolean => {
    if (!user) return false;
    
    const valid = isSessionValid(user);
    
    if (!valid && user) {
      // Log invalid session
      logSecurityEvent({
        userId: user.id,
        eventType: 'logout',
        ipAddress: getClientIPAddress(),
        userAgent: navigator.userAgent,
        details: 'Session expired',
        severity: 'info'
      });
    }
    
    return valid;
  }, [user]);

  const refreshSession = useCallback((): boolean => {
    if (!user || !user.refreshToken) return false;
    
    try {
      const tokens = refreshJWTToken(user, user.refreshToken);
      
      if (tokens) {
        // Update user with new tokens
        const updatedUser = {
          ...user,
          jwtToken: tokens.token,
          refreshToken: tokens.refreshToken,
          tokenExpiry: tokens.expiry,
          sessionStartTime: new Date() // Reset session timeout
        };
        
        // Update in mock database
        updateUser(updatedUser);
        
        // Update local state
        setUser(updatedUser);
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        return true;
      }
    } catch (error) {
      console.error('Failed to refresh token', error);
    }
    
    return false;
  }, [user]);

  const hasPermissionByRole = (requiredRoles: UserRole[]): boolean => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  const userHasPermission = useCallback((permissionName: string): boolean => {
    if (!user) return false;
    return hasPermission(user, permissionName);
  }, [user]);

  const userCanPerformAction = useCallback((resource: string, action: string): boolean => {
    if (!user) return false;
    return canPerformAction(user, resource, action as any);
  }, [user]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      pendingUser, 
      loading, 
      login, 
      logout, 
      hasPermission: hasPermissionByRole,
      verifyMFA, 
      resendMFACode, 
      cancelMFA,
      checkSessionValidity,
      refreshSession,
      userHasPermission,
      userCanPerformAction
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
