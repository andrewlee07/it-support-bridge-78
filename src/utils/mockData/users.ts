
import { User, UserRole, MFAMethod } from '../types/user';

// Mock user data
export const mockUsers = [
  { 
    id: 'user-1', 
    name: 'Alex Johnson', 
    email: 'alex.johnson@example.com', 
    role: 'admin' as UserRole,
    department: 'IT',
    active: true,
    mfaEnabled: true,
    mfaMethod: 'email' as MFAMethod
  },
  { 
    id: 'user-2', 
    name: 'Jamie Smith', 
    email: 'jamie.smith@example.com', 
    role: 'support-manager' as UserRole,
    department: 'Support',
    active: true,
    mfaEnabled: false
  },
  { 
    id: 'user-3', 
    name: 'Taylor Brown', 
    email: 'taylor.brown@example.com', 
    role: 'it' as UserRole,
    department: 'IT',
    active: true,
    mfaEnabled: true,
    mfaMethod: 'totp' as MFAMethod
  },
  { 
    id: 'user-4', 
    name: 'Morgan Lee', 
    email: 'morgan.lee@example.com', 
    role: 'agent' as UserRole,
    department: 'Support',
    active: true,
    mfaEnabled: false
  },
  { 
    id: 'user-5', 
    name: 'Casey Wilson', 
    email: 'casey.wilson@example.com', 
    role: 'manager' as UserRole,
    department: 'Service',
    active: true,
    mfaEnabled: true,
    mfaMethod: 'email' as MFAMethod
  }
];

// Helper function to get user by ID
export const getUserById = (id: string) => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to get all users
export const getAllUsers = () => {
  return [...mockUsers];
};

// Helper function to get user by email
export const getUserByEmail = (email: string) => {
  return mockUsers.find(user => user.email === email);
};

// Helper function to update a user
export const updateUser = (updatedUser: User) => {
  const index = mockUsers.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    mockUsers[index] = { ...mockUsers[index], ...updatedUser };
    return mockUsers[index];
  }
  return null;
};

// Helper function to add a new user
export const addUser = (user: User) => {
  mockUsers.push(user);
  return user;
};

// Helper function to remove a user
export const removeUser = (id: string) => {
  const index = mockUsers.findIndex(user => user.id === id);
  if (index !== -1) {
    const removedUser = mockUsers[index];
    mockUsers.splice(index, 1);
    return removedUser;
  }
  return null;
};
