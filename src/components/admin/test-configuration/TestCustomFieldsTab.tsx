
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Plus,
  Pencil,
  Trash,
  ChevronDown,
  Search,
  MoveUp,
  MoveDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Field type definition
interface CustomField {
  id: string;
  name: string;
  label: string;
  fieldType: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'textarea';
  isRequired: boolean;
  isActive: boolean;
  defaultValue?: string;
  options?: string[];
  displayOrder: number;
  applyToPhase: 'design' | 'execution' | 'all';
}

// Mock data
const mockCustomFields: CustomField[] = [
  {
    id: "field-1",
    name: "test_environment",
    label: "Test Environment",
    fieldType: "select",
    isRequired: true,
    isActive: true,
    options: ["Development", "QA", "Staging", "Production"],
    defaultValue: "QA",
    displayOrder: 1,
    applyToPhase: "execution"
  },
  {
    id: "field-2",
    name: "browser_version",
    label: "Browser Version",
    fieldType: "text",
    isRequired: false,
    isActive: true,
    defaultValue: "",
    displayOrder: 2,
    applyToPhase: "execution"
  },
  {
    id: "field-3",
    name: "test_priority",
    label: "Test Priority",
    fieldType: "select",
    isRequired: true,
    isActive: true,
    options: ["Low", "Medium", "High", "Critical"],
    defaultValue: "Medium",
    displayOrder: 3,
    applyToPhase: "design"
  },
  {
    id: "field-4",
    name: "automated",
    label: "Automated",
    fieldType: "checkbox",
    isRequired: false,
    isActive: true,
    defaultValue: "false",
    displayOrder: 4,
    applyToPhase: "design"
  },
  {
    id: "field-5",
    name: "pre_conditions",
    label: "Pre-conditions",
    fieldType: "textarea",
    isRequired: false,
    isActive: true,
    defaultValue: "",
    displayOrder: 5,
    applyToPhase: "design"
  }
];

