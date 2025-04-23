import { describe, it, expect } from 'vitest';
import * as emailApi from './emailApi';

describe('emailApi', () => {
  it('should export fetchEmails function', () => {
    expect(typeof emailApi.fetchEmails).toBe('function');
  });

  // Add more tests for other exported functions
});
