
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ApprovalSettings from './components/ApprovalSettings';
import DocumentationRequirements from './components/DocumentationRequirements';
import WorkflowStagesTable from './components/WorkflowStagesTable';
import { useWorkflowSettings } from './hooks/useWorkflowSettings';

const WorkflowSettingsTab = () => {
  const {
    workflowConfig,
    isSubmitting,
    handleToggleSetting,
    handleApprovalCountChange,
    handleToggleStage,
    handleSaveChanges
  } = useWorkflowSettings();
  
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
          <ApprovalSettings
            requireApprovals={workflowConfig.requireApprovals}
            requiredApprovals={workflowConfig.requiredApprovals}
            requireChangeManagerApproval={workflowConfig.requireChangeManagerApproval}
            notifyStakeholders={workflowConfig.notifyStakeholders}
            allowEmergency={workflowConfig.allowEmergency}
            onToggleSetting={handleToggleSetting}
            onApprovalCountChange={handleApprovalCountChange}
          />
        </Card>
        
        <Card>
          <DocumentationRequirements
            requireImplementationPlan={workflowConfig.requireImplementationPlan}
            requireRiskAssessment={workflowConfig.requireRiskAssessment}
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

export default WorkflowSettingsTab;
