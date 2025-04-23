import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import useNotificationChannels from './useNotificationChannels';

describe('useNotificationChannels', () => {
  it('should be a function', () => {
    expect(typeof useNotificationChannels).toBe('function');
  });
  // Add more tests for hook logic as needed
});
