
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Mock workflow configuration data
const mockWorkflowConfig = {
  requireApprovals: true,
  requiredApprovals: 2,
  notifyStakeholders: true,
  allowEmergency: true,
  requireImplementationPlan: true,
  requireRiskAssessment: true,
  workflowStages: [
    { id: "stage-1", name: "Draft", order: 1, isActive: true },
    { id: "stage-2", name: "Submitted", order: 2, isActive: true },
    { id: "stage-3", name: "Approved", order: 3, isActive: true },
    { id: "stage-4", name: "Implementation", order: 4, isActive: true },
    { id: "stage-5", name: "Testing", order: 5, isActive: true },
    { id: "stage-6", name: "Closed", order: 6, isActive: true }
  ]
};

const WorkflowSettingsTab = () => {
  const { toast } = useToast();
  const [workflowConfig, setWorkflowConfig] = useState(mockWorkflowConfig);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleToggleSetting = (setting: keyof typeof mockWorkflowConfig) => {
    if (typeof workflowConfig[setting] === 'boolean') {
      setWorkflowConfig({
        ...workflowConfig,
        [setting]: !workflowConfig[setting]
      });
    }
  };
  
  const handleApprovalCountChange = (value: string) => {
    setWorkflowConfig({
      ...workflowConfig,
      requiredApprovals: parseInt(value)
    });
  };
  
  const handleToggleStage = (stageId: string) => {
    setWorkflowConfig({
      ...workflowConfig,
      workflowStages: workflowConfig.workflowStages.map(stage => 
        stage.id === stageId ? { ...stage, isActive: !stage.isActive } : stage
      )
    });
  };
  
  const handleSaveChanges = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Workflow settings updated successfully"
      });
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">Workflow Configuration</h3>
          <p className="text-muted-foreground mt-1">
            Configure change management workflow and approval process
          </p>
        </div>
        <Button onClick={handleSaveChanges} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Approval Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="require-approvals">Require Approvals</Label>
              <Switch 
                id="require-approvals" 
                checked={workflowConfig.requireApprovals} 
                onCheckedChange={() => handleToggleSetting('requireApprovals')}
              />
            </div>
            
            {workflowConfig.requireApprovals && (
              <div className="space-y-2">
                <Label htmlFor="approval-count">Required Approvals</Label>
                <Select 
                  value={workflowConfig.requiredApprovals.toString()} 
                  onValueChange={handleApprovalCountChange}
                >
                  <SelectTrigger id="approval-count" className="w-full">
                    <SelectValue placeholder="Select required approvals" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Approval</SelectItem>
                    <SelectItem value="2">2 Approvals</SelectItem>
                    <SelectItem value="3">3 Approvals</SelectItem>
                    <SelectItem value="4">4 Approvals</SelectItem>
                    <SelectItem value="5">5 Approvals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <Label htmlFor="notify-stakeholders">Notify Stakeholders</Label>
              <Switch 
                id="notify-stakeholders" 
                checked={workflowConfig.notifyStakeholders} 
                onCheckedChange={() => handleToggleSetting('notifyStakeholders')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="allow-emergency">Allow Emergency Changes</Label>
              <Switch 
                id="allow-emergency" 
                checked={workflowConfig.allowEmergency} 
                onCheckedChange={() => handleToggleSetting('allowEmergency')}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Documentation Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="require-plan">Require Implementation Plan</Label>
              <Switch 
                id="require-plan" 
                checked={workflowConfig.requireImplementationPlan} 
                onCheckedChange={() => handleToggleSetting('requireImplementationPlan')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="require-risk">Require Risk Assessment</Label>
              <Switch 
                id="require-risk" 
                checked={workflowConfig.requireRiskAssessment} 
                onCheckedChange={() => handleToggleSetting('requireRiskAssessment')}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Workflow Stages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Stage Name</TableHead>
                <TableHead className="text-right">Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workflowConfig.workflowStages.map(stage => (
                <TableRow key={stage.id}>
                  <TableCell>{stage.order}</TableCell>
                  <TableCell>{stage.name}</TableCell>
                  <TableCell className="text-right">
                    <Switch 
                      checked={stage.isActive} 
                      onCheckedChange={() => handleToggleStage(stage.id)}
                    />
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

export default WorkflowSettingsTab;
