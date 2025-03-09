
import { BusinessUnit, ServiceBusinessUnit, ServiceBusinessUnitCriticality } from '../types/service';

// Mock business units
export const mockBusinessUnits: BusinessUnit[] = [
  {
    id: 'BU-001',
    name: 'Finance',
    description: 'Financial operations and accounting',
    managerIds: ['user-5'],
    createdAt: new Date(2023, 0, 15),
    updatedAt: new Date(2023, 0, 15)
  },
  {
    id: 'BU-002',
    name: 'Human Resources',
    description: 'Employee management and hiring',
    managerIds: ['user-2'],
    createdAt: new Date(2023, 0, 16),
    updatedAt: new Date(2023, 0, 16)
  },
  {
    id: 'BU-003',
    name: 'Sales',
    description: 'Customer acquisition and sales operations',
    managerIds: ['user-4'],
    createdAt: new Date(2023, 0, 17),
    updatedAt: new Date(2023, 0, 17)
  },
  {
    id: 'BU-004',
    name: 'Marketing',
    description: 'Brand management and promotion',
    managerIds: ['user-3'],
    createdAt: new Date(2023, 0, 18),
    updatedAt: new Date(2023, 0, 18)
  },
  {
    id: 'BU-005',
    name: 'Operations',
    description: 'Day-to-day business operations',
    managerIds: ['user-1'],
    createdAt: new Date(2023, 0, 19),
    updatedAt: new Date(2023, 0, 19)
  }
];

// Mock service business unit relationships
export const mockServiceBusinessUnits: ServiceBusinessUnit[] = [
  {
    id: 'SBU-001',
    serviceId: 'SVC-001',
    businessUnitId: 'BU-003',
    criticality: 'Critical',
    notes: 'Critical for sales operations'
  },
  {
    id: 'SBU-002',
    serviceId: 'SVC-001',
    businessUnitId: 'BU-004',
    criticality: 'High',
    notes: 'Used for marketing campaigns'
  },
  {
    id: 'SBU-003',
    serviceId: 'SVC-002',
    businessUnitId: 'BU-001',
    criticality: 'High',
    notes: 'Essential for financial reporting'
  },
  {
    id: 'SBU-004',
    serviceId: 'SVC-002',
    businessUnitId: 'BU-002',
    criticality: 'Medium',
    notes: 'Used for HR document management'
  },
  {
    id: 'SBU-005',
    serviceId: 'SVC-002',
    businessUnitId: 'BU-003',
    criticality: 'Medium',
    notes: 'Support for sales documentation'
  },
  {
    id: 'SBU-006',
    serviceId: 'SVC-003',
    businessUnitId: 'BU-005',
    criticality: 'Critical',
    notes: 'Essential for all operations'
  },
  {
    id: 'SBU-007',
    serviceId: 'SVC-004',
    businessUnitId: 'BU-001',
    criticality: 'Critical',
    notes: 'Critical for financial analysis'
  },
  {
    id: 'SBU-008',
    serviceId: 'SVC-005',
    businessUnitId: 'BU-002',
    criticality: 'Medium',
    notes: 'Used for HR data management'
  },
  {
    id: 'SBU-009',
    serviceId: 'SVC-006',
    businessUnitId: 'BU-005',
    criticality: 'Critical',
    notes: 'Critical for remote operations'
  }
];

// Helper functions
export const getBusinessUnitById = (id: string): BusinessUnit | undefined => {
  return mockBusinessUnits.find(bu => bu.id === id);
};

export const getAllBusinessUnits = (): BusinessUnit[] => {
  return [...mockBusinessUnits];
};

export const getBusinessUnitsByManagerId = (managerId: string): BusinessUnit[] => {
  return mockBusinessUnits.filter(bu => bu.managerIds.includes(managerId));
};

export const getServiceBusinessUnitsByServiceId = (serviceId: string): ServiceBusinessUnit[] => {
  return mockServiceBusinessUnits.filter(sbu => sbu.serviceId === serviceId);
};

export const getServiceBusinessUnitsByBusinessUnitId = (businessUnitId: string): ServiceBusinessUnit[] => {
  return mockServiceBusinessUnits.filter(sbu => sbu.businessUnitId === businessUnitId);
};

