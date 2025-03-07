
import { v4 as uuidv4 } from 'uuid';
import { Ticket, TicketComment, TicketPriority, TicketStatus, TicketType } from '../types';
import { simulateApiResponse } from '../mockData/apiHelpers';
import { users } from '../mockData';

// Mock data for conversation history
export const mockConversationHistory: Record<string, TicketComment[]> = {};

// Create a new ticket
export const createTicket = async (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'assignee' | 'comments'>): Promise<{ success: boolean; data?: Ticket; error?: string }> => {
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
      assignee: null, // Initially unassigned
      status: 'open',
      createdAt: now,
      updatedAt: now,
      comments: []
    };
    
    // Initialize conversation history for this ticket
    mockConversationHistory[id] = [];
    
    return simulateApiResponse({ success: true, data: newTicket }, '200');
  } catch (error) {
    console.error('Error creating ticket:', error);
    return simulateApiResponse({ success: false, error: 'Failed to create ticket. Please try again later.' }, '500');
  }
};

// Fetch all tickets
export const fetchTickets = async (): Promise<{ success: boolean; data?: Ticket[]; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For now, return empty array as we don't have persistent storage
    // In a real application, this would fetch from an API or database
    return simulateApiResponse({ success: true, data: [] }, '200');
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return simulateApiResponse({ success: false, error: 'Failed to fetch tickets. Please try again later.' }, '500');
  }
};

// Fetch a single ticket by ID
export const fetchTicketById = async (id: string): Promise<{ success: boolean; data?: Ticket; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real application, this would fetch from an API or database
    // For now, return error as we don't have persistent storage
    return simulateApiResponse({ success: false, error: 'Ticket not found' }, '404');
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return simulateApiResponse({ success: false, error: 'Failed to fetch ticket. Please try again later.' }, '500');
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
      requester: ticketData.requester || 'unknown',
      assignee: ticketData.assignee || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: []
    };
    
    return simulateApiResponse({ success: true, data: updatedTicket }, '200');
  } catch (error) {
    console.error('Error updating ticket:', error);
    return simulateApiResponse({ success: false, error: 'Failed to update ticket. Please try again later.' }, '500');
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
    
    return simulateApiResponse({ success: true, data: newComment }, '200');
  } catch (error) {
    console.error('Error adding comment:', error);
    return simulateApiResponse({ success: false, error: 'Failed to add comment. Please try again later.' }, '500');
  }
};

// Fetch comments for a ticket
export const fetchComments = async (ticketId: string): Promise<{ success: boolean; data?: TicketComment[]; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return comments from conversation history if it exists
    const comments = mockConversationHistory[ticketId] || [];
    
    return simulateApiResponse({ success: true, data: comments }, '200');
  } catch (error) {
    console.error('Error fetching comments:', error);
    return simulateApiResponse({ success: false, error: 'Failed to fetch comments. Please try again later.' }, '500');
  }
};

// Assign ticket
export const assignTicket = async (ticketId: string, userId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real application, this would update in an API or database
    return simulateApiResponse({ success: true }, '200');
  } catch (error) {
    console.error('Error assigning ticket:', error);
    return simulateApiResponse({ success: false, error: 'Failed to assign ticket. Please try again later.' }, '500');
  }
};

// Change ticket status
export const changeTicketStatus = async (ticketId: string, status: TicketStatus): Promise<{ success: boolean; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real application, this would update in an API or database
    return simulateApiResponse({ success: true }, '200');
  } catch (error) {
    console.error('Error changing ticket status:', error);
    return simulateApiResponse({ success: false, error: 'Failed to change ticket status. Please try again later.' }, '500');
  }
};
