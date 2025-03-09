
import { ServiceWithCategory, Service } from '@/utils/types/service';
import { serviceCategories } from '../categories';

// Mock services
export const services: ServiceWithCategory[] = [
  {
    id: 'srv-1',
    name: 'Laptop Request',
    description: 'Request a new or replacement laptop',
    categoryId: 'cat-1',
    status: 'active',
    ownerId: 'user-1',
    price: 'Medium',
    approvalRequired: true,
    category: serviceCategories[0],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceType: 'business',
    relatedServiceIds: ['srv-6', 'srv-2'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'srv-2',
    name: 'Software Installation',
    description: 'Request installation of approved software',
    categoryId: 'cat-2',
    status: 'active',
    ownerId: 'user-2',
    price: 'Low',
    approvalRequired: false,
    category: serviceCategories[1],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceType: 'technical',
    relatedServiceIds: ['srv-7'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'srv-3',
    name: 'VPN Access',
    description: 'Request VPN access for remote work',
    categoryId: 'cat-3',
    status: 'active',
    ownerId: 'user-1',
    price: 'Low',
    approvalRequired: true,
    category: serviceCategories[2],
    supportTeamId: 'team-2',
    supportHours: '24/7 Support',
    serviceType: 'technical',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'srv-4',
    name: 'Password Reset',
    description: 'Reset password for corporate accounts',
    categoryId: 'cat-4',
    status: 'active',
    ownerId: 'user-3',
    price: 'Free',
    approvalRequired: false,
    category: serviceCategories[3],
    supportTeamId: 'team-3',
    supportHours: '24/7 Support',
    serviceType: 'technical',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'srv-5',
    name: 'Technical Support',
    description: 'Get technical assistance for IT issues',
    categoryId: 'cat-5',
    status: 'active',
    ownerId: 'user-2',
    price: 'Free',
    approvalRequired: false,
    category: serviceCategories[4],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceType: 'technical',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'srv-6',
    name: 'Monitor Request',
    description: 'Request an additional monitor',
    categoryId: 'cat-1',
    status: 'active',
    ownerId: 'user-1',
    price: 'Medium',
    approvalRequired: true,
    category: serviceCategories[0],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceType: 'business',
    parentServiceId: 'srv-8',  // Child of Workstation Equipment
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'srv-7',
    name: 'Software License',
    description: 'Request a license for software',
    categoryId: 'cat-2',
    status: 'inactive',
    ownerId: 'user-2',
    price: 'High',
    approvalRequired: true,
    category: serviceCategories[1],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceType: 'business',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Let's add a new business service that has technical services as components
  {
    id: 'srv-8',
    name: 'Workstation Equipment',
    description: 'Comprehensive workstation equipment services including laptops, monitors, and peripherals',
    categoryId: 'cat-1',
    status: 'active',
    ownerId: 'user-1',
    price: 'High',
    approvalRequired: true,
    category: serviceCategories[0],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceType: 'business',
    relatedServiceIds: ['srv-1', 'srv-6'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
];
