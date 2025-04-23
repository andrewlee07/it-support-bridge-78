import { describe, it, expect } from 'vitest';
import * as taskApi from './taskApi';

describe('taskApi', () => {
  it('should export fetchTasks function', () => {
    expect(typeof taskApi.fetchTasks).toBe('function');
  });

  // Add more tests for other exported functions
});
