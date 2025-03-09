
import React from 'react';
import { Button } from '@/components/ui/button';
import { TicketType } from '@/utils/types';

interface FormActionsProps {
  isSubmitting: boolean;
  type: TicketType;
}

const FormActions: React.FC<FormActionsProps> = ({
  isSubmitting,
  type
}) => {
  const getSubmitLabel = () => {
    if (isSubmitting) return 'Submitting...';
    
    switch (type) {
      case 'incident':
        return 'Submit Incident';
      case 'service':
        return 'Submit Request';
      case 'change':
        return 'Submit Change';
      default:
        return 'Submit';
    }
  };

  return (
    <div className="flex justify-end">
      <Button type="submit" disabled={isSubmitting}>
        {getSubmitLabel()}
      </Button>
    </div>
  );
};

export default FormActions;
