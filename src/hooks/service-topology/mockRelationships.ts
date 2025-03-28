
import { ServiceRelationship } from '@/utils/types/service';

// Mock service relationships for development and testing
export const mockServiceRelationships: ServiceRelationship[] = [
  // Parent-child relationships
  {
    id: 'rel-1',
    sourceServiceId: 'service-4', // Workstation Support (child)
    targetServiceId: 'service-2', // Network Infrastructure (parent)
    relationshipType: 'parent-child',
    strength: 'strong',
    description: 'Workstation support depends on network infrastructure'
  },
  {
    id: 'rel-2',
    sourceServiceId: 'service-5', // Data Backup (child)
    targetServiceId: 'service-6', // Cloud Infrastructure (parent)
    relationshipType: 'parent-child',
    strength: 'strong',
    description: 'Data backup relies on cloud infrastructure'
  },
  
  // Technical-business relationships
  {
    id: 'rel-3',
    sourceServiceId: 'service-1', // Email System (technical)
    targetServiceId: 'service-7', // HR Platform (business)
    relationshipType: 'technical-business',
    strength: 'medium',
    description: 'Email system supports HR platform communications'
  },
  {
    id: 'rel-4',
    sourceServiceId: 'service-2', // Network Infrastructure (technical)
    targetServiceId: 'service-8', // Financial Systems (business)
    relationshipType: 'technical-business',
    strength: 'strong',
    description: 'Network infrastructure supports financial systems'
  },
  {
    id: 'rel-5',
    sourceServiceId: 'service-6', // Cloud Infrastructure (technical)
    targetServiceId: 'service-9', // Customer Service Platform (business)
    relationshipType: 'technical-business',
    strength: 'strong',
    description: 'Cloud infrastructure hosts customer service platform'
  },
  {
    id: 'rel-6',
    sourceServiceId: 'service-3', // Security Services (technical)
    targetServiceId: 'service-8', // Financial Systems (business)
    relationshipType: 'technical-business',
    strength: 'strong',
    description: 'Security services protect financial systems'
  },
  {
    id: 'rel-7',
    sourceServiceId: 'service-1', // Email System (technical)
    targetServiceId: 'service-12', // Document Management (business)
    relationshipType: 'technical-business',
    strength: 'medium',
    description: 'Email system supports document sharing'
  },
  
  // Related-to relationships
  {
    id: 'rel-8',
    sourceServiceId: 'service-7', // HR Platform (business)
    targetServiceId: 'service-8', // Financial Systems (business)
    relationshipType: 'related-to',
    strength: 'medium',
    description: 'HR and Financial systems share employee data'
  },
  {
    id: 'rel-9',
    sourceServiceId: 'service-9', // Customer Service Platform (business)
    targetServiceId: 'service-11', // Corporate Website (business)
    relationshipType: 'related-to',
    strength: 'weak',
    description: 'Customer service links to website for knowledge base'
  },
  {
    id: 'rel-10',
    sourceServiceId: 'service-3', // Security Services (technical)
    targetServiceId: 'service-6', // Cloud Infrastructure (technical)
    relationshipType: 'related-to',
    strength: 'strong',
    description: 'Security services protect cloud infrastructure'
  }
];
