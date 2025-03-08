
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Ticket, TicketStatus, TicketPriority } from '@/utils/types/ticket';
import TicketCard from './TicketCard';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import TicketForm from './TicketForm';
import { getTicketsByType } from '@/utils/mockData/tickets';
import { toast } from 'sonner';
import { addAuditEntry } from '@/utils/auditUtils';
import TicketFilters from './TicketFilters';
import TicketDetailView from './TicketDetailView';
import { UpdateTicketValues } from './TicketUpdateForm';
import { CloseTicketValues } from './TicketCloseForm';

interface TicketListProps {
  type: 'incident' | 'service';
}

const TicketList: React.FC<TicketListProps> = ({ type }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] = useState<boolean>(false);
  const [isViewingTicket, setIsViewingTicket] = useState<boolean>(!!id);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    loadTickets();
  }, [type]);

  useEffect(() => {
    if (id) {
      setIsViewingTicket(true);
      const ticket = tickets.find(t => t.id === id);
      if (ticket) {
        setSelectedTicket(ticket);
      }
    } else {
      setIsViewingTicket(false);
      setSelectedTicket(null);
    }
  }, [id, tickets]);

  const loadTickets = () => {
    setLoading(true);
    try {
      // Get tickets from mockData based on type
      const ticketsData = getTicketsByType(type);
      setTickets(ticketsData);
      setFilteredTickets(ticketsData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = tickets;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.id.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(t => t.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(t => t.priority === priorityFilter);
    }

    setFilteredTickets(result);
  }, [searchQuery, statusFilter, priorityFilter, tickets]);

  const handleCardClick = (ticketId: string) => {
    const basePath = type === 'incident' ? '/incidents' : '/service-requests';
    console.log(`Navigating to ${basePath}/${ticketId}`);
    navigate(`${basePath}/${ticketId}`);
  };

  const handleCreateTicket = () => {
    setIsNewTicketDialogOpen(true);
  };

  const handleCloseTicketDialog = () => {
    setIsNewTicketDialogOpen(false);
  };

  const handleTicketCreated = () => {
    loadTickets();
    setIsNewTicketDialogOpen(false);
  };

  const handleCloseViewDialog = () => {
    const basePath = type === 'incident' ? '/incidents' : '/service-requests';
    navigate(basePath);
  };

  const handleUpdateTicket = (data: UpdateTicketValues) => {
    if (!selectedTicket) return;
    
    try {
      // In a real app, we would call an API to update the ticket
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          const updatedTicket = {
            ...ticket,
            status: data.status,
            assignedTo: data.assignedTo || ticket.assignedTo,
            updatedAt: new Date(),
            audit: data.notes 
              ? addAuditEntry(
                  ticket.audit,
                  ticket.id,
                  'ticket',
                  `Status updated to ${data.status}${data.notes ? ': ' + data.notes : ''}`,
                  'current-user'
                )
              : ticket.audit,
          };
          return updatedTicket;
        }
        return ticket;
      });
      
      setTickets(updatedTickets);
      setFilteredTickets(updatedTickets);
      const updatedTicket = updatedTickets.find(t => t.id === selectedTicket.id) || null;
      setSelectedTicket(updatedTicket);
      
      toast.success('Ticket updated successfully');
    } catch (error) {
      console.error('Failed to update ticket:', error);
      toast.error('Failed to update ticket');
    }
  };

  const handleCloseTicket = (data: CloseTicketValues) => {
    if (!selectedTicket) return;
    
    try {
      // In a real app, we would call an API to close the ticket
      const status = data.status;
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          const updatedTicket = {
            ...ticket,
            status,
            updatedAt: new Date(),
            resolvedAt: new Date(),
            audit: addAuditEntry(
              ticket.audit,
              ticket.id,
              'ticket',
              `Ticket ${status}: ${data.closureReason} - Root cause: ${data.rootCause}`,
              'current-user'
            ),
          };
          return updatedTicket;
        }
        return ticket;
      });
      
      setTickets(updatedTickets);
      setFilteredTickets(updatedTickets);
      const updatedTicket = updatedTickets.find(t => t.id === selectedTicket.id) || null;
      setSelectedTicket(updatedTicket);
      
      toast.success(`Ticket ${status} successfully`);
    } catch (error) {
      console.error('Failed to close ticket:', error);
      toast.error('Failed to close ticket');
    }
  };

  const handleAddNote = (note: string) => {
    if (!selectedTicket || !note.trim()) return;
    
    try {
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          const updatedTicket = {
            ...ticket,
            updatedAt: new Date(),
            audit: addAuditEntry(
              ticket.audit,
              ticket.id,
              'ticket',
              note,
              'current-user'
            ),
          };
          return updatedTicket;
        }
        return ticket;
      });
      
      setTickets(updatedTickets);
      setFilteredTickets(updatedTickets);
      const updatedTicket = updatedTickets.find(t => t.id === selectedTicket.id) || null;
      setSelectedTicket(updatedTicket);
      
      toast.success('Note added successfully');
    } catch (error) {
      console.error('Failed to add note:', error);
      toast.error('Failed to add note');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {type === 'incident' ? 'Incidents' : 'Service Requests'}
        </h1>
        <Button onClick={handleCreateTicket}>
          <PlusCircle className="h-4 w-4 mr-2" />
          New {type === 'incident' ? 'Incident' : 'Request'}
        </Button>
      </div>

      <TicketFilters 
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
      />

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border rounded-md p-6 h-48 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium">No tickets found</h3>
          <p className="text-muted-foreground mt-1">
            {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
              ? 'Try changing your search filters'
              : `No ${type === 'incident' ? 'incidents' : 'service requests'} have been created yet`}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id}>
              <TicketCard 
                ticket={ticket} 
                onClick={() => handleCardClick(ticket.id)} 
              />
            </div>
          ))}
        </div>
      )}

      {/* New Ticket Dialog */}
      <Dialog open={isNewTicketDialogOpen} onOpenChange={setIsNewTicketDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <TicketForm
            type={type}
            onSubmit={(data) => {
              handleTicketCreated();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* View Ticket Dialog */}
      <Dialog open={isViewingTicket && !!selectedTicket} onOpenChange={handleCloseViewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedTicket && (
            <TicketDetailView 
              ticket={selectedTicket}
              type={type}
              onUpdate={handleUpdateTicket}
              onClose={handleCloseTicket}
              onAddNote={handleAddNote}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TicketList;
