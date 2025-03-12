
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface NoteTabProps {
  onAddNote: (note: string) => void;
  notes?: any[]; // Make notes optional since it's not used in some places
}

const NoteTab: React.FC<NoteTabProps> = ({ onAddNote, notes = [] }) => {
  const [note, setNote] = useState('');

  const handleAddNote = () => {
    if (note.trim()) {
      onAddNote(note);
      setNote('');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium">Add Note</h3>
      <Textarea 
        placeholder="Add a note to this ticket..." 
        className="min-h-[200px]"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="flex justify-end">
        <Button onClick={handleAddNote}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Add Note
        </Button>
      </div>
    </div>
  );
};

export default NoteTab;
