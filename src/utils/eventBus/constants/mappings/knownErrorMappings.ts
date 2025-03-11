
import { EventType } from '@/utils/types/eventBus';

/**
 * Maps known error event types to recipient groups
 * Using Partial<Record> as we're only defining a subset of events
 */
export const KEDB_EVENT_RECIPIENTS: Partial<Record<EventType, string[]>> = {
  'knownError.created': ['support-staff', 'service-owner', 'affected-service-users'],
  'knownError.updated': ['support-staff', 'previous-viewers'],
  'knownError.workaroundUpdated': ['support-staff', 'affected-service-users'],
  'knownError.planToFix': ['support-staff', 'service-owner', 'affected-service-users'],
  'knownError.resolved': ['support-staff', 'service-owner', 'affected-service-users']
};

/**
 * Maps known error event types to recommended notification channels
 * Using Partial<Record> as we're only defining a subset of events
 */
export const KEDB_EVENT_CHANNELS: Partial<Record<EventType, ('email' | 'teams' | 'inApp' | 'sms')[]>> = {
  'knownError.created': ['email', 'teams', 'inApp'],
  'knownError.updated': ['email', 'teams', 'inApp'],
  'knownError.workaroundUpdated': ['email', 'teams', 'inApp'],
  'knownError.planToFix': ['email', 'teams', 'inApp'],
  'knownError.resolved': ['email', 'teams', 'inApp']
};
