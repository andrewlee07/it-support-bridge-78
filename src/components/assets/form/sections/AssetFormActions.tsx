
import React from 'react';
import { Button } from '@/components/ui/button';

interface AssetFormActionsProps {
  onCancel: () => void;
  loading: boolean;
  submitButtonText: string;
}

const AssetFormActions: React.FC<AssetFormActionsProps> = ({ 
  onCancel, 
  loading, 
  submitButtonText 
}) => {
  return (
    <div className="flex justify-end gap-2 pt-4">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={loading}>
        {loading ? 'Processing...' : submitButtonText}
      </Button>
    </div>
  );
};

export default AssetFormActions;
