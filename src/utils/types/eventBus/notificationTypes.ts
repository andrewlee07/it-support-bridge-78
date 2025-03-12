
/**
 * Types related to notification templates and versioning
 */

/**
 * Template version
 */
export interface TemplateVersion {
  id: string;
  templateId: string;
  versionNumber: number;
  createdBy: string;
  content: {
    subject?: string;
    body: string;
  };
  changes: Array<{
    field: string;
    type: 'add' | 'update' | 'remove';
    description: string;
  }>;
  isActive: boolean;
  createdAt: string;
}

/**
 * Enhanced notification template with versioning and channel variants
 */
export interface EnhancedNotificationTemplate {
  id: string;
  name: string;
  category: string;
  tags: string[];
  description: string;
  metadata: {
    processType: string;
    audience: string[];
    importance: 'low' | 'medium' | 'high' | 'critical';
  };
  baseTemplate: {
    subject: string;
    body: string;
  };
  channelVariants?: {
    email?: {
      format: 'html' | 'text';
      content: string;
    };
    slack?: {
      format: 'markdown' | 'text';
      content: string;
    };
    inApp?: {
      format: 'text';
      content: string;
    };
  };
  components?: string[]; // References to reusable components
  currentVersion: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Channel configuration for multi-channel administration
 */
export interface NotificationChannel {
  id: string;
  name: string;
  type: 'email' | 'slack' | 'inApp' | 'sms' | 'webhook' | 'teams' | 'custom';
  enabled: boolean;
  priority: number; // Lower number = higher priority
  capabilities: {
    supportsFormatting: boolean;
    supportsAttachments: boolean;
    supportsThreading: boolean;
    supportsAcknowledgement: boolean;
    supportsReply: boolean;
    maxMessageSize?: number;
  };
  deliverySettings: {
    retryCount: number;
    retryInterval: number; // in minutes
    expiresAfter?: number; // in minutes, optional
  };
  description: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Rule-based channel routing configuration
 */
export interface ChannelRoutingRule {
  id: string;
  name: string;
  description: string;
  conditions: Array<{
    field: 'audience' | 'importance' | 'category' | 'tags' | 'time' | 'userPreference';
    operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'in' | 'notIn';
    value: any;
  }>;
  channelId: string;
  fallbackChannelId?: string;
  isActive: boolean;
  priority: number; // Lower number = higher priority (evaluated first)
  createdAt: string;
  updatedAt: string;
}

/**
 * Multi-channel configuration
 */
export interface MultiChannelConfig {
  id: string;
  name: string;
  description: string;
  channels: NotificationChannel[];
  routingRules: ChannelRoutingRule[];
  defaultChannelId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Channel delivery result for testing
 */
export interface ChannelTestResult {
  channelId: string;
  channelName: string;
  success: boolean;
  deliveryTime?: number; // in ms
  error?: string;
  messagePreview?: string;
  timestamp: string;
}
