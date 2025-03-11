
import { EventType } from '@/utils/types/eventBus';

/**
 * Maps problem event types to recipient groups
 * Using Partial<Record> as we're only defining a subset of events
 */
export const PROBLEM_EVENT_RECIPIENTS: Partial<Record<EventType, string[]>> = {
  'problem.created': ['problem-manager', 'service-owner', 'it-management'],
  'problem.assigned': ['assignee', 'previous-assignee', 'problem-manager'],
  'problem.rootCauseIdentified': ['problem-manager', 'service-owner', 'related-incident-owners'],
  'problem.workaroundAvailable': ['related-incident-owners', 'service-users', 'support-staff'],
  'problem.resolved': ['stakeholders', 'related-incident-owners', 'service-users'],
  'problem.closed': ['problem-manager', 'service-owner', 'it-management']
};

/**
 * Maps problem event types to recommended notification channels
 * Using Partial<Record> as we're only defining a subset of events
 */
export const PROBLEM_EVENT_CHANNELS: Partial<Record<EventType, ('email' | 'teams' | 'inApp' | 'sms')[]>> = {
  'problem.created': ['email', 'teams', 'inApp'],
  'problem.assigned': ['email', 'teams', 'inApp'],
  'problem.rootCauseIdentified': ['email', 'teams', 'inApp'],
  'problem.workaroundAvailable': ['email', 'teams', 'inApp'],
  'problem.resolved': ['email', 'teams', 'inApp', 'sms'],
  'problem.closed': ['email', 'inApp']
};
