
import { User } from '../types/user';
import { DEFAULT_PASSWORD_POLICY } from './passwordPolicy';
import { logSecurityEvent } from './securityEvents';

// Store the session timeout in minutes - in a real app, this would be stored in a database
const DEFAULT_SESSION_TIMEOUT_MINUTES = 30;
let currentSessionTimeoutMinutes = DEFAULT_SESSION_TIMEOUT_MINUTES;

// Set the session timeout in minutes
export const setSessionTimeout = (timeoutMinutes: number): void => {
  currentSessionTimeoutMinutes = timeoutMinutes;
  console.log(`Session timeout set to ${timeoutMinutes} minutes`);
};

// Get the current session timeout in minutes
export const getSessionTimeout = (): number => {
  return currentSessionTimeoutMinutes;
};

// Update the default session timeout - needed for admin settings
export const updateDefaultSessionTimeout = (timeoutMinutes: number): void => {
  setSessionTimeout(timeoutMinutes);
  console.log(`Default session timeout updated to ${timeoutMinutes} minutes`);
};

// Check if a user session is valid (combines isSessionExpired with other checks)
export const isSessionValid = (user: User): boolean => {
  if (!user.jwtToken) return false;
  
  // Check if the session is expired
  if (isSessionExpired(user)) return false;
  
  // Check if the token is expired
  if (user.tokenExpiry && new Date() > new Date(user.tokenExpiry)) return false;
  
  return true;
};

// Check if a user session is expired based on the session timeout
export const isSessionExpired = (user: User): boolean => {
  if (!user.sessionStartTime) return false; // No session start time means session hasn't been initialized
  
  const sessionTimeout = user.sessionTimeout || currentSessionTimeoutMinutes;
  const sessionStartTime = new Date(user.sessionStartTime);
  const currentTime = new Date();
  
  // Calculate session expiry time
  const sessionExpiryTime = new Date(sessionStartTime);
  sessionExpiryTime.setMinutes(sessionExpiryTime.getMinutes() + sessionTimeout);
  
  // Check if current time is past the session expiry time
  return currentTime > sessionExpiryTime;
};

// Check if an IP address is allowed for a user
export const isIPAllowed = (user: User, ipAddress: string): boolean => {
  if (!user.allowedIPRanges || user.allowedIPRanges.length === 0) {
    // No IP restrictions
    return true;
  }
  
  // Check if IP is in allowed ranges
  // This is a simple implementation - in a real app, you'd use CIDR matching
  return user.allowedIPRanges.includes(ipAddress);
};

// Get client IP address (mock implementation)
export const getClientIPAddress = (): string => {
  // In a real app, this would come from the request
  return '127.0.0.1';
};

// Generate a JWT token
export const generateJWTToken = (user: User): { token: string; refreshToken: string; expiry: Date } => {
  // In a real app, this would use a JWT library
  // For demo purposes, we'll just create a mock token
  
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + 1); // Token expires in 1 hour
  
  const token = `mock-jwt-token-${user.id}-${Date.now()}`;
  const refreshToken = `mock-refresh-token-${user.id}-${Date.now()}`;
  
  return { token, refreshToken, expiry };
};

// Refresh a JWT token
export const refreshJWTToken = (user: User, refreshToken: string): { token: string; refreshToken: string; expiry: Date } | null => {
  // In a real app, this would verify the refresh token
  // For demo purposes, we'll just create a new token
  
  if (!refreshToken.startsWith('mock-refresh-token-')) {
    return null;
  }
  
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + 1); // Token expires in 1 hour
  
  const token = `mock-jwt-token-${user.id}-${Date.now()}`;
  const newRefreshToken = `mock-refresh-token-${user.id}-${Date.now()}`;
  
  return { token, refreshToken: newRefreshToken, expiry };
};
