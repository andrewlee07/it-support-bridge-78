
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProblemNoteFormProps {
  onSubmit: (note: string) => void;
  onCancel: () => void;
}

const ProblemNoteForm: React.FC<ProblemNoteFormProps> = ({ onSubmit, onCancel }) => {
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!note.trim()) {
      setError('Please enter a note');
      return;
    }
    
    onSubmit(note);
    setNote('');
    setError('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Note</CardTitle>
        <CardDescription>
          Add a note to the problem record.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Textarea
              placeholder="Enter your note here..."
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                if (e.target.value.trim()) {
                  setError('');
                }
              }}
              className="min-h-[150px]"
            />
            {error && <p className="text-destructive text-sm mt-1">{error}</p>}
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Add Note
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProblemNoteForm;
