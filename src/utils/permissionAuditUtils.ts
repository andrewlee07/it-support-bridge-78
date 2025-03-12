
import { v4 as uuidv4 } from 'uuid';
import { AuditEntry } from './types/audit';
import { Group } from './types/group';
import { UserRole } from './types/user';

/**
 * Creates an audit entry for permission changes
 * 
 * @param entityId - The ID of the entity (group, role, etc.)
 * @param entityType - The type of entity
 * @param action - The action that was performed
 * @param details - Additional details about the change
 * @param performedBy - The ID of the user who performed the action
 * @param oldValue - The previous value (optional)
 * @param newValue - The new value (optional)
 * @returns The created audit entry
 */
export const createPermissionAuditEntry = (
  entityId: string,
  entityType: 'group' | 'role' | 'permission',
  action: string,
  details: string,
  performedBy: string,
  oldValue?: string,
  newValue?: string
): AuditEntry => {
  return {
    id: uuidv4(),
    entityId,
    entityType,
    message: `${action}: ${details}`,
    performedBy,
    timestamp: new Date(),
    action,
    oldValue,
    newValue
  };
};

/**
 * Logs a role assignment to a group
 * 
 * @param groupId - The ID of the group
 * @param groupName - The name of the group
 * @param roleId - The ID of the role
 * @param roleName - The name of the role
 * @param performedBy - The ID of the user who performed the action
 * @returns The created audit entry
 */
export const logRoleAssignment = (
  groupId: string,
  groupName: string,
  roleId: UserRole,
  roleName: string,
  performedBy: string
): AuditEntry => {
  return createPermissionAuditEntry(
    groupId,
    'group',
    'Role Assignment',
    `Assigned role "${roleName}" to group "${groupName}"`,
    performedBy,
    undefined,
    roleId
  );
};

/**
 * Logs a role removal from a group
 * 
 * @param groupId - The ID of the group
 * @param groupName - The name of the group
 * @param roleId - The ID of the role
 * @param roleName - The name of the role
 * @param performedBy - The ID of the user who performed the action
 * @returns The created audit entry
 */
export const logRoleRemoval = (
  groupId: string,
  groupName: string,
  roleId: UserRole,
  roleName: string,
  performedBy: string
): AuditEntry => {
  return createPermissionAuditEntry(
    groupId,
    'group',
    'Role Removal',
    `Removed role "${roleName}" from group "${groupName}"`,
    performedBy,
    roleId,
    undefined
  );
};

/**
 * Logs a permission change
 * 
 * @param roleId - The ID of the role
 * @param roleName - The name of the role
 * @param resource - The resource that was affected
 * @param action - The action that was affected
 * @param granted - Whether the permission was granted or revoked
 * @param performedBy - The ID of the user who performed the action
 * @returns The created audit entry
 */
export const logPermissionChange = (
  roleId: UserRole,
  roleName: string,
  resource: string,
  action: string,
  granted: boolean,
  performedBy: string
): AuditEntry => {
  const changeType = granted ? 'Permission Granted' : 'Permission Revoked';
  
  return createPermissionAuditEntry(
    roleId,
    'role',
    changeType,
    `${granted ? 'Granted' : 'Revoked'} ${action} permission on ${resource} for role "${roleName}"`,
    performedBy,
    granted ? undefined : `${resource}:${action}`,
    granted ? `${resource}:${action}` : undefined
  );
};

/**
 * Logs bulk role assignments
 * 
 * @param assignments - Array of assignments made
 * @param groups - Available groups for reference
 * @param roles - Available roles for reference
 * @param performedBy - The ID of the user who performed the action
 * @returns Array of created audit entries
 */
export const logBulkRoleAssignments = (
  assignments: { groupId: string; roleId: UserRole }[],
  groups: Group[],
  roles: { id: UserRole; name: string }[],
  performedBy: string
): AuditEntry[] => {
  return assignments.map(({ groupId, roleId }) => {
    const group = groups.find(g => g.id === groupId);
    const role = roles.find(r => r.id === roleId);
    
    return logRoleAssignment(
      groupId,
      group?.name || 'Unknown Group',
      roleId,
      role?.name || 'Unknown Role',
      performedBy
    );
  });
};

// In-memory storage for permission audit logs
let permissionAuditLogs: AuditEntry[] = [];

/**
 * Adds an audit entry to the permission audit logs
 * 
 * @param entry - The audit entry to add
 */
export const addPermissionAuditEntry = (entry: AuditEntry): void => {
  permissionAuditLogs = [entry, ...permissionAuditLogs];
  console.log('Permission audit entry added:', entry);
};

/**
 * Gets all permission audit logs
 * 
 * @returns Array of permission audit logs
 */
export const getPermissionAuditLogs = (): AuditEntry[] => {
  return [...permissionAuditLogs];
};

/**
 * Filters permission audit logs by criteria
 * 
 * @param options - Filter options
 * @returns Filtered array of permission audit logs
 */
export const filterPermissionAuditLogs = (options: {
  entityType?: 'group' | 'role' | 'permission';
  entityId?: string;
  actionType?: string;
  startDate?: Date;
  endDate?: Date;
  performedBy?: string;
}): AuditEntry[] => {
  return permissionAuditLogs.filter(log => {
    if (options.entityType && log.entityType !== options.entityType) return false;
    if (options.entityId && log.entityId !== options.entityId) return false;
    if (options.actionType && log.action !== options.actionType) return false;
    if (options.performedBy && log.performedBy !== options.performedBy) return false;
    
    if (options.startDate && log.timestamp < options.startDate) return false;
    if (options.endDate) {
      const endDate = new Date(options.endDate);
      endDate.setHours(23, 59, 59, 999);
      if (log.timestamp > endDate) return false;
    }
    
    return true;
  });
};
