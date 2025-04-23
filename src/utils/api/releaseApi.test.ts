import { describe, it, expect } from 'vitest';
import * as releaseApi from './releaseApi';

describe('releaseApi', () => {
  it('should export fetchReleases function', () => {
    expect(typeof releaseApi.fetchReleases).toBe('function');
  });

  // Add more tests for other exported functions
});
