
import React from 'react';
import { Ticket } from '@/utils/types/ticket';
import { CloseTicketValues } from './TicketCloseForm';
import { UpdateTicketValues } from './TicketUpdateForm';
import TicketDetailContainer from './TicketDetailContainer';

export interface TicketDetailViewProps {
  ticket: Ticket;
  type: 'incident' | 'service' | 'security';
  onUpdateTicket: (values: UpdateTicketValues) => void;
  onCloseTicket: (values: CloseTicketValues) => void;
  onAddNote: (note: string) => void;
  onReopenTicket: (reason: string) => void;
  onUpdate?: (values: UpdateTicketValues) => void;
  onClose?: (values: CloseTicketValues) => void;
  onReopen?: (reason: string) => void;
}

const TicketDetailView: React.FC<TicketDetailViewProps> = ({
  ticket,
  type,
  onUpdateTicket,
  onCloseTicket,
  onAddNote,
  onReopenTicket,
  onUpdate,
  onClose,
  onReopen
}) => {
  return (
    <TicketDetailContainer
      ticket={ticket}
      type={type}
      onUpdateTicket={onUpdateTicket}
      onCloseTicket={onCloseTicket}
      onAddNote={onAddNote}
      onReopenTicket={onReopenTicket}
      onUpdate={onUpdate}
      onClose={onClose}
      onReopen={onReopen}
    />
  );
};

export default TicketDetailView;
