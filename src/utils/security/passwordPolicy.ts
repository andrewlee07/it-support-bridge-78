
import { PasswordPolicy } from '../types/user';

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

// Store the current password policy - in a real app, this would be stored in a database
let currentPasswordPolicy: PasswordPolicy = { ...DEFAULT_PASSWORD_POLICY };

// Check if a password meets the password policy
export const isPasswordValid = (password: string, policy: PasswordPolicy = currentPasswordPolicy): { valid: boolean; reason?: string } => {
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

// Update the password policy
export const updatePasswordPolicy = (newPolicy: PasswordPolicy): PasswordPolicy => {
  currentPasswordPolicy = { ...newPolicy };
  console.log('Password policy updated:', currentPasswordPolicy);
  return currentPasswordPolicy;
};

// Get the current password policy
export const getCurrentPasswordPolicy = (): PasswordPolicy => {
  return { ...currentPasswordPolicy };
};

// Check if password has been used before (in a real app, you'd compare hashes)
export const isPasswordReused = (userId: string, password: string, passwordHistory: { userId: string; passwordHash: string; changedAt: Date }[]): boolean => {
  const userPasswordHistory = passwordHistory.filter(history => history.userId === userId);
  return userPasswordHistory.some(history => history.passwordHash === password);
};

// Hash a password or sensitive value (one-way encryption)
export const hashValue = (value: string): string => {
  // Simple hash function for demonstration
  // DO NOT use this in production - use bcrypt or similar
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
};
