
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Copy } from "lucide-react";
import { ReleaseType } from "@/utils/types/release";

interface ReleaseTemplateSummary {
  id: string;
  name: string;
  description: string;
  type: ReleaseType;
  includesDeploymentPlan: boolean;
  includesRiskAssessment: boolean;
  fields: string[];
}

interface ReleaseTemplateField {
  id: string;
  name: string;
  type: string;
  required: boolean;
  description?: string;
  defaultValue?: string;
}

const ReleaseTemplatesTab = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<ReleaseTemplateSummary[]>([
    {
      id: '1',
      name: 'Major Release',
      description: 'Template for major product releases',
      type: 'major',
      includesDeploymentPlan: true,
      includesRiskAssessment: true,
      fields: ['Release Notes', 'Deployment Steps', 'Rollback Plan', 'Affected Services']
    },
    {
      id: '2',
      name: 'Minor Release',
      description: 'Template for minor updates and enhancements',
      type: 'minor',
      includesDeploymentPlan: true,
      includesRiskAssessment: false,
      fields: ['Release Notes', 'Deployment Steps', 'Affected Services']
    },
    {
      id: '3',
      name: 'Emergency Hotfix',
      description: 'Template for urgent production fixes',
      type: 'emergency',
      includesDeploymentPlan: true,
      includesRiskAssessment: true,
      fields: ['Issue Description', 'Fix Details', 'Deployment Steps', 'Rollback Plan']
    }
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ReleaseTemplateSummary | null>(null);
  
  const [newTemplate, setNewTemplate] = useState<Partial<ReleaseTemplateSummary>>({
    name: '',
    description: '',
    type: 'minor',
    includesDeploymentPlan: true,
    includesRiskAssessment: false,
    fields: []
  });
  
  const [availableFields] = useState<ReleaseTemplateField[]>([
    { id: 'f1', name: 'Release Notes', type: 'textarea', required: true, description: 'Detailed notes about what is included in the release' },
    { id: 'f2', name: 'Deployment Steps', type: 'textarea', required: true, description: 'Step-by-step instructions for deploying the release' },
    { id: 'f3', name: 'Rollback Plan', type: 'textarea', required: false, description: 'Steps to follow if the release needs to be rolled back' },
    { id: 'f4', name: 'Affected Services', type: 'multiselect', required: true, description: 'Services affected by this release' },
    { id: 'f5', name: 'Issue Description', type: 'textarea', required: false, description: 'Description of the issue being fixed' },
    { id: 'f6', name: 'Fix Details', type: 'textarea', required: false, description: 'Technical details of the fix' },
    { id: 'f7', name: 'Testing Results', type: 'textarea', required: false, description: 'Summary of testing outcomes' },
    { id: 'f8', name: 'Business Impact', type: 'textarea', required: false, description: 'Impact of the release on business operations' }
  ]);
  
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  
  const handleCreateTemplate = () => {
    if (!newTemplate.name) {
      toast({
        title: "Error",
        description: "Template name is required",
        variant: "destructive"
      });
      return;
    }
    
    const newTemplateId = Date.now().toString();
    
    setTemplates([
      ...templates, 
      {
        id: newTemplateId,
        name: newTemplate.name || 'Unnamed Template',
        description: newTemplate.description || '',
        type: newTemplate.type as ReleaseType || 'minor',
        includesDeploymentPlan: newTemplate.includesDeploymentPlan || false,
        includesRiskAssessment: newTemplate.includesRiskAssessment || false,
        fields: selectedFields
      }
    ]);
    
    toast({
      title: "Template Created",
      description: `Release template "${newTemplate.name}" has been created.`
    });
    
    // Reset form
    setNewTemplate({
      name: '',
      description: '',
      type: 'minor',
      includesDeploymentPlan: true,
      includesRiskAssessment: false,
      fields: []
    });
    setSelectedFields([]);
    setIsAddDialogOpen(false);
  };
  
  const handleEditTemplate = () => {
    if (!selectedTemplate) return;
    
    setTemplates(
      templates.map(template => 
        template.id === selectedTemplate.id ? 
        {
          ...template,
          name: selectedTemplate.name,
          description: selectedTemplate.description,
          type: selectedTemplate.type,
          includesDeploymentPlan: selectedTemplate.includesDeploymentPlan,
          includesRiskAssessment: selectedTemplate.includesRiskAssessment,
          fields: selectedFields
        } : template
      )
    );
    
    toast({
      title: "Template Updated",
      description: `Release template "${selectedTemplate.name}" has been updated.`
    });
    
    setIsEditDialogOpen(false);
  };
  
  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
    
    toast({
      title: "Template Deleted",
      description: "The release template has been deleted."
    });
  };
  
  const handleDuplicateTemplate = (template: ReleaseTemplateSummary) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`
    };
    
    setTemplates([...templates, newTemplate]);
    
    toast({
      title: "Template Duplicated",
      description: `Release template "${template.name}" has been duplicated.`
    });
  };
  
  const handleEditClick = (template: ReleaseTemplateSummary) => {
    setSelectedTemplate(template);
    setSelectedFields(template.fields);
    setIsEditDialogOpen(true);
  };
  
  const handleFieldToggle = (fieldName: string) => {
    setSelectedFields(currentFields => 
      currentFields.includes(fieldName)
        ? currentFields.filter(f => f !== fieldName)
        : [...currentFields, fieldName]
    );
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Release Templates</CardTitle>
            <CardDescription>Define standard templates for different types of releases</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Release Template</DialogTitle>
                <DialogDescription>
                  Define a new template for standardized release creation
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Release Type
                  </Label>
                  <Select
                    value={newTemplate.type as string}
                    onValueChange={(value) => setNewTemplate({...newTemplate, type: value as ReleaseType})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="major">Major</SelectItem>
                      <SelectItem value="minor">Minor</SelectItem>
                      <SelectItem value="patch">Patch</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Required Plans</Label>
                  <div className="flex flex-col space-y-2 col-span-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="deploymentPlan"
                        checked={newTemplate.includesDeploymentPlan}
                        onCheckedChange={(checked) => 
                          setNewTemplate({...newTemplate, includesDeploymentPlan: checked as boolean})
                        }
                      />
                      <Label htmlFor="deploymentPlan">Requires Deployment Plan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="riskAssessment"
                        checked={newTemplate.includesRiskAssessment}
                        onCheckedChange={(checked) => 
                          setNewTemplate({...newTemplate, includesRiskAssessment: checked as boolean})
                        }
                      />
                      <Label htmlFor="riskAssessment">Requires Risk Assessment</Label>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  <Label className="text-right pt-2">Template Fields</Label>
                  <div className="col-span-3 border rounded-md p-4 space-y-2">
                    {availableFields.map(field => (
                      <div className="flex items-center space-x-2" key={field.id}>
                        <Checkbox 
                          id={`field-${field.id}`}
                          checked={selectedFields.includes(field.name)}
                          onCheckedChange={() => handleFieldToggle(field.name)}
                        />
                        <div>
                          <Label htmlFor={`field-${field.id}`}>{field.name}</Label>
                          <p className="text-sm text-muted-foreground">{field.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTemplate}>
                  Create Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Edit Template Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Release Template</DialogTitle>
                <DialogDescription>
                  Modify the template configuration
                </DialogDescription>
              </DialogHeader>
              
              {selectedTemplate && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">Name</Label>
                    <Input
                      id="edit-name"
                      value={selectedTemplate.name}
                      onChange={(e) => setSelectedTemplate({...selectedTemplate, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="edit-description"
                      value={selectedTemplate.description}
                      onChange={(e) => setSelectedTemplate({...selectedTemplate, description: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-type" className="text-right">
                      Release Type
                    </Label>
                    <Select
                      value={selectedTemplate.type}
                      onValueChange={(value) => setSelectedTemplate({...selectedTemplate, type: value as ReleaseType})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="major">Major</SelectItem>
                        <SelectItem value="minor">Minor</SelectItem>
                        <SelectItem value="patch">Patch</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Required Plans</Label>
                    <div className="flex flex-col space-y-2 col-span-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit-deploymentPlan"
                          checked={selectedTemplate.includesDeploymentPlan}
                          onCheckedChange={(checked) => 
                            setSelectedTemplate({...selectedTemplate, includesDeploymentPlan: checked as boolean})
                          }
                        />
                        <Label htmlFor="edit-deploymentPlan">Requires Deployment Plan</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit-riskAssessment"
                          checked={selectedTemplate.includesRiskAssessment}
                          onCheckedChange={(checked) => 
                            setSelectedTemplate({...selectedTemplate, includesRiskAssessment: checked as boolean})
                          }
                        />
                        <Label htmlFor="edit-riskAssessment">Requires Risk Assessment</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <Label className="text-right pt-2">Template Fields</Label>
                    <div className="col-span-3 border rounded-md p-4 space-y-2">
                      {availableFields.map(field => (
                        <div className="flex items-center space-x-2" key={field.id}>
                          <Checkbox 
                            id={`edit-field-${field.id}`}
                            checked={selectedFields.includes(field.name)}
                            onCheckedChange={() => handleFieldToggle(field.name)}
                          />
                          <div>
                            <Label htmlFor={`edit-field-${field.id}`}>{field.name}</Label>
                            <p className="text-sm text-muted-foreground">{field.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditTemplate}>
                  Update Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Release Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Required Sections</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map(template => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>
                    <span className="capitalize">{template.type}</span>
                  </TableCell>
                  <TableCell>{template.description}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {template.includesDeploymentPlan && (
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          <span className="text-xs">Deployment Plan</span>
                        </div>
                      )}
                      {template.includesRiskAssessment && (
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                          <span className="text-xs">Risk Assessment</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditClick(template)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDuplicateTemplate(template)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReleaseTemplatesTab;
