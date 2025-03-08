
import React, { useState, useRef } from 'react';
import { mockUsers, getAllUsers, updateUser, getUserById } from '@/utils/mockData/users';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Upload, Download, Trash2, UserCheck, UserX } from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import { useNavigate } from 'react-router-dom';
import UserList from '@/components/users/UserList';
import UserSearchBar from '@/components/users/UserSearchBar';
import { User, UserRole } from '@/utils/types/user';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const UserManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  
  // Dialog states
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [removeUserDialogOpen, setRemoveUserDialogOpen] = useState(false);
  const [changeRoleDialogOpen, setChangeRoleDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  
  // Form states
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user' as UserRole,
    department: '',
    title: '',
  });
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  
  // File upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
    // In a real app, this would navigate to the user profile page
    console.log(`Viewing user profile: ${userId}`);
    // navigate(`/users/${userId}`); // Commented out as we don't have this route yet
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
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

  // Add user
  const handleAddUser = () => {
    // In a real app, this would make an API call
    const newUserId = `user-${users.length + 1}`;
    const userToAdd: User = {
      id: newUserId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      title: newUser.title,
      active: true,
      createdAt: new Date(),
      lastActive: new Date(),
      mfaEnabled: false,
      securityQuestions: [],
      loginAttempts: 0,
      passwordLastChanged: new Date(),
      sessionTimeout: 30
    };
    
    setUsers([...users, userToAdd]);
    setAddUserDialogOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: 'user',
      department: '',
      title: '',
    });
    
    toast({
      title: "User added",
      description: `${userToAdd.name} has been added successfully.`
    });
  };

  // Remove user
  const handleRemoveUser = () => {
    if (!selectedUserId) return;
    
    // In a real app, this would make an API call
    const updatedUsers = users.filter(user => user.id !== selectedUserId);
    setUsers(updatedUsers);
    setRemoveUserDialogOpen(false);
    
    toast({
      title: "User removed",
      description: "The user has been removed successfully."
    });
  };

  // Change role
  const handleChangeRole = () => {
    if (!selectedUserId) return;
    
    // In a real app, this would make an API call
    const updatedUsers = users.map(user => {
      if (user.id === selectedUserId) {
        return { ...user, role: selectedRole };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setChangeRoleDialogOpen(false);
    
    toast({
      title: "Role updated",
      description: `User role has been updated to ${selectedRole}.`
    });
  };

  // Toggle user active status
  const handleToggleUserStatus = (userId: string) => {
    // In a real app, this would make an API call
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, active: !user.active };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    const targetUser = updatedUsers.find(user => user.id === userId);
    
    toast({
      title: targetUser?.active ? "User activated" : "User deactivated",
      description: `${targetUser?.name} has been ${targetUser?.active ? 'activated' : 'deactivated'}.`
    });
  };

  // Import users
  const handleImportUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedUsers = JSON.parse(content);
        
        // Very basic validation - in a real app we'd want more robust validation
        if (Array.isArray(importedUsers) && importedUsers.length > 0) {
          // Map imported data to our User type
          const validUsers = importedUsers.filter(u => u.name && u.email).map((u, index) => ({
            id: `imported-${Date.now()}-${index}`,
            name: u.name,
            email: u.email.toLowerCase(),
            role: (u.role as UserRole) || 'user',
            department: u.department || 'General',
            title: u.title || '',
            active: u.active !== false,
            createdAt: new Date(),
            lastActive: new Date(),
            mfaEnabled: false,
            securityQuestions: [],
            loginAttempts: 0,
            passwordLastChanged: new Date(),
            sessionTimeout: 30
          }));
          
          if (validUsers.length > 0) {
            setUsers([...users, ...validUsers]);
            toast({
              title: "Users imported",
              description: `Successfully imported ${validUsers.length} users.`
            });
          } else {
            toast({
              title: "Import failed",
              description: "No valid users found in the import file.",
              variant: "destructive"
            });
          }
        } else {
          toast({
            title: "Import failed",
            description: "Invalid format. Please upload a valid JSON file.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Import error:", error);
        toast({
          title: "Import failed",
          description: "Could not parse the file. Please ensure it's valid JSON.",
          variant: "destructive"
        });
      }
      setImportDialogOpen(false);
    };
    
    reader.readAsText(file);
  };

  // Export users
  const handleExportUsers = () => {
    const dataStr = JSON.stringify(users, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'users-export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Users exported",
      description: "User data has been exported successfully."
    });
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage users, roles, and access levels
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleExportUsers}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" onClick={() => setImportDialogOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button onClick={() => setAddUserDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
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
            <UserList 
              users={filteredUsers()} 
              onViewUser={handleViewUser} 
              onRemoveUser={(id) => {
                setSelectedUserId(id);
                setRemoveUserDialogOpen(true);
              }}
              onChangeRole={(id) => {
                setSelectedUserId(id);
                const user = users.find(u => u.id === id);
                if (user) {
                  setSelectedRole(user.role);
                }
                setChangeRoleDialogOpen(true);
              }}
              onToggleStatus={handleToggleUserStatus}
            />
          </TabsContent>
          
          <TabsContent value="admin" className="mt-0">
            <UserList 
              users={filteredUsers('admin')} 
              onViewUser={handleViewUser} 
              onRemoveUser={(id) => {
                setSelectedUserId(id);
                setRemoveUserDialogOpen(true);
              }}
              onChangeRole={(id) => {
                setSelectedUserId(id);
                const user = users.find(u => u.id === id);
                if (user) {
                  setSelectedRole(user.role);
                }
                setChangeRoleDialogOpen(true);
              }}
              onToggleStatus={handleToggleUserStatus}
            />
          </TabsContent>
          
          <TabsContent value="it" className="mt-0">
            <UserList 
              users={filteredUsers('it')} 
              onViewUser={handleViewUser} 
              onRemoveUser={(id) => {
                setSelectedUserId(id);
                setRemoveUserDialogOpen(true);
              }}
              onChangeRole={(id) => {
                setSelectedUserId(id);
                const user = users.find(u => u.id === id);
                if (user) {
                  setSelectedRole(user.role);
                }
                setChangeRoleDialogOpen(true);
              }}
              onToggleStatus={handleToggleUserStatus}
            />
          </TabsContent>
          
          <TabsContent value="user" className="mt-0">
            <UserList 
              users={filteredUsers('user')} 
              onViewUser={handleViewUser} 
              onRemoveUser={(id) => {
                setSelectedUserId(id);
                setRemoveUserDialogOpen(true);
              }}
              onChangeRole={(id) => {
                setSelectedUserId(id);
                const user = users.find(u => u.id === id);
                if (user) {
                  setSelectedRole(user.role);
                }
                setChangeRoleDialogOpen(true);
              }}
              onToggleStatus={handleToggleUserStatus}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Add User Dialog */}
      <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Enter the details for the new user
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select 
                value={newUser.role} 
                onValueChange={(value) => setNewUser({...newUser, role: value as UserRole})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="it">IT Staff</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                value={newUser.department}
                onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newUser.title}
                onChange={(e) => setNewUser({...newUser, title: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button variant="ghost" onClick={() => setAddUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleAddUser}
              disabled={!newUser.name || !newUser.email || !newUser.department}
            >
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove User Dialog */}
      <Dialog open={removeUserDialogOpen} onOpenChange={setRemoveUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove User</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button variant="ghost" onClick={() => setRemoveUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleRemoveUser}
            >
              Remove User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Role Dialog */}
      <Dialog open={changeRoleDialogOpen} onOpenChange={setChangeRoleDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              Update the role for this user
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-role" className="text-right">
                New Role
              </Label>
              <Select 
                value={selectedRole} 
                onValueChange={(value) => setSelectedRole(value as UserRole)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="it">IT Staff</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button variant="ghost" onClick={() => setChangeRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleChangeRole}
            >
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Users Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Import Users</DialogTitle>
            <DialogDescription>
              Upload a JSON file with user data
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <div className="border border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                 onClick={() => fileInputRef.current?.click()}>
                <Upload className="mx-auto h-6 w-6 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to select a file or drag and drop
                </p>
                <input 
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".json"
                  onChange={handleImportUsers}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Expected format:</p>
                <pre className="bg-muted p-2 rounded-md overflow-x-auto text-xs">
{`[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "department": "Sales",
    "title": "Sales Representative",
    "active": true
  },
  ...
]`}
                </pre>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button variant="ghost" onClick={() => setImportDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={() => fileInputRef.current?.click()}
            >
              Select File
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
};

export default UserManagement;
