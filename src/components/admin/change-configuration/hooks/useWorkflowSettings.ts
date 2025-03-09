
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Type for the workflow configuration
interface WorkflowStage {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
}

interface WorkflowConfig {
  requireApprovals: boolean;
  requiredApprovals: number;
  requireChangeManagerApproval: boolean;
  notifyStakeholders: boolean;
  allowEmergency: boolean;
  requireImplementationPlan: boolean;
  requireRiskAssessment: boolean;
  workflowStages: WorkflowStage[];
}

// Mock workflow configuration data
const mockWorkflowConfig: WorkflowConfig = {
  requireApprovals: true,
  requiredApprovals: 2,
  requireChangeManagerApproval: true,
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

export const useWorkflowSettings = () => {
  const { toast } = useToast();
  const [workflowConfig, setWorkflowConfig] = useState<WorkflowConfig>(mockWorkflowConfig);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleToggleSetting = (setting: keyof WorkflowConfig) => {
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
  
  return {
    workflowConfig,
    isSubmitting,
    handleToggleSetting,
    handleApprovalCountChange,
    handleToggleStage,
    handleSaveChanges
  };
};
