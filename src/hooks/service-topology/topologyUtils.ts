
import { ServiceRelationship, ServiceWithCategory, ServiceWithRelationships } from '@/utils/types/service';
import { TopologyNode, TopologyLink } from './topologyTypes';

// Helper function to determine relationship strength value
export const getRelationshipStrength = (strength?: 'weak' | 'medium' | 'strong'): number => {
  switch (strength) {
    case 'strong': return 3;
    case 'medium': return 2;
    case 'weak': return 1;
    default: return 1;
  }
};

// Helper function to get color based on service status
export const getServiceStatusColor = (status: string): string => {
  switch (status) {
    case 'active': return '#10b981'; // green
    case 'inactive': return '#6b7280'; // gray
    case 'maintenance': return '#f59e0b'; // amber
    case 'deprecated': return '#ef4444'; // red
    default: return '#6b7280'; // default gray
  }
};

// Function to create topology nodes from services
export const createNodesFromServices = (services: ServiceWithCategory[]): TopologyNode[] => {
  return services.map(service => ({
    id: service.id,
    name: service.name,
    category: service.category.name,
    status: service.status,
    value: 1, // Base size
    color: getServiceStatusColor(service.status)
  }));
};

// Function to create topology links from relationships
export const createLinksFromRelationships = (relationships: ServiceRelationship[]): TopologyLink[] => {
  return relationships.map(rel => ({
    source: rel.sourceServiceId,
    target: rel.targetServiceId,
    value: getRelationshipStrength(rel.strength),
    type: rel.relationshipType
  }));
};

// Function to enrich services with their relationships
export const getServicesWithRelationships = (
  services: ServiceWithCategory[],
  relationships: ServiceRelationship[]
): ServiceWithRelationships[] => {
  return services.map(service => {
    const serviceRelationships = relationships.filter(rel => 
      rel.sourceServiceId === service.id || rel.targetServiceId === service.id
    );
    
    return {
      ...service,
      relationships: serviceRelationships,
    };
  });
};

// Function to build a hierarchical tree of services
export const buildServiceTree = (
  services: ServiceWithCategory[],
  relationships: ServiceRelationship[]
): ServiceWithRelationships[] => {
  // Find root level services (those without parents)
  const parentChildRelationships = relationships.filter(
    rel => rel.relationshipType === 'parent-child'
  );
  
  const childIds = parentChildRelationships.map(rel => rel.sourceServiceId);
  const rootServices = services.filter(service => !childIds.includes(service.id));
  
  // Recursive function to build the tree
  const buildTree = (service: ServiceWithCategory): ServiceWithRelationships => {
    const childRelationships = parentChildRelationships.filter(
      rel => rel.targetServiceId === service.id
    );
    
    const childServices = childRelationships.map(rel => 
      services.find(s => s.id === rel.sourceServiceId)
    ).filter(Boolean) as ServiceWithCategory[];
    
    const serviceRelationships = relationships.filter(rel => 
      rel.sourceServiceId === service.id || rel.targetServiceId === service.id
    );
    
    return {
      ...service,
      relationships: serviceRelationships,
      children: childServices.map(childService => buildTree(childService))
    };
  };
  
  return rootServices.map(service => buildTree(service));
};

// Function to get all services related to a specific service
export const getRelatedServices = (
  serviceId: string,
  services: ServiceWithCategory[],
  relationships: ServiceRelationship[]
): ServiceWithCategory[] => {
  // Find direct relationships
  const directRelationships = relationships.filter(rel => 
    rel.sourceServiceId === serviceId || rel.targetServiceId === serviceId
  );
  
  // Get IDs of related services
  const relatedServiceIds = directRelationships.map(rel => 
    rel.sourceServiceId === serviceId ? rel.targetServiceId : rel.sourceServiceId
  );
  
  // Return the full service objects for the related IDs
  return services.filter(service => relatedServiceIds.includes(service.id));
};
