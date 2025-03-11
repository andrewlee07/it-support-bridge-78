
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
