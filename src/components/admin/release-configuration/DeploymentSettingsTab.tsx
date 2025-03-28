
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Link, ArrowUpDown, Save } from "lucide-react";
import FormSectionHeader from '@/components/changes/form/FormSectionHeader';

interface Environment {
  id: string;
  name: string;
  description: string;
  order: number;
  isProduction: boolean;
  deploymentApprovalRequired: boolean;
  postDeployValidationRequired: boolean;
  cicdIntegration: string | null;
  healthCheckUrl?: string;
}

interface CICDIntegration {
  id: string;
  name: string;
  type: 'jenkins' | 'github' | 'gitlab' | 'azure' | 'aws' | 'other';
  baseUrl: string;
  authType: 'token' | 'oauth' | 'username' | 'none';
  active: boolean;
}

const DeploymentSettingsTab = () => {
  const { toast } = useToast();
  
  const [environments, setEnvironments] = useState<Environment[]>([
    { 
      id: '1', 
      name: 'Development', 
      description: 'Development environment for internal testing',
      order: 1,
      isProduction: false,
      deploymentApprovalRequired: false,
      postDeployValidationRequired: false,
      cicdIntegration: '1'
    },
    { 
      id: '2', 
      name: 'QA', 
      description: 'Quality Assurance environment',
      order: 2,
      isProduction: false,
      deploymentApprovalRequired: true,
      postDeployValidationRequired: true,
      cicdIntegration: '1',
      healthCheckUrl: 'https://qa.example.com/health'
    },
    { 
      id: '3', 
      name: 'Staging', 
      description: 'Pre-production environment',
      order: 3,
      isProduction: false,
      deploymentApprovalRequired: true,
      postDeployValidationRequired: true,
      cicdIntegration: '2',
      healthCheckUrl: 'https://staging.example.com/health'
    },
    { 
      id: '4', 
      name: 'Production', 
      description: 'Live production environment',
      order: 4,
      isProduction: true,
      deploymentApprovalRequired: true,
      postDeployValidationRequired: true,
      cicdIntegration: '2',
      healthCheckUrl: 'https://www.example.com/health'
    }
  ]);
  
  const [cicdIntegrations, setCICDIntegrations] = useState<CICDIntegration[]>([
    {
      id: '1',
      name: 'Jenkins Pipeline',
      type: 'jenkins',
      baseUrl: 'https://jenkins.example.com',
      authType: 'token',
      active: true
    },
    {
      id: '2',
      name: 'GitHub Actions',
      type: 'github',
      baseUrl: 'https://api.github.com',
      authType: 'oauth',
      active: true
    }
  ]);
  
  const [automatedDeployment, setAutomatedDeployment] = useState(true);
  const [rollbackEnabled, setRollbackEnabled] = useState(true);
  const [featureFlagsEnabled, setFeatureFlagsEnabled] = useState(true);
  const [healthCheckRequired, setHealthCheckRequired] = useState(true);
  
  const [isAddEnvironmentOpen, setIsAddEnvironmentOpen] = useState(false);
  const [isEditEnvironmentOpen, setIsEditEnvironmentOpen] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment | null>(null);
  
  const [isAddIntegrationOpen, setIsAddIntegrationOpen] = useState(false);
  const [isEditIntegrationOpen, setIsEditIntegrationOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<CICDIntegration | null>(null);
  
  const [newEnvironment, setNewEnvironment] = useState<Partial<Environment>>({
    name: '',
    description: '',
    isProduction: false,
    deploymentApprovalRequired: true,
    postDeployValidationRequired: true,
    cicdIntegration: null
  });
  
  const [newIntegration, setNewIntegration] = useState<Partial<CICDIntegration>>({
    name: '',
    type: 'jenkins',
    baseUrl: '',
    authType: 'token',
    active: true
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  const handleAddEnvironment = () => {
    if (!newEnvironment.name) {
      toast({
        title: "Error",
        description: "Environment name is required",
        variant: "destructive"
      });
      return;
    }
    
    const nextOrder = Math.max(...environments.map(env => env.order), 0) + 1;
    const newEnvironmentId = Date.now().toString();
    
    setEnvironments([
      ...environments, 
      {
        id: newEnvironmentId,
        name: newEnvironment.name,
        description: newEnvironment.description || '',
        order: nextOrder,
        isProduction: newEnvironment.isProduction || false,
        deploymentApprovalRequired: newEnvironment.deploymentApprovalRequired || false,
        postDeployValidationRequired: newEnvironment.postDeployValidationRequired || false,
        cicdIntegration: newEnvironment.cicdIntegration,
        healthCheckUrl: newEnvironment.healthCheckUrl
      }
    ]);
    
    toast({
      title: "Environment Added",
      description: `Deployment environment "${newEnvironment.name}" has been added.`
    });
    
    // Reset form
    setNewEnvironment({
      name: '',
      description: '',
      isProduction: false,
      deploymentApprovalRequired: true,
      postDeployValidationRequired: true,
      cicdIntegration: null
    });
    setIsAddEnvironmentOpen(false);
  };
  
  const handleEditEnvironment = () => {
    if (!selectedEnvironment) return;
    
    setEnvironments(
      environments.map(env => 
        env.id === selectedEnvironment.id ? selectedEnvironment : env
      )
    );
    
    toast({
      title: "Environment Updated",
      description: `Deployment environment "${selectedEnvironment.name}" has been updated.`
    });
    
    setIsEditEnvironmentOpen(false);
  };
  
  const handleDeleteEnvironment = (id: string) => {
    setEnvironments(environments.filter(env => env.id !== id));
    
    toast({
      title: "Environment Deleted",
      description: "The deployment environment has been deleted."
    });
  };
  
  const moveEnvironment = (id: string, direction: 'up' | 'down') => {
    const index = environments.findIndex(env => env.id === id);
    if (index === -1) return;
    
    if (direction === 'up' && index > 0) {
      const newEnvironments = [...environments];
      const currentOrder = newEnvironments[index].order;
      const prevOrder = newEnvironments[index - 1].order;
      
      newEnvironments[index].order = prevOrder;
      newEnvironments[index - 1].order = currentOrder;
      
      // Sort by order
      newEnvironments.sort((a, b) => a.order - b.order);
      
      setEnvironments(newEnvironments);
    } else if (direction === 'down' && index < environments.length - 1) {
      const newEnvironments = [...environments];
      const currentOrder = newEnvironments[index].order;
      const nextOrder = newEnvironments[index + 1].order;
      
      newEnvironments[index].order = nextOrder;
      newEnvironments[index + 1].order = currentOrder;
      
      // Sort by order
      newEnvironments.sort((a, b) => a.order - b.order);
      
      setEnvironments(newEnvironments);
    }
  };
  
  const handleAddIntegration = () => {
    if (!newIntegration.name || !newIntegration.baseUrl) {
      toast({
        title: "Error",
        description: "Integration name and URL are required",
        variant: "destructive"
      });
      return;
    }
    
    const newIntegrationId = Date.now().toString();
    
    setCICDIntegrations([
      ...cicdIntegrations, 
      {
        id: newIntegrationId,
        name: newIntegration.name,
        type: newIntegration.type as 'jenkins' | 'github' | 'gitlab' | 'azure' | 'aws' | 'other',
        baseUrl: newIntegration.baseUrl,
        authType: newIntegration.authType as 'token' | 'oauth' | 'username' | 'none',
        active: newIntegration.active || true
      }
    ]);
    
    toast({
      title: "Integration Added",
      description: `CI/CD integration "${newIntegration.name}" has been added.`
    });
    
    // Reset form
    setNewIntegration({
      name: '',
      type: 'jenkins',
      baseUrl: '',
      authType: 'token',
      active: true
    });
    setIsAddIntegrationOpen(false);
  };
  
  const handleEditIntegration = () => {
    if (!selectedIntegration) return;
    
    setCICDIntegrations(
      cicdIntegrations.map(integration => 
        integration.id === selectedIntegration.id ? selectedIntegration : integration
      )
    );
    
    toast({
      title: "Integration Updated",
      description: `CI/CD integration "${selectedIntegration.name}" has been updated.`
    });
    
    setIsEditIntegrationOpen(false);
  };
  
  const handleDeleteIntegration = (id: string) => {
    // Check if the integration is being used by any environment
    const isUsed = environments.some(env => env.cicdIntegration === id);
    
    if (isUsed) {
      toast({
        title: "Cannot Delete",
        description: "This integration is being used by one or more environments.",
        variant: "destructive"
      });
      return;
    }
    
    setCICDIntegrations(cicdIntegrations.filter(integration => integration.id !== id));
    
    toast({
      title: "Integration Deleted",
      description: "The CI/CD integration has been deleted."
    });
  };
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Saved",
        description: "Deployment settings have been updated successfully."
      });
      setIsSaving(false);
    }, 800);
    
    console.log("Saved deployment settings:", {
      automatedDeployment,
      rollbackEnabled,
      featureFlagsEnabled,
      healthCheckRequired,
      environments,
      cicdIntegrations
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="environments">
        <TabsList>
          <TabsTrigger value="environments">Deployment Environments</TabsTrigger>
          <TabsTrigger value="integrations">CI/CD Integrations</TabsTrigger>
          <TabsTrigger value="settings">Deployment Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="environments" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Deployment Environments</CardTitle>
                <CardDescription>Configure environments for deploying releases</CardDescription>
              </div>
              <Dialog open={isAddEnvironmentOpen} onOpenChange={setIsAddEnvironmentOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Environment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Deployment Environment</DialogTitle>
                    <DialogDescription>
                      Configure a new deployment environment for releases
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="env-name">Environment Name</Label>
                      <Input 
                        id="env-name" 
                        value={newEnvironment.name} 
                        onChange={(e) => setNewEnvironment({...newEnvironment, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="env-description">Description</Label>
                      <Textarea 
                        id="env-description" 
                        value={newEnvironment.description} 
                        onChange={(e) => setNewEnvironment({...newEnvironment, description: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="env-health-check">Health Check URL (Optional)</Label>
                      <Input 
                        id="env-health-check" 
                        placeholder="https://example.com/health"
                        value={newEnvironment.healthCheckUrl || ''} 
                        onChange={(e) => setNewEnvironment({...newEnvironment, healthCheckUrl: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="env-cicd">CI/CD Integration</Label>
                      <Select 
                        value={newEnvironment.cicdIntegration || ''} 
                        onValueChange={(value) => setNewEnvironment({...newEnvironment, cicdIntegration: value || null})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select CI/CD integration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          {cicdIntegrations.map(integration => (
                            <SelectItem key={integration.id} value={integration.id}>
                              {integration.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="env-is-production" 
                        checked={newEnvironment.isProduction} 
                        onCheckedChange={(checked) => 
                          setNewEnvironment({...newEnvironment, isProduction: checked as boolean})
                        }
                      />
                      <Label htmlFor="env-is-production">Production Environment</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="env-approval-required" 
                        checked={newEnvironment.deploymentApprovalRequired} 
                        onCheckedChange={(checked) => 
                          setNewEnvironment({...newEnvironment, deploymentApprovalRequired: checked as boolean})
                        }
                      />
                      <Label htmlFor="env-approval-required">Requires Deployment Approval</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="env-validation-required" 
                        checked={newEnvironment.postDeployValidationRequired} 
                        onCheckedChange={(checked) => 
                          setNewEnvironment({...newEnvironment, postDeployValidationRequired: checked as boolean})
                        }
                      />
                      <Label htmlFor="env-validation-required">Requires Post-Deployment Validation</Label>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddEnvironmentOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddEnvironment}>
                      Add Environment
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              {/* Edit Environment Dialog */}
              <Dialog open={isEditEnvironmentOpen} onOpenChange={setIsEditEnvironmentOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Environment</DialogTitle>
                    <DialogDescription>
                      Modify deployment environment configuration
                    </DialogDescription>
                  </DialogHeader>
                  
                  {selectedEnvironment && (
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-env-name">Environment Name</Label>
                        <Input 
                          id="edit-env-name" 
                          value={selectedEnvironment.name} 
                          onChange={(e) => setSelectedEnvironment({...selectedEnvironment, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="edit-env-description">Description</Label>
                        <Textarea 
                          id="edit-env-description" 
                          value={selectedEnvironment.description} 
                          onChange={(e) => setSelectedEnvironment({...selectedEnvironment, description: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="edit-env-health-check">Health Check URL (Optional)</Label>
                        <Input 
                          id="edit-env-health-check" 
                          placeholder="https://example.com/health"
                          value={selectedEnvironment.healthCheckUrl || ''} 
                          onChange={(e) => setSelectedEnvironment({...selectedEnvironment, healthCheckUrl: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="edit-env-cicd">CI/CD Integration</Label>
                        <Select 
                          value={selectedEnvironment.cicdIntegration || ''} 
                          onValueChange={(value) => setSelectedEnvironment({...selectedEnvironment, cicdIntegration: value || null})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select CI/CD integration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">None</SelectItem>
                            {cicdIntegrations.map(integration => (
                              <SelectItem key={integration.id} value={integration.id}>
                                {integration.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit-env-is-production" 
                          checked={selectedEnvironment.isProduction} 
                          onCheckedChange={(checked) => 
                            setSelectedEnvironment({...selectedEnvironment, isProduction: checked as boolean})
                          }
                        />
                        <Label htmlFor="edit-env-is-production">Production Environment</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit-env-approval-required" 
                          checked={selectedEnvironment.deploymentApprovalRequired} 
                          onCheckedChange={(checked) => 
                            setSelectedEnvironment({...selectedEnvironment, deploymentApprovalRequired: checked as boolean})
                          }
                        />
                        <Label htmlFor="edit-env-approval-required">Requires Deployment Approval</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit-env-validation-required" 
                          checked={selectedEnvironment.postDeployValidationRequired} 
                          onCheckedChange={(checked) => 
                            setSelectedEnvironment({...selectedEnvironment, postDeployValidationRequired: checked as boolean})
                          }
                        />
                        <Label htmlFor="edit-env-validation-required">Requires Post-Deployment Validation</Label>
                      </div>
                    </div>
                  )}
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditEnvironmentOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleEditEnvironment}>
                      Update Environment
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">Order</TableHead>
                    <TableHead>Environment</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>CI/CD Integration</TableHead>
                    <TableHead>Properties</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {environments.sort((a, b) => a.order - b.order).map(environment => (
                    <TableRow key={environment.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0" 
                            onClick={() => moveEnvironment(environment.id, 'up')}
                            disabled={environment.order === 1}
                          >
                            <ArrowUpDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {environment.name}
                        {environment.isProduction && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                            Production
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{environment.description}</TableCell>
                      <TableCell>
                        {environment.cicdIntegration ? 
                          cicdIntegrations.find(i => i.id === environment.cicdIntegration)?.name || 'None' : 
                          'None'
                        }
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {environment.deploymentApprovalRequired && (
                            <div className="flex items-center space-x-1">
                              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                              <span className="text-xs">Approval Required</span>
                            </div>
                          )}
                          {environment.postDeployValidationRequired && (
                            <div className="flex items-center space-x-1">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span className="text-xs">Validation Required</span>
                            </div>
                          )}
                          {environment.healthCheckUrl && (
                            <div className="flex items-center space-x-1">
                              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                              <span className="text-xs">Health Check</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedEnvironment(environment);
                              setIsEditEnvironmentOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteEnvironment(environment.id)}
                            disabled={environment.isProduction}
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
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>CI/CD Integrations</CardTitle>
                <CardDescription>Configure integrations with CI/CD systems</CardDescription>
              </div>
              <Dialog open={isAddIntegrationOpen} onOpenChange={setIsAddIntegrationOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Integration
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add CI/CD Integration</DialogTitle>
                    <DialogDescription>
                      Configure a new CI/CD system integration
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="int-name">Integration Name</Label>
                      <Input 
                        id="int-name" 
                        value={newIntegration.name} 
                        onChange={(e) => setNewIntegration({...newIntegration, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="int-type">Integration Type</Label>
                      <Select 
                        value={newIntegration.type} 
                        onValueChange={(value) => setNewIntegration({...newIntegration, type: value as any})}
                      >
                        <SelectTrigger id="int-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jenkins">Jenkins</SelectItem>
                          <SelectItem value="github">GitHub Actions</SelectItem>
                          <SelectItem value="gitlab">GitLab CI</SelectItem>
                          <SelectItem value="azure">Azure DevOps</SelectItem>
                          <SelectItem value="aws">AWS CodePipeline</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="int-url">Base URL</Label>
                      <Input 
                        id="int-url" 
                        value={newIntegration.baseUrl} 
                        onChange={(e) => setNewIntegration({...newIntegration, baseUrl: e.target.value})}
                        placeholder="https://jenkins.example.com"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="int-auth">Authentication Type</Label>
                      <Select 
                        value={newIntegration.authType} 
                        onValueChange={(value) => setNewIntegration({...newIntegration, authType: value as any})}
                      >
                        <SelectTrigger id="int-auth">
                          <SelectValue placeholder="Select auth type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="token">API Token</SelectItem>
                          <SelectItem value="oauth">OAuth</SelectItem>
                          <SelectItem value="username">Username/Password</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="int-active" 
                        checked={newIntegration.active} 
                        onCheckedChange={(checked) => 
                          setNewIntegration({...newIntegration, active: checked as boolean})
                        }
                      />
                      <Label htmlFor="int-active">Active</Label>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddIntegrationOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddIntegration}>
                      Add Integration
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              {/* Edit Integration Dialog */}
              <Dialog open={isEditIntegrationOpen} onOpenChange={setIsEditIntegrationOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit CI/CD Integration</DialogTitle>
                    <DialogDescription>
                      Modify CI/CD system integration configuration
                    </DialogDescription>
                  </DialogHeader>
                  
                  {selectedIntegration && (
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-int-name">Integration Name</Label>
                        <Input 
                          id="edit-int-name" 
                          value={selectedIntegration.name} 
                          onChange={(e) => setSelectedIntegration({...selectedIntegration, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="edit-int-type">Integration Type</Label>
                        <Select 
                          value={selectedIntegration.type} 
                          onValueChange={(value) => setSelectedIntegration({...selectedIntegration, type: value as any})}
                        >
                          <SelectTrigger id="edit-int-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="jenkins">Jenkins</SelectItem>
                            <SelectItem value="github">GitHub Actions</SelectItem>
                            <SelectItem value="gitlab">GitLab CI</SelectItem>
                            <SelectItem value="azure">Azure DevOps</SelectItem>
                            <SelectItem value="aws">AWS CodePipeline</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="edit-int-url">Base URL</Label>
                        <Input 
                          id="edit-int-url" 
                          value={selectedIntegration.baseUrl} 
                          onChange={(e) => setSelectedIntegration({...selectedIntegration, baseUrl: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="edit-int-auth">Authentication Type</Label>
                        <Select 
                          value={selectedIntegration.authType} 
                          onValueChange={(value) => setSelectedIntegration({...selectedIntegration, authType: value as any})}
                        >
                          <SelectTrigger id="edit-int-auth">
                            <SelectValue placeholder="Select auth type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="token">API Token</SelectItem>
                            <SelectItem value="oauth">OAuth</SelectItem>
                            <SelectItem value="username">Username/Password</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit-int-active" 
                          checked={selectedIntegration.active} 
                          onCheckedChange={(checked) => 
                            setSelectedIntegration({...selectedIntegration, active: checked as boolean})
                          }
                        />
                        <Label htmlFor="edit-int-active">Active</Label>
                      </div>
                    </div>
                  )}
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditIntegrationOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleEditIntegration}>
                      Update Integration
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Auth Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cicdIntegrations.map(integration => (
                    <TableRow key={integration.id}>
                      <TableCell className="font-medium">{integration.name}</TableCell>
                      <TableCell className="capitalize">{integration.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Link className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="truncate max-w-[200px]">{integration.baseUrl}</span>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{integration.authType}</TableCell>
                      <TableCell>
                        {integration.active ? (
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                            Inactive
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedIntegration(integration);
                              setIsEditIntegrationOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteIntegration(integration.id)}
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
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Settings</CardTitle>
              <CardDescription>Configure global deployment behaviors</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <FormSectionHeader 
                  title="Deployment Automation" 
                  description="Configure deployment automation settings" 
                />
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="automated-deployment">Automated Deployment</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable automated deployment through CI/CD integrations
                      </p>
                    </div>
                    <Switch 
                      id="automated-deployment"
                      checked={automatedDeployment}
                      onCheckedChange={setAutomatedDeployment}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="rollback-enabled">Automated Rollback</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable automated rollback on deployment failures
                      </p>
                    </div>
                    <Switch 
                      id="rollback-enabled"
                      checked={rollbackEnabled}
                      onCheckedChange={setRollbackEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="feature-flags">Feature Flag Management</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable feature flag management for deployments
                      </p>
                    </div>
                    <Switch 
                      id="feature-flags"
                      checked={featureFlagsEnabled}
                      onCheckedChange={setFeatureFlagsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="health-check">Health Check Validation</Label>
                      <p className="text-sm text-muted-foreground">
                        Require health check validation after deployment
                      </p>
                    </div>
                    <Switch 
                      id="health-check"
                      checked={healthCheckRequired}
                      onCheckedChange={setHealthCheckRequired}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Settings"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeploymentSettingsTab;
