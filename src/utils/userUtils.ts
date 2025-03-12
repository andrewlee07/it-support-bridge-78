
import { getAllUsers } from '@/utils/mockData/users';

/**
 * Gets a user's name by their ID
 * @param userId The ID of the user to lookup
 * @returns The user's name or "Unassigned" if not found
 */
export const getUserNameById = (userId?: string): string => {
  if (!userId) return "Unassigned";
  
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  
  return user ? user.name : "Unknown User";
};
