
import { User } from '@/utils/types/user';

export interface ErrorLog {
  id: string;
  timestamp: Date;
  message: string;
  stack?: string;
  componentName?: string;
  userId?: string;
  userName?: string;
  userRole?: string;
  route?: string;
  severity: 'error' | 'warning' | 'info';
  browserInfo?: string;
  resolved: boolean;
  tags?: string[];
}

// In-memory storage for logs (in a real app, this would be persisted to a database)
let errorLogs: ErrorLog[] = [];

/**
 * Log an error to the central error logging system
 */
export const logError = (error: Error | string, options?: {
  componentName?: string; 
  user?: User | null;
  severity?: 'error' | 'warning' | 'info';
  tags?: string[];
}): ErrorLog => {
  const errorMessage = typeof error === 'string' ? error : error.message;
  const errorStack = typeof error === 'string' ? undefined : error.stack;
  
  const log: ErrorLog = {
    id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
    message: errorMessage,
    stack: errorStack,
    componentName: options?.componentName,
    userId: options?.user?.id,
    userName: options?.user?.name,
    userRole: options?.user?.role,
    route: window.location.pathname,
    severity: options?.severity || 'error',
    browserInfo: navigator.userAgent,
    resolved: false,
    tags: options?.tags || [],
  };
  
  console.error(`[${log.severity.toUpperCase()}] ${log.message}`, log);
  errorLogs.push(log);
  
  return log;
};

/**
 * Get all error logs
 */
export const getErrorLogs = (): ErrorLog[] => {
  return [...errorLogs];
};

/**
 * Filter error logs based on criteria
 */
export const filterErrorLogs = (filters: {
  severity?: 'error' | 'warning' | 'info';
  resolved?: boolean;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  search?: string;
  tag?: string;
}): ErrorLog[] => {
  return errorLogs.filter(log => {
    if (filters.severity && log.severity !== filters.severity) return false;
    if (filters.resolved !== undefined && log.resolved !== filters.resolved) return false;
    if (filters.userId && log.userId !== filters.userId) return false;
    if (filters.tag && !log.tags?.includes(filters.tag)) return false;
    
    if (filters.startDate && log.timestamp < filters.startDate) return false;
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      if (log.timestamp > endDate) return false;
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        log.message.toLowerCase().includes(searchLower) ||
        log.userName?.toLowerCase().includes(searchLower) ||
        log.componentName?.toLowerCase().includes(searchLower) ||
        log.route?.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
};

/**
 * Mark an error log as resolved
 */
export const resolveErrorLog = (id: string): ErrorLog | undefined => {
  const logIndex = errorLogs.findIndex(log => log.id === id);
  if (logIndex === -1) return undefined;
  
  errorLogs[logIndex] = { ...errorLogs[logIndex], resolved: true };
  return errorLogs[logIndex];
};

/**
 * Delete an error log
 */
export const deleteErrorLog = (id: string): boolean => {
  const initialLength = errorLogs.length;
  errorLogs = errorLogs.filter(log => log.id !== id);
  return initialLength !== errorLogs.length;
};

/**
 * Clear all error logs
 */
export const clearAllErrorLogs = (): void => {
  errorLogs = [];
};

/**
 * Global error handler to catch unhandled errors
 */
export const setupGlobalErrorHandler = (): void => {
  window.addEventListener('error', (event) => {
    logError(event.error || new Error(event.message), {
      severity: 'error',
      tags: ['unhandled', 'global']
    });
    // Don't prevent default to allow the browser to still show its own error
    // return false;
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    logError(event.reason || new Error('Unhandled Promise rejection'), {
      severity: 'error',
      tags: ['unhandled', 'promise']
    });
  });
  
  console.log('Global error handler has been set up');
};
