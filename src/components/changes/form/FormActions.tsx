
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
  isEditing?: boolean;
  submitLabel?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onCancel, 
  isSubmitting = false, 
  isEditing = false,
  submitLabel = "Submit"
}) => {
  return (
    <div className="flex justify-end gap-4 w-full">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel} 
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            {submitLabel}
          </>
        )}
      </Button>
    </div>
  );
};

export default FormActions;
