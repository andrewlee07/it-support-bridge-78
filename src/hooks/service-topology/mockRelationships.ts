
import { ServiceRelationship } from '@/utils/types/service';

// Mock relationship data (in a real app, this would come from an API)
export const mockServiceRelationships: ServiceRelationship[] = [
  // Parent-child relationships
  {
    id: 'rel-1',
    sourceServiceId: 'srv-1',
    targetServiceId: 'srv-2',
    relationshipType: 'parent-child',
    description: 'Email service is a parent service to authentication service',
    strength: 'strong'
  },
  // Technical-business relationships
  {
    id: 'rel-2',
    sourceServiceId: 'srv-1', // Technical service (Email)
    targetServiceId: 'srv-8', // Business service (Contact Centre)
    relationshipType: 'technical-business',
    description: 'Email service supports Contact Centre operations',
    strength: 'medium'
  },
  {
    id: 'rel-3',
    sourceServiceId: 'srv-2', // Technical service (Authentication)
    targetServiceId: 'srv-3', // Business service (CRM)
    relationshipType: 'technical-business',
    description: 'Authentication service supports CRM operations',
    strength: 'strong'
  },
  // More parent-child relationships
  {
    id: 'rel-4',
    sourceServiceId: 'srv-3', // Parent - CRM
    targetServiceId: 'srv-4', // Child - Sales Pipeline
    relationshipType: 'parent-child',
    description: 'CRM is a parent service to Sales Pipeline',
    strength: 'strong'
  },
  // Direct dependencies
  {
    id: 'rel-5',
    sourceServiceId: 'srv-5', // Office Suite
    targetServiceId: 'srv-4', // Sales Pipeline
    relationshipType: 'depends-on',
    description: 'Sales Pipeline depends on Office Suite for document generation',
    strength: 'medium'
  },
  // Technical-business relationships
  {
    id: 'rel-6',
    sourceServiceId: 'srv-7', // Technical service (Network)
    targetServiceId: 'srv-8', // Business service (Contact Centre)
    relationshipType: 'technical-business',
    description: 'Network infrastructure supports Contact Centre operations',
    strength: 'strong'
  },
  // Additional relationships
  {
    id: 'rel-7',
    sourceServiceId: 'srv-6', // VoIP
    targetServiceId: 'srv-8', // Contact Centre
    relationshipType: 'technical-business',
    description: 'VoIP system supports Contact Centre operations',
    strength: 'strong'
  },
  {
    id: 'rel-8',
    sourceServiceId: 'srv-1', // Email
    targetServiceId: 'srv-3', // CRM
    relationshipType: 'technical-business',
    description: 'Email service supports CRM for notifications',
    strength: 'medium'
  }
];
