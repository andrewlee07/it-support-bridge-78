
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SecurityCase, SecurityCaseStatus, SecurityCasePriority } from '@/utils/types/security';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface SecurityCaseUpdateFormProps {
  securityCase: SecurityCase;
  onUpdate: (updatedFields: Partial<SecurityCase>) => Promise<boolean>;
}

const SecurityCaseUpdateForm: React.FC<SecurityCaseUpdateFormProps> = ({
  securityCase,
  onUpdate
}) => {
  const [status, setStatus] = useState<SecurityCaseStatus>(securityCase.status as SecurityCaseStatus);
  const [priority, setPriority] = useState<SecurityCasePriority>(securityCase.priority as SecurityCasePriority);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions: SecurityCaseStatus[] = ['Active', 'Pending', 'Resolved'];
  const priorityOptions: SecurityCasePriority[] = ['High', 'Medium', 'Low'];

  const handleSubmit = async () => {
    if (status === securityCase.status && priority === securityCase.priority) {
      toast.info('No changes to update');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onUpdate({
        status,
        priority
      });
      
      if (success) {
        toast.success('Security case updated successfully');
      }
    } catch (error) {
      console.error('Error updating security case:', error);
      toast.error('Failed to update security case');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Security Case</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={status} onValueChange={(value) => setStatus(value as SecurityCaseStatus)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Priority</label>
          <Select value={priority} onValueChange={(value) => setPriority(value as SecurityCasePriority)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              {priorityOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || (status === securityCase.status && priority === securityCase.priority)}
        >
          {isSubmitting ? 'Updating...' : 'Update Case'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SecurityCaseUpdateForm;
