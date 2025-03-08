
import { User, UserRole, ApiResponse } from '../types';
import { mockUsers, delay } from '../mockData';
import { createApiErrorResponse, createApiSuccessResponse } from '../mockData/apiHelpers';

const USERS_PER_PAGE = 10;

// Simulate fetching users with pagination
export const getUsers = async (page: number = 1, limit: number = USERS_PER_PAGE): Promise<ApiResponse<User[]>> => {
  await delay(500); // Simulate network delay

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedUsers = mockUsers.slice(startIndex, endIndex);
  
  // No need for conversion since mockUsers is already in the correct format
  return createApiSuccessResponse(paginatedUsers as User[]);
};

// Simulate fetching a user by ID
export const getUserById = async (id: string): Promise<ApiResponse<User | null>> => {
  await delay(500); // Simulate network delay

  const user = mockUsers.find(user => user.id === id);

  if (user) {
    return createApiSuccessResponse(user as User);
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
  
  return createApiSuccessResponse(mockUsers[userIndex] as User);
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
