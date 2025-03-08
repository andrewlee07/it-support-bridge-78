
import React from 'react';
import { useParams } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import TicketDetailView from '@/components/tickets/TicketDetailView';
import TicketLoadingError from '@/components/tickets/TicketLoadingError';
import { useTicketDetail } from '@/hooks/useTicketDetail';

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

  return (
    <PageTransition>
      <TicketLoadingError
        loading={loading}
        error={error}
        returnPath="/service-requests"
        ticketType="Service Request"
      />
      
      {!loading && !error && ticket && (
        <TicketDetailView
          ticket={ticket}
          onUpdateTicket={handleUpdateTicket}
          onCloseTicket={handleCloseTicket}
          onAddNote={handleAddNote}
          onReopenTicket={handleReopenTicket}
          type="service"
        />
      )}
    </PageTransition>
  );
};

export default ServiceRequestDetail;
