
import { Permission, RolePermission } from '../types/user';

// Export the mock permissions and role permissions from securityUtils
export const mockPermissions: Permission[] = [
  { id: 'perm-1', name: 'View Tickets', description: 'Ability to view tickets', resource: 'tickets', action: 'read' },
  { id: 'perm-2', name: 'Create Tickets', description: 'Ability to create tickets', resource: 'tickets', action: 'create' },
  { id: 'perm-3', name: 'Edit Tickets', description: 'Ability to edit tickets', resource: 'tickets', action: 'update' },
  { id: 'perm-4', name: 'Delete Tickets', description: 'Ability to delete tickets', resource: 'tickets', action: 'delete' },
  { id: 'perm-5', name: 'Assign Tickets', description: 'Ability to assign tickets', resource: 'tickets', action: 'assign' },
  { id: 'perm-6', name: 'View Users', description: 'Ability to view users', resource: 'users', action: 'read' },
  { id: 'perm-7', name: 'Edit Users', description: 'Ability to edit users', resource: 'users', action: 'update' },
  { id: 'perm-8', name: 'View Reports', description: 'Ability to view reports', resource: 'reports', action: 'read' },
  { id: 'perm-9', name: 'Approve Changes', description: 'Ability to approve changes', resource: 'changes', action: 'approve' },
  { id: 'perm-10', name: 'Reject Changes', description: 'Ability to reject changes', resource: 'changes', action: 'reject' },
  { id: 'perm-11', name: 'Approve Releases', description: 'Ability to approve releases', resource: 'releases', action: 'approve' },
  { id: 'perm-12', name: 'Reject Releases', description: 'Ability to reject releases', resource: 'releases', action: 'reject' },
  { id: 'perm-13', name: 'manage_service_catalog_config', description: 'Access to system-wide service catalog configuration', resource: 'service-catalog', action: 'update' },
  { id: 'perm-14', name: 'manage_service_catalog_content', description: 'Access to manage service content within service catalog', resource: 'service-catalog', action: 'update' },
];

// Export the mock role permissions
export const mockRolePermissions: RolePermission[] = [
  // Admin has all permissions
  ...mockPermissions.map(p => ({ roleId: 'admin' as const, permissionId: p.id })),
  
  // Manager permissions
  { roleId: 'manager' as const, permissionId: 'perm-1' },
  { roleId: 'manager' as const, permissionId: 'perm-2' },
  { roleId: 'manager' as const, permissionId: 'perm-3' },
  { roleId: 'manager' as const, permissionId: 'perm-5' },
  { roleId: 'manager' as const, permissionId: 'perm-6' },
  { roleId: 'manager' as const, permissionId: 'perm-8' },
  { roleId: 'manager' as const, permissionId: 'perm-9' },
  { roleId: 'manager' as const, permissionId: 'perm-10' },
  
  // Agent permissions
  { roleId: 'agent' as const, permissionId: 'perm-1' },
  { roleId: 'agent' as const, permissionId: 'perm-2' },
  { roleId: 'agent' as const, permissionId: 'perm-3' },
  
  // Developer permissions
  { roleId: 'developer' as const, permissionId: 'perm-1' },
  { roleId: 'developer' as const, permissionId: 'perm-3' },
  
  // IT permissions
  { roleId: 'it' as const, permissionId: 'perm-1' },
  { roleId: 'it' as const, permissionId: 'perm-2' },
  { roleId: 'it' as const, permissionId: 'perm-3' },
  { roleId: 'it' as const, permissionId: 'perm-6' },
  
  // User permissions
  { roleId: 'user' as const, permissionId: 'perm-1' },
  { roleId: 'user' as const, permissionId: 'perm-2' },
  
  // Release Manager permissions
  { roleId: 'release-manager' as const, permissionId: 'perm-1' },
  { roleId: 'release-manager' as const, permissionId: 'perm-6' },
  { roleId: 'release-manager' as const, permissionId: 'perm-8' },
  { roleId: 'release-manager' as const, permissionId: 'perm-11' },
  { roleId: 'release-manager' as const, permissionId: 'perm-12' },
  
  // Service Catalog Manager permissions
  { roleId: 'service-catalog-manager' as const, permissionId: 'perm-14' },
];
