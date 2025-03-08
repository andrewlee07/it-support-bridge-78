
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import TicketDetailView from '@/components/tickets/TicketDetailView';
import TicketLoadingError from '@/components/tickets/TicketLoadingError';
import { useTicketDetail } from '@/hooks/useTicketDetail';

interface GenericTicketDetailProps {
  id: string | undefined;
  returnPath: string;
  ticketType: string;
  type: 'service' | 'incident';
}

const GenericTicketDetail: React.FC<GenericTicketDetailProps> = ({
  id,
  returnPath,
  ticketType,
  type
}) => {
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
        returnPath={returnPath}
        ticketType={ticketType}
      />
      
      {!loading && !error && ticket && (
        <TicketDetailView
          ticket={ticket}
          onUpdateTicket={handleUpdateTicket}
          onCloseTicket={handleCloseTicket}
          onAddNote={handleAddNote}
          onReopenTicket={handleReopenTicket}
          type={type}
        />
      )}
    </PageTransition>
  );
};

export default GenericTicketDetail;
