
import { User, SecurityEvent } from '../types/user';
import { getClientIPAddress } from './sessionManagement';

// Placeholder for security event log - in a real app, this would be stored in a database
const securityEventLog: SecurityEvent[] = [];

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
