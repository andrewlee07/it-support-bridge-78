
import { getUserById } from './mockData/users';

/**
 * Get a user's name by their ID
 * @param userId The user ID
 * @returns The user's name or "Unassigned" if no user ID or user not found
 */
export const getUserNameById = (userId?: string): string => {
  if (!userId) return "Unassigned";
  
  const user = getUserById(userId);
  return user ? user.name : "Unassigned";
};
