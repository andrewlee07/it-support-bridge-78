
import { ServiceRelationship } from '@/utils/types/service';

// Mock service relationships
export const serviceRelationships: ServiceRelationship[] = [
  {
    id: 'rel-1',
    sourceServiceId: 'srv-8', // Workstation Equipment
    targetServiceId: 'srv-1', // Laptop Request
    relationshipType: 'component',
    description: 'Laptop Request is a component of Workstation Equipment service',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 'rel-2',
    sourceServiceId: 'srv-8', // Workstation Equipment
    targetServiceId: 'srv-6', // Monitor Request
    relationshipType: 'component',
    description: 'Monitor Request is a component of Workstation Equipment service',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 'rel-3',
    sourceServiceId: 'srv-1', // Laptop Request
    targetServiceId: 'srv-2', // Software Installation
    relationshipType: 'dependency',
    description: 'Laptop Request depends on Software Installation',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 'rel-4',
    sourceServiceId: 'srv-2', // Software Installation
    targetServiceId: 'srv-7', // Software License
    relationshipType: 'dependency',
    description: 'Software Installation depends on Software License',
    isActive: true,
    createdAt: new Date()
  }
];
