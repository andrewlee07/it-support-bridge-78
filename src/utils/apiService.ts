import {
  Ticket,
  User,
  Asset,
  ChangeRequest,
  SLA,
  TicketFilter,
  ApiResponse,
  PaginatedResponse,
  TicketType,
  EmailTemplate,
  RiskAssessmentQuestion
} from './types';

import {
  mockTickets,
  mockUsers,
  mockAssets,
  mockChangeRequests,
  mockSLAs,
  mockEmailTemplates,
  mockRiskAssessmentQuestions,
  simulateApiResponse,
  simulatePaginatedResponse,
  getUserById,
  getTicketById,
  getAssetById,
  getChangeRequestById,
  calculateRiskLevel,
  getDashboardStats
} from './mockData';

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
};

// User API
export const userApi = {
  // Get all users with optional pagination
  getUsers: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<User>> => {
    return simulatePaginatedResponse(mockUsers, page, limit);
  },
  
  // Get a specific user by ID
  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const user = getUserById(id);
    
    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }
    
    return simulateApiResponse(user);
  },
};

// Asset API
export const assetApi = {
  // Get all assets with optional pagination
  getAssets: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Asset>> => {
    return simulatePaginatedResponse(mockAssets, page, limit);
  },
  
  // Get a specific asset by ID
  getAssetById: async (id: string): Promise<ApiResponse<Asset>> => {
    const asset = getAssetById(id);
    
    if (!asset) {
      return {
        success: false,
        error: 'Asset not found',
      };
    }
    
    return simulateApiResponse(asset);
  },
};

// Change Management API
export const changeApi = {
  // Get all change requests with optional pagination
  getChangeRequests: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<ChangeRequest>> => {
    return simulatePaginatedResponse(mockChangeRequests, page, limit);
  },
  
  // Get a specific change request by ID
  getChangeRequestById: async (id: string): Promise<ApiResponse<ChangeRequest>> => {
    const change = getChangeRequestById(id);
    
    if (!change) {
      return {
        success: false,
        error: 'Change request not found',
      };
    }
    
    return simulateApiResponse(change);
  },
  
  // Get risk assessment questions
  getRiskAssessmentQuestions: async (): Promise<ApiResponse<RiskAssessmentQuestion[]>> => {
    return simulateApiResponse(mockRiskAssessmentQuestions);
  },
  
  // Calculate risk score and level
  calculateRiskScore: async (
    answers: { questionId: string; selectedOptionId: string }[]
  ): Promise<ApiResponse<{ score: number; level: string }>> => {
    let totalScore = 0;
    let totalWeight = 0;
    
    // For each answer, find the question and selected option
    for (const answer of answers) {
      const question = mockRiskAssessmentQuestions.find(q => q.id === answer.questionId);
      
      if (question) {
        const option = question.answers.find(a => a.id === answer.selectedOptionId);
        
        if (option) {
          totalScore += option.value * question.weight;
          totalWeight += question.weight;
        }
      }
    }
    
    // Calculate weighted average score
    const score = totalWeight > 0 ? totalScore / totalWeight : 0;
    const level = calculateRiskLevel(score);
    
    return simulateApiResponse({ score, level });
  },
};

// SLA API
export const slaApi = {
  // Get all SLAs
  getSLAs: async (): Promise<ApiResponse<SLA[]>> => {
    return simulateApiResponse(mockSLAs);
  },
};

// Email Template API
export const emailApi = {
  // Get all email templates
  getEmailTemplates: async (): Promise<ApiResponse<EmailTemplate[]>> => {
    return simulateApiResponse(mockEmailTemplates);
  },
};

// Dashboard API
export const dashboardApi = {
  // Get dashboard statistics
  getDashboardStats: async (): Promise<ApiResponse<any>> => {
    const stats = getDashboardStats();
    return simulateApiResponse(stats);
  },
};

// Export all APIs
export const api = {
  tickets: ticketApi,
  users: userApi,
  assets: assetApi,
  changes: changeApi,
  slas: slaApi,
  emails: emailApi,
  dashboard: dashboardApi,
};

export default api;
