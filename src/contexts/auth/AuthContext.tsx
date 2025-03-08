import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, AuthUser } from './types';
import { authenticateUser, hasUserPermission, canUserPerformAction } from './authUtils';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: false,
  pendingUser: null,
  login: async () => false,
  logout: () => {},
  refreshSession: () => false,
  hasPermission: () => false,
  userCanPerformAction: () => false,
  verifyMFA: async () => false,
  resendMFACode: async () => false,
  cancelMFA: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [pendingUser, setPendingUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to restore user from localStorage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        console.log("User restored from localStorage:", parsedUser.email);
      }
    } catch (error) {
      console.error("Error parsing stored user:", error);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("AUTH CONTEXT: Login attempt with email:", email);
    try {
      setLoading(true);
      
      // Get user from authenticateUser function (which now always returns a user)
      const user = authenticateUser(email.trim(), password);
      
      if (user) {
        console.log("AUTH CONTEXT: Authentication successful, setting user");
        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      } else {
        // This should never happen now but keeping as fallback
        console.log("AUTH CONTEXT: Authentication failed, no user returned");
        return false;
      }
    } catch (error) {
      console.error('AUTH CONTEXT: Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    console.log("User logged out");
  };

  const refreshSession = (): boolean => {
    if (user) {
      const refreshedUser = {
        ...user,
        sessionStartTime: new Date()
      };
      setUser(refreshedUser);
      localStorage.setItem('user', JSON.stringify(refreshedUser));
      console.log("Session refreshed for user:", user.email);
      return true;
    }
    return false;
  };

  const hasPermission = (requiredRoles: string[]): boolean => {
    if (!user) return false;
    return hasUserPermission(user.role, requiredRoles);
  };

  const userCanPerformAction = (resource: string, action: string): boolean => {
    if (!user) return false;
    return canUserPerformAction(user.role, resource, action);
  };

  const verifyMFA = async (code: string): Promise<boolean> => {
    if (pendingUser && code === '123456') {
      setUser(pendingUser);
      setIsAuthenticated(true);
      setPendingUser(null);
      localStorage.setItem('user', JSON.stringify(pendingUser));
      return true;
    }
    return false;
  };

  const resendMFACode = async (): Promise<boolean> => {
    console.log('MFA code resent');
    return true;
  };

  const cancelMFA = () => {
    setPendingUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        pendingUser,
        isAuthenticated, 
        loading,
        login,
        logout: () => {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem('user');
          console.log("User logged out");
        },
        refreshSession: () => {
          if (user) {
            const refreshedUser = {
              ...user,
              sessionStartTime: new Date()
            };
            setUser(refreshedUser);
            localStorage.setItem('user', JSON.stringify(refreshedUser));
            console.log("Session refreshed for user:", user.email);
            return true;
          }
          return false;
        },
        hasPermission: (requiredRoles: string[]): boolean => {
          if (!user) return false;
          return hasUserPermission(user.role, requiredRoles);
        },
        userCanPerformAction: (resource: string, action: string): boolean => {
          if (!user) return false;
          return canUserPerformAction(user.role, resource, action);
        },
        verifyMFA: async (code: string): Promise<boolean> => {
          if (pendingUser && code === '123456') {
            setUser(pendingUser);
            setIsAuthenticated(true);
            setPendingUser(null);
            localStorage.setItem('user', JSON.stringify(pendingUser));
            return true;
          }
          return false;
        },
        resendMFACode: async (): Promise<boolean> => {
          console.log('MFA code resent');
          return true;
        },
        cancelMFA: () => {
          setPendingUser(null);
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
