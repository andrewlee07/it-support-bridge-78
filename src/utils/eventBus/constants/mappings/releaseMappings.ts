
import { EventType } from '@/utils/types/eventBus';

/**
 * Maps release event types to recipient groups
 * Using Partial<Record> as we're only defining a subset of events
 */
export const RELEASE_EVENT_RECIPIENTS: Partial<Record<EventType, string[]>> = {
  'release.created': ['release-manager', 'change-manager', 'dev-team', 'test-team'],
  'release.planApproved': ['release-team', 'change-manager', 'service-owners', 'stakeholders'],
  'release.readyForTest': ['test-team', 'qa-manager', 'release-manager'],
  'release.testCompleted': ['release-manager', 'change-manager', 'dev-team', 'stakeholders'],
  'release.scheduledDeployment': ['all-stakeholders', 'support-staff', 'affected-service-users'],
  'release.deploymentStarted': ['release-team', 'support-staff', 'affected-service-users'],
  'release.deploymentCompleted': ['all-stakeholders', 'support-staff', 'affected-service-users'],
  'release.rollback': ['all-stakeholders', 'support-staff', 'affected-service-users']
};

/**
 * Maps release event types to recommended notification channels
 * Using Partial<Record> as we're only defining a subset of events
 */
export const RELEASE_EVENT_CHANNELS: Partial<Record<EventType, ('email' | 'teams' | 'inApp' | 'sms')[]>> = {
  'release.created': ['email', 'teams', 'inApp'],
  'release.planApproved': ['email', 'teams', 'inApp'],
  'release.readyForTest': ['email', 'teams', 'inApp'],
  'release.testCompleted': ['email', 'teams', 'inApp'],
  'release.scheduledDeployment': ['email', 'teams', 'inApp'],
  'release.deploymentStarted': ['email', 'teams', 'inApp'],
  'release.deploymentCompleted': ['email', 'teams', 'inApp'],
  'release.rollback': ['email', 'teams', 'inApp', 'sms']
};
