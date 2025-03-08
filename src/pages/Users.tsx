
import React from 'react';
import { mockUsers } from '@/utils/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PageTransition from '@/components/shared/PageTransition';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();
  
  // Get the first letter of each name part
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Role colors
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'it':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'user':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
    }
  };
  
  const handleViewUser = (userId: string) => {
    // In a real app, this would navigate to the user profile page
    console.log(`Viewing user profile: ${userId}`);
    // navigate(`/users/${userId}`); // Commented out as we don't have this route yet
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
          <div className="md:col-span-2 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="animate-fade-in">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="admin">Admins</TabsTrigger>
            <TabsTrigger value="it">IT Staff</TabsTrigger>
            <TabsTrigger value="user">End Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockUsers.map(user => (
                <Card 
                  key={user.id} 
                  className="p-5 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleViewUser(user.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <Badge variant="outline" className={getRoleBadgeClass(user.role)}>
                      {user.role === 'it' ? 'IT Staff' : 
                        user.role === 'admin' ? 'Admin' : 'End User'}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm mt-1">Department: <span className="text-muted-foreground">{user.department}</span></p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="admin" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockUsers.filter(user => user.role === 'admin').map(user => (
                <Card 
                  key={user.id} 
                  className="p-5 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleViewUser(user.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <Badge variant="outline" className={getRoleBadgeClass(user.role)}>
                      Admin
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm mt-1">Department: <span className="text-muted-foreground">{user.department}</span></p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="it" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockUsers.filter(user => user.role === 'it').map(user => (
                <Card 
                  key={user.id} 
                  className="p-5 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleViewUser(user.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <Badge variant="outline" className={getRoleBadgeClass(user.role)}>
                      IT Staff
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm mt-1">Department: <span className="text-muted-foreground">{user.department}</span></p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="user" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockUsers.filter(user => user.role === 'user').map(user => (
                <Card 
                  key={user.id} 
                  className="p-5 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleViewUser(user.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <Badge variant="outline" className={getRoleBadgeClass(user.role)}>
                      End User
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm mt-1">Department: <span className="text-muted-foreground">{user.department}</span></p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Users;
