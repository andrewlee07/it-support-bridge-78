
import { ServiceCategory } from '@/utils/types/service';

// Mock service categories
export const serviceCategories: ServiceCategory[] = [
  { 
    id: 'cat-1', 
    name: 'Hardware', 
    description: 'Computer hardware and peripherals',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    id: 'cat-2', 
    name: 'Software', 
    description: 'Applications and software licenses',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    id: 'cat-3', 
    name: 'Network', 
    description: 'Network and connectivity services',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    id: 'cat-4', 
    name: 'Security', 
    description: 'IT security services',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    id: 'cat-5', 
    name: 'Support', 
    description: 'Technical support services',
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

export const getAllServiceCategories = (): ServiceCategory[] => {
  return [...serviceCategories];
};

export const getServiceCategoryById = (id: string): ServiceCategory | undefined => {
  return serviceCategories.find(category => category.id === id);
};
