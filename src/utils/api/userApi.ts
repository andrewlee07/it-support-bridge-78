
import { User, ApiResponse } from '../types';
import { mockUsers, delay } from '../mockData';
import { createApiErrorResponse, createApiSuccessResponse } from '../mockData/apiHelpers';

const USERS_PER_PAGE = 10;

// Simulate fetching users with pagination
export const getUsers = async (page: number = 1, limit: number = USERS_PER_PAGE): Promise<ApiResponse<User[]>> => {
  await delay(500); // Simulate network delay

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedUsers = mockUsers.slice(startIndex, endIndex);
  
  // Convert to User[] type
  const typedUsers: User[] = paginatedUsers.map(user => ({
    ...user,
    createdAt: user.createdAt || new Date() // Ensure createdAt exists
  }));

  return createApiSuccessResponse(typedUsers);
};

// Simulate fetching a user by ID
export const getUserById = async (id: string): Promise<ApiResponse<User | null>> => {
  await delay(500); // Simulate network delay

  const user = mockUsers.find(user => user.id === id);

  if (user) {
    // Convert to User type
    const typedUser: User = {
      ...user,
      createdAt: user.createdAt || new Date() // Ensure createdAt exists
    };
    
    return createApiSuccessResponse(typedUser);
  } else {
    return createApiErrorResponse<User | null>('User not found', 404);
  }
};

// Simulate creating a new user
export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<ApiResponse<User>> => {
  await delay(500); // Simulate network delay

  const newUser: User = {
    id: Math.random().toString(36).substring(2, 15), // Generate a random ID
    ...userData,
    createdAt: new Date(),
  };

  // Add the new user to our mock data
  (mockUsers as User[]).push(newUser as any);
  
  return createApiSuccessResponse(newUser);
};

// Simulate updating an existing user
export const updateUser = async (id: string, updates: Partial<User>): Promise<ApiResponse<User | null>> => {
  await delay(500); // Simulate network delay

  const userIndex = mockUsers.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return createApiErrorResponse<User | null>('User not found', 404);
  }

  // Update the user
  mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
  
  // Convert to User type
  const updatedUser: User = {
    ...mockUsers[userIndex],
    createdAt: mockUsers[userIndex].createdAt || new Date() // Ensure createdAt exists
  };

  return createApiSuccessResponse(updatedUser);
};

// Simulate deleting a user
export const deleteUser = async (id: string): Promise<ApiResponse<boolean>> => {
  await delay(500); // Simulate network delay

  const userIndex = mockUsers.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return createApiErrorResponse('User not found', 404);
  }

  mockUsers.splice(userIndex, 1);
  return createApiSuccessResponse(true);
};
