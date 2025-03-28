
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Save, 
  Edit2, 
  Trash2, 
  Copy, 
  Code, 
  Download, 
  Upload 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

// Define the condition types
interface Condition {
  id: string;
  field: string;
  operator: string;
  value: any;
  description?: string;
}

interface ConditionGroup {
  id: string;
  name: string;
  description: string;
  conditions: Condition[];
  isBuiltIn: boolean;
  createdAt: string;
  updatedAt: string;
}

// Available fields and operators
const availableFields = [
  { id: 'importance', name: 'Importance', type: 'select', options: ['low', 'medium', 'high', 'critical'] },
  { id: 'audience', name: 'Audience', type: 'text' },
  { id: 'category', name: 'Category', type: 'text' },
  { id: 'tags', name: 'Tags', type: 'array' },
  { id: 'time', name: 'Time', type: 'datetime' },
  { id: 'userPreference', name: 'User Preference', type: 'text' }
];

const availableOperators = [
  { id: 'equals', name: 'Equals', compatibleTypes: ['text', 'select', 'number'] },
  { id: 'contains', name: 'Contains', compatibleTypes: ['text', 'array'] },
  { id: 'startsWith', name: 'Starts With', compatibleTypes: ['text'] },
  { id: 'endsWith', name: 'Ends With', compatibleTypes: ['text'] },
  { id: 'greaterThan', name: 'Greater Than', compatibleTypes: ['number', 'datetime'] },
  { id: 'lessThan', name: 'Less Than', compatibleTypes: ['number', 'datetime'] },
  { id: 'in', name: 'In', compatibleTypes: ['array'] },
  { id: 'notIn', name: 'Not In', compatibleTypes: ['array'] }
];

