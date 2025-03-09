
import { ServiceRelationship } from '@/utils/types/service';
import { serviceRelationships } from '../data/serviceRelationships';

// Get service relationships
export const getServiceRelationships = (serviceId: string): ServiceRelationship[] => {
  return serviceRelationships.filter(
    rel => rel.sourceServiceId === serviceId || rel.targetServiceId === serviceId
  );
};

// Create a service relationship
export const createServiceRelationship = (
  sourceServiceId: string,
  targetServiceId: string,
  relationshipType: string,
  description?: string
): ServiceRelationship => {
  const newRelationship: ServiceRelationship = {
    id: `rel-${serviceRelationships.length + 1}`,
    sourceServiceId,
    targetServiceId,
    relationshipType: relationshipType as any,
    description,
    isActive: true,
    createdAt: new Date()
  };
  
  serviceRelationships.push(newRelationship);
  return newRelationship;
};
