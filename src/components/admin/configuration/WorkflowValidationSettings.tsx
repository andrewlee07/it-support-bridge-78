
import React from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface WorkflowValidationSettingsProps {
  requireAllStages: boolean;
  enforceMandatoryStages: boolean;
  allowSkipStages: boolean;
  onToggleSetting: (setting: string) => void;
}

const WorkflowValidationSettings: React.FC<WorkflowValidationSettingsProps> = ({
  requireAllStages,
  enforceMandatoryStages,
  allowSkipStages,
  onToggleSetting
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Workflow Validation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="enforceRequired" className="flex flex-col space-y-1">
            <span>Enforce mandatory stages</span>
            <span className="font-normal text-sm text-muted-foreground">
              Required stages cannot be deactivated
            </span>
          </Label>
          <Switch
            id="enforceRequired"
            checked={enforceMandatoryStages}
            onCheckedChange={() => onToggleSetting('enforceMandatoryStages')}
          />
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="requireAll" className="flex flex-col space-y-1">
            <span>Require all stages</span>
            <span className="font-normal text-sm text-muted-foreground">
              Items must go through every active stage
            </span>
          </Label>
          <Switch
            id="requireAll"
            checked={requireAllStages}
            onCheckedChange={() => onToggleSetting('requireAllStages')}
          />
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="allowSkip" className="flex flex-col space-y-1">
            <span>Allow skipping stages</span>
            <span className="font-normal text-sm text-muted-foreground">
              Allow items to skip non-mandatory stages
            </span>
          </Label>
          <Switch
            id="allowSkip"
            checked={allowSkipStages}
            onCheckedChange={() => onToggleSetting('allowSkipStages')}
          />
        </div>
      </CardContent>
    </>
  );
};

export default WorkflowValidationSettings;
