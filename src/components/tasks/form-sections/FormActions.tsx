
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  isEditMode: boolean;
  onCancel?: () => void;
  isTemplate?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ isEditMode, onCancel, isTemplate }) => {
  return (
    <div className="flex justify-end space-x-2">
      {onCancel && (
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      )}
      <Button type="submit">
        {isEditMode ? 'Update Task' : isTemplate ? 'Create Template' : 'Create Task'}
      </Button>
    </div>
  );
};

export default FormActions;
