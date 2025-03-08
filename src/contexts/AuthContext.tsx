
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/utils/types/user';
import { AuthContextType } from '@/utils/types/auth';
import { useAuthentication } from '@/hooks/useAuthentication';
import { useMFA } from '@/hooks/useMFA';
import { usePermissions } from '@/hooks/usePermissions';
import { useSessionManagement } from '@/hooks/useSessionManagement';
import { isSessionValid } from '@/utils/securityUtils';
import { useToast } from '@/hooks/use-toast';

// Session checker interval in milliseconds (5 minutes)
const SESSION_CHECK_INTERVAL = 5 * 60 * 1000;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  // Use our custom hooks
  const { login, logout: logoutUser, completeLogin } = useAuthentication(setUser, setPendingUser);
  const { verifyMFA, resendMFACode, cancelMFA } = useMFA(pendingUser, setPendingUser, completeLogin);
  const { hasPermissionByRole, userHasPermission, userCanPerformAction } = usePermissions(user);
  const { checkSessionValidity, refreshSession } = useSessionManagement(user, setUser);
  
  // Logout function that uses our hook
  const logout = () => logoutUser(user);

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
