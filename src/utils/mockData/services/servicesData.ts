
import { 
  Service, 
  ServiceWithCategory, 
  ServiceCategory, 
  ServiceRelationship,
  ClientContract,
  ServiceWithRelationships
} from '@/utils/types/service';
import { getCategoryById } from '../serviceCategories';

// Mock service data
const mockServices: Service[] = [
  {
    id: 'srv-1',
    name: 'Email Service',
    description: 'Corporate email service',
    categoryId: 'CAT-001',
    status: 'active',
    serviceType: 'technical', // Added serviceType
    supportContactId: 'usr-1',
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceOwnerId: 'usr-2',
    documentationUrl: 'https://docs.example.com/email',
    createdAt: new Date(2023, 0, 15),
    updatedAt: new Date(2023, 1, 20)
  },
  {
    id: 'srv-2',
    name: 'Authentication Service',
    description: 'User authentication and authorization',
    categoryId: 'CAT-001',
    status: 'active',
    serviceType: 'technical', // Added serviceType
    supportContactId: 'usr-3',
    supportTeamId: 'team-1',
    supportHours: '24/7 Support',
    serviceOwnerId: 'usr-4',
    documentationUrl: 'https://docs.example.com/auth',
    createdAt: new Date(2023, 0, 10),
    updatedAt: new Date(2023, 2, 5)
  },
  {
    id: 'srv-3',
    name: 'Customer Relationship Management',
    description: 'Customer management system',
    categoryId: 'CAT-002',
    status: 'active',
    serviceType: 'business', // Added serviceType
    supportContactId: 'usr-5',
    supportTeamId: 'team-2',
    supportHours: '24/7 Support',
    serviceOwnerId: 'usr-6',
    documentationUrl: 'https://docs.example.com/crm',
    createdAt: new Date(2023, 1, 1),
    updatedAt: new Date(2023, 3, 12)
  },
  {
    id: 'srv-4',
    name: 'Sales Pipeline',
    description: 'Sales pipeline management',
    categoryId: 'CAT-002',
    status: 'active',
    serviceType: 'business', // Added serviceType
    supportContactId: 'usr-7',
    supportTeamId: 'team-2',
    supportHours: 'Business Hours (9am-5pm)',
    serviceOwnerId: 'usr-8',
    documentationUrl: 'https://docs.example.com/sales',
    createdAt: new Date(2023, 1, 15),
    updatedAt: new Date(2023, 3, 20)
  },
  {
    id: 'srv-5',
    name: 'Office Productivity Suite',
    description: 'Document and spreadsheet applications',
    categoryId: 'CAT-003',
    status: 'active',
    serviceType: 'technical', // Added serviceType
    supportContactId: 'usr-9',
    supportTeamId: 'team-3',
    supportHours: 'Extended Hours (8am-8pm)',
    serviceOwnerId: 'usr-10',
    documentationUrl: 'https://docs.example.com/office',
    createdAt: new Date(2023, 2, 1),
    updatedAt: new Date(2023, 4, 10)
  },
  {
    id: 'srv-6',
    name: 'VoIP Phone System',
    description: 'Voice over IP telephone system',
    categoryId: 'CAT-004',
    status: 'active',
    serviceType: 'technical', // Added serviceType
    supportContactId: 'usr-11',
    supportTeamId: 'team-3',
    supportHours: '24/7 Support',
    serviceOwnerId: 'usr-12',
    documentationUrl: 'https://docs.example.com/voip',
    createdAt: new Date(2023, 2, 15),
    updatedAt: new Date(2023, 4, 20)
  },
  {
    id: 'srv-7',
    name: 'Network Infrastructure',
    description: 'Corporate network infrastructure',
    categoryId: 'CAT-001',
    status: 'active',
    serviceType: 'technical',
    supportContactId: 'usr-1',
    supportTeamId: 'team-1',
    supportHours: '24/7 Support',
    serviceOwnerId: 'usr-2',
    documentationUrl: 'https://docs.example.com/network',
    createdAt: new Date(2023, 3, 1),
    updatedAt: new Date(2023, 4, 15)
  },
  {
    id: 'srv-8',
    name: 'Contact Centre',
    description: 'Customer contact centre operations',
    categoryId: 'CAT-005',
    status: 'active',
    serviceType: 'business',
    supportContactId: 'usr-5',
    supportTeamId: 'team-2',
    supportHours: 'Extended Hours (8am-8pm)',
    serviceOwnerId: 'usr-6',
    documentationUrl: 'https://docs.example.com/contact-centre',
    createdAt: new Date(2023, 3, 10),
    updatedAt: new Date(2023, 5, 1)
  }
];

