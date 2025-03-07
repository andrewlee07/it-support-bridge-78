
// This file is maintained for backward compatibility
// New code should import from the specialized files in the test-integration directory
// Re-export all functions from the new location
export * from './test-integration';

// Export default object with all functions
import api from './test-integration';
export default api;
