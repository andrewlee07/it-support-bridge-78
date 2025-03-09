
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  isSubmitting: boolean;
  type: 'incident' | 'service';
}

const FormActions: React.FC<FormActionsProps> = ({
  isSubmitting,
  type
}) => {
  return (
    <div className="flex justify-end">
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : `Submit ${type === 'incident' ? 'Incident' : 'Request'}`}
      </Button>
    </div>
  );
};

export default FormActions;
