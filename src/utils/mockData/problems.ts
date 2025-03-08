
import { Problem, KnownError, ProblemStatus } from '../types/problem';
import { createAuditEntries } from './auditHelpers';

// Mock problems
export const mockProblems: Problem[] = [
  {
    id: 'PRB00001',
    title: 'Recurring network outages in Building B',
    description: 'Users in Building B report network outages lasting 5-10 minutes several times per day',
    status: 'under-investigation',
    priority: 'P1',
    category: 'network',
    createdBy: 'user-2',
    assignedTo: 'user-3',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 7)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    audit: createAuditEntries('PRB00001', 'problem', 'user-2'),
    relatedIncidents: ['INC00003', 'INC00005'],
    resolutionPlan: 'Investigating network switches in Building B'
  },
  {
    id: 'PRB00002',
    title: 'Email delivery delays',
    description: 'Multiple users report emails taking over 30 minutes to deliver both internally and externally',
    status: 'root-cause-identified',
    priority: 'P2',
    category: 'software',
    createdBy: 'user-3',
    assignedTo: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    audit: createAuditEntries('PRB00002', 'problem', 'user-3'),
    relatedIncidents: ['INC00002'],
    rootCause: 'Mail server configuration issue resulting in queue processing delays',
    resolutionPlan: 'Reconfigure mail server queue processing parameters'
  },
  {
    id: 'PRB00003',
    title: 'Database performance degradation',
    description: 'CRM application experiencing slowdowns during peak hours',
    status: 'known-error',
    priority: 'P2',
    category: 'software',
    createdBy: 'user-1',
    assignedTo: 'user-3',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 14)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    audit: createAuditEntries('PRB00003', 'problem', 'user-1'),
    relatedIncidents: ['INC00001', 'INC00004'],
    rootCause: 'Inefficient database queries causing high CPU usage',
    workaround: 'Restart the database service when performance degrades',
    knownErrorId: 'KE00001'
  },
  {
    id: 'PRB00004',
    title: 'Printer connectivity issues',
    description: 'Users unable to connect to network printers intermittently',
    status: 'resolved',
    priority: 'P3',
    category: 'hardware',
    createdBy: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 21)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    resolvedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    audit: createAuditEntries('PRB00004', 'problem', 'user-2'),
    relatedIncidents: ['INC00006'],
    rootCause: 'Outdated printer drivers causing connection drops',
    resolutionStatus: 'resolved',
    resolutionDescription: 'Updated printer drivers on all workstations',
    closureNotes: 'Problem resolved by updating printer drivers. Communicated fix to all users.'
  },
  {
    id: 'PRB00005',
    title: 'VPN authentication failures',
    description: 'Remote workers experiencing random VPN disconnections and authentication failures',
    status: 'closed',
    priority: 'P1',
    category: 'network',
    createdBy: 'user-3',
    assignedTo: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 30)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 7)),
    resolvedAt: new Date(new Date().setDate(new Date().getDate() - 8)),
    closedAt: new Date(new Date().setDate(new Date().getDate() - 7)),
    audit: createAuditEntries('PRB00005', 'problem', 'user-3'),
    relatedIncidents: ['INC00007', 'INC00008'],
    rootCause: 'VPN server certificate expired',
    resolutionStatus: 'resolved',
    resolutionDescription: 'Renewed VPN server certificate and implemented monitoring to alert before expiration',
    closureNotes: 'Problem resolved by renewing the certificate. Added to certificate monitoring system to prevent recurrence.'
  }
];

// Mock known errors
export const mockKnownErrors: KnownError[] = [
  {
    id: 'KE00001',
    problemId: 'PRB00003',
    title: 'CRM Database Performance Degradation',
    description: 'CRM application experiences slowdowns during peak hours due to inefficient database queries',
    symptoms: 'Slow page loads, timeout errors, delayed data retrieval in CRM application',
    workaround: 'Restart the database service when performance degrades. This requires admin privileges.',
    affectedServices: ['CRM System', 'Sales Reporting'],
    status: 'active',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 5))
  },
  {
    id: 'KE00002',
    problemId: 'PRB00002',
    title: 'Email Delivery Delays',
    description: 'Emails take over 30 minutes to deliver both internally and externally due to mail server configuration',
    symptoms: 'Delayed email delivery, missing emails, out of order email threads',
    workaround: 'For urgent communications, use the messaging system instead of email',
    affectedServices: ['Email', 'Notifications'],
    status: 'active',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 3))
  }
];

// Helper function to get problems
export const getProblems = (): Problem[] => {
  return mockProblems;
};

// Helper function to get problem by ID
export const getProblemById = (id: string): Problem | undefined => {
  return mockProblems.find(problem => problem.id === id);
};

// Helper function to get known errors
export const getKnownErrors = (): KnownError[] => {
  return mockKnownErrors;
};

// Helper function to get known error by ID
export const getKnownErrorById = (id: string): KnownError | undefined => {
  return mockKnownErrors.find(error => error.id === id);
};

// Helper function to get known errors by problem ID
export const getKnownErrorsByProblemId = (problemId: string): KnownError[] => {
  return mockKnownErrors.filter(error => error.problemId === problemId);
};

// Helper function to get next problem ID
export const getNextProblemId = (): string => {
  const maxId = Math.max(...mockProblems.map(problem => parseInt(problem.id.replace('PRB', ''), 10)));
  return `PRB${(maxId + 1).toString().padStart(5, '0')}`;
};

// Helper function to get next known error ID
export const getNextKnownErrorId = (): string => {
  const maxId = Math.max(...mockKnownErrors.map(error => parseInt(error.id.replace('KE', ''), 10)));
  return `KE${(maxId + 1).toString().padStart(5, '0')}`;
};
