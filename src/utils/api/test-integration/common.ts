
import { delay } from '@/utils/mockData/apiHelpers';
import { createApiSuccessResponse, createApiErrorResponse } from '@/utils/mockData/apiHelpers';
import { ApiResponse } from '@/utils/types/api';
import { TestCase } from '@/utils/types/test/testCase';
import { BacklogItem } from '@/utils/types/backlogTypes';

// Mock data for test-backlog integration
export const testCases: TestCase[] = [];
export const backlogItems: BacklogItem[] = [];

// Mock test-backlog relationships for traceability
export interface TestCoverageRelationship {
  testCaseId: string;
  backlogItemId: string;
  coverageType: 'direct' | 'indirect';
  createdAt: Date;
}

export let testBacklogRelationships: TestCoverageRelationship[] = [];

// Helper functions for managing relationships
export const addTestBacklogRelationship = (relationship: TestCoverageRelationship) => {
  testBacklogRelationships.push(relationship);
  return relationship;
};

export const removeTestBacklogRelationship = (testCaseId: string, backlogItemId: string) => {
  const index = testBacklogRelationships.findIndex(
    rel => rel.testCaseId === testCaseId && rel.backlogItemId === backlogItemId
  );
  
  if (index === -1) {
    return false;
  }
  
  testBacklogRelationships.splice(index, 1);
  return true;
};

// Re-export for convenience
export { delay, createApiSuccessResponse, createApiErrorResponse };
export type { ApiResponse };
