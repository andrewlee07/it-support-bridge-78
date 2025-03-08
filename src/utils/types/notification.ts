
// Notification system types

export type EventType = 
  | 'incident-created' 
  | 'incident-assigned' 
  | 'incident-resolved'
  | 'service-request-created'
  | 'service-request-approval-required'
  | 'service-request-completed';

export type RecipientType = 'requester' | 'assignee' | 'manager';

export type NotificationChannel = 'email' | 'webhook';

export type NotificationStatus = 'queued' | 'processing' | 'sent' | 'failed' | 'retrying';

export interface NotificationEvent {
  id: string;
  type: EventType;
  entityId: string;
  entityType: string;
  timestamp: Date;
  data: Record<string, any>;
  createdBy: string;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  eventType: EventType;
  subject: string;
  body: string;
  isActive: boolean;
  lastModified: Date;
  lastModifiedBy: string;
}

export interface NotificationRule {
  id: string;
  eventType: EventType;
  recipients: RecipientType[];
  isActive: boolean;
}

export interface NotificationLog {
  id: string;
  eventType: EventType;
  recipientId: string;
  recipientEmail: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  timestamp: Date;
  retryCount?: number;
  error?: string;
  templateId: string;
  recordId: string;  // The ID of the related record (INC00001, etc.)
}

export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  eventTypes: EventType[];
  authType: 'none' | 'basic' | 'token';
  authCredentials?: string;  // Encrypted
  isActive: boolean;
  retryCount: number;        // Number of retries on failure
  retryInterval: number;     // Interval between retries in minutes
}

export interface WebhookPayload {
  eventType: EventType;
  timestamp: string;
  recordType: string;
  recordId: string;
  recordData: {
    title: string;
    status: string;
    priority?: string;
    assignee?: string;
    requester: string;
    createdAt: string;
    updatedAt: string;
    [key: string]: any;  // Additional record fields
  };
  url: string;  // Link to view the record
}

// Queue related types
export interface NotificationQueueItem {
  event: NotificationEvent;
  attempts: number;
  lastAttempt?: Date;
  status: NotificationStatus;
  error?: string;
}
