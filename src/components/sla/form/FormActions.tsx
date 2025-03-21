
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  isEditing: boolean;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ isEditing, onCancel }) => {
  return (
    <div className="flex justify-end space-x-3 pt-6 border-t mt-8">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        className="h-10"
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        className="h-10"
      >
        {isEditing ? 'Update SLA' : 'Create SLA'}
      </Button>
    </div>
  );
};

export default FormActions;
