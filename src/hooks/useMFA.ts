
import { useState } from 'react';
import { User } from '@/utils/types/user';
import { useToast } from '@/hooks/use-toast';
import { 
  sendVerificationCode, 
  storeVerificationCode, 
  verifyCode, 
  shouldLockAccount, 
  incrementLoginAttempts 
} from '@/utils/mfaUtils';
import { logSecurityEvent, getClientIPAddress } from '@/utils/securityUtils';
import { updateUser } from '@/utils/mockData/users';

export const useMFA = (
  pendingUser: User | null,
  setPendingUser: React.Dispatch<React.SetStateAction<User | null>>,
  completeLogin: (user: User) => void
) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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

  return {
    verifyMFA,
    resendMFACode,
    cancelMFA,
    loading
  };
};
