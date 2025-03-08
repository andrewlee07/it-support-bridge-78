
import React from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TicketPriority, TicketStatus } from '@/utils/types/ticket';

interface TicketFiltersProps {
  searchQuery: string;
  statusFilter: TicketStatus | 'all';
  priorityFilter: TicketPriority | 'all';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: TicketStatus | 'all') => void;
  onPriorityChange: (value: TicketPriority | 'all') => void;
}

const TicketFilters: React.FC<TicketFiltersProps> = ({
  searchQuery,
  statusFilter,
  priorityFilter,
  onSearchChange,
  onStatusChange,
  onPriorityChange
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={value => onStatusChange(value as TicketStatus | 'all')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="fulfilled">Fulfilled</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={priorityFilter}
            onValueChange={value => onPriorityChange(value as TicketPriority | 'all')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All priorities</SelectItem>
              <SelectItem value="P1">P1 (Critical)</SelectItem>
              <SelectItem value="P2">P2 (High)</SelectItem>
              <SelectItem value="P3">P3 (Medium)</SelectItem>
              <SelectItem value="P4">P4 (Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketFilters;
