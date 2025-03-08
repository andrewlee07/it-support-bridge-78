
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse } from '../../types/api';
import { TestCase, Bug, TestStatus, BugStatus } from '../../types/test';
import { BacklogItem, BacklogTestCoverage } from '../../types/backlogTypes';
import { TestCoverageRelationship } from '../../types/ticket';
import { testCases } from '../../mockData/testCases';
import { bugs } from '../../mockData/bugs';
import { backlogItems } from '../../mockData/backlog';

// Define delay function since we can't import it
export const delay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Define API response helpers
export const createApiSuccessResponse = <T>(data: T, message: string = 'Operation successful', statusCode: number = 200): ApiResponse<T> => {
  return {
    success: true,
    data,
    message,
    statusCode
  };
};

export const createApiErrorResponse = <T>(error: string, statusCode: number = 400): ApiResponse<T> => {
  return {
    success: false,
    error,
    message: error,
    statusCode
  };
};

// Mock storage for relationships - changed from 'let' to 'const' with mutable array methods
export const testBacklogRelationships: TestCoverageRelationship[] = [
  {
    backlogItemId: 'BLGI-1001',
    testCaseId: 'tc-1',
    coverageType: 'direct',
    createdAt: new Date('2023-11-01'),
  },
  {
    backlogItemId: 'BLGI-1002',
    testCaseId: 'tc-2',
    coverageType: 'direct',
    createdAt: new Date('2023-11-02'),
  },
];

// Helper function to update relationships (since we can't re-assign the const variable)
export const updateTestBacklogRelationships = (newRelationships: TestCoverageRelationship[]) => {
  // Clear the array
  testBacklogRelationships.splice(0, testBacklogRelationships.length);
  // Add new items
  testBacklogRelationships.push(...newRelationships);
};

// Helper to add a single relationship
export const addTestBacklogRelationship = (relationship: TestCoverageRelationship) => {
  testBacklogRelationships.push(relationship);
};

// Helper to remove a relationship
export const removeTestBacklogRelationship = (testCaseId: string, backlogItemId: string) => {
  const index = testBacklogRelationships.findIndex(
    rel => rel.testCaseId === testCaseId && rel.backlogItemId === backlogItemId
  );
  if (index !== -1) {
    testBacklogRelationships.splice(index, 1);
    return true;
  }
  return false;
};

// Export common types and helpers
export type {
  TestCase,
  Bug,
  TestStatus,
  BugStatus,
  BacklogItem,
  BacklogTestCoverage,
  TestCoverageRelationship,
  ApiResponse
};

// Export helper functions and data
export {
  uuidv4,
  testCases,
  bugs,
  backlogItems
};
