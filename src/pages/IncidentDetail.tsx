
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTicketDetail } from '@/hooks/useTicketDetail';
import IncidentDetailLayout from '@/components/tickets/detail/IncidentDetailLayout';
import PageTransition from '@/components/shared/PageTransition';
import TicketLoadingState from '@/components/tickets/TicketLoadingState';
import TicketLoadingError from '@/components/tickets/TicketLoadingError';

const IncidentDetail = () => {
  const { id } = useParams<{ id: string }>();
  
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
        returnPath="/incidents"
        entityName="Incident"
      />
    );
  }

  return (
    <PageTransition>
      <IncidentDetailLayout
        ticket={ticket}
        onUpdateTicket={handleUpdateTicket}
        onCloseTicket={handleCloseTicket}
        onAddNote={handleAddNote}
        onReopenTicket={handleReopenTicket}
      />
    </PageTransition>
  );
};

export default IncidentDetail;
