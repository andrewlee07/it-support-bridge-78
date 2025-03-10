
import { ServiceRelationship } from '@/utils/types/service';

// Mock relationship data (in a real app, this would come from an API)
export const mockServiceRelationships: ServiceRelationship[] = [
  {
    id: 'rel-1',
    sourceServiceId: 'srv-1',
    targetServiceId: 'srv-2',
    relationshipType: 'depends-on',
    description: 'Email service depends on user authentication service',
    strength: 'strong'
  },
  {
    id: 'rel-2',
    sourceServiceId: 'srv-3',
    targetServiceId: 'srv-2',
    relationshipType: 'depends-on',
    strength: 'medium'
  },
  {
    id: 'rel-3',
    sourceServiceId: 'srv-4',
    targetServiceId: 'srv-3',
    relationshipType: 'parent-child',
    description: 'CRM is a parent service to Sales Pipeline',
    strength: 'strong'
  },
  {
    id: 'rel-4',
    sourceServiceId: 'srv-5',
    targetServiceId: 'srv-4',
    relationshipType: 'component-of',
    strength: 'strong'
  },
  {
    id: 'rel-5',
    sourceServiceId: 'srv-6',
    targetServiceId: 'srv-7',
    relationshipType: 'related-to',
    strength: 'weak'
  },
  {
    id: 'rel-6',
    sourceServiceId: 'srv-8',
    targetServiceId: 'srv-3',
    relationshipType: 'depends-on',
    strength: 'medium'
  }
];
