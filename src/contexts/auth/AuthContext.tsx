
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
    console.log("AuthContext: Starting login process for:", email);
    try {
      setLoading(true);
      
      // Basic validation
      if (!email || !email.trim()) {
        console.error("Login failed: Email is empty");
        setLoading(false);
        return false;
      }
      
      if (!password) {
        console.error("Login failed: Password is empty");
        setLoading(false);
        return false;
      }
      
      // Clean up email
      const cleanEmail = email.trim().toLowerCase();
      console.log(`AuthContext: Attempting login with clean email: ${cleanEmail}`);
      
      const authenticatedUser = authenticateUser(cleanEmail, password);
      
      if (authenticatedUser) {
        setUser(authenticatedUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
        console.log("Login successful, user set in state and localStorage");
        return true;
      } else {
        console.log("Authentication failed - no user returned from authenticateUser");
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
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
        logout,
        refreshSession,
        hasPermission,
        userCanPerformAction,
        verifyMFA,
        resendMFACode,
        cancelMFA
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
