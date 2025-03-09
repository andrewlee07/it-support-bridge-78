
import { ServiceCategory } from '../types/service';

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

// Helper functions for categories
export const getCategoryById = (id: string): ServiceCategory | undefined => {
  return mockServiceCategories.find(cat => cat.id === id);
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
