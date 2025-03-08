
import { v4 as uuidv4 } from 'uuid';
import { delay, createApiSuccessResponse, createApiErrorResponse } from './apiHelpers';
import { ApiResponse } from '../types';
import { Bug, BugPriority, BugSeverity, BugStatus } from '../types/testTypes';

// Mock Bugs data with updated imports
export let bugs: Bug[] = [
  {
    id: 'bug-1',
    title: 'Login button not working on mobile',
    description: 'Users cannot log in using the mobile interface',
    stepsToReproduce: [
      'Open the application on a mobile device',
      'Enter valid credentials',
      'Tap the login button',
      'Observe that nothing happens'
    ],
    severity: 'high',
    priority: 'high',
    status: 'open',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'user-1',
    reportedBy: 'user-1',
    assignedTo: 'user-2',
    relatedTestCase: 'tc-1'
  },
  {
    id: 'bug-2',
    title: 'Incorrect calculation in expense report',
    description: 'The total sum in expense reports is calculated incorrectly',
    stepsToReproduce: [
      'Create a new expense report',
      'Add multiple expense items',
      'Save the report',
      'Observe that the total is wrong'
    ],
    severity: 'medium',
    priority: 'medium',
    status: 'in_progress',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'user-1',
    reportedBy: 'user-3',
    assignedTo: 'user-2'
  }
];

// Bug API functions
export const fetchBugs = async (): Promise<ApiResponse<Bug[]>> => {
  await delay(500);
  return createApiSuccessResponse(bugs);
};

export const fetchBugById = async (id: string): Promise<ApiResponse<Bug>> => {
  await delay(500);
  const bug = bugs.find(bug => bug.id === id);
  if (!bug) {
    return createApiErrorResponse('Bug not found');
  }
  return createApiSuccessResponse(bug);
};

export const createBug = async (bug: Omit<Bug, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Bug>> => {
  await delay(500);
  const newBug: Bug = {
    id: uuidv4(),
    ...bug,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  bugs.push(newBug);
  return createApiSuccessResponse(newBug);
};

export const updateBug = async (id: string, updates: Partial<Bug>): Promise<ApiResponse<Bug>> => {
  await delay(500);
  const index = bugs.findIndex(bug => bug.id === id);
  if (index === -1) {
    return createApiErrorResponse('Bug not found');
  }
  bugs[index] = {
    ...bugs[index],
    ...updates,
    updatedAt: new Date()
  };
  return createApiSuccessResponse(bugs[index]);
};
