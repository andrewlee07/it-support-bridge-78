
import { EventType } from '@/utils/types/eventBus';

/**
 * Maps knowledge article event types to recipient groups
 * Using Partial<Record> as we're only defining a subset of events
 */
export const KNOWLEDGE_EVENT_RECIPIENTS: Partial<Record<EventType, string[]>> = {
  'knowledge.created': ['knowledge-team', 'service-owner'],
  'knowledge.updated': ['knowledge-team', 'previous-viewers', 'subscribers'],
  'knowledge.published': ['all-users', 'service-users', 'subscribers']
};

/**
 * Maps knowledge article event types to recommended notification channels
 * Using Partial<Record> as we're only defining a subset of events
 */
export const KNOWLEDGE_EVENT_CHANNELS: Partial<Record<EventType, ('email' | 'teams' | 'inApp' | 'sms')[]>> = {
  'knowledge.created': ['email', 'inApp'],
  'knowledge.updated': ['email', 'inApp'],
  'knowledge.published': ['email', 'teams', 'inApp']
};
