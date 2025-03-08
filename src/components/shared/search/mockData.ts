
import { SearchResult } from './types';

// Sample search results with correct type values
export const mockSearchResults: SearchResult[] = [
  {
    id: 'inc-1',
    title: 'Network Outage',
    description: 'Major network outage affecting all systems',
    type: 'incident',
    url: '/incidents/inc-1',
    status: 'active',
    priority: 'critical',
    date: new Date(Date.now() - 3600000) // 1 hour ago
  },
  {
    id: 'bug-123',
    title: 'Login Form Validation Bug',
    description: 'Form submits even with invalid credentials',
    type: 'bug',
    url: '/bugs/bug-123',
    status: 'open',
    priority: 'high'
  },
  {
    id: 'tc-45',
    title: 'Payment Processing Test',
    description: 'Verify payment processing with various methods',
    type: 'testCase',
    url: '/test-cases/tc-45',
    status: 'failed',
    priority: 'medium'
  },
  {
    id: 'bl-89',
    title: 'Implement SSO Authentication',
    description: 'Add single sign-on functionality',
    type: 'backlogItem',
    url: '/backlog/bl-89',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'rel-12',
    title: 'Version 2.0 Release',
    description: 'Major platform update with new features',
    type: 'release',
    url: '/releases/rel-12',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'ast-34',
    title: 'Database Server',
    description: 'Primary database server in main datacenter',
    type: 'asset',
    url: '/assets/ast-34',
    status: 'active',
    priority: 'critical'
  },
  {
    id: 'chg-56',
    title: 'Network Configuration Update',
    description: 'Updates to firewall rules and routing tables',
    type: 'change',
    url: '/changes/chg-56',
    status: 'pending',
    priority: 'medium'
  }
];
