
import { getUserByEmail } from '@/utils/mockData/users';
import { AuthUser } from './types';

export const authenticateUser = (email: string, password: string): AuthUser | null => {
  if (!email || !password) {
    console.log("Authentication failed: Email or password is empty");
    return null;
  }
  
  // Check if the user exists in our mock data
  const existingUser = getUserByEmail(email);
  
  if (existingUser) {
    console.log("User found in mock data:", existingUser.name);
    
    // In a real app, we would validate the password here
    // For demo purposes, we'll accept any non-empty password for valid users
    
    const authenticatedUser = {
      ...existingUser,
      sessionStartTime: new Date(),
    };
    
    console.log("Login successful for existing user");
    return authenticatedUser;
  } else {
    // For testing/demo - allow login with any email/password
    // This is intentional to make testing easier without requiring specific accounts
    console.log("User not found in mock data, creating generic admin user");
    
    const mockUser: AuthUser = {
      id: '1',
      name: 'Test User',
      email,
      role: 'admin',
      department: 'IT',
      sessionTimeout: 30,
      sessionStartTime: new Date(),
    };
    
    console.log("Login successful with generic user");
    return mockUser;
  }
};

export const hasUserPermission = (userRole: string | undefined, requiredRoles: string[]): boolean => {
  if (!userRole) return false;
  return requiredRoles.includes(userRole);
};

export const canUserPerformAction = (userRole: string | undefined, resource: string, action: string): boolean => {
  if (!userRole) return false;
  
  if (userRole === 'admin') return true;
  
  const rolePermissions: Record<string, string[]> = {
    'it': ['admin', 'read', 'write'],
    'manager': ['read', 'approve'],
    'developer': ['read', 'write'],
    'qa': ['read', 'test'],
    'user': ['read']
  };
  
  const allowedActions = rolePermissions[userRole] || [];
  return allowedActions.includes(action);
};
