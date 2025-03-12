
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/utils/types/user';
import { AuthContextType } from '@/utils/types/auth';
import { useAuthentication } from '@/hooks/useAuthentication';
import { useMFA } from '@/hooks/useMFA';
import { usePermissions } from '@/hooks/usePermissions';
import { useSessionManagement } from '@/hooks/useSessionManagement';
import { isSessionValid } from '@/utils/securityUtils';
import { useToast } from '@/hooks/use-toast';
import { logError } from '@/utils/logging/errorLogger';
import { useNavigate } from 'react-router-dom';

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

  // Handle user role-based redirects after login
  useEffect(() => {
    if (user && !loading) {
      // Redirect end users to portal, staff to dashboard
      console.log(`User role is ${user.role}, redirecting accordingly`);
      
      // If user role is 'user', they should only access the portal
      if (user.role === 'user') {
        // Only redirect if not already on a portal page
        if (!window.location.pathname.startsWith('/portal')) {
          console.log('End user detected, redirecting to portal');
          window.location.href = '/portal';
        }
      }
    }
  }, [user, loading]);

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
          
          // Log the session expiry
          logError("User session expired", { 
            user, 
            componentName: "AuthContext", 
            severity: "info",
            tags: ["session", "expiry"]
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
      console.log("Checking for saved user in localStorage");
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        try {
          console.log("Found saved user, parsing...");
          const parsedUser = JSON.parse(savedUser) as User;
          
          // Verify token and session validity
          if (isSessionValid(parsedUser)) {
            console.log("Saved user session is valid, setting user state");
            setUser(parsedUser);
            
            // For end users, ensure they're redirected to portal
            if (parsedUser.role === 'user' && !window.location.pathname.startsWith('/portal')) {
              console.log('End user detected from saved session, redirecting to portal');
              window.location.href = '/portal';
            }
          } else {
            // Invalid session, clear it
            console.log("Saved user session is invalid, clearing localStorage");
            localStorage.removeItem('currentUser');
            toast({
              title: "Session expired",
              description: "Your previous session has expired. Please log in again.",
            });
            
            // Log the invalid session
            logError("Invalid saved user session", { 
              componentName: "AuthContext", 
              severity: "info",
              tags: ["session", "invalid"]
            });
          }
        } catch (error) {
          console.error('Failed to parse saved user', error);
          localStorage.removeItem('currentUser');
          
          // Log the parsing error
          logError(error as Error, { 
            componentName: "AuthContext", 
            severity: "error",
            tags: ["localStorage", "parsing"]
          });
        }
      } else {
        console.log("No saved user found in localStorage");
      }
      setLoading(false);
    };
    
    checkSavedUser();
  }, []);

  // Debug user state changes
  useEffect(() => {
    console.log("Auth context user state changed:", user ? `User ${user.id} (${user.name})` : "No user");
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
