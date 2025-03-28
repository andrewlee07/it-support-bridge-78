
/**
 * Route constants for the End User Portal
 * 
 * This file provides centralized route paths for the end user portal
 * to ensure a clear separation between internal and external views.
 */

// Main portal route
export const PORTAL = '/portal';

// Portal-specific routes
export const PORTAL_INCIDENT_DETAIL = (id: string) => `/portal/incidents/${id}`;
export const PORTAL_SERVICE_REQUEST_DETAIL = (id: string) => `/portal/service-requests/${id}`;
export const PORTAL_KNOWLEDGE_ARTICLE = (id: string) => `/portal/knowledge/${id}`;
export const PORTAL_MY_APPROVALS = '/portal/my-approvals';
export const PORTAL_MY_INCIDENTS = '/portal/my-incidents';
export const PORTAL_MY_REQUESTS = '/portal/my-requests';
export const PORTAL_NEW_INCIDENT = '/portal/incident';
export const PORTAL_NEW_SERVICE_REQUEST = '/portal/service-request';

// Portal approval details
export const PORTAL_APPROVAL_DETAIL = (id: string, type: string) => 
  `/portal/approvals/${type}/${id}`;
