
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPlus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockUsers } from '@/utils/mockData/users';
import { Badge } from '@/components/ui/badge';
import { useUserManagement } from '@/hooks/useUserManagement';

const AccessManagementTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { handleUserRoleChange } = useUserManagement();
  
  // Filter users who are service catalog managers
  const catalogManagerUsers = mockUsers.filter(user => 
    user.roles?.includes('service-catalog-manager') || user.role === 'service-catalog-manager'
  );
  
  // Filter other users for potential managers based on search
  const filteredPotentialUsers = mockUsers.filter(user => 
    (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
    !user.roles?.includes('service-catalog-manager') && 
    user.role !== 'service-catalog-manager'
  );

  const handleAddManager = (userId: string) => {
    handleUserRoleChange(userId, 'service-catalog-manager', true);
  };

  const handleRemoveManager = (userId: string) => {
    handleUserRoleChange(userId, 'service-catalog-manager', false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Catalogue Access Management</CardTitle>
        <CardDescription>
          Manage who can edit service catalogue content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Current Service Catalogue Managers</h3>
          {catalogManagerUsers.length === 0 ? (
            <p className="text-muted-foreground">No Service Catalogue Managers assigned yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {catalogManagerUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleRemoveManager(user.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Add Service Catalogue Manager</h3>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name or email..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {filteredPotentialUsers.length === 0 ? (
            <p className="text-muted-foreground">No matching users found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPotentialUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleAddManager(user.id)}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Assign
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessManagementTab;
