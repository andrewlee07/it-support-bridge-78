
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ExecutionCommentsFieldProps {
  comments: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
}

const ExecutionCommentsField: React.FC<ExecutionCommentsFieldProps> = ({ 
  comments, 
  onChange,
  isDisabled = false
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="comments">Execution Notes</Label>
      <Textarea 
        id="comments" 
        placeholder="Add your execution comments here..."
        value={comments}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[100px]"
        disabled={isDisabled}
      />
    </div>
  );
};

export default ExecutionCommentsField;
