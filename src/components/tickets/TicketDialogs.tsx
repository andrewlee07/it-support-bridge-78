
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Ticket } from '@/utils/types/ticket';
import TicketForm from './TicketForm';
import TicketDetailView from './TicketDetailView';
import { UpdateTicketValues } from './TicketUpdateForm';
import { CloseTicketValues } from './TicketCloseForm';

interface TicketDialogsProps {
  type: 'incident' | 'service';
  isNewTicketDialogOpen: boolean;
  isViewingTicket: boolean;
  selectedTicket: Ticket | null;
  onNewTicketDialogOpenChange: (open: boolean) => void;
  onViewDialogClose: () => void;
  onTicketCreated: () => void;
  onTicketUpdate: (data: UpdateTicketValues) => void;
  onTicketClose: (data: CloseTicketValues) => void;
  onAddNote: (note: string) => void;
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
  onAddNote
}) => {
  return (
    <>
      {/* New Ticket Dialog */}
      <Dialog open={isNewTicketDialogOpen} onOpenChange={onNewTicketDialogOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <TicketForm
            type={type}
            onSubmit={() => {
              onTicketCreated();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* View Ticket Dialog */}
      <Dialog open={isViewingTicket && !!selectedTicket} onOpenChange={onViewDialogClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedTicket && (
            <TicketDetailView 
              ticket={selectedTicket}
              type={type}
              onUpdate={onTicketUpdate}
              onClose={onTicketClose}
              onAddNote={onAddNote}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TicketDialogs;
