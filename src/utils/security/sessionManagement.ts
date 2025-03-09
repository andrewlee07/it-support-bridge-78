
import { User } from '../types/user';
import { logSecurityEvent } from './securityEvents';

// Store the default session timeout in minutes - in a real app, this would be stored in a database
let defaultSessionTimeout = 30;

// Update the default session timeout
export const updateDefaultSessionTimeout = (minutes: number): number => {
  if (minutes < 1) {
    throw new Error('Session timeout must be at least 1 minute');
  }
  defaultSessionTimeout = minutes;
  console.log('Default session timeout updated:', defaultSessionTimeout);
  return defaultSessionTimeout;
};

// Get the default session timeout
export const getDefaultSessionTimeout = (): number => {
  return defaultSessionTimeout;
};

// Check if password has expired
export const isPasswordExpired = (user: User): boolean => {
  if (!user.passwordLastChanged) return false;
  
  const expiryDate = new Date(user.passwordLastChanged);
  expiryDate.setDate(expiryDate.getDate() + (user.passwordPolicy?.expiryDays || 90));
  
  return new Date() > expiryDate;
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

// Function to check if a user session is valid
export const isSessionValid = (user: User): boolean => {
  if (!user.tokenExpiry) return false;
  
  const tokenExpiry = new Date(user.tokenExpiry);
  const now = new Date();
  
  return tokenExpiry > now;
};

// Function to get the client's IP address (mock implementation)
export const getClientIPAddress = (): string => {
  // In a real application, this would be implemented differently
  // This is just a mock implementation for development
  return '127.0.0.1';
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
