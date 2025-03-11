import { BacklogItem, BacklogTestCoverage } from '@/utils/types/backlogTypes';
import { ApiResponse } from '@/utils/types/api';
import { backlogItems } from '@/utils/mockData/backlog';
import { createApiSuccessResponse, createApiErrorResponse } from '@/utils/mockData/apiHelpers';

// Update test coverage for a backlog item
export const getTestCoverageForBacklogItem = (itemId: string): ApiResponse<BacklogTestCoverage> => {
  const item = backlogItems.find(item => item.id === itemId);

  if (!item) {
    return createApiErrorResponse('Backlog item not found', 404);
  }

  // If the item has test coverage, return it
  if (item.testCoverage) {
    return createApiSuccessResponse(item.testCoverage);
  }

  // Otherwise, return a default coverage object
  const defaultCoverage: BacklogTestCoverage = {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    skippedTests: 0,
    lastRun: undefined,
    
    // Add compatibility fields
    totalTestCases: 0,
    notExecutedTests: 0,
    coveragePercentage: 0,
    lastUpdated: new Date()
  };

  return createApiSuccessResponse(defaultCoverage);
};

// Update test coverage for a backlog item
export const updateTestCoverageForBacklogItem = (
  itemId: string,
  coverageData: Partial<BacklogTestCoverage>
): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === itemId);

  if (itemIndex === -1) {
    return createApiErrorResponse('Backlog item not found', 404);
  }

  // Update or create test coverage data
  const existingCoverage = backlogItems[itemIndex].testCoverage || {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    skippedTests: 0,
    lastRun: new Date()
  };

  backlogItems[itemIndex].testCoverage = {
    ...existingCoverage,
    ...coverageData,
    // Ensure backward compatibility fields are set
    totalTestCases: coverageData.totalTestCases || coverageData.totalTests || existingCoverage.totalTestCases || existingCoverage.totalTests || 0,
    passedTests: coverageData.passedTests || coverageData.passed || existingCoverage.passedTests || existingCoverage.passed || 0,
    failedTests: coverageData.failedTests || coverageData.failed || existingCoverage.failedTests || existingCoverage.failed || 0,
    notExecutedTests: coverageData.notExecutedTests || coverageData.skippedTests || existingCoverage.notExecutedTests || existingCoverage.skippedTests || 0,
    coveragePercentage: coverageData.coveragePercentage !== undefined ? coverageData.coveragePercentage : existingCoverage.coveragePercentage,
    lastRun: coverageData.lastRun || existingCoverage.lastRun,
    lastUpdated: coverageData.lastUpdated || new Date()
  };

  return createApiSuccessResponse(backlogItems[itemIndex]);
};

export const getTestCoverageStats = (): ApiResponse<{
  totalItems: number;
  itemsWithTests: number;
  itemsWithoutTests: number;
  averageCoverage: number;
}> => {
  const stats = backlogItems.reduce((acc, item) => {
    if (item.testCoverage) {
      acc.itemsWithTests++;
      const coverage = item.testCoverage.coveragePercentage || 
        ((item.testCoverage.passedTests / item.testCoverage.totalTests) * 100) || 0;
      acc.totalCoverage += coverage;
    } else {
      acc.itemsWithoutTests++;
    }
    return acc;
  }, {
    itemsWithTests: 0,
    itemsWithoutTests: 0,
    totalCoverage: 0
  });

  return createApiSuccessResponse({
    totalItems: backlogItems.length,
    itemsWithTests: stats.itemsWithTests,
    itemsWithoutTests: stats.itemsWithoutTests,
    averageCoverage: stats.itemsWithTests > 0 
      ? stats.totalCoverage / stats.itemsWithTests 
      : 0
  });
};

export const getItemsWithoutTestCoverage = (): ApiResponse<BacklogItem[]> => {
  const itemsWithoutTests = backlogItems.filter(item => 
    !item.testCoverage || 
    item.testCoverage.totalTests === 0
  );

  return createApiSuccessResponse(itemsWithoutTests);
};

export const getItemsWithFailingTests = (): ApiResponse<BacklogItem[]> => {
  const itemsWithFailingTests = backlogItems.filter(item => 
    item.testCoverage && 
    (item.testCoverage.failedTests > 0 || item.testCoverage.failed > 0)
  );

  return createApiSuccessResponse(itemsWithFailingTests);
};

export const resetTestCoverage = (itemId: string): ApiResponse<BacklogItem> => {
  const itemIndex = backlogItems.findIndex(item => item.id === itemId);

  if (itemIndex === -1) {
    return createApiErrorResponse('Backlog item not found', 404);
  }

  backlogItems[itemIndex].testCoverage = {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    skippedTests: 0,
    lastRun: new Date(),
    // Backward compatibility
    totalTestCases: 0,
    notExecutedTests: 0,
    coveragePercentage: 0,
    lastUpdated: new Date()
  };

  return createApiSuccessResponse(backlogItems[itemIndex]);
};
