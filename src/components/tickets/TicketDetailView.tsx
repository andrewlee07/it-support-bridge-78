
import React from 'react';
import { Ticket } from '@/utils/types/ticket';
import { UpdateTicketValues } from './TicketUpdateForm';
import { CloseTicketValues } from './TicketCloseForm';
import TicketDetailContainer from './TicketDetailContainer';

export interface TicketDetailViewProps {
  ticket: Ticket;
  type: 'incident' | 'service';
  onUpdate?: (data: UpdateTicketValues) => void;
  onClose?: (data: CloseTicketValues) => void;
  onAddNote?: (note: string) => void;
  onReopen?: (reason: string) => void;
  // For backward compatibility with existing components
  onUpdateTicket?: (data: UpdateTicketValues) => void;
  onCloseTicket?: (data: CloseTicketValues) => void;
  onReopenTicket?: (reason: string) => void;
}

const TicketDetailView: React.FC<TicketDetailViewProps> = (props) => {
  return <TicketDetailContainer {...props} />;
};

export default TicketDetailView;
