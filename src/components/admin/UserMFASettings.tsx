
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  UserCheck, 
  UserX, 
  ShieldAlert, 
  ShieldCheck,
  RefreshCw,
  KeyRound
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAllUsers, updateUser } from '@/utils/mockData/users';
import { User, MFAMethod } from '@/utils/types/user';
import { logSecurityEvent } from '@/utils/securityUtils';
import { getClientIPAddress } from '@/utils/mfaUtils';

const UserMFASettings = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setIsLoading(true);
    
    try {
      const allUsers = getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMFA = async (user: User) => {
    try {
      const updatedUser = {
        ...user,
        mfaEnabled: !user.mfaEnabled,
        // If enabling MFA, set default method
        ...(user.mfaEnabled ? {} : { mfaMethod: 'email' as MFAMethod })
      };
      
      // Update user in the mock database
      updateUser(updatedUser);
      
      // Log security event
      logSecurityEvent({
        userId: user.id,
        eventType: 'permission_change',
        ipAddress: getClientIPAddress(),
        userAgent: navigator.userAgent,
        details: `Admin ${updatedUser.mfaEnabled ? 'enabled' : 'disabled'} MFA for user ${user.email}`,
        severity: 'warning'
      });
      
      // Update local state
      setUsers(prev => 
        prev.map(u => u.id === user.id ? updatedUser : u)
      );
      
      toast({
        title: "MFA status updated",
        description: `MFA has been ${updatedUser.mfaEnabled ? 'enabled' : 'disabled'} for ${user.name}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update MFA status.",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <KeyRound className="h-5 w-5 text-muted-foreground" />
            <CardTitle>User MFA Management</CardTitle>
          </div>
          <CardDescription>
            Enable or disable multi-factor authentication for specific users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email or department..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={loadUsers} size="icon" title="Refresh user list">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>MFA Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10">
                        <div className="flex justify-center items-center">
                          <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                        <span className="mt-2 text-muted-foreground">Loading users...</span>
                      </TableCell>
                    </TableRow>
                  ) : filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10">
                        <span className="text-muted-foreground">No users found</span>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map(user => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-muted-foreground text-sm">{user.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.mfaEnabled ? (
                            <div className="flex items-center space-x-1 text-green-600">
                              <ShieldCheck className="h-4 w-4" />
                              <span className="text-sm font-medium">Enabled ({user.mfaMethod || 'email'})</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1 text-amber-600">
                              <ShieldAlert className="h-4 w-4" />
                              <span className="text-sm font-medium">Disabled</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Switch
                              checked={user.mfaEnabled}
                              onCheckedChange={() => handleToggleMFA(user)}
                              aria-label={`${user.mfaEnabled ? 'Disable' : 'Enable'} MFA for ${user.name}`}
                            />
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleToggleMFA(user)}
                            >
                              {user.mfaEnabled ? (
                                <UserX className="h-4 w-4 mr-1" />
                              ) : (
                                <UserCheck className="h-4 w-4 mr-1" />
                              )}
                              {user.mfaEnabled ? 'Disable' : 'Enable'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserMFASettings;
