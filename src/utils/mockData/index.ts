
// Re-export all mock data from individual files
import { mockUsers, getUserById } from './users';
import { 
  mockTickets, 
  getTicketById, 
  getTicketsByType, 
  getTicketsByStatus, 
  getTicketsByPriority 
} from './tickets';
import { mockAssets, getAssetById } from './assets';
import { 
  mockChangeRequests, 
  getChangeRequestById, 
  mockRiskAssessmentQuestions, 
  calculateRiskLevel 
} from './changeManagement';
import { mockSLAs } from './slas';
import { mockEmailTemplates } from './emailTemplates';
import { getDashboardStats } from './dashboardStats';
import { simulateApiResponse, simulatePaginatedResponse } from './apiHelpers';

// Export all mock data and helper functions
export {
  // Users
  mockUsers,
  getUserById,
  
  // Tickets
  mockTickets,
  getTicketById,
  getTicketsByType,
  getTicketsByStatus,
  getTicketsByPriority,
  
  // Assets
  mockAssets,
  getAssetById,
  
  // Change Management
  mockChangeRequests,
  getChangeRequestById,
  mockRiskAssessmentQuestions,
  calculateRiskLevel,
  
  // SLAs
  mockSLAs,
  
  // Email Templates
  mockEmailTemplates,
  
  // Dashboard Stats
  getDashboardStats,
  
  // API Helpers
  simulateApiResponse,
  simulatePaginatedResponse
};
