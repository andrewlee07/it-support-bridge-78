
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
}
