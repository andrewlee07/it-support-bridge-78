
// User types
export type UserRole = 'admin' | 'manager' | 'agent' | 'developer' | 'it' | 'user';

export type MFAMethod = 'totp' | 'email' | 'sms' | 'none';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
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
  action: 'create' | 'read' | 'update' | 'delete' | 'approve' | 'reject' | 'assign';
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
