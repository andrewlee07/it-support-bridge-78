
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface DocumentationRequirementsProps {
  requireImplementationPlan: boolean;
  requireRiskAssessment: boolean;
  onToggleSetting: (setting: string) => void;
}

const DocumentationRequirements: React.FC<DocumentationRequirementsProps> = ({
  requireImplementationPlan,
  requireRiskAssessment,
  onToggleSetting,
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Documentation Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="require-plan">Require Implementation Plan</Label>
          <Switch 
            id="require-plan" 
            checked={requireImplementationPlan} 
            onCheckedChange={() => onToggleSetting('requireImplementationPlan')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="require-risk">Require Risk Assessment</Label>
          <Switch 
            id="require-risk" 
            checked={requireRiskAssessment} 
            onCheckedChange={() => onToggleSetting('requireRiskAssessment')}
          />
        </div>
      </CardContent>
    </>
  );
};

export default DocumentationRequirements;
