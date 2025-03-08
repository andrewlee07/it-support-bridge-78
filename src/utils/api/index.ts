
// Re-export all API functions for easier imports
import * as assetApi from './assetApi';
import * as ticketApi from './ticketApi';
import * as userApi from './userApi';
import * as changeApi from './changeApi';
import * as releaseApi from './releaseApi';
import * as slaApi from './slaApi';
import * as emailApi from './emailApi';
import * as dashboardApi from './dashboardApi';
import * as testCaseApi from './test-integration';
import * as testReleaseApi from './test-release';
import * as backlogApi from './backlogApi';
import * as testBacklogApi from './testBacklogIntegrationApi';
import * as dropdownApi from './dropdownConfigurationApi';

// Export everything
export {
  assetApi,
  ticketApi,
  userApi,
  changeApi,
  releaseApi,
  slaApi,
  emailApi,
  dashboardApi,
  testCaseApi,
  testReleaseApi,
  backlogApi,
  testBacklogApi,
  dropdownApi
};

// Export each API module individually under a namespace
export * from './assetApi';
export * from './ticketApi';
export * from './userApi';
export * from './changeApi';
export * from './releaseApi';
export * from './slaApi';
export * from './emailApi';
export * from './dashboardApi';
export * from './test-integration';
export * from './test-release';

// Don't export backlogApi directly to avoid naming conflicts
// Instead, import from ./backlogApi directly when needed

export * from './testBacklogIntegrationApi';
export * from './dropdownConfigurationApi';
