import { 
  Ticket, 
  TicketFilter, 
  TicketType, 
  ApiResponse, 
  PaginatedResponse 
} from '../types';
import { 
  mockTickets, 
  getTicketById, 
  simulateApiResponse, 
  simulatePaginatedResponse, 
  mockConversationHistory,
  delay,
  uuidv4,
  CommentData
} from '../mockData';

// Ticket API
export const ticketApi = {
  // Get all tickets with optional filtering and pagination
  getTickets: async (
    filter?: TicketFilter,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Ticket>> => {
    let filteredTickets = [...mockTickets];
    
    if (filter) {
      // Apply filters
      if (filter.type && filter.type.length > 0) {
        filteredTickets = filteredTickets.filter(ticket => 
          filter.type?.includes(ticket.type)
        );
      }
      
      if (filter.status && filter.status.length > 0) {
        filteredTickets = filteredTickets.filter(ticket => 
          filter.status?.includes(ticket.status)
        );
      }
      
      if (filter.priority && filter.priority.length > 0) {
        filteredTickets = filteredTickets.filter(ticket => 
          filter.priority?.includes(ticket.priority)
        );
      }
      
      if (filter.category && filter.category.length > 0) {
        filteredTickets = filteredTickets.filter(ticket => 
          filter.category?.includes(ticket.category)
        );
      }
      
      if (filter.assignedTo) {
        filteredTickets = filteredTickets.filter(ticket => 
          ticket.assignedTo === filter.assignedTo
        );
      }
      
      if (filter.createdBy) {
        filteredTickets = filteredTickets.filter(ticket => 
          ticket.createdBy === filter.createdBy
        );
      }
      
      if (filter.dateFrom) {
        filteredTickets = filteredTickets.filter(ticket => 
          new Date(ticket.createdAt) >= new Date(filter.dateFrom!)
        );
      }
      
      if (filter.dateTo) {
        filteredTickets = filteredTickets.filter(ticket => 
          new Date(ticket.createdAt) <= new Date(filter.dateTo!)
        );
      }
      
      if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase();
        filteredTickets = filteredTickets.filter(ticket => 
          ticket.title.toLowerCase().includes(query) || 
          ticket.description.toLowerCase().includes(query)
        );
      }
    }
    
    // Sort by createdAt (most recent first)
    filteredTickets.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return simulatePaginatedResponse(filteredTickets, page, limit);
  },
  
  // Get tickets by type
  getTicketsByType: async (
    type: TicketType,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Ticket>> => {
    const typeTickets = mockTickets.filter(ticket => ticket.type === type);
    return simulatePaginatedResponse(typeTickets, page, limit);
  },
  
  // Get a specific ticket by ID
  getTicketById: async (id: string): Promise<ApiResponse<Ticket>> => {
    const ticket = getTicketById(id);
    
    if (!ticket) {
      return {
        success: false,
        error: 'Ticket not found',
      };
    }
    
    return simulateApiResponse(ticket);
  },
  
  // Create a new ticket
  createTicket: async (ticketData: Partial<Ticket>): Promise<ApiResponse<Ticket>> => {
    // In a real API, this would validate and save to a database
    const newTicket: Ticket = {
      id: `ticket-${mockTickets.length + 1}`,
      title: ticketData.title || '',
      description: ticketData.description || '',
      status: ticketData.status || 'open',
      priority: ticketData.priority || 'medium',
      category: ticketData.category || 'other',
      type: ticketData.type || 'incident',
      createdBy: ticketData.createdBy || 'user-1', // Default to first user if not specified
      createdAt: new Date(),
      updatedAt: new Date(),
      audit: [
        {
          id: `audit-ticket-${mockTickets.length + 1}-1`,
          entityId: `ticket-${mockTickets.length + 1}`,
          entityType: 'ticket',
          message: 'Ticket created',
          performedBy: ticketData.createdBy || 'user-1',
          timestamp: new Date(),
        }
      ],
    };
    
    // In a real implementation, we would add the ticket to the database
    // For now, we'll just return the new ticket
    return simulateApiResponse(newTicket, 1000);
  },
  
  // Update an existing ticket
  updateTicket: async (
    id: string, 
    ticketData: Partial<Ticket>
  ): Promise<ApiResponse<Ticket>> => {
    const ticket = getTicketById(id);
    
    if (!ticket) {
      return {
        success: false,
        error: 'Ticket not found',
      };
    }
    
    // In a real API, this would update the database record
    const updatedTicket: Ticket = {
      ...ticket,
      ...ticketData,
      updatedAt: new Date(),
    };
    
    return simulateApiResponse(updatedTicket, 1000);
  },
  
  // Get conversation history for a ticket
  getConversationHistory: (ticketId: string) => {
    return simulateApiResponse(mockConversationHistory[ticketId] || [], undefined);
  },
  
  // Create a comment for a ticket
  createComment: async (ticketId: string, commentData: CommentData) => {
    await delay(500);
    const newComment = {
      id: uuidv4(),
      ...commentData,
      createdAt: new Date(),
    };
    
    if (!mockConversationHistory[ticketId]) {
      mockConversationHistory[ticketId] = [];
    }
    
    mockConversationHistory[ticketId].push(newComment);
    return simulateApiResponse(newComment, undefined);
  },
};
