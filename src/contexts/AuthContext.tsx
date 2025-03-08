
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getUserByEmail, mockUsers } from '@/utils/mockData/users';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  sessionTimeout?: number;
  sessionStartTime?: Date;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  pendingUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshSession: () => boolean;
  hasPermission: (requiredRoles: string[]) => boolean;
  userCanPerformAction: (resource: string, action: string) => boolean;
  verifyMFA: (code: string) => Promise<boolean>;
  resendMFACode: () => Promise<boolean>;
  cancelMFA: () => void;
};

const AuthContext = createContext<AuthContextType>({
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
  const [user, setUser] = useState<User | null>(null);
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // In a real app, we would validate password against stored hash
      // For demo purposes, we'll accept any non-empty password
      if (!email || !password) {
        console.log("Login failed: Email or password is empty");
        setLoading(false);
        return false;
      }
      
      // Check if the user exists in our mock data
      const existingUser = getUserByEmail(email);
      
      if (existingUser) {
        console.log("User found:", existingUser.name);
        // In a real app, we would validate password here
        // For demo purposes, any password is accepted for existing users
        
        const authenticatedUser = {
          ...existingUser,
          sessionStartTime: new Date(),
        };
        
        setUser(authenticatedUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
        setLoading(false);
        return true;
      } else {
        console.log("User not found in mock data, using generic admin user");
        // For testing/demo only - allowing login with any email/password
        const mockUser: User = {
          id: '1',
          name: 'Test User',
          email,
          role: 'admin',
          department: 'IT',
          sessionTimeout: 30,
          sessionStartTime: new Date(),
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setLoading(false);
        return true;
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
    return requiredRoles.includes(user.role);
  };

  const userCanPerformAction = (resource: string, action: string): boolean => {
    if (!user) return false;
    
    if (user.role === 'admin') return true;
    
    const rolePermissions: Record<string, string[]> = {
      'it': ['admin', 'read', 'write'],
      'manager': ['read', 'approve'],
      'developer': ['read', 'write'],
      'qa': ['read', 'test'],
      'user': ['read']
    };
    
    const allowedActions = rolePermissions[user.role] || [];
    return allowedActions.includes(action);
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

export const useAuth = () => useContext(AuthContext);