const TestCustomFieldsTab = () => {
  const { toast } = useToast();
  const [customFields, setCustomFields] = useState<CustomField[]>(mockCustomFields);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingField, setEditingField] = useState<CustomField | null>(null);
  const [newField, setNewField] = useState<Partial<CustomField>>({
    name: "",
    label: "",
    fieldType: "text",
    isRequired: false,
    isActive: true,
    defaultValue: "",
    applyToPhase: "all"
  });
  
  // Filter fields based on search query
  const filteredFields = customFields.filter(field => 
    field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    field.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Open dialog for creating new field
  const openNewFieldDialog = () => {
    setEditingField(null);
    setNewField({
      name: "",
      label: "",
      fieldType: "text",
      isRequired: false,
      isActive: true,
      defaultValue: "",
      applyToPhase: "all"
    });
    setIsDialogOpen(true);
  };
  
  // Open dialog for editing field
  const openEditFieldDialog = (field: CustomField) => {
    setEditingField(field);
    setNewField({ ...field });
    setIsDialogOpen(true);
  };
  
  // Save field (create or update)
  const handleSaveField = () => {
    // Validation
    if (!newField.name || !newField.label || !newField.fieldType) {
      toast({
        title: "Validation Error",
        description: "Name, label, and field type are required",
        variant: "destructive"
      });
      return;
    }
    
    // Format field name (no spaces, lowercase)
    const formattedName = newField.name.toLowerCase().replace(/\s+/g, '_');
    
    if (editingField) {
      // Update existing field
      setCustomFields(customFields.map(field => 
        field.id === editingField.id 
          ? { 
              ...field, 
              ...newField, 
              name: formattedName
            } as CustomField
          : field
      ));
      
      toast({
        title: "Field Updated",
        description: `Custom field "${newField.label}" has been updated`
      });
    } else {
      // Create new field
      const newCustomField: CustomField = {
        id: `field-${customFields.length + 1}`,
        name: formattedName,
        label: newField.label!,
        fieldType: newField.fieldType as 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'textarea',
        isRequired: newField.isRequired || false,
        isActive: newField.isActive !== undefined ? newField.isActive : true,
        defaultValue: newField.defaultValue || "",
        options: newField.options || [],
        displayOrder: customFields.length + 1,
        applyToPhase: newField.applyToPhase as 'design' | 'execution' | 'all' || 'all'
      };
      
      setCustomFields([...customFields, newCustomField]);
      
      toast({
        title: "Field Created",
        description: `Custom field "${newField.label}" has been created`
      });
    }
    
    setIsDialogOpen(false);
  };
  
  // Delete field
  const handleDeleteField = (id: string) => {
    setCustomFields(customFields.filter(field => field.id !== id));
    toast({
      title: "Field Deleted",
      description: "The custom field has been deleted"
    });
  };
  
  // Toggle field activation
  const toggleFieldActive = (id: string) => {
    setCustomFields(customFields.map(field => 
      field.id === id ? { ...field, isActive: !field.isActive } : field
    ));
    
    const field = customFields.find(f => f.id === id);
    const newStatus = !field?.isActive;
    
    toast({
      title: newStatus ? "Field Activated" : "Field Deactivated",
      description: `"${field?.label}" is now ${newStatus ? "active" : "inactive"}`
    });
  };
  
  // Move field up in display order
  const moveFieldUp = (id: string) => {
    const index = customFields.findIndex(field => field.id === id);
    if (index <= 0) return;
    
    const newFields = [...customFields];
    const temp = newFields[index].displayOrder;
    newFields[index].displayOrder = newFields[index - 1].displayOrder;
    newFields[index - 1].displayOrder = temp;
    
    // Sort by display order
    newFields.sort((a, b) => a.displayOrder - b.displayOrder);
    
    setCustomFields(newFields);
  };
  
  // Move field down in display order
  const moveFieldDown = (id: string) => {
    const index = customFields.findIndex(field => field.id === id);
    if (index >= customFields.length - 1) return;
    
    const newFields = [...customFields];
    const temp = newFields[index].displayOrder;
    newFields[index].displayOrder = newFields[index + 1].displayOrder;
    newFields[index + 1].displayOrder = temp;
    
    // Sort by display order
    newFields.sort((a, b) => a.displayOrder - b.displayOrder);
    
    setCustomFields(newFields);
  };
  
  // Field type options
  const fieldTypeOptions = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "date", label: "Date" },
    { value: "select", label: "Dropdown" },
    { value: "checkbox", label: "Checkbox" },
    { value: "textarea", label: "Text Area" }
  ];
  
  // Phase options
  const phaseOptions = [
    { value: "design", label: "Test Design" },
    { value: "execution", label: "Test Execution" },
    { value: "all", label: "All Phases" }
  ];
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Test Custom Fields</CardTitle>
            <CardDescription>
              Configure custom fields for test cases and test execution
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search fields..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={openNewFieldDialog}>
              <Plus className="h-4 w-4 mr-2" />
              New Field
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredFields.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-muted-foreground mb-2">No custom fields found</div>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery ? "Try a different search term" : "Create a custom field to get started"}
            </p>
            {!searchQuery && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={openNewFieldDialog}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create your first custom field
              </Button>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">#</TableHead>
                <TableHead>Field Name</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Phase</TableHead>
                <TableHead className="w-20">Required</TableHead>
                <TableHead className="w-20">Status</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFields
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((field) => (
                <TableRow key={field.id} className={!field.isActive ? "opacity-60" : ""}>
                  <TableCell>{field.displayOrder}</TableCell>
                  <TableCell className="font-mono text-sm">{field.name}</TableCell>
                  <TableCell className="font-medium">{field.label}</TableCell>
                  <TableCell>
                    {fieldTypeOptions.find(option => option.value === field.fieldType)?.label}
                  </TableCell>
                  <TableCell>
                    <Badge variant={field.applyToPhase === 'all' ? 'outline' : 'secondary'}>
                      {phaseOptions.find(option => option.value === field.applyToPhase)?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {field.isRequired ? (
                      <Badge variant="default">Required</Badge>
                    ) : (
                      <Badge variant="outline">Optional</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {field.isActive ? (
                      <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>
                    ) : (
                      <Badge variant="outline">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => openEditFieldDialog(field)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => toggleFieldActive(field.id)}>
                          {field.isActive ? (
                            <>
                              <Trash className="h-4 w-4 mr-2" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-2" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => moveFieldUp(field.id)}
                          disabled={field.displayOrder === 1}
                        >
                          <MoveUp className="h-4 w-4 mr-2" />
                          Move Up
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => moveFieldDown(field.id)}
                          disabled={field.displayOrder === customFields.length}
                        >
                          <MoveDown className="h-4 w-4 mr-2" />
                          Move Down
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="cursor-pointer text-destructive focus:text-destructive"
                          onClick={() => handleDeleteField(field.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingField ? "Edit Custom Field" : "Create Custom Field"}
              </DialogTitle>
              <DialogDescription>
                {editingField 
                  ? "Edit the custom field details below" 
                  : "Add a new custom field for test cases or execution"
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="field-label">Field Label</Label>
                  <Input
                    id="field-label"
                    placeholder="e.g., Test Environment"
                    value={newField.label || ""}
                    onChange={(e) => setNewField({...newField, label: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="field-name">Field Name</Label>
                  <Input
                    id="field-name"
                    placeholder="e.g., test_environment"
                    value={newField.name || ""}
                    onChange={(e) => setNewField({...newField, name: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">
                    System name, no spaces (use underscores)
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="field-type">Field Type</Label>
                  <Select 
                    value={newField.fieldType}
                    onValueChange={(value) => {
                      setNewField({
                        ...newField, 
                        fieldType: value as any,
                        // Reset options if changing from select
                        options: value === 'select' ? newField.options : undefined
                      });
                    }}
                  >
                    <SelectTrigger id="field-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldTypeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="apply-phase">Apply To Phase</Label>
                  <Select 
                    value={newField.applyToPhase as string}
                    onValueChange={(value) => setNewField({...newField, applyToPhase: value as any})}
                  >
                    <SelectTrigger id="apply-phase">
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      {phaseOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {newField.fieldType === 'select' && (
                <div className="space-y-2">
                  <Label htmlFor="field-options">Dropdown Options</Label>
                  <Input
                    id="field-options"
                    placeholder="Option1, Option2, Option3"
                    value={(newField.options || []).join(', ')}
                    onChange={(e) => {
                      const options = e.target.value
                        .split(',')
                        .map(option => option.trim())
                        .filter(option => option !== '');
                      setNewField({...newField, options});
                    }}
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated list of dropdown options
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="default-value">Default Value</Label>
                {newField.fieldType === 'checkbox' ? (
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="default-value"
                      checked={newField.defaultValue === 'true'}
                      onCheckedChange={(checked) => 
                        setNewField({...newField, defaultValue: checked ? 'true' : 'false'})
                      }
                    />
                    <Label htmlFor="default-value">Checked by default</Label>
                  </div>
                ) : (
                  <Input
                    id="default-value"
                    placeholder="Default value"
                    value={newField.defaultValue || ""}
                    onChange={(e) => setNewField({...newField, defaultValue: e.target.value})}
                  />
                )}
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="required"
                  checked={newField.isRequired}
                  onCheckedChange={(checked) => setNewField({...newField, isRequired: checked})}
                />
                <Label htmlFor="required">Field is required</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newField.isActive !== undefined ? newField.isActive : true}
                  onCheckedChange={(checked) => setNewField({...newField, isActive: checked})}
                />
                <Label htmlFor="active">Field is active</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveField}>
                {editingField ? "Update Field" : "Create Field"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TestCustomFieldsTab;
