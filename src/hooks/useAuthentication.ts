
import { useState } from 'react';
import { User } from '@/utils/types/user';
import { useToast } from '@/hooks/use-toast';
import { getUserByEmail, updateUser } from '@/utils/mockData/users';
import { 
  isAccountLocked, 
  sendVerificationCode, 
  storeVerificationCode, 
  resetLoginAttempts,
  incrementLoginAttempts,
  initializeUserSession
} from '@/utils/mfaUtils';
import { 
  logSecurityEvent,
  getClientIPAddress
} from '@/utils/securityUtils';

export const useAuthentication = (
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setPendingUser: React.Dispatch<React.SetStateAction<User | null>>
) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
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

  const logout = (currentUser: User | null) => {
    if (currentUser) {
      // Log security event
      logSecurityEvent({
        userId: currentUser.id,
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

  return {
    login,
    logout,
    completeLogin,
    loading
  };
};
