
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TicketType, TicketCategory, TicketPriority } from '@/utils/types/ticket';
import { v4 as uuidv4 } from 'uuid';

interface RoutingRule {
  id: string;
  name: string;
  description: string;
  criteria: {
    ticketType?: TicketType;
    category?: TicketCategory;
    priority?: TicketPriority;
    hasKeywords?: string[];
  };
  targetQueueId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const QueueRoutingRules: React.FC = () => {
  const { toast } = useToast();
  const [rules, setRules] = useState<RoutingRule[]>([
    {
      id: 'rule-1',
      name: 'High Priority Incidents',
      description: 'Route high priority incidents to the urgent queue',
      criteria: {
        ticketType: 'incident',
        priority: 'high'
      },
      targetQueueId: 'q1',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<RoutingRule | null>(null);
  const [formValues, setFormValues] = useState<Partial<RoutingRule>>({
    name: '',
    description: '',
    criteria: {},
    targetQueueId: '',
    active: true
  });

  // Mock queues data - in a real app, this would come from an API or context
  const queues = [
    { id: 'q1', name: 'General Support' },
    { id: 'q2', name: 'Urgent Issues' },
    { id: 'q3', name: 'Low Priority' }
  ];

  const handleAddRule = () => {
    setEditingRule(null);
    setFormValues({
      name: '',
      description: '',
      criteria: {},
      targetQueueId: '',
      active: true
    });
    setDialogOpen(true);
  };

  const handleEditRule = (rule: RoutingRule) => {
    setEditingRule(rule);
    setFormValues({
      name: rule.name,
      description: rule.description,
      criteria: { ...rule.criteria },
      targetQueueId: rule.targetQueueId,
      active: rule.active
    });
    setDialogOpen(true);
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast({
      title: "Rule deleted",
      description: "Routing rule has been removed",
    });
  };

  const handleSubmit = () => {
    if (!formValues.name || !formValues.targetQueueId) {
      toast({
        title: "Validation Error",
        description: "Name and target queue are required",
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
              description: formValues.description || rule.description,
              criteria: formValues.criteria || rule.criteria,
              targetQueueId: formValues.targetQueueId || rule.targetQueueId,
              active: formValues.active ?? rule.active,
              updatedAt: new Date()
            }
          : rule
      ));
      toast({
        title: "Rule updated",
        description: "Routing rule has been updated successfully",
      });
    } else {
      // Create new rule
      const newRule: RoutingRule = {
        id: uuidv4(),
        name: formValues.name || '',
        description: formValues.description || '',
        criteria: formValues.criteria || {},
        targetQueueId: formValues.targetQueueId || '',
        active: formValues.active ?? true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setRules([...rules, newRule]);
      toast({
        title: "Rule created",
        description: "Routing rule has been created successfully",
      });
    }
    
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Queue Routing Rules</h3>
        <Button onClick={handleAddRule}>
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>
      
      <Card className="p-4">
        {rules.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No routing rules configured. Click "Add Rule" to create one.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Target Queue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.description}</TableCell>
                  <TableCell>
                    {queues.find(q => q.id === rule.targetQueueId)?.name || rule.targetQueueId}
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
            <DialogTitle>{editingRule ? 'Edit Routing Rule' : 'Add Routing Rule'}</DialogTitle>
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
              <Label htmlFor="ruleDescription">Description</Label>
              <Input 
                id="ruleDescription"
                value={formValues.description || ''}
                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                placeholder="Enter rule description"
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
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formValues.criteria?.priority}
                onValueChange={(value) => setFormValues({ 
                  ...formValues, 
                  criteria: { ...formValues.criteria, priority: value as TicketPriority } 
                })}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetQueue">Target Queue</Label>
              <Select 
                value={formValues.targetQueueId}
                onValueChange={(value) => setFormValues({ ...formValues, targetQueueId: value })}
              >
                <SelectTrigger id="targetQueue">
                  <SelectValue placeholder="Select target queue" />
                </SelectTrigger>
                <SelectContent>
                  {queues.map(queue => (
                    <SelectItem key={queue.id} value={queue.id}>{queue.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formValues.active ? 'active' : 'inactive'}
                onValueChange={(value) => setFormValues({ ...formValues, active: value === 'active' })}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
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

export default QueueRoutingRules;
