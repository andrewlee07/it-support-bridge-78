
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '@/utils/mockData/users';
import { User, UserRole, MFAMethod } from '@/utils/types/user';
import { useToast } from '@/hooks/use-toast';
import { 
  sendVerificationCode, 
  storeVerificationCode, 
  verifyCode, 
  shouldLockAccount, 
  resetLoginAttempts,
  incrementLoginAttempts,
  isAccountLocked
} from '@/utils/mfaUtils';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // In a real app, we'd verify the session token here
        setUser(parsedUser as User);
      } catch (error) {
        console.error('Failed to parse saved user', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, we're using mock authentication
    // In a real app, you would call an API endpoint
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user with matching email (in real app, would verify password too)
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
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
      toast({
        title: "Account locked",
        description: "Too many failed login attempts. Please try again later.",
        variant: "destructive",
      });
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
    // Update last login time and ensure it's a valid User object
    const userWithUpdatedLogin: User = {
      ...userToLogin,
      lastLogin: new Date(),
      loginAttempts: 0, // Reset login attempts on successful login
      lockedUntil: undefined
    };
    
    setUser(userWithUpdatedLogin);
    setPendingUser(null);
    localStorage.setItem('currentUser', JSON.stringify(userWithUpdatedLogin));
    toast({
      title: "Logged in successfully",
      description: `Welcome back, ${userWithUpdatedLogin.name}!`,
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
      return true;
    } else {
      toast({
        title: "Verification failed",
        description: "Invalid or expired code",
        variant: "destructive",
      });
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
    setUser(null);
    setPendingUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const hasPermission = (requiredRoles: UserRole[]): boolean => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      pendingUser, 
      loading, 
      login, 
      logout, 
      hasPermission, 
      verifyMFA, 
      resendMFACode, 
      cancelMFA 
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
