
import { User, UserRole } from '@/utils/types/user';

export const getRoleDisplayName = (role: UserRole): string => {
  switch(role) {
    case 'it': return 'IT Staff';
    case 'admin': return 'Admin';
    case 'manager': return 'Manager';
    case 'agent': return 'Agent';
    case 'developer': return 'Developer';
    case 'problem-manager': return 'Problem Manager';
    case 'change-manager': return 'Change Manager';
    case 'release-manager': return 'Release Manager';
    default: return 'End User';
  }
};

export const hasRole = (user: User, role: UserRole): boolean => {
  return user.role === role || (user.roles && user.roles.includes(role));
};

export const sortUsers = (
  users: User[], 
  sortConfig: { key: keyof User; direction: 'ascending' | 'descending' } | null
): User[] => {
  if (!sortConfig) return users;
  
  return [...users].sort((a, b) => {
    if (a[sortConfig.key] === undefined) return 1;
    if (b[sortConfig.key] === undefined) return -1;
    
    // Convert values to string for comparison
    const aValue = String(a[sortConfig.key]);
    const bValue = String(b[sortConfig.key]);
    
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
};
