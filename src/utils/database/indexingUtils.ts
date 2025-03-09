
/**
 * Database Indexing Utilities
 * 
 * This file provides recommendations and utilities for efficient database indexing
 * in enterprise applications. It can be used with various backend databases.
 */

export interface IndexRecommendation {
  tableName: string;
  columnName: string;
  indexType: 'PRIMARY' | 'UNIQUE' | 'INDEX' | 'FULLTEXT' | 'SPATIAL';
  reason: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  estimatedImpact: string;
}

/**
 * Common tables that benefit from indexing in IT Service Management systems
 */
export const commonIndexableEntities = [
  'users',
  'tickets',
  'incidents',
  'problems',
  'changes',
  'releases',
  'assets',
  'services',
  'configuration_items',
  'audit_logs',
  'security_events'
];

/**
 * Recommended indexes for common ITSM databases
 */
export const recommendedIndexes: IndexRecommendation[] = [
  {
    tableName: 'tickets',
    columnName: 'status',
    indexType: 'INDEX',
    reason: 'Frequently filtered by status in queries',
    priority: 'HIGH',
    estimatedImpact: 'Improves performance of ticket listing and filtering by ~40-60%'
  },
  {
    tableName: 'tickets',
    columnName: 'created_at',
    indexType: 'INDEX',
    reason: 'Often sorted by creation date',
    priority: 'MEDIUM',
    estimatedImpact: 'Improves sorting and date range queries by ~30-50%'
  },
  {
    tableName: 'users',
    columnName: 'email',
    indexType: 'UNIQUE',
    reason: 'Used for login and user lookups',
    priority: 'HIGH',
    estimatedImpact: 'Critical for authentication performance'
  },
  {
    tableName: 'audit_logs',
    columnName: 'entity_id',
    indexType: 'INDEX',
    reason: 'Filtered when viewing history of specific entities',
    priority: 'MEDIUM',
    estimatedImpact: 'Improves audit log filtering by ~70%'
  },
  {
    tableName: 'audit_logs',
    columnName: 'timestamp',
    indexType: 'INDEX',
    reason: 'Often filtered by date ranges',
    priority: 'MEDIUM',
    estimatedImpact: 'Improves audit log queries by date range by ~50%'
  },
  {
    tableName: 'security_events',
    columnName: 'user_id',
    indexType: 'INDEX',
    reason: 'Filtered when viewing user security history',
    priority: 'HIGH',
    estimatedImpact: 'Critical for security monitoring performance'
  }
];

/**
 * Generates SQL statements for creating the recommended indexes
 * Note: Syntax may vary between database systems
 */
export const generateIndexingSQL = (databaseType: 'postgres' | 'mysql' | 'mssql' = 'postgres'): string[] => {
  const statements: string[] = [];
  
  recommendedIndexes.forEach(recommendation => {
    let sql = '';
    
    switch(databaseType) {
      case 'postgres':
        sql = `CREATE ${recommendation.indexType === 'UNIQUE' ? 'UNIQUE ' : ''}INDEX idx_${recommendation.tableName}_${recommendation.columnName} ON ${recommendation.tableName} (${recommendation.columnName});`;
        break;
      case 'mysql':
        sql = `ALTER TABLE ${recommendation.tableName} ADD ${recommendation.indexType === 'UNIQUE' ? 'UNIQUE ' : ''}INDEX idx_${recommendation.columnName} (${recommendation.columnName});`;
        break;
      case 'mssql':
        sql = `CREATE ${recommendation.indexType === 'UNIQUE' ? 'UNIQUE ' : ''}INDEX idx_${recommendation.tableName}_${recommendation.columnName} ON ${recommendation.tableName} (${recommendation.columnName});`;
        break;
    }
    
    statements.push(sql);
  });
  
  return statements;
};

/**
 * Analyzes query performance impact of adding indexes
 * In a real implementation, this would connect to the database and run EXPLAIN ANALYZE
 */
export const analyzeQueryPerformance = (tableName: string, query: string): string => {
  // This is a mock implementation
  // In a real system, this would execute EXPLAIN ANALYZE on the database
  
  const relevantRecommendations = recommendedIndexes.filter(r => r.tableName === tableName);
  
  if (relevantRecommendations.length === 0) {
    return `No specific index recommendations for table ${tableName}`;
  }
  
  return `
Performance Analysis for ${tableName}:
- Query: ${query}
- Potential indexes that would improve performance:
${relevantRecommendations.map(r => `  * Add ${r.indexType} index on ${r.columnName}: ${r.reason} (${r.priority} priority)`).join('\n')}
- Estimated impact: ${relevantRecommendations[0].estimatedImpact}
  `.trim();
};

/**
 * Returns indexing recommendations for specific database query patterns
 */
export const getIndexRecommendations = (tableName: string): IndexRecommendation[] => {
  return recommendedIndexes.filter(recommendation => recommendation.tableName === tableName);
};
