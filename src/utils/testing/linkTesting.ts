
/**
 * Utility functions for testing route links in the application
 * 
 * These functions help validate that routes are correctly defined
 * and properly formatted to prevent broken links.
 */

import * as ROUTES from '../routes/routeConstants';

export interface RouteStatus {
  path: string;
  isValid: boolean;
  exists: boolean;
  errorMessage?: string;
}

/**
 * Validates a route path to ensure it's properly formatted
 */
export const validateRoute = (path: string): RouteStatus => {
  const result: RouteStatus = {
    path,
    isValid: true,
    exists: true
  };

  // Check if the path starts with a slash
  if (!path.startsWith('/')) {
    result.isValid = false;
    result.errorMessage = `Invalid route path: ${path} - All routes should start with /`;
    return result;
  }

  // Check if the path contains any invalid characters
  if (/[^a-zA-Z0-9\-\_\/\:\[\]\{\}\@\=\?\&\.\+\$]/.test(path)) {
    result.isValid = false;
    result.errorMessage = `Invalid route path: ${path} - Contains invalid characters`;
    return result;
  }

  return result;
};

/**
 * Tests all defined routes in the application
 */
export const testAllDefinedRoutes = (): RouteStatus[] => {
  const results: RouteStatus[] = [];
  
  // Get all route constants
  const routeEntries = Object.entries(ROUTES);
  
  for (const [name, value] of routeEntries) {
    // Skip function routes and get a sample URL instead
    if (typeof value === 'function') {
      try {
        // Sample ID for testing
        const samplePath = value('SAMPLE-123');
        const result = validateRoute(samplePath);
        results.push({
          ...result,
          path: `${name}('SAMPLE-123') -> ${samplePath}`
        });
      } catch (error) {
        results.push({
          path: `${name}() [function]`,
          isValid: false,
          exists: true,
          errorMessage: `Failed to evaluate function route: ${error}`
        });
      }
    } else if (typeof value === 'string') {
      const result = validateRoute(value);
      results.push({
        ...result,
        path: `${name} -> ${value}`
      });
    }
  }
  
  return results;
};
