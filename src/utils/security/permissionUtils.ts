
import { User, Permission } from '../types/user';
import { mockPermissions, mockRolePermissions } from './types';

// Check if a user has a specific permission
export const hasPermission = (user: User, permissionName: string): boolean => {
  if (!user) return false;
  
  // Find permission by name
  const permission = mockPermissions.find(p => p.name === permissionName);
  if (!permission) return false;
  
  // Check if user's primary role has this permission
  const hasPrimaryRolePermission = mockRolePermissions.some(rp => 
    rp.roleId === user.role && rp.permissionId === permission.id
  );
  
  // If user has the permission through primary role, return true
  if (hasPrimaryRolePermission) return true;
  
  // Check if user has additional roles with this permission
  if (user.roles && user.roles.length > 0) {
    for (const role of user.roles) {
      if (mockRolePermissions.some(rp => rp.roleId === role && rp.permissionId === permission.id)) {
        return true;
      }
    }
  }
  
  return false;
};

// Check if a user can perform an action on a resource
export const canPerformAction = (user: User, resource: string, action: Permission['action']): boolean => {
  if (!user) return false;
  
  // Find permissions for this resource and action
  const permissions = mockPermissions.filter(p => p.resource === resource && p.action === action);
  
  // Check if user's primary role has any of these permissions
  const hasPrimaryRolePermission = permissions.some(permission => 
    mockRolePermissions.some(rp => 
      rp.roleId === user.role && rp.permissionId === permission.id
    )
  );
  
  // If user has the permission through primary role, return true
  if (hasPrimaryRolePermission) return true;
  
  // Check if user has additional roles with any of these permissions
  if (user.roles && user.roles.length > 0) {
    for (const role of user.roles) {
      if (permissions.some(permission =>
        mockRolePermissions.some(rp => 
          rp.roleId === role && rp.permissionId === permission.id
        )
      )) {
        return true;
      }
    }
  }
  
  return false;
};
