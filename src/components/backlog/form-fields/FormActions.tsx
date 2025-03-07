
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  loading: boolean;
  onCancel: () => void;
  submitLabel: string;
}

const FormActions: React.FC<FormActionsProps> = ({ loading, onCancel, submitLabel }) => {
  return (
    <div className="flex justify-end space-x-2 pt-4">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : submitLabel}
      </Button>
    </div>
  );
};

export default FormActions;
