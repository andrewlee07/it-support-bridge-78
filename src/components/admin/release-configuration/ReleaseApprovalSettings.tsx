
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import FormSectionHeader from '@/components/changes/form/FormSectionHeader';

interface ApprovalStage {
  id: string;
  name: string;
  requiredApprovers: number;
  requiredRole: string;
  isBlocking: boolean;
}

const ReleaseApprovalSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [approvalStages, setApprovalStages] = useState<ApprovalStage[]>([
    { id: '1', name: 'Technical Review', requiredApprovers: 1, requiredRole: 'tech-lead', isBlocking: true },
    { id: '2', name: 'Business Approval', requiredApprovers: 2, requiredRole: 'business-owner', isBlocking: true },
    { id: '3', name: 'Final Deployment Approval', requiredApprovers: 1, requiredRole: 'release-manager', isBlocking: true }
  ]);
  
  const [autoTimeout, setAutoTimeout] = useState(48);
  const [escalationEnabled, setEscalationEnabled] = useState(true);
  const [reminderInterval, setReminderInterval] = useState(24);
  
  const roles = [
    { value: 'tech-lead', label: 'Technical Lead' },
    { value: 'business-owner', label: 'Business Owner' },
    { value: 'qa-lead', label: 'QA Lead' },
    { value: 'release-manager', label: 'Release Manager' },
    { value: 'security-officer', label: 'Security Officer' },
    { value: 'change-manager', label: 'Change Manager' }
  ];
  
  const addApprovalStage = () => {
    const newStage: ApprovalStage = {
      id: Date.now().toString(),
      name: 'New Approval Stage',
      requiredApprovers: 1,
      requiredRole: 'tech-lead',
      isBlocking: true
    };
    setApprovalStages([...approvalStages, newStage]);
  };
  
  const removeApprovalStage = (id: string) => {
    setApprovalStages(approvalStages.filter(stage => stage.id !== id));
  };
  
  const updateStageName = (id: string, name: string) => {
    setApprovalStages(
      approvalStages.map(stage => 
        stage.id === id ? { ...stage, name } : stage
      )
    );
  };
  
  const updateStageRole = (id: string, requiredRole: string) => {
    setApprovalStages(
      approvalStages.map(stage => 
        stage.id === id ? { ...stage, requiredRole } : stage
      )
    );
  };
  
  const updateStageApprovers = (id: string, requiredApprovers: number) => {
    setApprovalStages(
      approvalStages.map(stage => 
        stage.id === id ? { ...stage, requiredApprovers } : stage
      )
    );
  };
  
  const updateStageBlocking = (id: string, isBlocking: boolean) => {
    setApprovalStages(
      approvalStages.map(stage => 
        stage.id === id ? { ...stage, isBlocking } : stage
      )
    );
  };
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Approval Settings Saved",
        description: "Release approval process settings have been updated."
      });
      setIsSaving(false);
    }, 800);
    
    console.log("Saved approval stages:", approvalStages);
    console.log("Saved timeout settings:", { autoTimeout, escalationEnabled, reminderInterval });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Release Approval Process</CardTitle>
          <CardDescription>Configure the approval stages required for releases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <FormSectionHeader 
                title="Approval Stages" 
                description="Define the sequential approval stages for releases" 
              />
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stage Name</TableHead>
                    <TableHead>Required Role</TableHead>
                    <TableHead>Required Approvers</TableHead>
                    <TableHead>Blocking</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvalStages.map(stage => (
                    <TableRow key={stage.id}>
                      <TableCell>
                        <Input 
                          value={stage.name} 
                          onChange={(e) => updateStageName(stage.id, e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={stage.requiredRole}
                          onValueChange={(value) => updateStageRole(stage.id, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map(role => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          min={1} 
                          max={10}
                          value={stage.requiredApprovers} 
                          onChange={(e) => updateStageApprovers(stage.id, parseInt(e.target.value))}
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={stage.isBlocking}
                          onCheckedChange={(checked) => updateStageBlocking(stage.id, checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeApprovalStage(stage.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Button 
                variant="outline" 
                onClick={addApprovalStage}
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Approval Stage
              </Button>
            </div>
            
            <div>
              <FormSectionHeader 
                title="Timeout and Escalation" 
                description="Configure approval reminders and escalation policies" 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="autoTimeout">Auto-approval Timeout (hours)</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      id="autoTimeout"
                      type="number" 
                      min={1} 
                      value={autoTimeout} 
                      onChange={(e) => setAutoTimeout(parseInt(e.target.value))}
                    />
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Time after which approvals will automatically time out
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="escalationEnabled">Enable Approval Escalation</Label>
                    <Switch 
                      id="escalationEnabled"
                      checked={escalationEnabled}
                      onCheckedChange={setEscalationEnabled}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatically escalate to alternate approvers after timeout
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reminderInterval">Reminder Interval (hours)</Label>
                  <Input 
                    id="reminderInterval"
                    type="number" 
                    min={1} 
                    value={reminderInterval} 
                    onChange={(e) => setReminderInterval(parseInt(e.target.value))}
                  />
                  <p className="text-sm text-muted-foreground">
                    How often to send approval reminder notifications
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Approval Settings"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReleaseApprovalSettings;
