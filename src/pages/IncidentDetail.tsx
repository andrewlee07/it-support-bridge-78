
import React from 'react';
import { useParams } from 'react-router-dom';
import GenericTicketDetail from '@/components/tickets/GenericTicketDetail';

const IncidentDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <GenericTicketDetail
      id={id}
      returnPath="/incidents"
      ticketType="Incident"
      type="incident"
    />
  );
};

export default IncidentDetail;
