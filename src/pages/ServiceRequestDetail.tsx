
import React from 'react';
import { useParams } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import { useTicketDetail } from '@/hooks/useTicketDetail';
import TicketDetailView from '@/components/tickets/TicketDetailView';
import TicketLoadingState from '@/components/tickets/TicketLoadingState';
import TicketLoadingError from '@/components/tickets/TicketLoadingError';

const ServiceRequestDetail = () => {
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
        returnPath="/service-requests"
        entityName="Service Request"
      />
    );
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <TicketDetailView
          ticket={ticket}
          type="service"
          onUpdateTicket={handleUpdateTicket}
          onCloseTicket={handleCloseTicket}
          onAddNote={handleAddNote}
          onReopenTicket={handleReopenTicket}
        />
      </div>
    </PageTransition>
  );
};

export default ServiceRequestDetail;
