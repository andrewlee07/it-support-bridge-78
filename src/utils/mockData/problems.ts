
import { Problem, KnownError, ProblemStatus, ProblemPriority } from '../types/problem';
import { AuditEntry } from '../types/audit';
import { createAuditEntries } from './auditHelpers';
import { v4 as uuidv4 } from 'uuid';

// Mock data for problem management
const mockProblems: Problem[] = [
  {
    id: 'PB001234',
    title: 'Recurring network outages in Data Center A',
    description: 'Multiple instances of network downtime occurring during peak hours',
    status: 'under-investigation' as ProblemStatus,
    priority: 'P1' as ProblemPriority,
    category: 'network',
    createdBy: 'user1',
    assignedTo: 'user2',
    createdAt: new Date(Date.now() - 600000),
    updatedAt: new Date(Date.now() - 300000),
    relatedIncidents: ['INC001234', 'INC001235', 'INC001236'],
    knownErrorId: null,
    associatedServices: ['SVC001', 'SVC002'],
    audit: [
      {
        id: uuidv4(),
        entityId: 'PB001234',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 600000),
        message: 'Problem created',
        userName: 'John Doe'
      },
      {
        id: uuidv4(),
        entityId: 'PB001234',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 300000),
        message: 'Status updated to Under Investigation',
        userName: 'Jane Smith'
      }
    ]
  },
  {
    id: 'PB001235',
    title: 'Payment gateway intermittent failures',
    description: 'Payment processing fails randomly for about 5% of transactions',
    status: 'root-cause-identified' as ProblemStatus,
    priority: 'P2' as ProblemPriority,
    category: 'software',
    createdBy: 'user3',
    assignedTo: 'user4',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 43200000),
    relatedIncidents: ['INC001237', 'INC001238'],
    knownErrorId: null,
    associatedServices: ['SVC003'],
    audit: [
      {
        id: uuidv4(),
        entityId: 'PB001235',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 86400000),
        message: 'Problem created',
        userName: 'Alice Johnson'
      },
      {
        id: uuidv4(),
        entityId: 'PB001235',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 43200000),
        message: 'Root cause identified: Database connection pool exhaustion',
        userName: 'Bob Williams'
      }
    ]
  },
  {
    id: 'PB001236',
    title: 'Email delivery delays',
    description: 'System emails are being delayed by up to 30 minutes',
    status: 'known-error' as ProblemStatus,
    priority: 'P3' as ProblemPriority,
    category: 'network',
    createdBy: 'user5',
    assignedTo: 'user2',
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 86400000),
    relatedIncidents: ['INC001239'],
    knownErrorId: 'KE00123',
    associatedServices: ['SVC004'],
    audit: [
      {
        id: uuidv4(),
        entityId: 'PB001236',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 172800000),
        message: 'Problem created',
        userName: 'Charlie Brown'
      },
      {
        id: uuidv4(),
        entityId: 'PB001236',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 86400000),
        message: 'Added to Known Error Database',
        userName: 'Diana Prince'
      }
    ]
  },
  {
    id: 'PB001237',
    title: 'Application server memory leaks',
    description: 'Memory usage gradually increases until service restart is required',
    status: 'new' as ProblemStatus,
    priority: 'P2' as ProblemPriority,
    category: 'software',
    createdBy: 'user1',
    assignedTo: null,
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 259200000),
    relatedIncidents: ['INC001240', 'INC001241', 'INC001242', 'INC001243'],
    knownErrorId: null,
    associatedServices: ['SVC005', 'SVC006'],
    audit: [
      {
        id: uuidv4(),
        entityId: 'PB001237',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 259200000),
        message: 'Problem created',
        userName: 'John Doe'
      }
    ]
  },
  {
    id: 'PB001238',
    title: 'Authentication service timeouts during peak hours',
    description: 'Login attempts time out when system is under heavy load',
    status: 'resolved' as ProblemStatus,
    priority: 'P1' as ProblemPriority,
    category: 'software',
    createdBy: 'user3',
    assignedTo: 'user5',
    createdAt: new Date(Date.now() - 345600000),
    updatedAt: new Date(Date.now() - 86400000),
    relatedIncidents: ['INC001244', 'INC001245'],
    knownErrorId: null,
    associatedServices: ['SVC007'],
    audit: [
      {
        id: uuidv4(),
        entityId: 'PB001238',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 345600000),
        message: 'Problem created',
        userName: 'Alice Johnson'
      },
      {
        id: uuidv4(),
        entityId: 'PB001238',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 259200000),
        message: 'Status updated to In Progress',
        userName: 'Charlie Brown'
      },
      {
        id: uuidv4(),
        entityId: 'PB001238',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 86400000),
        message: 'Problem resolved: Increased authentication service capacity',
        userName: 'Charlie Brown'
      }
    ]
  },
  {
    id: 'PB001239',
    title: 'Customer portal showing incorrect order status',
    description: 'Order status not updating correctly after order fulfillment',
    status: 'pending' as ProblemStatus,
    pendingSubStatus: 'third-party',
    priority: 'P3' as ProblemPriority,
    category: 'software',
    createdBy: 'user4',
    assignedTo: 'user1',
    createdAt: new Date(Date.now() - 432000000),
    updatedAt: new Date(Date.now() - 345600000),
    relatedIncidents: ['INC001246'],
    knownErrorId: null,
    associatedServices: ['SVC008'],
    audit: [
      {
        id: uuidv4(),
        entityId: 'PB001239',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 432000000),
        message: 'Problem created',
        userName: 'Bob Williams'
      },
      {
        id: uuidv4(),
        entityId: 'PB001239',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 345600000),
        message: 'Status updated to Pending - Waiting for Vendor',
        userName: 'John Doe'
      }
    ]
  }
];

export const getProblemById = (id: string): Problem | undefined => {
  return mockProblems.find(problem => problem.id === id);
};

export const getAllProblems = (): Problem[] => {
  return [...mockProblems];
};

export const getAllKnownErrors = (): KnownError[] => {
  return []; // Can be expanded later with actual known errors data
};

export const createProblem = (problem: Omit<Problem, 'id' | 'createdAt' | 'updatedAt' | 'audit'>): Problem => {
  const newId = `PB${(mockProblems.length + 1).toString().padStart(5, '0')}`;
  const now = new Date();
  
  const newProblem: Problem = {
    id: newId,
    createdAt: now,
    updatedAt: now,
    audit: [] as AuditEntry[],
    ...problem
  };
  
  mockProblems.push(newProblem);
  return newProblem;
};

export const updateProblem = (id: string, updates: Partial<Problem>): Problem | undefined => {
  const index = mockProblems.findIndex(problem => problem.id === id);
  if (index === -1) return undefined;
  
  mockProblems[index] = {
    ...mockProblems[index],
    ...updates,
    updatedAt: new Date()
  };
  
  return mockProblems[index];
};

// Add the missing function
export const getNextProblemId = (): string => {
  const lastId = mockProblems.length > 0 
    ? parseInt(mockProblems[mockProblems.length - 1].id.substring(2))
    : 0;
  return `PB${(lastId + 1).toString().padStart(6, '0')}`;
};
