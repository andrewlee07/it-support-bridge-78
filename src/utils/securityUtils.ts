
import { User, PasswordPolicy, SecurityEvent, Permission, RolePermission } from './types/user';

// Default password policy
export const DEFAULT_PASSWORD_POLICY: PasswordPolicy = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  preventPasswordReuse: 5,
  expiryDays: 90
};

// Mock permissions data - in a real app, this would come from a database
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
];

// Mock role permissions - in a real app, this would come from a database
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
  { roleId: 'user' as const, permissionId: 'perm-2' }
];

// Placeholder for security event log - in a real app, this would be stored in a database
const securityEventLog: SecurityEvent[] = [];

// Check if a password meets the password policy
export const isPasswordValid = (password: string, policy: PasswordPolicy = DEFAULT_PASSWORD_POLICY): { valid: boolean; reason?: string } => {
  if (password.length < policy.minLength) {
    return { valid: false, reason: `Password must be at least ${policy.minLength} characters long` };
  }
  
  if (policy.requireUppercase && !/[A-Z]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one uppercase letter' };
  }
  
  if (policy.requireLowercase && !/[a-z]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one lowercase letter' };
  }
  
  if (policy.requireNumbers && !/[0-9]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one number' };
  }
  
  if (policy.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one special character' };
  }
  
  return { valid: true };
};

// Check if password has been used before (in a real app, you'd compare hashes)
export const isPasswordReused = (userId: string, password: string, passwordHistory: { userId: string; passwordHash: string; changedAt: Date }[]): boolean => {
  const userPasswordHistory = passwordHistory.filter(history => history.userId === userId);
  return userPasswordHistory.some(history => history.passwordHash === password);
};

// Check if password has expired
export const isPasswordExpired = (user: User, policy: PasswordPolicy = DEFAULT_PASSWORD_POLICY): boolean => {
  if (!user.passwordLastChanged) return false;
  
  const expiryDate = new Date(user.passwordLastChanged);
  expiryDate.setDate(expiryDate.getDate() + policy.expiryDays);
  
  return new Date() > expiryDate;
};

// Log a security event
export const logSecurityEvent = (event: Omit<SecurityEvent, 'id' | 'timestamp'>): SecurityEvent => {
  const newEvent: SecurityEvent = {
    ...event,
    id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date()
  };
  
  securityEventLog.push(newEvent);
  console.log(`[Security Event] ${newEvent.eventType} - User: ${newEvent.userId} - ${newEvent.details || ''}`);
  
  return newEvent;
};

// Get security events for a user
export const getUserSecurityEvents = (userId: string): SecurityEvent[] => {
  return securityEventLog.filter(event => event.userId === userId);
};

// Check if a user has a specific permission
export const hasPermission = (user: User, permissionName: string): boolean => {
  if (!user) return false;
  
  // Find permission by name
  const permission = mockPermissions.find(p => p.name === permissionName);
  if (!permission) return false;
  
  // Check if user's role has this permission
  return mockRolePermissions.some(rp => 
    rp.roleId === user.role && rp.permissionId === permission.id
  );
};

// Check if a user can perform an action on a resource
export const canPerformAction = (user: User, resource: string, action: Permission['action']): boolean => {
  if (!user) return false;
  
  // Find permissions for this resource and action
  const permissions = mockPermissions.filter(p => p.resource === resource && p.action === action);
  
  // Check if user's role has any of these permissions
  return permissions.some(permission => 
    mockRolePermissions.some(rp => 
      rp.roleId === user.role && rp.permissionId === permission.id
    )
  );
};

// Check if user's session has expired
export const isSessionExpired = (user: User): boolean => {
  if (!user.sessionStartTime || !user.sessionTimeout) return false;
  
  const expiryTime = new Date(user.sessionStartTime);
  expiryTime.setMinutes(expiryTime.getMinutes() + user.sessionTimeout);
  
  return new Date() > expiryTime;
};

// Check if IP address is allowed for user
export const isIPAllowed = (user: User, ipAddress: string): boolean => {
  // If no IP restrictions are set, allow all
  if (!user.allowedIPRanges || user.allowedIPRanges.length === 0) return true;
  
  // Simple check - in a real app, you'd have more sophisticated IP range checking
  return user.allowedIPRanges.includes(ipAddress);
};

// Generate a JWT token (mock function)
export const generateJWTToken = (user: User): { token: string, refreshToken: string, expiry: Date } => {
  // In a real app, use a proper JWT library
  const token = `jwt_${user.id}_${Date.now()}`;
  const refreshToken = `refresh_${user.id}_${Date.now()}`;
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + 1); // 1 hour expiry
  
  return { token, refreshToken, expiry };
};

// Refresh JWT token (mock function)
export const refreshJWTToken = (user: User, currentRefreshToken: string): { token: string, refreshToken: string, expiry: Date } | null => {
  // Verify refresh token matches
  if (user.refreshToken !== currentRefreshToken) return null;
  
  // Generate new tokens
  return generateJWTToken(user);
};
