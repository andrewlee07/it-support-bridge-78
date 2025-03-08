
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Ticket, TicketStatus, TicketPriority, TicketType } from '@/utils/types/ticket';
import TicketCard from './TicketCard';
import { PlusCircle, Search, X, CheckCircle2, MessageSquare, UserPlus, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import TicketForm from './TicketForm';
import { getTicketsByType, getTicketById } from '@/utils/mockData/tickets';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { addAuditEntry } from '@/utils/auditUtils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface TicketListProps {
  type: 'incident' | 'service';
}

interface UpdateTicketValues {
  status: TicketStatus;
  assignedTo: string;
  notes: string;
  rootCause?: string;
  closureReason?: string;
}

const closeSchema = z.object({
  status: z.enum(['resolved', 'closed', 'fulfilled'] as const),
  notes: z.string().min(1, "Notes are required"),
  rootCause: z.string().min(1, "Root cause is required"),
  closureReason: z.string().min(1, "Closure reason is required"),
});

const updateSchema = z.object({
  status: z.enum(['open', 'in-progress', 'resolved', 'closed', 'approved', 'fulfilled'] as const),
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
});

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
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  
  const updateForm = useForm<UpdateTicketValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      status: 'open',
      assignedTo: '',
      notes: '',
    }
  });
  
  const closeForm = useForm<UpdateTicketValues>({
    resolver: zodResolver(closeSchema),
    defaultValues: {
      status: 'resolved',
      notes: '',
      rootCause: '',
      closureReason: '',
    }
  });

  useEffect(() => {
    loadTickets();
  }, [type]);

  useEffect(() => {
    if (id) {
      setIsViewingTicket(true);
      const ticket = tickets.find(t => t.id === id);
      if (ticket) {
        setSelectedTicket(ticket);
        updateForm.reset({
          status: ticket.status,
          assignedTo: ticket.assignedTo || '',
          notes: '',
        });
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
      setIsUpdating(false);
      updateForm.reset({
        status: updatedTicket?.status || 'open',
        assignedTo: updatedTicket?.assignedTo || '',
        notes: '',
      });
    } catch (error) {
      console.error('Failed to update ticket:', error);
      toast.error('Failed to update ticket');
    }
  };

  const handleCloseTicket = (data: UpdateTicketValues) => {
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
      setIsClosing(false);
      closeForm.reset();
    } catch (error) {
      console.error('Failed to close ticket:', error);
      toast.error('Failed to close ticket');
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
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="fulfilled">Fulfilled</SelectItem>
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
                <SelectItem value="P1">P1 (Critical)</SelectItem>
                <SelectItem value="P2">P2 (High)</SelectItem>
                <SelectItem value="P3">P3 (Medium)</SelectItem>
                <SelectItem value="P4">P4 (Low)</SelectItem>
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
            onSubmit={(data) => {
              handleTicketCreated();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* View Ticket Dialog - Enhanced with ticket management */}
      <Dialog open={isViewingTicket && !!selectedTicket} onOpenChange={handleCloseViewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {type === 'incident' ? 'Incident' : 'Service Request'} Details
            </DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-6">
              {/* Ticket Header */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">{selectedTicket.title}</h2>
                    <p className="text-sm text-muted-foreground">{selectedTicket.id}</p>
                  </div>
                  <div className="flex gap-2">
                    {!['resolved', 'closed', 'fulfilled'].includes(selectedTicket.status) && (
                      <>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsUpdating(true);
                            setIsClosing(false);
                          }}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Update
                        </Button>
                        <Button 
                          variant="destructive" 
                          onClick={() => {
                            setIsClosing(true);
                            setIsUpdating(false);
                            closeForm.reset({
                              status: type === 'incident' ? 'resolved' : 'fulfilled',
                              notes: '',
                              rootCause: '',
                              closureReason: '',
                            });
                          }}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          {type === 'incident' ? 'Resolve' : 'Fulfill'}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Update Form */}
              {isUpdating && (
                <div className="border p-4 rounded-md bg-muted/30">
                  <h3 className="text-md font-medium mb-3">Update {type === 'incident' ? 'Incident' : 'Request'}</h3>
                  <Form {...updateForm}>
                    <form onSubmit={updateForm.handleSubmit(handleUpdateTicket)} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={updateForm.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="open">Open</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  {type === 'service' && <SelectItem value="approved">Approved</SelectItem>}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={updateForm.control}
                          name="assignedTo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Assign To</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Assign to" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="user-1">John Smith</SelectItem>
                                  <SelectItem value="user-2">Alice Johnson</SelectItem>
                                  <SelectItem value="user-3">Bob Miller</SelectItem>
                                  <SelectItem value="user-4">Jane Davidson</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={updateForm.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Update Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter notes about this update"
                                className="min-h-[80px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsUpdating(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}
              
              {/* Closure Form */}
              {isClosing && (
                <div className="border p-4 rounded-md bg-muted/30">
                  <h3 className="text-md font-medium mb-3">
                    {type === 'incident' ? 'Resolve Incident' : 'Fulfill Request'}
                  </h3>
                  <Form {...closeForm}>
                    <form onSubmit={closeForm.handleSubmit(handleCloseTicket)} className="space-y-4">
                      <FormField
                        control={closeForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Resolution Status</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {type === 'incident' ? (
                                  <>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                  </>
                                ) : (
                                  <>
                                    <SelectItem value="fulfilled">Fulfilled</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                  </>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={closeForm.control}
                        name="rootCause"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Root Cause</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={type === 'incident' 
                                  ? "What was the root cause of this incident?" 
                                  : "What was the underlying reason for this request?"}
                                className="min-h-[80px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={closeForm.control}
                        name="closureReason"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Closure Reason</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Explain how this was resolved"
                                className="min-h-[80px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={closeForm.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any additional information"
                                className="min-h-[80px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsClosing(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" variant="destructive">
                          {type === 'incident' ? 'Resolve Incident' : 'Complete Request'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}

              {/* Ticket Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Status</h3>
                  <Badge className={selectedTicket.status === 'open' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : selectedTicket.status === 'in-progress'
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    : selectedTicket.status === 'resolved' || selectedTicket.status === 'fulfilled'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }>
                    {selectedTicket.status}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Priority</h3>
                  <Badge className={selectedTicket.priority === 'P1' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : selectedTicket.priority === 'P2'
                    ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    : selectedTicket.priority === 'P3'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }>
                    {selectedTicket.priority}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Reported By</h3>
                  <p className="text-sm">{selectedTicket.createdBy}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Assigned To</h3>
                  <p className="text-sm">{selectedTicket.assignedTo || 'Unassigned'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Created</h3>
                  <p className="text-sm">{format(new Date(selectedTicket.createdAt), 'MMM d, yyyy HH:mm')}</p>
                </div>
                {selectedTicket.resolvedAt && (
                  <div>
                    <h3 className="text-sm font-medium">Resolved</h3>
                    <p className="text-sm">{format(new Date(selectedTicket.resolvedAt), 'MMM d, yyyy HH:mm')}</p>
                  </div>
                )}
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium">Description</h3>
                  <p className="text-sm mt-1">{selectedTicket.description}</p>
                </div>
              </div>
              
              {/* Activity History */}
              <div className="mt-6">
                <h3 className="text-md font-medium mb-2">Activity History</h3>
                <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
                  {selectedTicket.audit.length > 0 ? (
                    selectedTicket.audit.map((entry, index) => (
                      <div key={index} className="p-3">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{entry.performedBy}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(entry.timestamp), 'MMM d, yyyy HH:mm')}
                          </p>
                        </div>
                        <p className="text-sm mt-1">{entry.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No activity recorded yet
                    </div>
                  )}
                </div>
              </div>
              
              {/* Add Notes Section */}
              {!isUpdating && !isClosing && !['resolved', 'closed', 'fulfilled'].includes(selectedTicket.status) && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-md font-medium mb-2">Add Note</h3>
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="Add a note to this ticket..." 
                      className="min-h-[80px]"
                    />
                    <Button className="self-end">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TicketList;
