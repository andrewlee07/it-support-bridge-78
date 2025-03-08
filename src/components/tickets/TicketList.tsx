
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Ticket, TicketStatus, TicketPriority } from '@/utils/types/ticket';
import TicketCard from './TicketCard';
import { fetchTickets } from '@/utils/api/ticketApi';
import { PlusCircle, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import TicketForm from './TicketForm';

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

  const loadTickets = async () => {
    setLoading(true);
    try {
      const response = await fetchTickets(type);
      if (response.data) {
        setTickets(response.data);
        setFilteredTickets(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
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

      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={value => setStatusFilter(value as TicketStatus | 'all')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={priorityFilter}
              onValueChange={value => setPriorityFilter(value as TicketPriority | 'all')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6 h-48 animate-pulse flex flex-col justify-between">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                </div>
              </CardContent>
            </Card>
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
          <DialogHeader>
            <DialogTitle>
              Create New {type === 'incident' ? 'Incident' : 'Service Request'}
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to create a new {type === 'incident' ? 'incident' : 'service request'}.
            </DialogDescription>
          </DialogHeader>
          <TicketForm
            type={type}
            onCancel={handleCloseTicketDialog}
            onSuccess={handleTicketCreated}
          />
        </DialogContent>
      </Dialog>

      {/* View Ticket Dialog */}
      <Dialog open={isViewingTicket && !!selectedTicket} onOpenChange={handleCloseViewDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {type === 'incident' ? 'Incident' : 'Service Request'} Details
            </DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold">{selectedTicket.title}</h2>
                <p className="text-sm text-muted-foreground">{selectedTicket.id}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Status</h3>
                  <Badge className="mt-1">{selectedTicket.status}</Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Priority</h3>
                  <Badge className="mt-1">{selectedTicket.priority}</Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Reported By</h3>
                  <p className="text-sm">{selectedTicket.reportedBy}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Assigned To</h3>
                  <p className="text-sm">{selectedTicket.assignedTo || 'Unassigned'}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium">Description</h3>
                  <p className="text-sm mt-1">{selectedTicket.description}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TicketList;
