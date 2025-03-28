
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import WorkflowStagesTable from '../change-configuration/components/WorkflowStagesTable';
import WorkflowValidationSettings from './WorkflowValidationSettings';

export interface WorkflowStage {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
  isRequired?: boolean;
}

interface WorkflowConfig {
  workflowStages: WorkflowStage[];
  requireAllStages: boolean;
  enforceMandatoryStages: boolean;
  allowSkipStages: boolean;
}

interface WorkflowConfigurationTabProps {
  entityType: string;
  initialConfig?: Partial<WorkflowConfig>;
}

const getDefaultWorkflowStages = (entityType: string): WorkflowStage[] => {
  // Default workflow stages based on entity type
  switch (entityType) {
    case 'incident':
      return [
        { id: 'stage-1', name: 'New', order: 1, isActive: true, isRequired: true },
        { id: 'stage-2', name: 'In Progress', order: 2, isActive: true, isRequired: true },
        { id: 'stage-3', name: 'Pending', order: 3, isActive: true },
        { id: 'stage-4', name: 'Resolved', order: 4, isActive: true, isRequired: true },
        { id: 'stage-5', name: 'Closed', order: 5, isActive: true, isRequired: true }
      ];
    case 'service-request':
      return [
        { id: 'stage-1', name: 'Open', order: 1, isActive: true, isRequired: true },
        { id: 'stage-2', name: 'In Progress', order: 2, isActive: true, isRequired: true },
        { id: 'stage-3', name: 'Pending', order: 3, isActive: true },
        { id: 'stage-4', name: 'Fulfilled', order: 4, isActive: true, isRequired: true },
        { id: 'stage-5', name: 'Closed', order: 5, isActive: true, isRequired: true }
      ];
    case 'problem':
      return [
        { id: 'stage-1', name: 'Identified', order: 1, isActive: true, isRequired: true },
        { id: 'stage-2', name: 'Root Cause Analysis', order: 2, isActive: true, isRequired: true },
        { id: 'stage-3', name: 'Known Error', order: 3, isActive: true },
        { id: 'stage-4', name: 'Resolution Identified', order: 4, isActive: true },
        { id: 'stage-5', name: 'Resolved', order: 5, isActive: true, isRequired: true },
        { id: 'stage-6', name: 'Closed', order: 6, isActive: true, isRequired: true }
      ];
    case 'change':
      return [
        { id: 'stage-1', name: 'Draft', order: 1, isActive: true, isRequired: true },
        { id: 'stage-2', name: 'Submitted', order: 2, isActive: true, isRequired: true },
        { id: 'stage-3', name: 'Approved', order: 3, isActive: true, isRequired: true },
        { id: 'stage-4', name: 'Implementation', order: 4, isActive: true, isRequired: true },
        { id: 'stage-5', name: 'Testing', order: 5, isActive: true },
        { id: 'stage-6', name: 'Closed', order: 6, isActive: true, isRequired: true }
      ];
    case 'release':
      return [
        { id: 'stage-1', name: 'Planned', order: 1, isActive: true, isRequired: true },
        { id: 'stage-2', name: 'Development', order: 2, isActive: true, isRequired: true },
        { id: 'stage-3', name: 'Testing', order: 3, isActive: true, isRequired: true },
        { id: 'stage-4', name: 'UAT', order: 4, isActive: true },
        { id: 'stage-5', name: 'Deployment', order: 5, isActive: true, isRequired: true },
        { id: 'stage-6', name: 'Released', order: 6, isActive: true, isRequired: true },
        { id: 'stage-7', name: 'Cancelled', order: 7, isActive: true }
      ];
    case 'bug':
      return [
        { id: 'stage-1', name: 'Open', order: 1, isActive: true, isRequired: true },
        { id: 'stage-2', name: 'Reproduced', order: 2, isActive: true },
        { id: 'stage-3', name: 'In Progress', order: 3, isActive: true, isRequired: true },
        { id: 'stage-4', name: 'Fixed', order: 4, isActive: true, isRequired: true },
        { id: 'stage-5', name: 'Verified', order: 5, isActive: true },
        { id: 'stage-6', name: 'Closed', order: 6, isActive: true, isRequired: true }
      ];
    case 'backlog':
      return [
        { id: 'stage-1', name: 'Backlog', order: 1, isActive: true, isRequired: true },
        { id: 'stage-2', name: 'Ready', order: 2, isActive: true },
        { id: 'stage-3', name: 'In Progress', order: 3, isActive: true, isRequired: true },
        { id: 'stage-4', name: 'Review', order: 4, isActive: true },
        { id: 'stage-5', name: 'Done', order: 5, isActive: true, isRequired: true }
      ];
    case 'asset':
      return [
        { id: 'stage-1', name: 'Ordered', order: 1, isActive: true },
        { id: 'stage-2', name: 'Received', order: 2, isActive: true, isRequired: true },
        { id: 'stage-3', name: 'In Stock', order: 3, isActive: true },
        { id: 'stage-4', name: 'Deployed', order: 4, isActive: true, isRequired: true },
        { id: 'stage-5', name: 'Under Maintenance', order: 5, isActive: true },
        { id: 'stage-6', name: 'Retired', order: 6, isActive: true }
      ];
    default:
      return [
        { id: 'stage-1', name: 'Open', order: 1, isActive: true, isRequired: true },
        { id: 'stage-2', name: 'In Progress', order: 2, isActive: true, isRequired: true },
        { id: 'stage-3', name: 'Closed', order: 3, isActive: true, isRequired: true }
      ];
  }
};

