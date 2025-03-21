
import React from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import TicketForm from './TicketForm';
import TicketDetailView from './TicketDetailView';
import { Ticket } from '@/utils/types/ticket';
import { UpdateTicketValues } from './TicketUpdateForm';
import { CloseTicketValues } from './TicketCloseForm';
import { toast } from 'sonner';

interface TicketDialogsProps {
  type: 'incident' | 'service' | 'security';
  isNewTicketDialogOpen: boolean;
  isViewingTicket: boolean;
  selectedTicket: Ticket | null;
  onNewTicketDialogOpenChange: (open: boolean) => void;
  onViewDialogClose: () => void;
  onTicketCreated: () => void;
  onTicketUpdate: (data: UpdateTicketValues) => void;
  onTicketClose: (data: CloseTicketValues) => void;
  onAddNote?: (note: string) => void;
  onReopenTicket?: (reason: string) => void;
}

const TicketDialogs: React.FC<TicketDialogsProps> = ({
  type,
  isNewTicketDialogOpen,
  isViewingTicket,
  selectedTicket,
  onNewTicketDialogOpenChange,
  onViewDialogClose,
  onTicketCreated,
  onTicketUpdate,
  onTicketClose,
  onAddNote,
  onReopenTicket
}) => {
  const handleCreateTicket = (data: Partial<Ticket>) => {
    // In a real app, you would make an API call to create the ticket
    console.log('Creating ticket:', data);
    onTicketCreated();
    
    const successMessage = 
      type === 'incident' ? 'Incident created successfully' :
      type === 'security' ? 'Security case created successfully' :
      'Service request created successfully';
    
    toast.success(successMessage);
  };

  return (
    <>
      {/* New Ticket Dialog */}
      <Dialog open={isNewTicketDialogOpen} onOpenChange={onNewTicketDialogOpenChange}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[95vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">
            Create New {
              type === 'incident' ? 'Incident' :
              type === 'security' ? 'Security Case' :
              'Service Request'
            }
          </h2>
          <TicketForm onSubmit={handleCreateTicket} type={type} />
        </DialogContent>
      </Dialog>

      {/* View Ticket Dialog */}
      <Dialog open={isViewingTicket} onOpenChange={(open) => !open && onViewDialogClose()}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[95vh] overflow-y-auto">
          {selectedTicket ? (
            <TicketDetailView
              ticket={selectedTicket}
              type={type}
              onUpdateTicket={onTicketUpdate}
              onCloseTicket={onTicketClose}
              onAddNote={onAddNote || (() => {})}
              onReopenTicket={onReopenTicket || (() => {})}
            />
          ) : (
            <div>Loading...</div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TicketDialogs;
