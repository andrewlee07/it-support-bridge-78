
import { getUserByEmail } from '@/utils/mockData/users';
import { AuthUser } from './types';

export const authenticateUser = (email: string, password: string): AuthUser | null => {
  console.log("Starting authentication process", { email });
  
  if (!email) {
    console.log("Authentication failed: Email is empty");
    return null;
  }
  
  // Clean the email input
  const cleanedEmail = email.trim();
  
  // Check if the user exists in our mock data
  const existingUser = getUserByEmail(cleanedEmail);
  
  if (existingUser) {
    console.log("User found in mock data:", existingUser.name);
    
    const authenticatedUser: AuthUser = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      department: existingUser.department,
      sessionTimeout: existingUser.sessionTimeout || 30,
      sessionStartTime: new Date(),
    };
    
    console.log("Login successful for existing user:", authenticatedUser);
    return authenticatedUser;
  } else {
    // Create a generic user for demo purposes - this will always succeed
    console.log("User not found in mock data, creating generic user");
    
    const randomId = Math.random().toString(36).substring(2, 15);
    const genericUser: AuthUser = {
      id: randomId,
      name: 'Demo User',
      email: cleanedEmail,
      role: 'admin',
      department: 'IT',
      sessionTimeout: 30,
      sessionStartTime: new Date(),
    };
    
    console.log("Created generic user:", genericUser);
    return genericUser;
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
