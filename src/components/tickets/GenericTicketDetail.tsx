
import React, { useEffect, useState } from 'react';
import { Ticket } from '@/utils/types/ticket';
import { getTicketById } from '@/utils/mockData/tickets';
import { useNavigate } from 'react-router-dom';
import TicketDetails from './TicketDetails';
import TicketDetailView from './TicketDetailView';
import { useTicketDetail } from '@/hooks/useTicketDetail';
import PageTransition from '@/components/shared/PageTransition';
import TicketLoadingState from './TicketLoadingState';
import TicketLoadingError from './TicketLoadingError';

interface GenericTicketDetailProps {
  id: string | undefined;
  returnPath: string;
  ticketType: string;
  type: 'incident' | 'service';
}

const GenericTicketDetail: React.FC<GenericTicketDetailProps> = ({
  id,
  returnPath,
  ticketType,
  type
}) => {
  const navigate = useNavigate();
  const {
    ticket,
    loading,
    error,
    handleUpdateTicket,
    handleCloseTicket,
    handleAddNote,
    handleReopenTicket
  } = useTicketDetail(id);

  // If loading, show loading state
  if (loading) {
    return <TicketLoadingState />;
  }

  // If error or no ticket, show error state
  if (error || !ticket) {
    return (
      <TicketLoadingError
        returnPath={returnPath}
        entityType={ticketType}
      />
    );
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <TicketDetailView
          ticket={ticket}
          type={type}
          onUpdateTicket={handleUpdateTicket}
          onCloseTicket={handleCloseTicket}
          onAddNote={handleAddNote}
          onReopenTicket={handleReopenTicket}
        />
      </div>
    </PageTransition>
  );
};

export default GenericTicketDetail;