// Sample client contracts
const mockClientContracts: ClientContract[] = [
  {
    id: 'contract-1',
    name: 'Lloyds Support Agreement',
    clientName: 'Lloyds Bank',
    description: 'IT support services for Lloyds Bank corporate offices',
    startDate: new Date(2023, 0, 1),
    endDate: new Date(2023, 11, 31),
    status: 'active', // Using the correct status type
    businessServiceIds: ['srv-3', 'srv-4', 'srv-8'],
    createdAt: new Date(2022, 11, 15),
    updatedAt: new Date(2022, 11, 15)
  },
  {
    id: 'contract-2',
    name: 'Home Office IT Services',
    clientName: 'UK Home Office',
    description: 'Comprehensive IT services for Home Office locations',
    startDate: new Date(2023, 2, 1),
    endDate: new Date(2024, 1, 28),
    status: 'active', // Using the correct status type
    businessServiceIds: ['srv-3', 'srv-8'],
    createdAt: new Date(2023, 1, 10),
    updatedAt: new Date(2023, 1, 10)
  },
  {
    id: 'contract-3',
    name: 'NHS Digital Support',
    clientName: 'NHS Digital',
    description: 'Technical support for NHS Digital platforms',
    startDate: new Date(2022, 6, 1),
    endDate: new Date(2023, 5, 30),
    status: 'pending', // Using the correct status type
    businessServiceIds: ['srv-4'],
    createdAt: new Date(2022, 5, 15),
    updatedAt: new Date(2022, 5, 15)
  }
];

// Export functions to interact with the mock data
export const getAllServices = (): Service[] => {
  return [...mockServices];
};

export const getServiceById = (id: string): Service | undefined => {
  return mockServices.find(service => service.id === id);
};

export const getServicesWithCategories = (): ServiceWithCategory[] => {
  return mockServices.map(service => {
    const category = getCategoryById(service.categoryId);
    return {
      ...service,
      category: category || { id: 'unknown', name: 'Unknown Category' }
    };
  });
};

export const getBusinessServices = (): ServiceWithCategory[] => {
  return getServicesWithCategories().filter(service => service.serviceType === 'business');
};

export const getTechnicalServices = (): ServiceWithCategory[] => {
  return getServicesWithCategories().filter(service => service.serviceType === 'technical');
};

// Client contract functions
export const getClientContracts = (): ClientContract[] => {
  return [...mockClientContracts];
};

export const getClientContractById = (id: string): ClientContract | undefined => {
  return mockClientContracts.find(contract => contract.id === id);
};

export const getBusinessServicesForContract = (contractId: string): ServiceWithCategory[] => {
  const contract = getClientContractById(contractId);
  if (!contract) return [];
  
  return getBusinessServices().filter(service => 
    contract.businessServiceIds.includes(service.id)
  );
};

// Function to get service relationships
export const getServiceWithRelationships = (serviceId: string): ServiceWithRelationships | null => {
  const service = getServicesWithCategories().find(s => s.id === serviceId);
  if (!service) return null;
  
  // Get relationships from mock data
  const relationships = getServiceRelationships(serviceId);
  
  // Get technical services that support this business service
  const technicalServices = service.serviceType === 'business' 
    ? getTechnicalServices().slice(0, 2) 
    : [];
  
  // Get business services that this technical service supports
  const businessServices = service.serviceType === 'technical' 
    ? getBusinessServices().slice(0, 2) 
    : [];
  
  // Get child services (for parent/child relationships)
  const childServices = getServiceRelationships(serviceId)
    .filter(rel => rel.relationshipType === 'parent-child' && rel.sourceServiceId === serviceId)
    .map(rel => {
      const childService = getServicesWithCategories().find(s => s.id === rel.targetServiceId);
      return childService;
    })
    .filter(Boolean) as ServiceWithCategory[];
  
  return {
    ...service,
    relationships,
    children: childServices,
    technicalServices,
    businessServices
  };
};

// Get relationships for a specific service
export const getServiceRelationships = (serviceId: string): ServiceRelationship[] => {
  // In a real app, this would come from an API
  // For now, filter from our mock relationships
  const relationships = [...mockServiceRelationships];
  
  return relationships.filter(
    rel => rel.sourceServiceId === serviceId || rel.targetServiceId === serviceId
  );
};
