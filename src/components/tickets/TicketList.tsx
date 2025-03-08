
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Ticket, TicketStatus, TicketPriority, TicketCategory, TicketType } from '@/utils/types';
import TicketCard from './TicketCard';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TicketListProps {
  tickets: Ticket[];
  type: TicketType;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, type }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<TicketCategory | 'all'>('all');
  const navigate = useNavigate();

  const filteredTickets = tickets.filter((ticket) => {
    // Filter by type (incident or service)
    if (ticket.type !== type) return false;

    // Filter by search query
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    // Filter by status
    if (statusFilter !== 'all' && ticket.status !== statusFilter) return false;

    // Filter by priority
    if (priorityFilter !== 'all' && ticket.priority !== priorityFilter) return false;

    // Filter by category
    if (categoryFilter !== 'all' && ticket.category !== categoryFilter) return false;

    return true;
  });

  const handleCardClick = (ticketId: string) => {
    const basePath = type === 'incident' ? '/incidents' : '/service-requests';
    navigate(`${basePath}/${ticketId}`);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as TicketStatus | 'all')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={priorityFilter}
          onValueChange={(value) => setPriorityFilter(value as TicketPriority | 'all')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="P1">High</SelectItem>
            <SelectItem value="P2">Medium</SelectItem>
            <SelectItem value="P3">Low</SelectItem>
            <SelectItem value="P4">Lowest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {filteredTickets.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground">No tickets found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} onClick={() => handleCardClick(ticket.id)}>
              <TicketCard ticket={ticket} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;
