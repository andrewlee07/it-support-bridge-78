
/**
 * Valid event sources in the system
 */
export type EventSource = 
  | 'ticketSystem'
  | 'changeSystem'
  | 'problemManagement'  // Added correct casing
  | 'slaMonitor'
  | 'taskManager'
  | 'releaseManagement'
  | 'assetManagement'
  | 'testSystem'
  | 'knowledgeBase'
  | 'knownErrorDatabase'
  | 'backlogSystem'
  | 'reminderService'
  | 'testManagement'  // Added proper casing
  | 'kedb-service'     // Added for KnownErrorEventPublisher
  | 'problem-service'  // Added for ProblemEventPublisher
  | 'external-system'; // Added for webhook test events

/**
 * Event origin types
 */
export type EventOrigin = 
  | 'web-app'
  | 'mobile-app'
  | 'api'
  | 'scheduled-job'
  | 'system'
  | 'integration'
  | 'background-job';
