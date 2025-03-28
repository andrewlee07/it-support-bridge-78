
import { Service, ServiceWithCategory } from '@/utils/types/service';
import { serviceCategories } from './categories';
import { teams } from './teams';
import { mockServiceTicketCounts } from './analytics';
import { mockServiceRelationships } from './types';
import { v4 as uuidv4 } from 'uuid';

// Technical services
const technicalServices: Service[] = [
  {
    id: 'service-1',
    name: 'Email System',
    description: 'Corporate email services including Exchange and webmail',
    categoryId: 'cat-2',
    status: 'active',
    supportContactId: 'user-3',
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceOwnerId: 'user-2',
    serviceType: 'technical',
    documentationUrl: 'https://docs.example.com/email',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-06-15')
  },
  {
    id: 'service-2',
    name: 'Network Infrastructure',
    description: 'Corporate network including WiFi, VPN, and internet connectivity',
    categoryId: 'cat-3',
    status: 'active',
    supportContactId: 'user-4',
    supportTeamId: 'team-2',
    supportHours: '24/7 Support',
    serviceOwnerId: 'user-4',
    serviceType: 'technical',
    documentationUrl: 'https://docs.example.com/network',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-07-20')
  },
  {
    id: 'service-3',
    name: 'Security Services',
    description: 'Security tools including antivirus, firewall, and security compliance',
    categoryId: 'cat-4',
    status: 'active',
    supportContactId: 'user-5',
    supportTeamId: 'team-3',
    supportHours: '24/7 Support',
    serviceOwnerId: 'user-5',
    serviceType: 'technical',
    documentationUrl: 'https://docs.example.com/security',
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-08-10')
  },
  {
    id: 'service-4',
    name: 'Workstation Support',
    description: 'Desktop and laptop support for corporate devices',
    categoryId: 'cat-1',
    status: 'active',
    supportContactId: 'user-6',
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceOwnerId: 'user-2',
    serviceType: 'technical',
    documentationUrl: 'https://docs.example.com/workstations',
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-07-01')
  },
  {
    id: 'service-5',
    name: 'Data Backup & Recovery',
    description: 'Enterprise backup solution for servers and critical workstations',
    categoryId: 'cat-2',
    status: 'active',
    supportContactId: 'user-3',
    supportTeamId: 'team-2',
    supportHours: 'Extended Hours (8am-8pm)',
    serviceOwnerId: 'user-4',
    serviceType: 'technical',
    documentationUrl: 'https://docs.example.com/backup',
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2023-09-05')
  },
  {
    id: 'service-6',
    name: 'Cloud Infrastructure',
    description: 'AWS and Azure cloud resources and management',
    categoryId: 'cat-2',
    status: 'active',
    supportContactId: 'user-4',
    supportTeamId: 'team-3',
    supportHours: '24/7 Support',
    serviceOwnerId: 'user-5',
    serviceType: 'technical',
    documentationUrl: 'https://docs.example.com/cloud',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-10-01')
  }
];

// Business services
const businessServices: Service[] = [
  {
    id: 'service-7',
    name: 'HR Technology Platform',
    description: 'Employee management system, time tracking, and benefits administration',
    categoryId: 'cat-2',
    status: 'active',
    supportContactId: 'user-3',
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceOwnerId: 'user-2',
    serviceType: 'business',
    documentationUrl: 'https://docs.example.com/hr-platform',
    createdAt: new Date('2023-04-01'),
    updatedAt: new Date('2023-10-15')
  },
  {
    id: 'service-8',
    name: 'Financial Systems',
    description: 'Accounting, payroll, and financial reporting systems',
    categoryId: 'cat-2',
    status: 'active',
    supportContactId: 'user-4',
    supportTeamId: 'team-2',
    supportHours: 'Business Hours (9am-5pm)',
    serviceOwnerId: 'user-4',
    serviceType: 'business',
    documentationUrl: 'https://docs.example.com/finance',
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date('2023-11-01')
  },
  {
    id: 'service-9',
    name: 'Customer Service Platform',
    description: 'Customer relationship management and support ticketing',
    categoryId: 'cat-5',
    status: 'active',
    supportContactId: 'user-5',
    supportTeamId: 'team-3',
    supportHours: 'Extended Hours (8am-8pm)',
    serviceOwnerId: 'user-5',
    serviceType: 'business',
    documentationUrl: 'https://docs.example.com/customer-service',
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2023-11-15')
  },
  {
    id: 'service-10',
    name: 'Project Management Tools',
    description: 'Project tracking, collaboration, and reporting tools',
    categoryId: 'cat-2',
    status: 'active',
    supportContactId: 'user-6',
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceOwnerId: 'user-2',
    serviceType: 'business',
    documentationUrl: 'https://docs.example.com/project-mgmt',
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-12-01')
  },
  {
    id: 'service-11',
    name: 'Corporate Website',
    description: 'Public-facing corporate website and content management system',
    categoryId: 'cat-2',
    status: 'maintenance',
    supportContactId: 'user-3',
    supportTeamId: 'team-2',
    supportHours: 'Business Hours (9am-5pm)',
    serviceOwnerId: 'user-4',
    serviceType: 'business',
    documentationUrl: 'https://docs.example.com/website',
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-12-15')
  },
  {
    id: 'service-12',
    name: 'Document Management',
    description: 'Enterprise document storage, sharing, and collaboration',
    categoryId: 'cat-2',
    status: 'active',
    supportContactId: 'user-4',
    supportTeamId: 'team-3',
    supportHours: 'Business Hours (9am-5pm)',
    serviceOwnerId: 'user-5',
    serviceType: 'business',
    documentationUrl: 'https://docs.example.com/document-mgmt',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2024-01-01')
  }
];

// Combine all services
const mockServices: Service[] = [...technicalServices, ...businessServices];

// Create services with category information
const mockServicesWithCategories: ServiceWithCategory[] = mockServices.map(service => {
  const category = serviceCategories.find(cat => cat.id === service.categoryId) || {
    id: 'unknown',
    name: 'Unknown Category',
    description: 'Unknown',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  return {
    ...service,
    category
  };
});

// Services with relationships
// const mockServicesWithRelationships: ServiceWithRelationships[] = mockServices.map(service => {
//   return {
//     ...service,
//     relationships: getServiceRelationships(service.id)
//   };
// });

export const getAllServices = (): Service[] => {
  return [...mockServices]; 
};

export const getServiceById = (id: string): Service | undefined => {
  return mockServices.find(service => service.id === id);
};

// Function to get services by category
export const getServicesByCategory = (): Record<string, Service[]> => {
  const servicesByCategory: Record<string, Service[]> = {};
  
  // Initialize with empty arrays for each category
  serviceCategories.forEach(category => {
    servicesByCategory[category.name] = [];
  });
  
  // Add services to their respective categories
  mockServices.forEach(service => {
    const category = serviceCategories.find(cat => cat.id === service.categoryId);
    if (category) {
      servicesByCategory[category.name].push(service);
    }
  });
  
  return servicesByCategory;
};

export { mockServices, mockServicesWithCategories, mockServiceTicketCounts };
