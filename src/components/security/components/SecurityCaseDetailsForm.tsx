
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SecurityCase } from '@/utils/types/security';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface SecurityCaseDetailsFormProps {
  securityCase: SecurityCase;
  onUpdate: (updatedFields: Partial<SecurityCase>) => Promise<boolean>;
}

const SecurityCaseDetailsForm: React.FC<SecurityCaseDetailsFormProps> = ({
  securityCase,
  onUpdate
}) => {
  const [title, setTitle] = useState(securityCase.title);
  const [description, setDescription] = useState(securityCase.description);
  const [remediationPlan, setRemediationPlan] = useState(securityCase.remediationPlan);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasChanges = 
    title !== securityCase.title || 
    description !== securityCase.description || 
    remediationPlan !== securityCase.remediationPlan;

  const handleSubmit = async () => {
    if (!hasChanges) {
      toast.info('No changes to update');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onUpdate({
        title,
        description,
        remediationPlan
      });
      
      if (success) {
        toast.success('Security case details updated successfully');
      }
    } catch (error) {
      console.error('Error updating security case details:', error);
      toast.error('Failed to update security case details');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Case Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Case title"
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Case description"
            rows={3}
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Remediation Plan</label>
          <Textarea
            value={remediationPlan}
            onChange={(e) => setRemediationPlan(e.target.value)}
            placeholder="Remediation plan"
            rows={3}
            className="bg-background"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || !hasChanges}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SecurityCaseDetailsForm;
