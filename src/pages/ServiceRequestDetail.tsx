
import React from 'react';
import { useParams } from 'react-router-dom';
import GenericTicketDetail from '@/components/tickets/GenericTicketDetail';

const ServiceRequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <GenericTicketDetail
      id={id}
      returnPath="/service-requests"
      ticketType="Service Request"
      type="service"
    />
  );
};

export default ServiceRequestDetail;
