
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { GitBranch, Plus, Trash2, Edit, ArrowUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ChannelRoutingRule } from '@/utils/types/eventBus/notificationTypes';
import { v4 as uuidv4 } from 'uuid';

const RoutingRulesManager = () => {
  const { toast } = useToast();
  const [rules, setRules] = useState<ChannelRoutingRule[]>([
    {
      id: "rule-1",
      name: "Critical Alerts to SMS",
      description: "Route critical alerts to SMS channel for immediate attention",
      conditions: [
        {
          field: 'importance',
          operator: 'equals',
          value: 'critical'
        }
      ],
      channelId: "channel-sms",
      fallbackChannelId: "channel-email",
      isActive: true,
      priority: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "rule-2",
      name: "Team Notifications to Slack",
      description: "Route team-based notifications to Slack",
      conditions: [
        {
          field: 'audience',
          operator: 'contains',
          value: 'team'
        }
      ],
      channelId: "channel-slack",
      isActive: true,
      priority: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<ChannelRoutingRule | null>(null);
  const [formValues, setFormValues] = useState<Partial<ChannelRoutingRule>>({
    name: '',
    description: '',
    conditions: [],
    channelId: '',
    fallbackChannelId: '',
    isActive: true,
    priority: 10
  });

  // Mock channels data - in a real app, this would come from an API
  const channels = [
    { id: 'channel-email', name: 'Email' },
    { id: 'channel-slack', name: 'Slack' },
    { id: 'channel-teams', name: 'Microsoft Teams' },
    { id: 'channel-sms', name: 'SMS' },
    { id: 'channel-inapp', name: 'In-App Notification' }
  ];

  const handleAddRule = () => {
    setEditingRule(null);
    setFormValues({
      name: '',
      description: '',
      conditions: [],
      channelId: '',
      fallbackChannelId: '',
      isActive: true,
      priority: 10
    });
    setIsDialogOpen(true);
  };

  const handleEditRule = (rule: ChannelRoutingRule) => {
    setEditingRule(rule);
    setFormValues({
      name: rule.name,
      description: rule.description,
      conditions: [...rule.conditions],
      channelId: rule.channelId,
      fallbackChannelId: rule.fallbackChannelId,
      isActive: rule.isActive,
      priority: rule.priority
    });
    setIsDialogOpen(true);
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast({
      title: "Rule deleted",
      description: "Routing rule has been removed"
    });
  };

  const handlePriorityChange = (id: string, direction: 'up' | 'down') => {
    const rulesCopy = [...rules];
    const index = rulesCopy.findIndex(rule => rule.id === id);
    
    if (index === -1) return;
    
    if (direction === 'up' && index > 0) {
      // Swap with the previous rule
      const temp = rulesCopy[index].priority;
      rulesCopy[index].priority = rulesCopy[index - 1].priority;
      rulesCopy[index - 1].priority = temp;
      
      // Swap positions in array
      [rulesCopy[index], rulesCopy[index - 1]] = [rulesCopy[index - 1], rulesCopy[index]];
    } else if (direction === 'down' && index < rulesCopy.length - 1) {
      // Swap with the next rule
      const temp = rulesCopy[index].priority;
      rulesCopy[index].priority = rulesCopy[index + 1].priority;
      rulesCopy[index + 1].priority = temp;
      
      // Swap positions in array
      [rulesCopy[index], rulesCopy[index + 1]] = [rulesCopy[index + 1], rulesCopy[index]];
    }
    
    setRules(rulesCopy);
  };

  const handleSubmit = () => {
    if (!formValues.name || !formValues.channelId) {
      toast({
        title: "Validation Error",
        description: "Name and target channel are required",
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
              conditions: formValues.conditions || rule.conditions,
              channelId: formValues.channelId || rule.channelId,
              fallbackChannelId: formValues.fallbackChannelId,
              isActive: formValues.isActive ?? rule.isActive,
              priority: formValues.priority || rule.priority,
              updatedAt: new Date().toISOString()
            }
          : rule
      ));
      toast({
        title: "Rule updated",
        description: "Routing rule has been updated successfully"
      });
    } else {
      // Create new rule
      const newRule: ChannelRoutingRule = {
        id: uuidv4(),
        name: formValues.name || '',
        description: formValues.description || '',
        conditions: formValues.conditions || [],
        channelId: formValues.channelId || '',
        fallbackChannelId: formValues.fallbackChannelId,
        isActive: formValues.isActive ?? true,
        priority: formValues.priority || rules.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setRules([...rules, newRule]);
      toast({
        title: "Rule created",
        description: "Routing rule has been created successfully"
      });
    }
    
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Notification Routing Rules</CardTitle>
          <CardDescription>
            Define rules for routing notifications to different channels
          </CardDescription>
        </div>
        <Button onClick={handleAddRule}>
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </CardHeader>
      <CardContent>
        {rules.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No routing rules configured. Click "Add Rule" to create one.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Priority</TableHead>
                <TableHead>Rule Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Target Channel</TableHead>
                <TableHead>Fallback</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.sort((a, b) => a.priority - b.priority).map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">{rule.priority}</span>
                      <div className="flex flex-col">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5" 
                          onClick={() => handlePriorityChange(rule.id, 'up')}
                        >
                          <ArrowUpDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.description}</TableCell>
                  <TableCell>
                    {channels.find(c => c.id === rule.channelId)?.name || rule.channelId}
                  </TableCell>
                  <TableCell>
                    {rule.fallbackChannelId ? 
                      (channels.find(c => c.id === rule.fallbackChannelId)?.name || rule.fallbackChannelId) : 
                      <span className="text-muted-foreground">None</span>
                    }
                  </TableCell>
                  <TableCell>
                    <Badge variant={rule.isActive ? "default" : "secondary"}>
                      {rule.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditRule(rule)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteRule(rule.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingRule ? 'Edit Routing Rule' : 'Add Routing Rule'}</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="priority">Priority</Label>
                  <Input 
                    id="priority"
                    type="number"
                    min={1}
                    value={formValues.priority || ''}
                    onChange={(e) => setFormValues({ ...formValues, priority: parseInt(e.target.value) })}
                    placeholder="Enter priority (lower runs first)"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description"
                  value={formValues.description || ''}
                  onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                  placeholder="Enter rule description"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetChannel">Target Channel</Label>
                <Select 
                  value={formValues.channelId}
                  onValueChange={(value) => setFormValues({ ...formValues, channelId: value })}
                >
                  <SelectTrigger id="targetChannel">
                    <SelectValue placeholder="Select target channel" />
                  </SelectTrigger>
                  <SelectContent>
                    {channels.map(channel => (
                      <SelectItem key={channel.id} value={channel.id}>
                        {channel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fallbackChannel">Fallback Channel (Optional)</Label>
                <Select 
                  value={formValues.fallbackChannelId || ''}
                  onValueChange={(value) => setFormValues({ ...formValues, fallbackChannelId: value })}
                >
                  <SelectTrigger id="fallbackChannel">
                    <SelectValue placeholder="Select fallback channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {channels.map(channel => (
                      <SelectItem key={channel.id} value={channel.id}>
                        {channel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Conditions</Label>
                <p className="text-sm text-muted-foreground">
                  Use the Condition Builder tab to create complex conditions for this rule
                </p>
                
                <div className="bg-muted p-3 rounded-md">
                  {formValues.conditions && formValues.conditions.length > 0 ? (
                    <div className="space-y-2">
                      {formValues.conditions.map((condition, index) => (
                        <div key={index} className="text-sm border border-border rounded-md p-2 bg-background flex justify-between items-center">
                          <span>
                            {condition.field} {condition.operator} {JSON.stringify(condition.value)}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              const newConditions = [...(formValues.conditions || [])];
                              newConditions.splice(index, 1);
                              setFormValues({ ...formValues, conditions: newConditions });
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-2 text-muted-foreground">
                      No conditions added. Add conditions for this rule to apply.
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-2" 
                    onClick={() => {
                      const newConditions = [...(formValues.conditions || [])];
                      newConditions.push({
                        field: 'importance',
                        operator: 'equals',
                        value: 'high'
                      });
                      setFormValues({ ...formValues, conditions: newConditions });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Basic Condition
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="isActive" 
                  checked={formValues.isActive} 
                  onCheckedChange={(checked) => setFormValues({ ...formValues, isActive: checked })}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingRule ? 'Update Rule' : 'Create Rule'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RoutingRulesManager;
