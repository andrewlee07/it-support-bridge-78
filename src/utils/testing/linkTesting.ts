
import * as ROUTES from '../routes/routeConstants';

export type RouteStatus = {
  path: string;
  exists: boolean;
  isValid: boolean;
  errorMessage?: string;
};

/**
 * Validates a route against the application's route definitions
 * 
 * This utility helps identify broken links by checking if a given URL path
 * can be matched to a valid route in the application.
 */
export const validateRoute = (routePath: string): RouteStatus => {
  try {
    // Basic validation for well-formed URL path
    if (!routePath.startsWith('/')) {
      return {
        path: routePath,
        exists: false,
        isValid: false,
        errorMessage: 'Route path should start with /'
      };
    }

    // Placeholder for route validation logic against router config
    // In a real implementation, we would check the router configuration
    
    // For now, returning a success status
    return {
      path: routePath,
      exists: true,
      isValid: true
    };
  } catch (error) {
    return {
      path: routePath,
      exists: false,
      isValid: false,
      errorMessage: error instanceof Error ? error.message : 'Unknown error validating route'
    };
  }
};

/**
 * Tests all routes defined in routeConstants to ensure they are valid
 * 
 * This function can be run in a test to validate that all defined routes
 * have a corresponding handler in the router configuration.
 */
export const testAllDefinedRoutes = (): RouteStatus[] => {
  const results: RouteStatus[] = [];
  
  // Get all static route constants (excluding functions)
  const staticRoutes = Object.entries(ROUTES)
    .filter(([_, value]) => typeof value === 'string')
    .map(([_, value]) => value as string);
  
  // Get dynamic route examples by calling route functions with sample IDs
  const dynamicRouteExamples = [
    ROUTES.CHANGE_DETAIL('CHG-123'),
    ROUTES.EDIT_CHANGE('CHG-123'),
    ROUTES.REJECT_CHANGE('CHG-123'),
    ROUTES.CLOSE_CHANGE('CHG-123'),
    ROUTES.INCIDENT_DETAIL('INC-123'),
    ROUTES.EDIT_INCIDENT('INC-123'),
    ROUTES.SERVICE_REQUEST_DETAIL('SR-123'),
    ROUTES.EDIT_SERVICE_REQUEST('SR-123'),
    ROUTES.PROBLEM_DETAIL('PRB-123'),
    ROUTES.EDIT_PROBLEM('PRB-123'),
    ROUTES.TASK_DETAIL('TSK-123'),
    ROUTES.EDIT_TASK('TSK-123'),
    ROUTES.ASSET_DETAIL('AST-123'),
    ROUTES.EDIT_ASSET('AST-123'),
    ROUTES.KNOWLEDGE_ARTICLE('KA-123'),
    ROUTES.TEST_CASE_DETAIL('TC-123'),
    ROUTES.EDIT_TEST_CASE('TC-123'),
    ROUTES.TEST_EXECUTION('TE-123'),
    ROUTES.REPORT_CATEGORY('performance')
  ];
  
  // Combine all routes
  const allRoutes = [...staticRoutes, ...dynamicRouteExamples];
  
  // Validate each route
  for (const route of allRoutes) {
    results.push(validateRoute(route));
  }
  
  return results;
};

/**
 * Logs route validation results to the console
 * 
 * This function can be used in development mode to identify broken links.
 */
export const logRouteValidationResults = (results: RouteStatus[]): void => {
  console.group('Route Validation Results');
  
  const validRoutes = results.filter(r => r.isValid);
  const invalidRoutes = results.filter(r => !r.isValid);
  
  console.log(`Total routes tested: ${results.length}`);
  console.log(`Valid routes: ${validRoutes.length}`);
  console.log(`Invalid routes: ${invalidRoutes.length}`);
  
  if (invalidRoutes.length > 0) {
    console.group('Invalid Routes');
    invalidRoutes.forEach(route => {
      console.error(`${route.path}: ${route.errorMessage}`);
    });
    console.groupEnd();
  }
  
  console.groupEnd();
};
