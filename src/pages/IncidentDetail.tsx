
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import TicketDetailView from '@/components/tickets/TicketDetailView';
import { getTicketById } from '@/utils/mockData/tickets';
import { Ticket } from '@/utils/types/ticket';
import { UpdateTicketValues } from '@/components/tickets/TicketUpdateForm';
import { CloseTicketValues } from '@/components/tickets/TicketCloseForm';

const IncidentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        if (id) {
          const fetchedTicket = getTicketById(id);
          if (fetchedTicket) {
            setTicket(fetchedTicket);
          } else {
            setError('Incident not found');
          }
        } else {
          setError('Invalid incident ID');
        }
      } catch (err) {
        setError('Failed to load incident');
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
        updatedAt: new Date()
      };
      setTicket(updatedTicket);
    }
  };

  const handleCloseTicket = (values: CloseTicketValues) => {
    if (ticket) {
      const updatedTicket = {
        ...ticket,
        ...values,
        status: 'closed',
        updatedAt: new Date(),
        closedAt: new Date()
      };
      setTicket(updatedTicket);
    }
  };

  const handleAddNote = (note: string) => {
    if (ticket) {
      const updatedTicket = {
        ...ticket,
        notes: [...ticket.notes, {
          id: `note-${Date.now()}`,
          text: note,
          createdAt: new Date(),
          createdBy: 'current-user',
          isInternal: false
        }],
        updatedAt: new Date()
      };
      setTicket(updatedTicket);
    }
  };

  const handleReopenTicket = () => {
    if (ticket) {
      const updatedTicket = {
        ...ticket,
        status: 'open',
        updatedAt: new Date(),
        reopenedAt: new Date()
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
        <h2 className="text-xl font-semibold mb-2">Incident Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The incident you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <button 
          className="btn-primary"
          onClick={() => navigate('/incidents')}
        >
          Return to Incidents
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
        type="incident"
      />
    </PageTransition>
  );
};

export default IncidentDetail;
