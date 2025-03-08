
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  UserCheck, 
  UserX, 
  ShieldCheck,
  ShieldAlert,
  RefreshCw
} from 'lucide-react';
import { User } from '@/utils/types/user';

interface UserMFAListProps {
  users: User[];
  isLoading: boolean;
  onToggleMFA: (user: User) => void;
}

const UserMFAList: React.FC<UserMFAListProps> = ({ 
  users, 
  isLoading, 
  onToggleMFA 
}) => {
  return (
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
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10">
                <span className="text-muted-foreground">No users found</span>
              </TableCell>
            </TableRow>
          ) : (
            users.map(user => (
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
                      onCheckedChange={() => onToggleMFA(user)}
                      aria-label={`${user.mfaEnabled ? 'Disable' : 'Enable'} MFA for ${user.name}`}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onToggleMFA(user)}
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
  );
};

export default UserMFAList;