export const getBusinessUnitsForService = (serviceId: string): (BusinessUnit & { criticality: ServiceBusinessUnitCriticality, notes?: string })[] => {
  const serviceBusinessUnits = getServiceBusinessUnitsByServiceId(serviceId);
  
  return serviceBusinessUnits.map(sbu => {
    const businessUnit = getBusinessUnitById(sbu.businessUnitId);
    if (!businessUnit) return null;
    
    return {
      ...businessUnit,
      criticality: sbu.criticality,
      notes: sbu.notes
    };
  }).filter(Boolean) as (BusinessUnit & { criticality: ServiceBusinessUnitCriticality, notes?: string })[];
};

export const getServicesForBusinessUnit = (businessUnitId: string): string[] => {
  const serviceBusinessUnits = getServiceBusinessUnitsByBusinessUnitId(businessUnitId);
  return serviceBusinessUnits.map(sbu => sbu.serviceId);
};

// Generate a new business unit ID
export const generateBusinessUnitId = (): string => {
  const existingIds = mockBusinessUnits.map(bu => {
    const numericPart = bu.id.replace('BU-', '');
    return parseInt(numericPart, 10);
  });
  
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  const nextId = maxId + 1;
  return `BU-${nextId.toString().padStart(3, '0')}`;
};

// CRUD operations for business units
export const addBusinessUnit = (businessUnit: Omit<BusinessUnit, 'id' | 'createdAt' | 'updatedAt'>): BusinessUnit => {
  const newBusinessUnit: BusinessUnit = {
    id: generateBusinessUnitId(),
    ...businessUnit,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  mockBusinessUnits.push(newBusinessUnit);
  return newBusinessUnit;
};

export const updateBusinessUnit = (id: string, businessUnit: Partial<BusinessUnit>): BusinessUnit | null => {
  const index = mockBusinessUnits.findIndex(bu => bu.id === id);
  if (index === -1) return null;
  
  mockBusinessUnits[index] = {
    ...mockBusinessUnits[index],
    ...businessUnit,
    updatedAt: new Date()
  };
  
  return mockBusinessUnits[index];
};

export const deleteBusinessUnit = (id: string): BusinessUnit | null => {
  const index = mockBusinessUnits.findIndex(bu => bu.id === id);
  if (index === -1) return null;
  
  const deletedBusinessUnit = mockBusinessUnits[index];
  mockBusinessUnits.splice(index, 1);
  
  // Also delete any service-business unit relationships
  const relatedSBUs = mockServiceBusinessUnits.filter(sbu => sbu.businessUnitId === id);
  relatedSBUs.forEach(sbu => {
    const sbuIndex = mockServiceBusinessUnits.findIndex(item => item.id === sbu.id);
    if (sbuIndex !== -1) {
      mockServiceBusinessUnits.splice(sbuIndex, 1);
    }
  });
  
  return deletedBusinessUnit;
};

// Service-business unit relationship operations
export const addServiceBusinessUnit = (
  serviceId: string, 
  businessUnitId: string, 
  criticality: ServiceBusinessUnitCriticality, 
  notes?: string
): ServiceBusinessUnit => {
  // Check if relationship already exists
  const existing = mockServiceBusinessUnits.find(
    sbu => sbu.serviceId === serviceId && sbu.businessUnitId === businessUnitId
  );
  
  if (existing) {
    existing.criticality = criticality;
    existing.notes = notes;
    return existing;
  }
  
  // Generate new ID
  const newId = `SBU-${(mockServiceBusinessUnits.length + 1).toString().padStart(3, '0')}`;
  
  const newServiceBusinessUnit: ServiceBusinessUnit = {
    id: newId,
    serviceId,
    businessUnitId,
    criticality,
    notes
  };
  
  mockServiceBusinessUnits.push(newServiceBusinessUnit);
  return newServiceBusinessUnit;
};

export const removeServiceBusinessUnit = (serviceId: string, businessUnitId: string): boolean => {
  const index = mockServiceBusinessUnits.findIndex(
    sbu => sbu.serviceId === serviceId && sbu.businessUnitId === businessUnitId
  );
  
  if (index === -1) return false;
  
  mockServiceBusinessUnits.splice(index, 1);
  return true;
};

export const updateServiceBusinessUnitCriticality = (
  serviceId: string, 
  businessUnitId: string, 
  criticality: ServiceBusinessUnitCriticality
): ServiceBusinessUnit | null => {
  const sbu = mockServiceBusinessUnits.find(
    item => item.serviceId === serviceId && item.businessUnitId === businessUnitId
  );
  
  if (!sbu) return null;
  
  sbu.criticality = criticality;
  return sbu;
};
