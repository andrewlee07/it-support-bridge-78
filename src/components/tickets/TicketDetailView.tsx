
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Ticket } from '@/utils/types/ticket';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserPlus, CheckCircle2, MessageSquare } from 'lucide-react';
import TicketDetails from './TicketDetails';
import ActivityHistory from './ActivityHistory';
import TicketUpdateForm, { UpdateTicketValues } from './TicketUpdateForm';
import TicketCloseForm, { CloseTicketValues } from './TicketCloseForm';

interface TicketDetailViewProps {
  ticket: Ticket;
  type: 'incident' | 'service';
  onUpdate: (data: UpdateTicketValues) => void;
  onClose: (data: CloseTicketValues) => void;
  onAddNote?: (note: string) => void;
}

const TicketDetailView: React.FC<TicketDetailViewProps> = ({
  ticket,
  type,
  onUpdate,
  onClose,
  onAddNote
}) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [note, setNote] = useState('');

  const handleUpdateClick = () => {
    setIsUpdating(true);
    setIsClosing(false);
  };

  const handleCloseClick = () => {
    setIsClosing(true);
    setIsUpdating(false);
  };

  const handleUpdateSubmit = (data: UpdateTicketValues) => {
    onUpdate(data);
    setIsUpdating(false);
  };

  const handleCloseSubmit = (data: CloseTicketValues) => {
    onClose(data);
    setIsClosing(false);
  };

  const handleAddNote = () => {
    if (onAddNote && note.trim()) {
      onAddNote(note);
      setNote('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Ticket Header */}
      <div className="border-b pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{ticket.title}</h2>
            <p className="text-sm text-muted-foreground">{ticket.id}</p>
          </div>
          <div className="flex gap-2">
            {!['resolved', 'closed', 'fulfilled'].includes(ticket.status) && (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleUpdateClick}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Update
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleCloseClick}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  {type === 'incident' ? 'Resolve' : 'Fulfill'}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Update Form */}
      {isUpdating && (
        <TicketUpdateForm
          defaultValues={{
            status: ticket.status,
            assignedTo: ticket.assignedTo || '',
            notes: ''
          }}
          onSubmit={handleUpdateSubmit}
          onCancel={() => setIsUpdating(false)}
          type={type}
        />
      )}
      
      {/* Closure Form */}
      {isClosing && (
        <TicketCloseForm
          defaultValues={{
            status: type === 'incident' ? 'resolved' : 'fulfilled',
            notes: '',
            rootCause: '',
            closureReason: ''
          }}
          onSubmit={handleCloseSubmit}
          onCancel={() => setIsClosing(false)}
          type={type}
        />
      )}

      {/* Ticket Details */}
      <TicketDetails ticket={ticket} />
      
      {/* Activity History */}
      <ActivityHistory auditEntries={ticket.audit} />
      
      {/* Add Notes Section */}
      {!isUpdating && !isClosing && !['resolved', 'closed', 'fulfilled'].includes(ticket.status) && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-md font-medium mb-2">Add Note</h3>
          <div className="flex gap-2">
            <Textarea 
              placeholder="Add a note to this ticket..." 
              className="min-h-[80px]"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button className="self-end" onClick={handleAddNote}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetailView;
