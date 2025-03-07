
import { v4 as uuidv4 } from 'uuid';
import { Ticket, TicketStatus, TicketPriority, TicketType, PaginatedResponse } from '../types';

// Define the TicketComment interface since it's missing from the types file
interface TicketComment {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date;
}

// Mock data for conversation history
export const mockConversationHistory: Record<string, TicketComment[]> = {};

// Create a new ticket
export const createTicket = async (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'audit'>): Promise<{ success: boolean; data?: Ticket; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate ID and dates
    const id = uuidv4();
    const now = new Date();
    
    // Create new ticket object
    const newTicket: Ticket = {
      id,
      ...ticketData,
      assignedTo: ticketData.assignedTo || undefined,
      createdAt: now,
      updatedAt: now,
      audit: []
    };
    
    return { success: true, data: newTicket };
  } catch (error) {
    console.error('Error creating ticket:', error);
    return { success: false, error: 'Failed to create ticket. Please try again later.' };
  }
};

// Fetch all tickets
export const fetchTickets = async (): Promise<{ success: boolean; data?: Ticket[]; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For now, return empty array as we don't have persistent storage
    // In a real application, this would fetch from an API or database
    return { success: true, data: [] };
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return { success: false, error: 'Failed to fetch tickets. Please try again later.' };
  }
};

// Get tickets by type with pagination
export const getTicketsByType = async (type: TicketType, page: number, limit: number): Promise<PaginatedResponse<Ticket>> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return data in the format expected by the component
    return {
      items: [],
      total: 0,
      page,
      limit,
      totalPages: 0
    };
  } catch (error) {
    console.error('Error fetching tickets by type:', error);
    // Since we're returning PaginatedResponse<Ticket> directly, we need to 
    // still return a valid object even on error
    return {
      items: [],
      total: 0,
      page,
      limit,
      totalPages: 0
    };
  }
};

// Fetch a single ticket by ID
export const fetchTicketById = async (id: string): Promise<{ success: boolean; data?: Ticket; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real application, this would fetch from an API or database
    // For now, return error as we don't have persistent storage
    return { success: false, error: 'Ticket not found' };
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return { success: false, error: 'Failed to fetch ticket. Please try again later.' };
  }
};

// Update ticket
export const updateTicket = async (id: string, ticketData: Partial<Ticket>): Promise<{ success: boolean; data?: Ticket; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real application, this would update in an API or database
    // For now, return success but the data won't persist
    const updatedTicket: Ticket = {
      id,
      title: ticketData.title || 'Unknown',
      description: ticketData.description || '',
      type: ticketData.type as TicketType || 'incident',
      priority: ticketData.priority as TicketPriority || 'medium',
      status: ticketData.status as TicketStatus || 'open',
      createdBy: ticketData.createdBy || 'unknown',
      assignedTo: ticketData.assignedTo,
      createdAt: new Date(),
      updatedAt: new Date(),
      category: ticketData.category || 'other',
      audit: []
    };
    
    return { success: true, data: updatedTicket };
  } catch (error) {
    console.error('Error updating ticket:', error);
    return { success: false, error: 'Failed to update ticket. Please try again later.' };
  }
};

// Add comment to ticket
export const addComment = async (ticketId: string, commentData: Omit<TicketComment, 'id' | 'createdAt'>): Promise<{ success: boolean; data?: TicketComment; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create new comment
    const newComment: TicketComment = {
      id: uuidv4(),
      ...commentData,
      createdAt: new Date()
    };
    
    // Add to conversation history if it exists
    if (mockConversationHistory[ticketId]) {
      mockConversationHistory[ticketId].push(newComment);
    } else {
      // Initialize if doesn't exist
      mockConversationHistory[ticketId] = [newComment];
    }
    
    return { success: true, data: newComment };
  } catch (error) {
    console.error('Error adding comment:', error);
    return { success: false, error: 'Failed to add comment. Please try again later.' };
  }
};

// Fetch comments for a ticket
export const fetchComments = async (ticketId: string): Promise<{ success: boolean; data?: TicketComment[]; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return comments from conversation history if it exists
    const comments = mockConversationHistory[ticketId] || [];
    
    return { success: true, data: comments };
  } catch (error) {
    console.error('Error fetching comments:', error);
    return { success: false, error: 'Failed to fetch comments. Please try again later.' };
  }
};

// Assign ticket
export const assignTicket = async (ticketId: string, userId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real application, this would update in an API or database
    return { success: true };
  } catch (error) {
    console.error('Error assigning ticket:', error);
    return { success: false, error: 'Failed to assign ticket. Please try again later.' };
  }
};

// Change ticket status
export const changeTicketStatus = async (ticketId: string, status: TicketStatus): Promise<{ success: boolean; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real application, this would update in an API or database
    return { success: true };
  } catch (error) {
    console.error('Error changing ticket status:', error);
    return { success: false, error: 'Failed to change ticket status. Please try again later.' };
  }
};

// Export as a namespace to fix the import in index.ts
export const ticketApi = {
  createTicket,
  fetchTickets,
  getTicketsByType,
  fetchTicketById,
  updateTicket,
  addComment,
  fetchComments,
  assignTicket,
  changeTicketStatus
};
