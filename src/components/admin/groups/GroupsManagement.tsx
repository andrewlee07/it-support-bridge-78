
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Group } from '@/utils/types/group';
import { useToast } from '@/hooks/use-toast';

// Sample mock data for groups
const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'IT Support',
    description: 'Handles all IT support tickets',
    assignedRoles: ['agent', 'it'],
    queueId: 'queue-1',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-05-15'),
    createdBy: 'user-1'
  },
  {
    id: 'group-2',
    name: 'Network Team',
    description: 'Handles network-related issues',
    assignedRoles: ['agent', 'it'],
    queueId: 'queue-2',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-06-20'),
    createdBy: 'user-1'
  },
  {
    id: 'group-3',
    name: 'Change Management',
    description: 'Oversees change requests and approvals',
    assignedRoles: ['change-manager', 'manager'],
    queueId: 'queue-3',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-07-10'),
    createdBy: 'user-1'
  }
];

const GroupsManagement: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [newGroup, setNewGroup] = useState<Partial<Group>>({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddGroup = () => {
    if (!newGroup.name) {
      toast({
        title: "Error",
        description: "Group name is required",
        variant: "destructive",
      });
      return;
    }

    const newGroupObject: Group = {
      id: `group-${Date.now()}`,
      name: newGroup.name || '',
      description: newGroup.description || '',
      assignedRoles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'current-user-id',
    };

    setGroups([...groups, newGroupObject]);
    setNewGroup({});
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Group added successfully",
    });
  };

  const handleEditGroup = () => {
    if (!selectedGroupId || !newGroup.name) return;
    
    const updatedGroups = groups.map(group => 
      group.id === selectedGroupId 
        ? { 
            ...group, 
            name: newGroup.name || group.name, 
            description: newGroup.description || group.description,
            updatedAt: new Date()
          }
        : group
    );
    
    setGroups(updatedGroups);
    setNewGroup({});
    setIsEditDialogOpen(false);
    setSelectedGroupId(null);
    
    toast({
      title: "Success",
      description: "Group updated successfully",
    });
  };

  const handleDeleteGroup = (id: string) => {
    const filteredGroups = groups.filter(group => group.id !== id);
    setGroups(filteredGroups);
    
    toast({
      title: "Success",
      description: "Group deleted successfully",
    });
  };

  const openEditDialog = (group: Group) => {
    setSelectedGroupId(group.id);
    setNewGroup({ name: group.name, description: group.description });
    setIsEditDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Groups Management</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Add Group</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="groupName" className="text-sm font-medium">Group Name</label>
                <Input 
                  id="groupName" 
                  value={newGroup.name || ''} 
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })} 
                  placeholder="Enter group name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="groupDescription" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="groupDescription" 
                  value={newGroup.description || ''} 
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })} 
                  placeholder="Enter group description"
                  rows={3}
                />
              </div>
              <Button onClick={handleAddGroup} className="w-full">Create Group</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell className="font-medium">{group.name}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell>{group.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>{group.updatedAt.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(group)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteGroup(group.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Group Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Group</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="editGroupName" className="text-sm font-medium">Group Name</label>
              <Input 
                id="editGroupName" 
                value={newGroup.name || ''} 
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })} 
                placeholder="Enter group name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="editGroupDescription" className="text-sm font-medium">Description</label>
              <Textarea 
                id="editGroupDescription" 
                value={newGroup.description || ''} 
                onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })} 
                placeholder="Enter group description"
                rows={3}
              />
            </div>
            <Button onClick={handleEditGroup} className="w-full">Update Group</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default GroupsManagement;
