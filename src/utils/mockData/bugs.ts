
import { v4 as uuidv4 } from 'uuid';
import { delay, createApiSuccessResponse, createApiErrorResponse } from './apiHelpers';
import { ApiResponse } from '../types';
import { Bug, BugPriority, BugSeverity, BugStatus } from '../types/testTypes';

// Mock Bugs data
export let bugs: Bug[] = [
  {
    id: 'bug-1',
    title: 'Login button not working',
    description: 'Login button is not responding when clicked',
    stepsToReproduce: ['Open login page', 'enter credentials', 'click login button'],
    severity: 'critical',
    priority: 'high',
    status: 'open',
    reportedBy: 'user-1',
    createdBy: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'bug-2',
    title: 'Incorrect error message',
    description: 'Error message is not clear',
    stepsToReproduce: ['Attempt login with invalid credentials'],
    severity: 'medium',
    priority: 'medium',
    status: 'open',
    reportedBy: 'user-2',
    createdBy: 'user-2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Bug API functions
export const fetchBugs = async (): Promise<ApiResponse<Bug[]>> => {
  await delay(500);
  return createApiSuccessResponse(bugs);
};

export const fetchBugById = async (id: string): Promise<ApiResponse<Bug | null>> => {
  await delay(500);
  const bug = bugs.find(b => b.id === id);
  if (!bug) {
    return createApiErrorResponse<Bug | null>('Bug not found', 404);
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

export const updateBug = async (id: string, updates: Partial<Bug>): Promise<ApiResponse<Bug | null>> => {
  await delay(500);
  const index = bugs.findIndex(b => b.id === id);
  if (index === -1) {
    return createApiErrorResponse<Bug | null>('Bug not found', 404);
  }
  bugs[index] = { ...bugs[index], ...updates, updatedAt: new Date() };
  return createApiSuccessResponse(bugs[index]);
};
