
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Plus,
  Pencil,
  Copy,
  Trash,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Mock template type
interface TestTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  predefinedSteps: number;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data
const mockTemplates: TestTemplate[] = [
  {
    id: "tmpl-1",
    name: "API Validation Test",
    description: "Template for testing RESTful API endpoints with validation cases",
    category: "Integration",
    predefinedSteps: 8,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-07-22")
  },
  {
    id: "tmpl-2",
    name: "Security Test Suite",
    description: "Template with common security test cases",
    category: "Security",
    predefinedSteps: 12,
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-08-05")
  },
  {
    id: "tmpl-3",
    name: "UI Regression Test",
    description: "Template for UI regression testing across browsers",
    category: "UI",
    predefinedSteps: 15,
    createdAt: new Date("2023-03-22"),
    updatedAt: new Date("2023-09-15")
  },
  {
    id: "tmpl-4",
    name: "Performance Test Template",
    description: "Template for standard performance testing scenarios",
    category: "Performance",
    predefinedSteps: 7,
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-10-02")
  }
];

// Template form interface
interface TemplateFormData {
  name: string;
  description: string;
  category: string;
  steps: { description: string; expectedResult: string }[];
}

const TestTemplatesTab = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<TestTemplate[]>(mockTemplates);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewTemplateDialogOpen, setIsNewTemplateDialogOpen] = useState(false);
  const [formData, setFormData] = useState<TemplateFormData>({
    name: "",
    description: "",
    category: "",
    steps: [{ description: "", expectedResult: "" }]
  });
  
  // Filter templates based on search query
  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddTemplate = () => {
    // Add form validation here
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Template name is required",
        variant: "destructive"
      });
      return;
    }
    
    // Create new template object
    const newTemplate: TestTemplate = {
      id: `tmpl-${templates.length + 1}`,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      predefinedSteps: formData.steps.length,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add to templates
    setTemplates([...templates, newTemplate]);
    
    // Reset form and close dialog
    setFormData({
      name: "",
      description: "",
      category: "",
      steps: [{ description: "", expectedResult: "" }]
    });
    
    setIsNewTemplateDialogOpen(false);
    
    toast({
      title: "Template Created",
      description: `Test template "${formData.name}" has been created`
    });
  };
  
  const handleAddStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { description: "", expectedResult: "" }]
    });
  };
  
  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
    toast({
      title: "Template Deleted",
      description: "The test template has been deleted"
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Test Case Templates</CardTitle>
              <CardDescription>
                Configure reusable templates for test cases
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search templates..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog open={isNewTemplateDialogOpen} onOpenChange={setIsNewTemplateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Template
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create Test Template</DialogTitle>
                    <DialogDescription>
                      Create a reusable template for test cases
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="template-name">Template Name</Label>
                        <Input
                          id="template-name"
                          placeholder="Enter template name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="template-category">Category</Label>
                        <Input
                          id="template-category"
                          placeholder="E.g., UI, API, Integration"
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="template-description">Description</Label>
                        <Textarea
                          id="template-description"
                          placeholder="Describe the purpose of this template"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between">
                          <Label>Predefined Test Steps</Label>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleAddStep}
                            type="button"
                          >
                            <Plus className="h-3.5 w-3.5 mr-1" />
                            Add Step
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          {formData.steps.map((step, index) => (
                            <div key={index} className="border rounded-md p-3 space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">Step {index + 1}</h4>
                                {formData.steps.length > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      const newSteps = [...formData.steps];
                                      newSteps.splice(index, 1);
                                      setFormData({...formData, steps: newSteps});
                                    }}
                                  >
                                    <Trash className="h-3.5 w-3.5" />
                                  </Button>
                                )}
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`step-${index}-description`}>Description</Label>
                                <Textarea
                                  id={`step-${index}-description`}
                                  placeholder="Describe what to do in this step"
                                  value={step.description}
                                  onChange={(e) => {
                                    const newSteps = [...formData.steps];
                                    newSteps[index].description = e.target.value;
                                    setFormData({...formData, steps: newSteps});
                                  }}
                                  rows={2}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`step-${index}-expected`}>Expected Result</Label>
                                <Textarea
                                  id={`step-${index}-expected`}
                                  placeholder="What should happen after this step"
                                  value={step.expectedResult}
                                  onChange={(e) => {
                                    const newSteps = [...formData.steps];
                                    newSteps[index].expectedResult = e.target.value;
                                    setFormData({...formData, steps: newSteps});
                                  }}
                                  rows={2}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewTemplateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddTemplate}>
                      Create Template
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="text-muted-foreground mb-2">No templates found</div>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery ? "Try a different search term" : "Create a template to get started"}
              </p>
              {!searchQuery && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsNewTemplateDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create your first template
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Steps</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>{template.category}</TableCell>
                    <TableCell className="max-w-md truncate">{template.description}</TableCell>
                    <TableCell>{template.predefinedSteps}</TableCell>
                    <TableCell>{template.updatedAt.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer text-destructive focus:text-destructive"
                            onClick={() => handleDeleteTemplate(template.id)}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default TestTemplatesTab;
