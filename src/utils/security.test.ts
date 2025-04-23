import { describe, it, expect } from 'vitest';
import { sanitizeInput } from './security';

describe('sanitizeInput', () => {
  it('removes HTML tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>hello')).toBe('alert("xss")hello');
  });

  it('escapes special characters', () => {
    expect(sanitizeInput('<b>&"\'`=</b>')).toContain('&amp;');
    expect(sanitizeInput('<b>&"\'`=</b>')).not.toContain('<b>');
  });
});
