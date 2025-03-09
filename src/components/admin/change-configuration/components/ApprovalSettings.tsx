
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ApprovalSettingsProps {
  requireApprovals: boolean;
  requiredApprovals: number;
  requireChangeManagerApproval: boolean;
  notifyStakeholders: boolean;
  allowEmergency: boolean;
  onToggleSetting: (setting: string) => void;
  onApprovalCountChange: (value: string) => void;
}

const ApprovalSettings: React.FC<ApprovalSettingsProps> = ({
  requireApprovals,
  requiredApprovals,
  requireChangeManagerApproval,
  notifyStakeholders,
  allowEmergency,
  onToggleSetting,
  onApprovalCountChange,
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Approval Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="require-approvals">Require Approvals</Label>
          <Switch 
            id="require-approvals" 
            checked={requireApprovals} 
            onCheckedChange={() => onToggleSetting('requireApprovals')}
          />
        </div>
        
        {requireApprovals && (
          <>
            <div className="space-y-2">
              <Label htmlFor="approval-count">Required Approvals</Label>
              <Select 
                value={requiredApprovals.toString()} 
                onValueChange={onApprovalCountChange}
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
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="change-manager-approval" 
                checked={requireChangeManagerApproval}
                onCheckedChange={() => onToggleSetting('requireChangeManagerApproval')}
              />
              <Label 
                htmlFor="change-manager-approval"
                className="font-medium text-sm"
              >
                Require Change Manager approval (mandatory)
              </Label>
            </div>
          </>
        )}
        
        <div className="flex items-center justify-between">
          <Label htmlFor="notify-stakeholders">Notify Stakeholders</Label>
          <Switch 
            id="notify-stakeholders" 
            checked={notifyStakeholders} 
            onCheckedChange={() => onToggleSetting('notifyStakeholders')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="allow-emergency">Allow Emergency Changes</Label>
          <Switch 
            id="allow-emergency" 
            checked={allowEmergency} 
            onCheckedChange={() => onToggleSetting('allowEmergency')}
          />
        </div>
      </CardContent>
    </>
  );
};

export default ApprovalSettings;
