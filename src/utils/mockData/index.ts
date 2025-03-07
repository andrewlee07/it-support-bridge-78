
// Re-export all mock data from individual files
import { mockUsers, getUserById } from './users';
import { 
  mockTickets, 
  getTicketById, 
  getTicketsByType, 
  getTicketsByStatus, 
  getTicketsByPriority,
  generateIncidentId,
  generateServiceRequestId
} from './tickets';
import { mockAssets, getAssetById, generateAssetId } from './assets';
import { 
  mockChangeRequests, 
  getChangeRequestById, 
  mockRiskAssessmentQuestions, 
  calculateRiskLevel 
} from './changeManagement';
import { mockSLAs } from './slas';
import { mockEmailTemplates } from './emailTemplates';
import { getDashboardStats } from './dashboardStats';
import { simulateApiResponse, simulatePaginatedResponse, delay, createApiSuccessResponse, createApiErrorResponse } from './apiHelpers';

// Import all test management exports
import {
  testCases,
  fetchTestCases,
  fetchTestCaseById,
  createTestCase,
  updateTestCase,
  deleteTestCase,
  bugs,
  fetchBugs,
  fetchBugById,
  createBug,
  updateBug,
  testCycles,
  fetchTestCycles,
  createTestCycle,
  testExecutions,
  executeTest,
  fetchTestStats
} from './testData';

// Import backlog items exports
import {
  backlogItems,
  fetchBacklogItems,
  fetchBacklogItemById,
  createBacklogItem,
  updateBacklogItem,
  assignToRelease,
  removeFromRelease,
  getBacklogStats
} from './backlogItems';

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
  generateIncidentId,
  generateServiceRequestId,
  
  // Assets
  mockAssets,
  getAssetById,
  generateAssetId,
  
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
  simulatePaginatedResponse,
  delay,
  createApiSuccessResponse,
  createApiErrorResponse,
  
  // Test Management
  testCases,
  fetchTestCases,
  fetchTestCaseById,
  createTestCase,
  updateTestCase,
  deleteTestCase,
  bugs,
  fetchBugs,
  fetchBugById,
  createBug,
  updateBug,
  testCycles,
  fetchTestCycles,
  createTestCycle,
  testExecutions,
  executeTest,
  fetchTestStats,
  
  // Backlog Management
  backlogItems,
  fetchBacklogItems,
  fetchBacklogItemById,
  createBacklogItem,
  updateBacklogItem,
  assignToRelease,
  removeFromRelease,
  getBacklogStats
};
