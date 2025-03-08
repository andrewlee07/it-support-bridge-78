
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import TicketDetailView from '@/components/tickets/TicketDetailView';
import { getTicketById } from '@/utils/mockData/tickets';
import { Ticket, TicketStatus } from '@/utils/types/ticket';
import { UpdateTicketValues } from '@/components/tickets/TicketUpdateForm';
import { CloseTicketValues } from '@/components/tickets/TicketCloseForm';
import { toast } from 'sonner';

interface TicketWithNotes extends Ticket {
  notes?: Array<{
    id: string;
    text: string;
    createdAt: Date;
    createdBy: string;
    isInternal: boolean;
  }>;
}

const ServiceRequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<TicketWithNotes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        if (id) {
          const fetchedTicket = getTicketById(id);
          if (fetchedTicket) {
            setTicket({
              ...fetchedTicket,
              notes: fetchedTicket.notes || []
            });
          } else {
            setError('Service Request not found');
          }
        } else {
          setError('Invalid service request ID');
        }
      } catch (err) {
        setError('Failed to load service request');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const handleUpdateTicket = (values: UpdateTicketValues) => {
    if (ticket) {
      const updatedTicket = {
        ...ticket,
        ...values,
        status: values.status as TicketStatus,
        updatedAt: new Date(),
        notes: ticket.notes || []
      };
      setTicket(updatedTicket);
    }
  };

  const handleCloseTicket = (values: CloseTicketValues) => {
    if (ticket) {
      const closeNote = {
        id: `note-close-${Date.now()}`,
        text: values.notes,
        createdAt: new Date(),
        createdBy: 'current-user',
        isInternal: false
      };
      
      const updatedTicket = {
        ...ticket,
        status: values.status as TicketStatus,
        updatedAt: new Date(),
        closedAt: new Date(),
        notes: [...(ticket.notes || []), closeNote],
        _rootCause: values.rootCause,
        _closureReason: values.closureReason
      };
      setTicket(updatedTicket);
    }
  };

  const handleAddNote = (note: string) => {
    if (ticket) {
      const noteItem = {
        id: `note-${Date.now()}`,
        text: note,
        createdAt: new Date(),
        createdBy: 'current-user',
        isInternal: false
      };
      
      const updatedTicket = {
        ...ticket,
        notes: [...(ticket.notes || []), noteItem],
        updatedAt: new Date()
      };
      setTicket(updatedTicket);
      toast.success("Note added successfully");
    }
  };

  const handleReopenTicket = (reason: string) => {
    if (ticket) {
      const reopenNote = {
        id: `note-reopen-${Date.now()}`,
        text: `Ticket reopened: ${reason}`,
        createdAt: new Date(),
        createdBy: 'current-user',
        isInternal: false
      };
      
      const updatedTicket = {
        ...ticket,
        status: 'open' as TicketStatus,
        updatedAt: new Date(),
        reopenedAt: new Date(),
        notes: [...(ticket.notes || []), reopenNote],
        _reopenReason: reason
      };
      setTicket(updatedTicket);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-semibold mb-2">Service Request Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The service request you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <button 
          className="btn-primary"
          onClick={() => navigate('/service-requests')}
        >
          Return to Service Requests
        </button>
      </div>
    );
  }

  return (
    <PageTransition>
      <TicketDetailView
        ticket={ticket}
        onUpdateTicket={handleUpdateTicket}
        onCloseTicket={handleCloseTicket}
        onAddNote={handleAddNote}
        onReopenTicket={handleReopenTicket}
        type="service"
      />
    </PageTransition>
  );
};

export default ServiceRequestDetail;
