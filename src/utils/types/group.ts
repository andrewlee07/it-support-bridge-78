
import { UserRole } from './user';
import { TicketType, TicketCategory, TicketPriority, TicketStatus } from './ticket';

// Resource types that can have permissions assigned
export type ResourceType = 'incident' | 'service-request' | 'problem' | 'change' | 'release' | 'asset' | 'knowledge' | 'task' | 'user' | 'group' | 'queue' | 'report';

// Actions that can be performed on resources
export type ActionType = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'assign' | 'resolve' | 'close' | 'configure' | 'manage';

// Granular permissions for different resources
export interface ResourcePermission {
  resource: ResourceType;
  actions: ActionType[];
  // New fields for more granular control
  conditions?: {
    ownedOnly?: boolean; // Only allow actions on resources owned by the user
    groupOnly?: boolean; // Only allow actions on resources within the user's group
    statusRestrictions?: string[]; // Restrict actions based on status
    fieldRestrictions?: string[]; // Fields that cannot be modified
  };
}

// Enhanced Role with granular permissions and group associations
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: ResourcePermission[];
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
  // New fields
  applicableGroupTypes?: string[]; // Types of groups where this role can be assigned
  precedence: number; // Higher numbers take precedence when resolving permission conflicts
}

// A group represents a team/department that handles specific types of work
export interface Group {
  id: string;
  name: string;
  description: string;
  assignedRoles: UserRole[]; // Roles that are part of this group
  queueId?: string; // Associated queue ID
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  // New fields
  parentGroupId?: string; // For hierarchical group structures
  childGroupIds?: string[]; // Child groups
  groupType?: string; // e.g., 'department', 'team', 'project'
  memberCount?: number; // Number of members in the group
  availableRoles?: string[]; // Roles that can be assigned within this group
  managers?: string[]; // User IDs of group managers
}

// Queue represents filtered views of tickets for specific groups
export interface Queue {
  id: string;
  name: string;
  description: string;
  filterCriteria: {
    ticketTypes?: TicketType[];
    categories?: TicketCategory[];
    priorities?: TicketPriority[];
    statuses?: TicketStatus[];
    customFilters?: Record<string, any>;
  };
  groupId: string; // The group this queue belongs to
  createdAt: Date;
  updatedAt: Date;
  // New fields
  assignedUsers?: string[]; // User IDs assigned to this queue
  defaultAssignee?: string; // Default assignee for new tickets
  slaProfileId?: string; // SLA profile for this queue
  autoAssignRules?: AutoAssignRule[]; // Rules for auto-assignment
  notificationSettings?: QueueNotificationSettings; // Notification settings
  isDefault?: boolean; // Whether this is a default queue
  capacity?: number; // Maximum number of tickets this queue can handle
  businessHours?: BusinessHours; // Business hours for this queue
}

// Auto-assignment rule for tickets in a queue
export interface AutoAssignRule {
  id: string;
  name: string;
  criteria: {
    ticketType?: TicketType;
    category?: TicketCategory;
    priority?: TicketPriority;
    customFields?: Record<string, any>;
  };
  assignToUserId?: string; // User to assign to
  assignToGroupId?: string; // Group to assign to
  roundRobin?: boolean; // Whether to use round-robin assignment
  loadBalanced?: boolean; // Whether to balance load among assignees
  active: boolean;
}

// Queue notification settings
export interface QueueNotificationSettings {
  notifyOnNewTicket: boolean;
  notifyOnStatusChange: boolean;
  notifyOnComment: boolean;
  notifyOnAssignment: boolean;
  notifyManagers: boolean;
  notifyAllMembers: boolean;
  emailTemplateIds?: Record<string, string>; // Email template IDs for different notification types
}

// Business hours for a queue
export interface BusinessHours {
  timezone: string;
  weekdays: {
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    isWorkingDay: boolean;
    startTime?: string; // Format: "HH:MM" e.g. "09:00"
    endTime?: string; // Format: "HH:MM" e.g. "17:00"
  }[];
  holidays?: {
    date: string; // Format: "YYYY-MM-DD"
    name: string;
  }[];
}
