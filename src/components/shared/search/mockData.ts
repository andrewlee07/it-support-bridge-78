
import { SearchResult } from './types';

// This would come from a real API in a production app
export const mockSearch = async (query: string): Promise<SearchResult[]> => {
  if (!query || query.length < 2) return [];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const results: SearchResult[] = [
    {
      id: 'incident-1',
      title: 'Network outage in data center',
      description: 'Major incident affecting all services',
      type: 'incident',
      url: '/incidents/incident-1',
      status: 'active',
      priority: 'critical',
      date: new Date()
    },
    {
      id: 'bug-1',
      title: 'Login form validation fails',
      description: 'Users cannot log in when using special characters',
      type: 'bug',
      url: '/bugs/bug-1',
      status: 'open',
      priority: 'high'
    },
    {
      id: 'test-1',
      title: 'User registration test',
      description: 'Verifies the user registration flow',
      type: 'testCase',
      url: '/test-tracking/test-1',
      status: 'passed'
    },
    {
      id: 'backlog-1',
      title: 'Implement password reset feature',
      description: 'Allow users to reset their passwords via email',
      type: 'backlogItem',
      url: '/backlog/backlog-1',
      status: 'in-progress',
      priority: 'medium'
    },
    {
      id: 'release-1',
      title: 'Version 2.0 Release',
      description: 'Major release with new features',
      type: 'release',
      url: '/releases/release-1',
      status: 'planned',
      date: new Date(Date.now() + 86400000 * 14) // 14 days in the future
    },
    {
      id: 'asset-1',
      title: 'Primary Database Server',
      description: 'Main production database',
      type: 'asset',
      url: '/assets/asset-1',
      status: 'active'
    },
    {
      id: 'change-1',
      title: 'Database server migration',
      description: 'Migrate primary database to new hardware',
      type: 'change',
      url: '/changes/change-1',
      status: 'pending',
      priority: 'high'
    }
  ].filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
  );
  
  return results;
};
