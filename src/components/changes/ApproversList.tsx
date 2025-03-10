
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ApproverRole } from '@/utils/types/change';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SearchIcon, Plus, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ApproversListProps {
  approverRoles: ApproverRole[];
  onAddApprover?: (userId: string, role: string) => void;
}

const ApproversList: React.FC<ApproversListProps> = ({ approverRoles, onAddApprover }) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<ApproverRole>('change-manager');

  // Mock users for demo purposes - in a real app, you'd fetch these from an API
  const mockUsers = [
    { id: 'user-1', name: 'John Smith', role: 'IT Manager' },
    { id: 'user-2', name: 'Alice Johnson', role: 'Change Manager' },
    { id: 'user-3', name: 'Robert Chen', role: 'Developer' },
    { id: 'user-4', name: 'Sophia Williams', role: 'IT Specialist' }
  ];

  const filteredUsers = searchQuery 
    ? mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockUsers;

  const handleAddApprover = (userId: string) => {
    if (onAddApprover) {
      onAddApprover(userId, selectedRole);
      setIsAddDialogOpen(false);
      setSearchQuery('');
    }
  };

  const getRoleName = (role: ApproverRole): string => {
    switch(role) {
      case 'it': return 'IT Department';
      case 'user': return 'End User';
      case 'change-manager': return 'Change Manager';
      default: return role;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2">
        {approverRoles.map((role) => (
          <div key={role} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{getRoleName(role)}</span>
            </div>
            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
              Pending
            </span>
          </div>
        ))}
      </div>

      {onAddApprover && (
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2 w-full"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Approver
        </Button>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Approver</DialogTitle>
          </DialogHeader>
          
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="h-[240px] overflow-auto border rounded-md">
            {filteredUsers.length > 0 ? (
              <div className="divide-y">
                {filteredUsers.map(user => (
                  <div 
                    key={user.id}
                    className="flex items-center justify-between p-3 hover:bg-muted cursor-pointer"
                    onClick={() => handleAddApprover(user.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.role}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">Add</Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-muted-foreground">No users found</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApproversList;
