
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';

interface FormActionsProps {
  isEditMode: boolean;
  onCancel?: () => void;
  isTemplate?: boolean;
  isSubmitting?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  isEditMode, 
  onCancel, 
  isTemplate, 
  isSubmitting 
}) => {
  // Determine button text based on the context
  const buttonText = isEditMode 
    ? 'Update Task' 
    : isTemplate 
      ? 'Create Template' 
      : 'Create Task';

  return (
    <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-gray-100">
      {onCancel && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      )}
      <Button 
        type="submit" 
        disabled={isSubmitting}
      >
        <Save className="h-4 w-4 mr-2" />
        {buttonText}
      </Button>
    </div>
  );
};

export default FormActions;
