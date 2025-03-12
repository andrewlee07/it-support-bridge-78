
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Queue, Group } from '@/utils/types/group';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockQueues: Queue[] = [
  {
    id: 'queue-1',
    name: 'IT Support Queue',
    description: 'General IT support tickets',
    filterCriteria: {
      ticketTypes: ['incident', 'service-request'],
      priorities: ['medium', 'low']
    },
    groupId: 'group-1',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-05-15')
  },
  {
    id: 'queue-2',
    name: 'Network Issues',
    description: 'Network-related tickets',
    filterCriteria: {
      ticketTypes: ['incident'],
      categories: ['network']
    },
    groupId: 'group-2',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-06-20')
  },
  {
    id: 'queue-3',
    name: 'Change Requests',
    description: 'All change request tickets',
    filterCriteria: {
      ticketTypes: ['change-request']
    },
    groupId: 'group-3',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-07-10')
  }
];

// Sample mock data for groups - same as in GroupsManagement
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

const QueuesManagement: React.FC = () => {
  const [queues, setQueues] = useState<Queue[]>(mockQueues);
  const [newQueue, setNewQueue] = useState<Partial<Queue>>({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedQueueId, setSelectedQueueId] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const { toast } = useToast();

  const getGroupNameById = (groupId: string): string => {
    const group = groups.find(g => g.id === groupId);
    return group ? group.name : 'Unknown Group';
  };

  const handleAddQueue = () => {
    if (!newQueue.name || !newQueue.groupId) {
      toast({
        title: "Error",
        description: "Queue name and group are required",
        variant: "destructive",
      });
      return;
    }

    const newQueueObject: Queue = {
      id: `queue-${Date.now()}`,
      name: newQueue.name || '',
      description: newQueue.description || '',
      filterCriteria: {},
      groupId: newQueue.groupId || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setQueues([...queues, newQueueObject]);
    
    // Update the associated group with this queue ID
    const updatedGroups = groups.map(group => 
      group.id === newQueue.groupId 
        ? { ...group, queueId: newQueueObject.id }
        : group
    );
    setGroups(updatedGroups);
    
    setNewQueue({});
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Queue added successfully",
    });
  };

  const handleEditQueue = () => {
    if (!selectedQueueId || !newQueue.name || !newQueue.groupId) return;
    
    const updatedQueues = queues.map(queue => 
      queue.id === selectedQueueId 
        ? { 
            ...queue, 
            name: newQueue.name || queue.name, 
            description: newQueue.description || queue.description,
            groupId: newQueue.groupId || queue.groupId,
            updatedAt: new Date()
          }
        : queue
    );
    
    setQueues(updatedQueues);
    
    // If group has changed, update group associations
    const originalQueue = queues.find(q => q.id === selectedQueueId);
    if (originalQueue && originalQueue.groupId !== newQueue.groupId) {
      // Remove queueId from original group
      const updatedGroups = groups.map(group => 
        group.id === originalQueue.groupId 
          ? { ...group, queueId: undefined }
          : group.id === newQueue.groupId
            ? { ...group, queueId: selectedQueueId }
            : group
      );
      setGroups(updatedGroups);
    }
    
    setNewQueue({});
    setIsEditDialogOpen(false);
    setSelectedQueueId(null);
    
    toast({
      title: "Success",
      description: "Queue updated successfully",
    });
  };

  const handleDeleteQueue = (id: string) => {
    const queueToDelete = queues.find(queue => queue.id === id);
    
    // Remove queue
    const filteredQueues = queues.filter(queue => queue.id !== id);
    setQueues(filteredQueues);
    
    // Update any groups that had this queue
    if (queueToDelete) {
      const updatedGroups = groups.map(group => 
        group.queueId === id 
          ? { ...group, queueId: undefined }
          : group
      );
      setGroups(updatedGroups);
    }
    
    toast({
      title: "Success",
      description: "Queue deleted successfully",
    });
  };

  const openEditDialog = (queue: Queue) => {
    setSelectedQueueId(queue.id);
    setNewQueue({ 
      name: queue.name, 
      description: queue.description,
      groupId: queue.groupId
    });
    setIsEditDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Queues Management</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Add Queue</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Queue</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="queueName" className="text-sm font-medium">Queue Name</label>
                <Input 
                  id="queueName" 
                  value={newQueue.name || ''} 
                  onChange={(e) => setNewQueue({ ...newQueue, name: e.target.value })} 
                  placeholder="Enter queue name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="queueDescription" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="queueDescription" 
                  value={newQueue.description || ''} 
                  onChange={(e) => setNewQueue({ ...newQueue, description: e.target.value })} 
                  placeholder="Enter queue description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="groupSelect" className="text-sm font-medium">Associated Group</label>
                <Select 
                  value={newQueue.groupId}
                  onValueChange={(value) => setNewQueue({ ...newQueue, groupId: value })}
                >
                  <SelectTrigger id="groupSelect">
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddQueue} className="w-full">Create Queue</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Queue Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Associated Group</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queues.map((queue) => (
              <TableRow key={queue.id}>
                <TableCell className="font-medium">{queue.name}</TableCell>
                <TableCell>{queue.description}</TableCell>
                <TableCell>{getGroupNameById(queue.groupId)}</TableCell>
                <TableCell>{queue.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>{queue.updatedAt.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(queue)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteQueue(queue.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Queue Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Queue</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="editQueueName" className="text-sm font-medium">Queue Name</label>
              <Input 
                id="editQueueName" 
                value={newQueue.name || ''} 
                onChange={(e) => setNewQueue({ ...newQueue, name: e.target.value })} 
                placeholder="Enter queue name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="editQueueDescription" className="text-sm font-medium">Description</label>
              <Textarea 
                id="editQueueDescription" 
                value={newQueue.description || ''} 
                onChange={(e) => setNewQueue({ ...newQueue, description: e.target.value })} 
                placeholder="Enter queue description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="editGroupSelect" className="text-sm font-medium">Associated Group</label>
              <Select 
                value={newQueue.groupId}
                onValueChange={(value) => setNewQueue({ ...newQueue, groupId: value })}
              >
                <SelectTrigger id="editGroupSelect">
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleEditQueue} className="w-full">Update Queue</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default QueuesManagement;
