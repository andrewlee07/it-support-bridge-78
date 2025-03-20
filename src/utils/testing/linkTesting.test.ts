
import { testAllDefinedRoutes, validateRoute } from './linkTesting';
import * as ROUTES from '../routes/routeConstants';

/**
 * Unit tests for link validation utilities
 * 
 * These tests help ensure that our route constants are correctly defined
 * and that our validation logic works as expected.
 */
describe('Link Testing Utilities', () => {
  // Test the validateRoute function
  describe('validateRoute', () => {
    it('should validate correctly formatted routes', () => {
      const result = validateRoute('/changes');
      expect(result.isValid).toBe(true);
      expect(result.exists).toBe(true);
    });
    
    it('should invalidate incorrectly formatted routes', () => {
      const result = validateRoute('changes'); // Missing leading slash
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('should start with /');
    });
  });
  
  // Test that our route constants are well-formed
  describe('Route Constants', () => {
    it('should have well-formed static routes', () => {
      // Test some sample static routes
      expect(ROUTES.CHANGES).toEqual('/changes');
      expect(ROUTES.DASHBOARD).toEqual('/dashboard');
      expect(ROUTES.INCIDENTS).toEqual('/incidents');
    });
    
    it('should have well-formed dynamic routes', () => {
      // Test some sample dynamic routes
      expect(ROUTES.CHANGE_DETAIL('CHG-123')).toEqual('/changes/CHG-123');
      expect(ROUTES.EDIT_CHANGE('CHG-456')).toEqual('/changes/CHG-456/edit');
      expect(ROUTES.INCIDENT_DETAIL('INC-789')).toEqual('/incidents/INC-789');
    });
  });
  
  // Test the testAllDefinedRoutes function
  describe('testAllDefinedRoutes', () => {
    it('should test all defined routes without errors', () => {
      const results = testAllDefinedRoutes();
      // Every route should be valid in our test environment
      expect(results.every(result => result.isValid)).toBe(true);
    });
  });
});
