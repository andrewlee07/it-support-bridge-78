
/**
 * Route constants for the application
 * 
 * This file provides a centralized place for all route paths to ensure consistency
 * across the application and prevent broken links when making UI changes.
 */

// Root routes
export const ROOT = '/';
export const LOGIN = '/login';
export const DASHBOARD = '/dashboard';

// Change Management routes
export const CHANGES = '/changes';
export const CHANGE_DETAIL = (id: string) => `/changes/${id}`;
export const NEW_CHANGE = '/changes/new';
export const EDIT_CHANGE = (id: string) => `/changes/${id}/edit`;
export const REJECT_CHANGE = (id: string) => `/changes/${id}/reject`;
export const CLOSE_CHANGE = (id: string) => `/changes/${id}/close`;

// Ticket routes
export const INCIDENTS = '/incidents';
export const INCIDENT_DETAIL = (id: string) => `/incidents/${id}`;
export const NEW_INCIDENT = '/incidents/create';
export const EDIT_INCIDENT = (id: string) => `/incidents/edit/${id}`;

export const SERVICE_REQUESTS = '/service-requests';
export const SERVICE_REQUEST_DETAIL = (id: string) => `/service-requests/${id}`;
export const NEW_SERVICE_REQUEST = '/service-requests/create';
export const EDIT_SERVICE_REQUEST = (id: string) => `/service-requests/edit/${id}`;

// Problem Management routes
export const PROBLEMS = '/problems';
export const PROBLEM_DETAIL = (id: string) => `/problems/${id}`;
export const NEW_PROBLEM = '/problems/create';
export const EDIT_PROBLEM = (id: string) => `/problems/edit/${id}`;
export const KNOWN_ERRORS = '/problems/known-errors';

// Task Management routes
export const TASKS = '/tasks';
export const TASK_DASHBOARD = '/tasks/dashboard';
export const TASK_DETAIL = (id: string) => `/tasks/${id}`;
export const NEW_TASK = '/tasks/create';
export const EDIT_TASK = (id: string) => `/tasks/edit/${id}`;

// Assets routes
export const ASSETS = '/assets';
export const ASSET_DETAIL = (id: string) => `/assets/${id}`;
export const NEW_ASSET = '/assets/create';
export const EDIT_ASSET = (id: string) => `/assets/edit/${id}`;

// Knowledge routes
export const KNOWLEDGE = '/knowledge';
export const KNOWLEDGE_ARTICLE = (id: string) => `/knowledge/article/${id}`;
export const NEW_KNOWLEDGE_ARTICLE = '/knowledge/create';

// Test Management routes
export const TESTING = '/testing';
export const TEST_CASES = '/testing/cases';
export const TEST_CASE_DETAIL = (id: string) => `/testing/cases/${id}`;
export const NEW_TEST_CASE = '/testing/cases/create';
export const EDIT_TEST_CASE = (id: string) => `/testing/cases/edit/${id}`;
export const TEST_EXECUTION = (id: string) => `/testing/execution/${id}`;

// Calendar
export const CALENDAR = '/calendar';

// Reports
export const REPORTS = '/reports';
export const REPORT_CATEGORY = (category: string) => `/reports/${category}`;

// Portal routes
export const PORTAL = '/portal';
export const PORTAL_APPROVALS = '/portal/my-approvals';
export const PORTAL_INCIDENTS = '/portal/my-incidents';
export const PORTAL_REQUESTS = '/portal/my-requests';

// User Settings
export const SETTINGS = '/settings';
export const PROFILE = '/profile';

// Admin routes
export const ADMIN = '/admin';
export const ADMIN_SLA = '/admin/sla';
export const ADMIN_STATUS_SYNC = '/admin/status-sync';
export const ADMIN_CHANGE_RISK = '/admin/change-risk';