const RuleConditionBuilder = () => {
  const { toast } = useToast();
  
  // Sample condition groups
  const [conditionGroups, setConditionGroups] = useState<ConditionGroup[]>([
    {
      id: "group-1",
      name: "Critical Importance",
      description: "Conditions for critical importance notifications",
      isBuiltIn: true,
      conditions: [
        { id: "cond-1", field: "importance", operator: "equals", value: "critical" }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "group-2",
      name: "Team Audience",
      description: "Conditions for team-based audience",
      isBuiltIn: false,
      conditions: [
        { id: "cond-2", field: "audience", operator: "contains", value: "team" }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
  
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
  const [isConditionDialogOpen, setIsConditionDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ConditionGroup | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const [groupFormValues, setGroupFormValues] = useState<Partial<ConditionGroup>>({
    name: '',
    description: '',
    conditions: []
  });
  const [conditionFormValues, setConditionFormValues] = useState<Partial<Condition>>({
    field: '',
    operator: '',
    value: ''
  });

  const handleAddGroup = () => {
    setSelectedGroup(null);
    setGroupFormValues({
      name: '',
      description: '',
      conditions: []
    });
    setIsGroupDialogOpen(true);
  };

  const handleEditGroup = (group: ConditionGroup) => {
    setSelectedGroup(group);
    setGroupFormValues({
      name: group.name,
      description: group.description,
      conditions: [...group.conditions]
    });
    setIsGroupDialogOpen(true);
  };

  const handleDeleteGroup = (id: string) => {
    setConditionGroups(conditionGroups.filter(group => group.id !== id));
    toast({
      title: "Group deleted",
      description: "Condition group has been removed"
    });
  };

  const handleAddCondition = (groupId: string) => {
    setSelectedCondition(null);
    setSelectedGroup(conditionGroups.find(g => g.id === groupId) || null);
    setConditionFormValues({
      field: availableFields[0].id,
      operator: getCompatibleOperators(availableFields[0].type)[0].id,
      value: ''
    });
    setIsConditionDialogOpen(true);
  };

  const handleEditCondition = (groupId: string, condition: Condition) => {
    setSelectedGroup(conditionGroups.find(g => g.id === groupId) || null);
    setSelectedCondition(condition);
    setConditionFormValues({
      field: condition.field,
      operator: condition.operator,
      value: condition.value
    });
    setIsConditionDialogOpen(true);
  };

  const handleDeleteCondition = (groupId: string, conditionId: string) => {
    setConditionGroups(conditionGroups.map(group => 
      group.id === groupId 
        ? {
            ...group,
            conditions: group.conditions.filter(c => c.id !== conditionId),
            updatedAt: new Date().toISOString()
          }
        : group
    ));
    toast({
      title: "Condition deleted",
      description: "Condition has been removed from the group"
    });
  };

  const handleSubmitGroup = () => {
    if (!groupFormValues.name) {
      toast({
        title: "Validation Error",
        description: "Group name is required",
        variant: "destructive"
      });
      return;
    }

    if (selectedGroup) {
      // Update existing group
      setConditionGroups(conditionGroups.map(group => 
        group.id === selectedGroup.id
          ? {
              ...group,
              name: groupFormValues.name || group.name,
              description: groupFormValues.description || group.description,
              conditions: groupFormValues.conditions || group.conditions,
              updatedAt: new Date().toISOString()
            }
          : group
      ));
      toast({
        title: "Group updated",
        description: "Condition group has been updated successfully"
      });
    } else {
      // Create new group
      const newGroup: ConditionGroup = {
        id: uuidv4(),
        name: groupFormValues.name || '',
        description: groupFormValues.description || '',
        conditions: groupFormValues.conditions || [],
        isBuiltIn: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setConditionGroups([...conditionGroups, newGroup]);
      toast({
        title: "Group created",
        description: "Condition group has been created successfully"
      });
    }
    
    setIsGroupDialogOpen(false);
  };

  const handleSubmitCondition = () => {
    if (!selectedGroup) return;
    
    if (!conditionFormValues.field || !conditionFormValues.operator) {
      toast({
        title: "Validation Error",
        description: "Field and operator are required",
        variant: "destructive"
      });
      return;
    }

    const updatedGroups = [...conditionGroups];
    const groupIndex = updatedGroups.findIndex(g => g.id === selectedGroup.id);
    
    if (groupIndex === -1) return;
    
    if (selectedCondition) {
      // Update existing condition
      const conditionIndex = updatedGroups[groupIndex].conditions.findIndex(c => c.id === selectedCondition.id);
      
      if (conditionIndex !== -1) {
        updatedGroups[groupIndex].conditions[conditionIndex] = {
          ...updatedGroups[groupIndex].conditions[conditionIndex],
          field: conditionFormValues.field || updatedGroups[groupIndex].conditions[conditionIndex].field,
          operator: conditionFormValues.operator || updatedGroups[groupIndex].conditions[conditionIndex].operator,
          value: conditionFormValues.value
        };
      }
    } else {
      // Add new condition
      const newCondition: Condition = {
        id: uuidv4(),
        field: conditionFormValues.field || '',
        operator: conditionFormValues.operator || '',
        value: conditionFormValues.value
      };
      
      updatedGroups[groupIndex].conditions.push(newCondition);
    }
    
    updatedGroups[groupIndex].updatedAt = new Date().toISOString();
    
    setConditionGroups(updatedGroups);
    setIsConditionDialogOpen(false);
    
    toast({
      title: selectedCondition ? "Condition updated" : "Condition added",
      description: `Condition has been ${selectedCondition ? 'updated' : 'added'} successfully`
    });
  };

  // Helper function to get compatible operators for a field type
  const getCompatibleOperators = (fieldType: string) => {
    return availableOperators.filter(op => op.compatibleTypes.includes(fieldType));
  };

  // Get field type by id
  const getFieldType = (fieldId: string) => {
    const field = availableFields.find(f => f.id === fieldId);
    return field ? field.type : 'text';
  };

  // Render value input based on field type
  const renderValueInput = (fieldId: string, value: any, onChange: (value: any) => void) => {
    const field = availableFields.find(f => f.id === fieldId);
    
    if (!field) return null;
    
    switch (field.type) {
      case 'select':
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select value" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'array':
        return (
          <Input 
            value={Array.isArray(value) ? value.join(',') : value} 
            onChange={(e) => onChange(e.target.value.split(',').map(item => item.trim()))}
            placeholder="Enter comma-separated values"
          />
        );
      case 'datetime':
        return (
          <Input 
            type="datetime-local" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case 'number':
        return (
          <Input 
            type="number" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter a number"
          />
        );
      default:
        return (
          <Input 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter value"
          />
        );
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Condition Builder</CardTitle>
          <CardDescription>
            Create and manage reusable condition groups for routing rules
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Code className="h-4 w-4 mr-2" />
            View JSON
          </Button>
          <Button onClick={handleAddGroup}>
            <Plus className="h-4 w-4 mr-2" />
            Add Group
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {conditionGroups.map(group => (
            <AccordionItem key={group.id} value={group.id}>
              <AccordionTrigger className="hover:bg-muted px-4 py-2 rounded-md">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center">
                    <span className="font-medium">{group.name}</span>
                    {group.isBuiltIn && (
                      <Badge variant="secondary" className="ml-2">Built-in</Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {group.conditions.length} condition{group.conditions.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium">Description</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {group.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {!group.isBuiltIn && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditGroup(group)}
                          >
                            <Edit2 className="h-4 w-4 mr-1" />
                            Edit Group
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteGroup(group.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const clone = {
                            ...group,
                            id: uuidv4(),
                            name: `${group.name} (Copy)`,
                            isBuiltIn: false,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                          };
                          setConditionGroups([...conditionGroups, clone]);
                          toast({
                            title: "Group cloned",
                            description: "Condition group has been duplicated"
                          });
                        }}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Clone
                      </Button>
                    </div>
                  </div>
                  
                  {group.conditions.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Field</TableHead>
                          <TableHead>Operator</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.conditions.map(condition => (
                          <TableRow key={condition.id}>
                            <TableCell>
                              {availableFields.find(f => f.id === condition.field)?.name || condition.field}
                            </TableCell>
                            <TableCell>
                              {availableOperators.find(o => o.id === condition.operator)?.name || condition.operator}
                            </TableCell>
                            <TableCell>
                              {Array.isArray(condition.value) 
                                ? condition.value.join(', ') 
                                : condition.value
                              }
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditCondition(group.id, condition)}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteCondition(group.id, condition.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      No conditions in this group. Add a condition to get started.
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleAddCondition(group.id)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Condition
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {conditionGroups.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No condition groups defined. Create a group to get started.
          </div>
        )}

        {/* Group Dialog */}
        <Dialog open={isGroupDialogOpen} onOpenChange={setIsGroupDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedGroup ? 'Edit Condition Group' : 'Create Condition Group'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  value={groupFormValues.name || ''}
                  onChange={(e) => setGroupFormValues({ ...groupFormValues, name: e.target.value })}
                  placeholder="Enter group name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="groupDescription">Description</Label>
                <Input
                  id="groupDescription"
                  value={groupFormValues.description || ''}
                  onChange={(e) => setGroupFormValues({ ...groupFormValues, description: e.target.value })}
                  placeholder="Enter group description"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsGroupDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitGroup}>
                {selectedGroup ? 'Update Group' : 'Create Group'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Condition Dialog */}
        <Dialog open={isConditionDialogOpen} onOpenChange={setIsConditionDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedCondition ? 'Edit Condition' : 'Add Condition'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="conditionField">Field</Label>
                <Select
                  value={conditionFormValues.field}
                  onValueChange={(value) => {
                    // When field changes, reset operator to a compatible one
                    const fieldType = getFieldType(value);
                    const compatibleOps = getCompatibleOperators(fieldType);
                    
                    setConditionFormValues({
                      ...conditionFormValues,
                      field: value,
                      operator: compatibleOps.length > 0 ? compatibleOps[0].id : ''
                    });
                  }}
                >
                  <SelectTrigger id="conditionField">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFields.map(field => (
                      <SelectItem key={field.id} value={field.id}>
                        {field.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="conditionOperator">Operator</Label>
                <Select
                  value={conditionFormValues.operator}
                  onValueChange={(value) => setConditionFormValues({ ...conditionFormValues, operator: value })}
                >
                  <SelectTrigger id="conditionOperator">
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditionFormValues.field && 
                      getCompatibleOperators(getFieldType(conditionFormValues.field)).map(op => (
                        <SelectItem key={op.id} value={op.id}>
                          {op.name}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="conditionValue">Value</Label>
                {conditionFormValues.field && renderValueInput(
                  conditionFormValues.field,
                  conditionFormValues.value,
                  (value) => setConditionFormValues({ ...conditionFormValues, value })
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConditionDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitCondition}>
                {selectedCondition ? 'Update Condition' : 'Add Condition'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RuleConditionBuilder;
