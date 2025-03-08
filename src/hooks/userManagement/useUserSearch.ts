
import { useState } from 'react';
import { User } from '@/utils/types/user';

export const useUserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filterUsersBySearchTerm = (users: User[]): User[] => {
    if (!searchTerm) {
      return users;
    }
    
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return {
    searchTerm,
    handleSearch,
    filterUsersBySearchTerm
  };
};
