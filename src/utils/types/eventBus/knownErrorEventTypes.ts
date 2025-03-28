
import { EventType } from '.';

// Define recipient mapping for known error events
export interface KnownErrorRecipientMapping {
  id: string;
  name: string;
  description?: string;
  eventTypes: EventType[];
  recipients: {
    primary: string[];
    secondary?: string[];
    escalation?: string[];
  };
  conditions?: Array<{
    field: string;
    operator: string;
    value: any;
  }>;
  isActive: boolean;
}

// Define known error event
export interface KnownErrorEvent {
  id: string;
  type: EventType;
  timestamp: string;
  knownErrorId: string;
  knownErrorTitle: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  affectedServices: string[];
  workaround?: string;
  createdBy: string;
}

// Define notification result for known error events
export interface KnownErrorNotificationResult {
  eventId: string;
  recipientMappingId: string;
  sentTo: string[];
  sentAt: string;
  deliveryStatus: 'sent' | 'failed' | 'pending';
  error?: string;
}
