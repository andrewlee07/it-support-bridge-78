import { describe, it, expect } from 'vitest';
import * as knowledgeApi from './knowledgeApi';

describe('knowledgeApi', () => {
  it('should export fetchKnowledgeArticles function', () => {
    expect(typeof knowledgeApi.fetchKnowledgeArticles).toBe('function');
  });

  // Add more tests for other exported functions
});
