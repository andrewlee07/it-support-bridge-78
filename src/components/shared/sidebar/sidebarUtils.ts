
import { User } from '@/utils/types/user';

export const isActiveRoute = (currentPath: string, itemPath: string | undefined): boolean => {
  if (!itemPath) return false;
  return currentPath === itemPath || currentPath.startsWith(itemPath);
};

export const hasPermission = (user: User | null, allowedRoles: string[] = []): boolean => {
  if (!user) return false;
  if (allowedRoles.length === 0) return true; // If no roles specified, allow access
  return allowedRoles.includes(user.role);
};
