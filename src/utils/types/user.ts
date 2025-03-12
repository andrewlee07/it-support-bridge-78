// User types
export type UserRole = 'admin' | 'manager' | 'agent' | 'developer' | 'it' | 'user' | 'problem-manager' | 'change-manager' | 'release-manager' | 'service-catalog-manager' | 'knowledge-author' | 'knowledge-reviewer';

export type MFAMethod = 'totp' | 'email' | 'sms' | 'none';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roles?: UserRole[]; // Added multiple roles support
  department: string;
  title?: string;
  active?: boolean;
  lastActive?: Date;
  createdAt?: Date;
  lastLogin?: Date;
  mfaEnabled: boolean;
  mfaMethod?: MFAMethod;
  mfaVerified?: boolean;
  securityQuestions?: {
    question: string;
    answer: string; // In a real app, this would be hashed
  }[];
  loginAttempts?: number;
  lockedUntil?: Date;
  passwordLastChanged?: Date;
  requirePasswordChange?: boolean;
  lastIPAddress?: string;
  allowedIPRanges?: string[];
  sessionTimeout?: number; // in minutes
  sessionStartTime?: Date;
  jwtToken?: string;
  refreshToken?: string;
  tokenExpiry?: Date;
  
  // New fields for group relationships
  groupIds?: string[]; // IDs of groups the user belongs to
  primaryGroupId?: string; // Primary group for the user
  managedGroupIds?: string[]; // Groups managed by this user (for managers/admins)
}

// Password strength requirements
export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  preventPasswordReuse: number; // Number of previous passwords to check
  expiryDays: number; // Password expiry in days
}

// Security Audit Log Event
export interface SecurityEvent {
  id: string;
  userId: string;
  eventType: 'login' | 'logout' | 'failed_login' | 'password_change' | 'mfa_setup' | 'account_locked' | 'account_unlocked' | 'password_reset' | 'role_change' | 'permission_change';
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  details?: string;
  severity: 'info' | 'warning' | 'critical';
}

// Role-Based Access Control
export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'approve' | 'reject' | 'assign' | 'configure' | 'manage';
}

export interface RolePermission {
  roleId: UserRole;
  permissionId: string;
}

// Password History
export interface PasswordHistory {
  userId: string;
  passwordHash: string; // In a real app, this would be a hash
  changedAt: Date;
}

// User-Group relationship
export interface UserGroupMembership {
  userId: string;
  groupId: string;
  role: 'member' | 'manager' | 'owner'; // Role within the group
  joinedAt: Date;
  invitedBy?: string; // User ID who invited this user
}

// User-Queue relationship 
export interface UserQueueAssignment {
  userId: string;
  queueId: string;
  assignedAt: Date;
  assignedBy: string; // User ID who made the assignment
  primary: boolean; // Whether this is the user's primary queue
  canViewAll: boolean; // Whether the user can view all tickets in this queue
  canAssignTickets: boolean; // Whether the user can assign tickets in this queue
  canModifyTickets: boolean; // Whether the user can modify tickets in this queue
}
