
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
}