const WorkflowConfigurationTab: React.FC<WorkflowConfigurationTabProps> = ({
  entityType,
  initialConfig = {}
}) => {
  const { toast } = useToast();
  const defaultConfig: WorkflowConfig = {
    workflowStages: getDefaultWorkflowStages(entityType),
    requireAllStages: false,
    enforceMandatoryStages: true,
    allowSkipStages: false,
    ...initialConfig
  };
  
  const [workflowConfig, setWorkflowConfig] = useState<WorkflowConfig>(defaultConfig);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const handleToggleStage = (stageId: string) => {
    const updatedStages = workflowConfig.workflowStages.map(stage => 
      stage.id === stageId ? { ...stage, isActive: !stage.isActive } : stage
    );
    
    setWorkflowConfig({
      ...workflowConfig,
      workflowStages: updatedStages
    });
    
    validateWorkflow(updatedStages);
  };
  
  const handleToggleSetting = (setting: keyof WorkflowConfig) => {
    if (typeof workflowConfig[setting] === 'boolean') {
      setWorkflowConfig({
        ...workflowConfig,
        [setting]: !workflowConfig[setting as keyof WorkflowConfig]
      });
    }
  };
  
  const validateWorkflow = (stages: WorkflowStage[] = workflowConfig.workflowStages) => {
    // Check if required stages are active
    if (workflowConfig.enforceMandatoryStages) {
      const inactiveRequiredStages = stages
        .filter(stage => stage.isRequired && !stage.isActive)
        .map(stage => stage.name);
        
      if (inactiveRequiredStages.length > 0) {
        setValidationError(`The following required stages must be active: ${inactiveRequiredStages.join(', ')}`);
        return false;
      }
    }
    
    setValidationError(null);
    return true;
  };
  
  const handleSaveChanges = () => {
    if (!validateWorkflow()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} workflow settings updated successfully`
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
            Configure workflow stages and behavior for {entityType.replace(/-/g, ' ')} management
          </p>
        </div>
        <Button onClick={handleSaveChanges} disabled={isSubmitting || !!validationError}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      
      {validationError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Error</AlertTitle>
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <WorkflowValidationSettings 
            requireAllStages={workflowConfig.requireAllStages}
            enforceMandatoryStages={workflowConfig.enforceMandatoryStages}
            allowSkipStages={workflowConfig.allowSkipStages}
            onToggleSetting={handleToggleSetting}
          />
        </Card>
      </div>
      
      <Card>
        <WorkflowStagesTable
          stages={workflowConfig.workflowStages}
          onToggleStage={handleToggleStage}
        />
      </Card>
    </div>
  );
};

export default WorkflowConfigurationTab;
