import { Service, ServiceCategory, ServiceWithCategory } from '../types/service';

// Sample service categories
export const mockServiceCategories: ServiceCategory[] = [
  {
    id: 'CAT-001',
    name: 'Infrastructure',
    description: 'Core IT infrastructure components and services',
    displayOrder: 1,
    createdAt: new Date(2023, 0, 1),
    updatedAt: new Date(2023, 0, 1)
  },
  {
    id: 'CAT-002',
    name: 'Business Applications',
    description: 'Applications supporting core business functions',
    displayOrder: 2,
    createdAt: new Date(2023, 0, 1),
    updatedAt: new Date(2023, 0, 1)
  },
  {
    id: 'CAT-003',
    name: 'Software',
    description: 'Standard desktop and productivity software',
    displayOrder: 3,
    createdAt: new Date(2023, 0, 1),
    updatedAt: new Date(2023, 0, 1)
  },
  {
    id: 'CAT-004',
    name: 'Communication',
    description: 'Voice and messaging services',
    displayOrder: 4,
    createdAt: new Date(2023, 0, 1),
    updatedAt: new Date(2023, 0, 1)
  },
  {
    id: 'CAT-005',
    name: 'End User Computing',
    description: 'Desktop, laptop and mobile device services',
    displayOrder: 5,
    createdAt: new Date(2023, 0, 1),
    updatedAt: new Date(2023, 0, 1)
  }
];

// Sample services
export const mockServices: Service[] = [
  {
    id: 'SVC-001',
    name: 'Salesforce CRM',
    description: 'Customer relationship management platform',
    categoryId: 'CAT-002',
    status: 'active',
    supportContactId: 'user-2',
    supportTeamId: 'team-sales',
    supportHours: 'Business Hours (9am-5pm)',
    serviceOwnerId: 'user-5',
    documentationUrl: 'https://example.com/docs/salesforce',
    createdAt: new Date(2023, 0, 5),
    updatedAt: new Date(2023, 0, 5)
  },
  {
    id: 'SVC-002',
    name: 'Microsoft 365',
    description: 'Email and productivity suite',
    categoryId: 'CAT-003',
    status: 'active',
    supportContactId: 'user-3',
    supportTeamId: 'team-it',
    supportHours: '24/7 Support',
    serviceOwnerId: 'user-2',
    documentationUrl: 'https://example.com/docs/office365',
    createdAt: new Date(2023, 0, 6),
    updatedAt: new Date(2023, 0, 6)
  },
  {
    id: 'SVC-003',
    name: 'Corporate WiFi',
    description: 'Office wireless network',
    categoryId: 'CAT-001',
    status: 'active',
    supportContactId: 'user-1',
    supportTeamId: 'team-infrastructure',
    supportHours: '24/7 Support',
    serviceOwnerId: 'user-1',
    documentationUrl: 'https://example.com/docs/wifi',
    createdAt: new Date(2023, 0, 7),
    updatedAt: new Date(2023, 0, 7)
  },
  {
    id: 'SVC-004',
    name: 'Power BI',
    description: 'Business intelligence and reporting',
    categoryId: 'CAT-002',
    status: 'active',
    supportContactId: 'user-4',
    supportTeamId: 'team-analytics',
    supportHours: 'Business Hours (9am-5pm)',
    serviceOwnerId: 'user-5',
    documentationUrl: 'https://example.com/docs/powerbi',
    createdAt: new Date(2023, 0, 8),
    updatedAt: new Date(2023, 0, 8)
  },
  {
    id: 'SVC-005',
    name: 'FileMaker Pro',
    description: 'Custom database applications',
    categoryId: 'CAT-003',
    status: 'active',
    supportContactId: 'user-3',
    supportTeamId: 'team-applications',
    supportHours: 'Extended Hours (8am-8pm)',
    serviceOwnerId: 'user-3',
    documentationUrl: 'https://example.com/docs/filemaker',
    createdAt: new Date(2023, 0, 9),
    updatedAt: new Date(2023, 0, 9)
  },
  {
    id: 'SVC-006',
    name: 'VPN Access',
    description: 'Remote access to company network',
    categoryId: 'CAT-001',
    status: 'active',
    supportContactId: 'user-1',
    supportTeamId: 'team-infrastructure',
    supportHours: '24/7 Support',
    serviceOwnerId: 'user-2',
    documentationUrl: 'https://example.com/docs/vpn',
    createdAt: new Date(2023, 0, 10),
    updatedAt: new Date(2023, 0, 10)
  }
];

// Mock data for service ticket counts
export const mockServiceTicketCounts = [
  { serviceId: 'SVC-001', serviceName: 'Salesforce CRM', incidents: 24, requests: 18, total: 42 },
  { serviceId: 'SVC-002', serviceName: 'Microsoft 365', incidents: 53, requests: 47, total: 100 },
  { serviceId: 'SVC-003', serviceName: 'Corporate WiFi', incidents: 31, requests: 5, total: 36 },
  { serviceId: 'SVC-004', serviceName: 'Power BI', incidents: 12, requests: 9, total: 21 },
  { serviceId: 'SVC-005', serviceName: 'FileMaker Pro', incidents: 7, requests: 11, total: 18 },
  { serviceId: 'SVC-006', serviceName: 'VPN Access', incidents: 28, requests: 19, total: 47 }
];

// Helper function to get services with their category information
export const getServicesWithCategories = (): ServiceWithCategory[] => {
  return mockServices.map(service => {
    const category = mockServiceCategories.find(cat => cat.id === service.categoryId);
    return {
      ...service,
      category: category || { 
        id: 'unknown', 
        name: 'Unknown',
        description: 'Unknown category',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    };
  });
};

// Helper function to get services by category
export const getServicesByCategory = (): Record<string, ServiceWithCategory[]> => {
  const servicesWithCategories = getServicesWithCategories();
  return servicesWithCategories.reduce((acc, service) => {
    const categoryName = service.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(service);
    return acc;
  }, {} as Record<string, ServiceWithCategory[]>);
};

// Get service by ID
export const getServiceById = (id: string): ServiceWithCategory | undefined => {
  const service = mockServices.find(s => s.id === id);
  if (!service) return undefined;
  
  const category = mockServiceCategories.find(cat => cat.id === service.categoryId);
  return {
    ...service,
    category: category || { 
      id: 'unknown', 
      name: 'Unknown',
      description: 'Unknown category',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  };
};

// Generate a new service ID
export const generateServiceId = (): string => {
  const existingIds = mockServices.map(service => {
    const numericPart = service.id.replace('SVC-', '');
    return parseInt(numericPart, 10);
  });
  
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  const nextId = maxId + 1;
  return `SVC-${nextId.toString().padStart(3, '0')}`;
};

// Generate a new category ID
export const generateCategoryId = (): string => {
  const existingIds = mockServiceCategories.map(category => {
    const numericPart = category.id.replace('CAT-', '');
    return parseInt(numericPart, 10);
  });
  
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  const nextId = maxId + 1;
  return `CAT-${nextId.toString().padStart(3, '0')}`;
};

// Mock data for teams
export const mockTeams = [
  { id: 'team-it', name: 'IT Support' },
  { id: 'team-infrastructure', name: 'Infrastructure Team' },
  { id: 'team-applications', name: 'Applications Support' },
  { id: 'team-analytics', name: 'Analytics Team' },
  { id: 'team-sales', name: 'Sales Operations' }
];

// Helper function to get team by ID
export const getTeamById = (id: string): { id: string, name: string } | undefined => {
  return mockTeams.find(team => team.id === id);
};
