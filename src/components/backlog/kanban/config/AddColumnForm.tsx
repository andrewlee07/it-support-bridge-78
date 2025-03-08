
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface AddColumnFormProps {
  onAddColumn: (displayName: string, statusValue: string) => void;
}

const AddColumnForm: React.FC<AddColumnFormProps> = ({ onAddColumn }) => {
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnStatusValue, setNewColumnStatusValue] = useState('');

  const handleAddColumn = () => {
    if (!newColumnName || !newColumnStatusValue) return;
    onAddColumn(newColumnName, newColumnStatusValue);
    setNewColumnName('');
    setNewColumnStatusValue('');
  };

  return (
    <div className="mt-4 border-t pt-4">
      <p className="text-sm font-medium mb-2">Add New Column</p>
      <div className="flex gap-2">
        <Input
          placeholder="Display Name"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          className="flex-1"
        />
        <Input
          placeholder="Status Value"
          value={newColumnStatusValue}
          onChange={(e) => setNewColumnStatusValue(e.target.value)}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleAddColumn}
          size="sm"
          disabled={!newColumnName || !newColumnStatusValue}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        Status Value should be a unique identifier (e.g., "in-review")
      </p>
    </div>
  );
};

export default AddColumnForm;
