
import { v4 as uuidv4 } from 'uuid';
import { delay, createApiSuccessResponse, createApiErrorResponse } from '../mockData/apiHelpers';
import { ApiResponse } from '../types';
import { TestCase, Bug, TestStatus, BugStatus } from '../../types/testTypes';
import { BacklogItem, BacklogTestCoverage } from '../../types/backlogTypes';
import { TestCoverageRelationship } from '../../types/ticket';
import { testCases } from '../../mockData/testCases';
import { bugs } from '../../mockData/bugs';
import { backlogItems } from '../../mockData/backlogItems';

// Mock storage for relationships
export let testBacklogRelationships: TestCoverageRelationship[] = [
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
  delay,
  createApiSuccessResponse,
  createApiErrorResponse,
  testCases,
  bugs,
  backlogItems
};
