
import { useState, useEffect } from 'react';
import { Service, ServiceCategory, ServiceWithCategory, ServiceRelationship, ServiceWithRelationships } from '@/utils/types/service';

// Mock relationship data (in a real app, this would come from an API)
const mockServiceRelationships: ServiceRelationship[] = [
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

type TopologyNode = {
  id: string;
  name: string;
  category: string;
  status: string;
  value: number; // Used for size in visualizations
  color?: string;
};

type TopologyLink = {
  source: string;
  target: string;
  value: number; // Link strength
  type: string;
};

type TopologyData = {
  nodes: TopologyNode[];
  links: TopologyLink[];
};

export function useServiceTopology(services: ServiceWithCategory[]) {
  const [relationships, setRelationships] = useState<ServiceRelationship[]>([]);
  const [topologyData, setTopologyData] = useState<TopologyData>({ nodes: [], links: [] });
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  // In a real app, fetch relationships from API
  useEffect(() => {
    // Simulating API fetch
    setRelationships(mockServiceRelationships);
  }, []);

  // Process services and relationships into topology data
  useEffect(() => {
    if (services.length === 0 || relationships.length === 0) return;

    // Create nodes from services
    const nodes = services.map(service => ({
      id: service.id,
      name: service.name,
      category: service.category.name,
      status: service.status,
      value: 1, // Base size
      color: getServiceStatusColor(service.status)
    }));

    // Create links from relationships
    const links = relationships.map(rel => ({
      source: rel.sourceServiceId,
      target: rel.targetServiceId,
      value: getRelationshipStrength(rel.strength),
      type: rel.relationshipType
    }));

    setTopologyData({ nodes, links });
  }, [services, relationships]);

  // Get all services related to a specific service
  const getRelatedServices = (serviceId: string) => {
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

  // Helper function to determine relationship strength value
  const getRelationshipStrength = (strength?: 'weak' | 'medium' | 'strong'): number => {
    switch (strength) {
      case 'strong': return 3;
      case 'medium': return 2;
      case 'weak': return 1;
      default: return 1;
    }
  };

  // Helper function to get color based on service status
  const getServiceStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return '#10b981'; // green
      case 'inactive': return '#6b7280'; // gray
      case 'maintenance': return '#f59e0b'; // amber
      case 'deprecated': return '#ef4444'; // red
      default: return '#6b7280'; // default gray
    }
  };

  // Enrich services with their relationships
  const getServicesWithRelationships = (): ServiceWithRelationships[] => {
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

  // Build a hierarchical tree of services (for tree visualizations)
  const buildServiceTree = () => {
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

  return {
    topologyData,
    getRelatedServices,
    getServicesWithRelationships,
    buildServiceTree,
    selectedService,
    setSelectedService
  };
}
