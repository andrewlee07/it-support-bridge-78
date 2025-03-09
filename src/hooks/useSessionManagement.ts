
import { useCallback } from 'react';
import { User } from '@/utils/types/user';
import { 
  isSessionValid,
  refreshJWTToken,
  logSecurityEvent,
  getClientIPAddress 
} from '@/utils/security/sessionManagement';
import { updateUser } from '@/utils/mockData/users';

export const useSessionManagement = (
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
) => {
  // Check session validity
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

  // Refresh session
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
  }, [user, setUser]);

  return { checkSessionValidity, refreshSession };
};
