
import { Service } from '../types/service';

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
