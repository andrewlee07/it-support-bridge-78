import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import useNotificationChannelList from './useNotificationChannelList';

describe('useNotificationChannelList', () => {
  it('should be a function', () => {
    expect(typeof useNotificationChannelList).toBe('function');
  });
  // Add more tests for hook logic as needed
});
