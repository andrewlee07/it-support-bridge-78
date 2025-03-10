
import { useState, useEffect } from 'react';
import { ServiceWithCategory, ServiceRelationship, ServiceWithRelationships } from '@/utils/types/service';
import { TopologyData } from './topologyTypes';
import { mockServiceRelationships } from './mockRelationships';
import { 
  createNodesFromServices, 
  createLinksFromRelationships, 
  getServicesWithRelationships,
  buildServiceTree,
  getRelatedServices
} from './topologyUtils';

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
    const nodes = createNodesFromServices(services);

    // Create links from relationships
    const links = createLinksFromRelationships(relationships);

    setTopologyData({ nodes, links });
  }, [services, relationships]);

  return {
    topologyData,
    getRelatedServices: (serviceId: string) => getRelatedServices(serviceId, services, relationships),
    getServicesWithRelationships: () => getServicesWithRelationships(services, relationships),
    buildServiceTree: () => buildServiceTree(services, relationships),
    selectedService,
    setSelectedService
  };
}
