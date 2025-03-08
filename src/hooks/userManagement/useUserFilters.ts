
import { User } from '@/utils/types/user';

export const useUserFilters = () => {
  const filterUsersByRole = (users: User[], role?: string): User[] => {
    if (!role || role === 'all') {
      return users;
    }
    
    return users.filter(user => user.role === role);
  };

  return {
    filterUsersByRole
  };
};
