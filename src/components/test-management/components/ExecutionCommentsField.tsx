
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ExecutionCommentsFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const ExecutionCommentsField: React.FC<ExecutionCommentsFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="comments">Execution Notes</Label>
      <Textarea 
        id="comments" 
        placeholder="Add your execution comments here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[100px]"
      />
    </div>
  );
};

export default ExecutionCommentsField;
