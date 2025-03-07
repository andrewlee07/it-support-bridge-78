
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onCancel, 
  isSubmitting, 
  isEditing 
}) => {
  return (
    <div className="flex justify-between">
      <Button 
        variant="outline" 
        type="button" 
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : (isEditing ? "Update Change Request" : "Submit Change Request")}
      </Button>
    </div>
  );
};

export default FormActions;
