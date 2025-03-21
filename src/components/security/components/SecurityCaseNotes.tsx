
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare } from 'lucide-react';
import { SecurityCase } from '@/utils/types/security';
import { getUserNameById } from '@/utils/userUtils';

interface SecurityCaseNotesProps {
  securityCase: SecurityCase;
  formatDate: (dateString: string) => string;
  openAddNoteDialog: () => void;
}

const SecurityCaseNotes: React.FC<SecurityCaseNotesProps> = ({
  securityCase,
  formatDate,
  openAddNoteDialog
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle>Case Notes</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={openAddNoteDialog}>
            <Plus className="h-4 w-4 mr-2" /> Add Note
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Case Notes section */}
        {securityCase.notes && securityCase.notes.length > 0 ? (
          <div className="space-y-4">
            {securityCase.notes.map((note) => (
              <div key={note.id} className="border-l-2 border-gray-300 pl-4 pb-4 mb-3">
                <div className="flex justify-between mb-1">
                  <div className="font-medium">{getUserNameById(note.createdBy)}</div>
                  <div className="text-sm text-muted-foreground">{formatDate(note.createdAt)}</div>
                </div>
                <p className="text-sm">{note.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No notes have been added yet</p>
            <Button variant="outline" className="mt-4" onClick={openAddNoteDialog}>
              <Plus className="h-4 w-4 mr-2" /> Add First Note
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityCaseNotes;
