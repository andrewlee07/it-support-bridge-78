
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import FormSectionHeader from './FormSectionHeader';
import { Label } from '@/components/ui/label';

interface ApproverSectionProps {
  form: UseFormReturn<any>;
}

const ApproverSection: React.FC<ApproverSectionProps> = ({ form }) => {
  const approverRoles = form.watch('approverRoles') || [];
  
  const handleRoleToggle = (role: string) => {
    const currentRoles = [...approverRoles];
    const roleIndex = currentRoles.indexOf(role);
    
    if (roleIndex > -1) {
      currentRoles.splice(roleIndex, 1);
    } else {
      currentRoles.push(role);
    }
    
    form.setValue('approverRoles', currentRoles);
  };
  
  return (
    <div className="space-y-4">
      <FormSectionHeader title="Required Approvers" />
      
      <div className="space-y-2">
        <Label className="text-base">Who needs to approve this change?</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="it-approval" 
              checked={approverRoles.includes('it')}
              onCheckedChange={() => handleRoleToggle('it')}
            />
            <Label htmlFor="it-approval" className="text-sm font-normal">IT Staff</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="user-approval" 
              checked={approverRoles.includes('user')}
              onCheckedChange={() => handleRoleToggle('user')}
            />
            <Label htmlFor="user-approval" className="text-sm font-normal">End Users</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproverSection;
