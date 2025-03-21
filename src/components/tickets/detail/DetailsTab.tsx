
import React from 'react';
import { Ticket } from '@/utils/types/ticket';
import { UpdateTicketValues } from '../TicketUpdateForm';
import { CloseTicketValues } from '../TicketCloseForm';

export interface DetailsTabProps {
  ticket: Ticket;
  type?: 'incident' | 'service' | 'security';
  onUpdate?: (data: UpdateTicketValues) => void;
  onClose?: (data: CloseTicketValues) => void;
  onDetailsTabReopen?: () => void;
}

const DetailsTab: React.FC<DetailsTabProps> = ({
  ticket,
  type,
  onUpdate,
  onClose,
  onDetailsTabReopen
}) => {
  return (
    <div>
      <h2>Details Tab</h2>
      <p>This is a placeholder for the ticket details.</p>
    </div>
  );
};

export default DetailsTab;
