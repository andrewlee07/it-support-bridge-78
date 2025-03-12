
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { AutoAssignRule } from '@/utils/types/group';
import { TicketType, TicketCategory, TicketPriority } from '@/utils/types/ticket';

const QueueAssignments: React.FC = () => {
  const { toast } = useToast();
  const [rules, setRules] = useState<AutoAssignRule[]>([
    {
      id: 'rule-1',
      name: 'Network Issues to Network Team',
      criteria: {
        category: 'network'
      },
      assignToGroupId: 'group-2',
      roundRobin: true,
      loadBalanced: false,
      active: true
    }
  ]);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<AutoAssignRule | null>(null);
  const [formValues, setFormValues] = useState<Partial<AutoAssignRule>>({
    name: '',
    criteria: {},
    assignToUserId: '',
    assignToGroupId: '',
    roundRobin: false,
    loadBalanced: false,
    active: true
  });

  // Mock groups and users data
  const groups = [
    { id: 'group-1', name: 'IT Support' },
    { id: 'group-2', name: 'Network Team' },
    { id: 'group-3', name: 'Change Management' }
  ];
  
  const users = [
    { id: 'user-1', name: 'John Doe' },
    { id: 'user-2', name: 'Jane Smith' },
    { id: 'user-4', name: 'Morgan Lee' }
  ];

  const handleAddRule = () => {
    setEditingRule(null);
    setFormValues({
      name: '',
      criteria: {},
      assignToUserId: '',
      assignToGroupId: '',
      roundRobin: false,
      loadBalanced: false,
      active: true
    });
    setDialogOpen(true);
  };

  const handleEditRule = (rule: AutoAssignRule) => {
    setEditingRule(rule);
    setFormValues({
      name: rule.name,
      criteria: { ...rule.criteria },
      assignToUserId: rule.assignToUserId,
      assignToGroupId: rule.assignToGroupId,
      roundRobin: rule.roundRobin,
      loadBalanced: rule.loadBalanced,
      active: rule.active
    });
    setDialogOpen(true);
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast({
      title: "Rule deleted",
      description: "Assignment rule has been removed",
    });
  };

  const handleSubmit = () => {
    if (!formValues.name || (!formValues.assignToUserId && !formValues.assignToGroupId)) {
      toast({
        title: "Validation Error",
        description: "Name and at least one assignment target are required",
        variant: "destructive"
      });
      return;
    }

    if (editingRule) {
      // Update existing rule
      setRules(rules.map(rule => 
        rule.id === editingRule.id
          ? {
              ...rule,
              name: formValues.name || rule.name,
              criteria: formValues.criteria || rule.criteria,
              assignToUserId: formValues.assignToUserId,
              assignToGroupId: formValues.assignToGroupId,
              roundRobin: formValues.roundRobin ?? rule.roundRobin,
              loadBalanced: formValues.loadBalanced ?? rule.loadBalanced,
              active: formValues.active ?? rule.active,
            }
          : rule
      ));
      toast({
        title: "Rule updated",
        description: "Assignment rule has been updated successfully",
      });
    } else {
      // Create new rule
      const newRule: AutoAssignRule = {
        id: uuidv4(),
        name: formValues.name || '',
        criteria: formValues.criteria || {},
        assignToUserId: formValues.assignToUserId,
        assignToGroupId: formValues.assignToGroupId,
        roundRobin: formValues.roundRobin || false,
        loadBalanced: formValues.loadBalanced || false,
        active: formValues.active ?? true,
      };
      setRules([...rules, newRule]);
      toast({
        title: "Rule created",
        description: "Assignment rule has been created successfully",
      });
    }
    
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Automatic Assignment Rules</h3>
        <Button onClick={handleAddRule}>
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>
      
      <Card className="p-4">
        {rules.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No assignment rules configured. Click "Add Rule" to create one.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule Name</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Distribution</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>
                    {rule.assignToGroupId 
                      ? `Group: ${groups.find(g => g.id === rule.assignToGroupId)?.name || rule.assignToGroupId}`
                      : rule.assignToUserId
                        ? `User: ${users.find(u => u.id === rule.assignToUserId)?.name || rule.assignToUserId}`
                        : 'Not assigned'
                    }
                  </TableCell>
                  <TableCell>
                    {rule.roundRobin ? 'Round Robin' : rule.loadBalanced ? 'Load Balanced' : 'Direct Assignment'}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${rule.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {rule.active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditRule(rule)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteRule(rule.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingRule ? 'Edit Assignment Rule' : 'Add Assignment Rule'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="ruleName">Rule Name</Label>
              <Input 
                id="ruleName"
                value={formValues.name || ''}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                placeholder="Enter rule name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ticketType">Ticket Type</Label>
              <Select 
                value={formValues.criteria?.ticketType}
                onValueChange={(value) => setFormValues({ 
                  ...formValues, 
                  criteria: { ...formValues.criteria, ticketType: value as TicketType } 
                })}
              >
                <SelectTrigger id="ticketType">
                  <SelectValue placeholder="Select ticket type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incident">Incident</SelectItem>
                  <SelectItem value="service">Service Request</SelectItem>
                  <SelectItem value="problem">Problem</SelectItem>
                  <SelectItem value="change">Change</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formValues.criteria?.category}
                onValueChange={(value) => setFormValues({ 
                  ...formValues, 
                  criteria: { ...formValues.criteria, category: value as TicketCategory } 
                })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                  <SelectItem value="access">Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assignGroup">Assign to Group</Label>
              <Select 
                value={formValues.assignToGroupId || ''}
                onValueChange={(value) => setFormValues({ ...formValues, assignToGroupId: value })}
              >
                <SelectTrigger id="assignGroup">
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {groups.map(group => (
                    <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assignUser">Assign to User</Label>
              <Select 
                value={formValues.assignToUserId || ''}
                onValueChange={(value) => setFormValues({ ...formValues, assignToUserId: value })}
              >
                <SelectTrigger id="assignUser">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="roundRobin"
                checked={formValues.roundRobin}
                onCheckedChange={(checked) => {
                  setFormValues({ 
                    ...formValues, 
                    roundRobin: checked,
                    // Uncheck load balanced if round robin is checked
                    loadBalanced: checked ? false : formValues.loadBalanced
                  });
                }}
              />
              <Label htmlFor="roundRobin">Round Robin Assignment</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="loadBalanced"
                checked={formValues.loadBalanced}
                onCheckedChange={(checked) => {
                  setFormValues({ 
                    ...formValues, 
                    loadBalanced: checked,
                    // Uncheck round robin if load balanced is checked
                    roundRobin: checked ? false : formValues.roundRobin
                  });
                }}
              />
              <Label htmlFor="loadBalanced">Load Balanced Assignment</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formValues.active}
                onCheckedChange={(checked) => setFormValues({ ...formValues, active: checked })}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingRule ? 'Update Rule' : 'Add Rule'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QueueAssignments;
