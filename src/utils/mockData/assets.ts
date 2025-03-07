
import { Asset } from '../types';
import { createAuditEntries } from './auditHelpers';

// Mock assets
export const mockAssets: Asset[] = [
  {
    id: 'CI00001',
    name: 'Dell XPS 15',
    type: 'hardware',
    status: 'in-use',
    assignedTo: 'user-3',
    purchaseDate: new Date(2023, 0, 15),
    manufacturer: 'Dell',
    model: 'XPS 15 9510',
    serialNumber: 'DELL1234567',
    location: 'Main Office',
    notes: 'Executive laptop',
    createdAt: new Date(2023, 0, 16),
    updatedAt: new Date(2023, 0, 16),
    audit: createAuditEntries('CI00001', 'asset', 'user-1'),
  },
  {
    id: 'CI00002',
    name: 'Microsoft Office 365',
    type: 'software',
    status: 'in-use',
    purchaseDate: new Date(2023, 0, 1),
    expiryDate: new Date(2024, 0, 1),
    manufacturer: 'Microsoft',
    notes: 'Company-wide license',
    createdAt: new Date(2023, 0, 3),
    updatedAt: new Date(2023, 0, 3),
    audit: createAuditEntries('CI00002', 'asset', 'user-1'),
  },
  {
    id: 'CI00003',
    name: 'iPhone 13',
    type: 'hardware',
    status: 'in-use',
    assignedTo: 'user-1',
    purchaseDate: new Date(2023, 2, 10),
    manufacturer: 'Apple',
    model: 'iPhone 13 Pro',
    serialNumber: 'APPLE9876543',
    location: 'Main Office',
    createdAt: new Date(2023, 2, 11),
    updatedAt: new Date(2023, 2, 11),
    audit: createAuditEntries('CI00003', 'asset', 'user-2'),
  },
  {
    id: 'CI00004',
    name: 'Adobe Creative Cloud',
    type: 'license',
    status: 'in-use',
    assignedTo: 'user-4',
    purchaseDate: new Date(2023, 1, 15),
    expiryDate: new Date(2024, 1, 15),
    manufacturer: 'Adobe',
    createdAt: new Date(2023, 1, 16),
    updatedAt: new Date(2023, 1, 16),
    audit: createAuditEntries('CI00004', 'asset', 'user-1'),
  },
  {
    id: 'CI00005',
    name: 'HP LaserJet Printer',
    type: 'hardware',
    status: 'in-use',
    purchaseDate: new Date(2022, 11, 5),
    manufacturer: 'HP',
    model: 'LaserJet Pro MFP M428fdw',
    serialNumber: 'HP87654321',
    location: 'Marketing Department',
    createdAt: new Date(2022, 11, 6),
    updatedAt: new Date(2022, 11, 6),
    audit: createAuditEntries('CI00005', 'asset', 'user-2'),
  },
];

// Helper function to get asset by ID
export const getAssetById = (id: string): Asset | undefined => {
  // Handle partial ID search
  if (id.startsWith('CI')) {
    return mockAssets.find(asset => asset.id === id);
  } else {
    // Partial ID search - look for any asset that contains this ID segment
    return mockAssets.find(asset => asset.id.toLowerCase().includes(id.toLowerCase()));
  }
};

// Get the next asset ID number
export const getNextAssetIdNumber = (): number => {
  const existingIds = mockAssets.map(asset => {
    if (asset.id.startsWith('CI')) {
      const numericPart = asset.id.replace('CI', '');
      return parseInt(numericPart, 10);
    }
    return 0;
  });
  
  const maxId = Math.max(...existingIds, 0);
  return maxId + 1;
};

// Generate a new asset ID with format CI00001
export const generateAssetId = (): string => {
  const nextNumber = getNextAssetIdNumber();
  return `CI${nextNumber.toString().padStart(5, '0')}`;
};
