
import React, { useState } from 'react';
import { mockUsers } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import { useNavigate } from 'react-router-dom';
import UserList from '@/components/users/UserList';
import UserSearchBar from '@/components/users/UserSearchBar';
import { User } from '@/utils/types/user';

const Users = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState(mockUsers);
  
  const handleViewUser = (userId: string) => {
    // In a real app, this would navigate to the user profile page
    console.log(`Viewing user profile: ${userId}`);
    // navigate(`/users/${userId}`); // Commented out as we don't have this route yet
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // In a real app, this would filter the users based on the search term
    console.log(`Searching for: ${term}`);
  };

  const filteredUsers = (role?: string): User[] => {
    let filtered = users;
    
    if (role && role !== 'all') {
      filtered = filtered.filter(user => user.role === role);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground mt-1">
              Manage users and their access levels
            </p>
          </div>
          <Button className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <UserSearchBar onChange={handleSearch} />
        </div>

        <Tabs defaultValue="all" className="animate-fade-in">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="admin">Admins</TabsTrigger>
            <TabsTrigger value="it">IT Staff</TabsTrigger>
            <TabsTrigger value="user">End Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <UserList users={filteredUsers()} onViewUser={handleViewUser} />
          </TabsContent>
          
          <TabsContent value="admin" className="mt-0">
            <UserList users={filteredUsers('admin')} onViewUser={handleViewUser} />
          </TabsContent>
          
          <TabsContent value="it" className="mt-0">
            <UserList users={filteredUsers('it')} onViewUser={handleViewUser} />
          </TabsContent>
          
          <TabsContent value="user" className="mt-0">
            <UserList users={filteredUsers('user')} onViewUser={handleViewUser} />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Users;
