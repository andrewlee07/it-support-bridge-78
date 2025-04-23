import { describe, it, expect } from 'vitest';
import * as bugApi from './bugApi';

describe('bugApi', () => {
  it('should export fetchBugs function', () => {
    expect(typeof bugApi.fetchBugs).toBe('function');
  });

  // Add more tests for other exported functions
});
