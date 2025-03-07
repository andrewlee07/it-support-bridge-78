
// Re-export all types from domain-specific files for backward compatibility
export * from './user';
export * from './sla';
export * from './change';
export * from './asset';
export * from './release';
export * from './audit';
export * from './email';
export * from './dashboard';
export * from './api';
export * from './configuration';

// Explicitly re-export from backlogTypes to avoid name conflicts
export {
  BacklogItem,
  BacklogItemStatus,
  BacklogItemPriority,
  BacklogItemType,
  calculateReleaseCapacity,
  filterBacklogItemsByRelease,
  filterBacklogItemsByLabel,
  filterBacklogItemsByTestCoverage,
  getBacklogItemsWithoutTests,
  getBacklogItemsWithFailingTests,
} from './backlogTypes';

// Explicitly re-export from ticket to avoid name conflicts
export {
  Ticket,
  TicketStatus,
  TicketPriority,
  TicketCategory,
  TicketType,
  TicketFilter,
  TestCoverageRelationship,
} from './ticket';

// Conditionally re-export BacklogTestCoverage from backlogTypes to avoid duplicate exports
export { 
  BacklogTestCoverage
} from './backlogTypes';
