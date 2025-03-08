
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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        console.log("User restored from localStorage:", parsedUser.email);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("AuthContext: Starting login process");
    try {
      setLoading(true);
      
      // Validate inputs
      if (!email) {
        console.log("Login failed: Email is empty");
        setLoading(false);
        return false;
      }
      
      if (!password) {
        console.log("Login failed: Password is empty");
        setLoading(false);
        return false;
      }
      
      console.log(`AuthContext: Attempting login with email: ${email}`);
      
      const authenticatedUser = authenticateUser(email, password);
      
      if (authenticatedUser) {
        setUser(authenticatedUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
        setLoading(false);
        return true;
      } else {
        console.log("Authentication failed");
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const refreshSession = (): boolean => {
    if (user) {
      const refreshedUser = {
        ...user,
        sessionStartTime: new Date()
      };
      setUser(refreshedUser);
      localStorage.setItem('user', JSON.stringify(refreshedUser));
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
