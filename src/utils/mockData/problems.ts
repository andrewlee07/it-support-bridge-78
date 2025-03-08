
import { Problem, KnownError, ProblemStatus, ProblemPriority } from '../types/problem';
import { generateAuditEntries } from './auditHelpers';
import { AuditEntry } from '../types/audit';

let problems: Problem[] = [
  {
    id: 'PRB00001',
    title: 'Recurring network outages in the east wing',
    description: 'Users in the east wing experience intermittent network connectivity every morning between 9-10am.',
    status: 'under-investigation' as ProblemStatus,
    priority: 'P1' as ProblemPriority,
    category: 'network',
    createdBy: 'john.doe',
    assignedTo: 'jane.smith',
    createdAt: new Date('2024-02-15T08:30:00Z'),
    updatedAt: new Date('2024-02-15T14:45:00Z'),
    audit: generateAuditEntries(5, 'PRB00001', 'problem' as any),
    relatedIncidents: ['INC00123', 'INC00124', 'INC00125'],
    rootCause: '',
    resolutionPlan: 'Investigate the network switches in the east wing.',
    affectedServices: ['Email', 'Intranet']
  },
  {
    id: 'PRB00002',
    title: 'Application crashes when processing large files',
    description: 'The document management system consistently crashes when users attempt to upload files larger than 500MB.',
    status: 'root-cause-identified' as ProblemStatus,
    priority: 'P2' as ProblemPriority,
    category: 'application',
    createdBy: 'john.doe',
    assignedTo: 'alex.kumar',
    createdAt: new Date('2024-02-10T10:15:00Z'),
    updatedAt: new Date('2024-02-16T09:30:00Z'),
    audit: generateAuditEntries(8, 'PRB00002', 'problem' as any),
    relatedIncidents: ['INC00120', 'INC00132'],
    rootCause: 'Memory allocation issue in file processing module',
    resolutionPlan: 'Patch the application to properly handle memory for large files.',
    affectedServices: ['Document Management System']
  },
  {
    id: 'PRB00003',
    title: 'Login page errors during peak hours',
    description: 'Users report intermittent errors when logging in during peak hours (8-9am and 1-2pm).',
    status: 'known-error' as ProblemStatus,
    priority: 'P1' as ProblemPriority,
    category: 'application',
    createdBy: 'maria.garcia',
    assignedTo: 'alex.kumar',
    createdAt: new Date('2024-02-05T13:45:00Z'),
    updatedAt: new Date('2024-02-14T16:20:00Z'),
    audit: generateAuditEntries(12, 'PRB00003', 'problem' as any),
    relatedIncidents: ['INC00110', 'INC00115', 'INC00118', 'INC00126'],
    rootCause: 'Authentication server overload during concurrent login attempts',
    resolutionPlan: 'Upgrade authentication server capacity and implement load balancing.',
    workaround: 'Users should retry login after 1-2 minutes if they encounter an error.',
    knownErrorId: 'KE00001',
    affectedServices: ['Authentication', 'HR Portal', 'CRM']
  },
  {
    id: 'PRB00004',
    title: 'Email delivery delays to external domains',
    description: 'Emails sent to external domains are consistently delayed by 30+ minutes.',
    status: 'resolved' as ProblemStatus,
    priority: 'P2' as ProblemPriority,
    category: 'email',
    createdBy: 'jane.smith',
    assignedTo: 'john.doe',
    createdAt: new Date('2024-01-25T09:00:00Z'),
    updatedAt: new Date('2024-02-10T11:30:00Z'),
    resolvedAt: new Date('2024-02-10T11:30:00Z'),
    audit: generateAuditEntries(10, 'PRB00004', 'problem' as any),
    relatedIncidents: ['INC00095', 'INC00097', 'INC00100'],
    rootCause: 'Misconfigured spam filtering rules causing message queue backlog',
    resolutionDescription: 'Reconfigured spam filtering rules and optimized the mail queue processing.',
    resolutionStatus: 'resolved',
    affectedServices: ['Email']
  },
  {
    id: 'PRB00005',
    title: 'Printers offline after Windows update',
    description: 'Multiple network printers go offline after the latest Windows security update was deployed.',
    status: 'closed' as ProblemStatus,
    priority: 'P3' as ProblemPriority,
    category: 'hardware',
    createdBy: 'alex.kumar',
    assignedTo: 'maria.garcia',
    createdAt: new Date('2024-01-18T14:20:00Z'),
    updatedAt: new Date('2024-02-01T15:45:00Z'),
    resolvedAt: new Date('2024-01-30T09:15:00Z'),
    closedAt: new Date('2024-02-01T15:45:00Z'),
    audit: generateAuditEntries(15, 'PRB00005', 'problem' as any),
    relatedIncidents: ['INC00080', 'INC00082', 'INC00085', 'INC00086'],
    rootCause: 'Windows update KB500123 conflicts with printer driver',
    resolutionDescription: 'Updated printer drivers to version compatible with the Windows security update.',
    resolutionStatus: 'resolved',
    closureNotes: 'All affected printers are now functioning properly. Users have reported no further issues.',
    affectedServices: ['Printing Services']
  }
];

let knownErrors: KnownError[] = [
  {
    id: 'KE00001',
    problemId: 'PRB00003',
    title: 'Authentication server overload during peak hours',
    description: 'The authentication server cannot handle the volume of concurrent login attempts during peak hours (8-9am and 1-2pm).',
    symptoms: 'Login errors, slow authentication, session timeouts at peak hours',
    workaround: 'Users should retry login after 1-2 minutes if they encounter an error. Alternatively, avoid logging in during peak hours if possible.',
    affectedServices: ['Authentication', 'HR Portal', 'CRM'],
    status: 'active',
    createdAt: new Date('2024-02-14T16:20:00Z'),
    updatedAt: new Date('2024-02-14T16:20:00Z')
  }
];

export const getProblemById = (id: string): Problem | undefined => {
  return problems.find(problem => problem.id === id);
};

export const getAllProblems = (): Problem[] => {
  return [...problems];
};

export const getKnownErrorById = (id: string): KnownError | undefined => {
  return knownErrors.find(ke => ke.id === id);
};

export const getAllKnownErrors = (): KnownError[] => {
  return [...knownErrors];
};

export const createProblem = (problem: Omit<Problem, 'id' | 'createdAt' | 'updatedAt' | 'audit'>): Problem => {
  const newId = `PRB${(problems.length + 1).toString().padStart(5, '0')}`;
  const now = new Date();
  
  const newProblem: Problem = {
    id: newId,
    createdAt: now,
    updatedAt: now,
    audit: [] as AuditEntry[],
    ...problem
  };
  
  problems.push(newProblem);
  return newProblem;
};

export const createKnownError = (knownError: Omit<KnownError, 'id' | 'createdAt' | 'updatedAt'>): KnownError => {
  const newId = `KE${(knownErrors.length + 1).toString().padStart(5, '0')}`;
  const now = new Date();
  
  const newKnownError: KnownError = {
    id: newId,
    createdAt: now,
    updatedAt: now,
    ...knownError
  };
  
  knownErrors.push(newKnownError);
  return newKnownError;
};

export const updateProblem = (id: string, updates: Partial<Problem>): Problem | undefined => {
  const index = problems.findIndex(problem => problem.id === id);
  if (index === -1) return undefined;
  
  problems[index] = {
    ...problems[index],
    ...updates,
    updatedAt: new Date()
  };
  
  return problems[index];
};
