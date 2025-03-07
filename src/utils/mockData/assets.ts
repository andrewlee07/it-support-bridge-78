
import { Asset } from '../types';
import { createAuditEntries } from './auditHelpers';

// Mock assets
export const mockAssets: Asset[] = [
  {
    id: 'asset-1',
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
    audit: createAuditEntries('asset-1', 'asset', 'user-1'),
  },
  {
    id: 'asset-2',
    name: 'Microsoft Office 365',
    type: 'software',
    status: 'in-use',
    purchaseDate: new Date(2023, 0, 1),
    expiryDate: new Date(2024, 0, 1),
    manufacturer: 'Microsoft',
    notes: 'Company-wide license',
    createdAt: new Date(2023, 0, 3),
    updatedAt: new Date(2023, 0, 3),
    audit: createAuditEntries('asset-2', 'asset', 'user-1'),
  },
  {
    id: 'asset-3',
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
    audit: createAuditEntries('asset-3', 'asset', 'user-2'),
  },
  {
    id: 'asset-4',
    name: 'Adobe Creative Cloud',
    type: 'license',
    status: 'in-use',
    assignedTo: 'user-4',
    purchaseDate: new Date(2023, 1, 15),
    expiryDate: new Date(2024, 1, 15),
    manufacturer: 'Adobe',
    createdAt: new Date(2023, 1, 16),
    updatedAt: new Date(2023, 1, 16),
    audit: createAuditEntries('asset-4', 'asset', 'user-1'),
  },
  {
    id: 'asset-5',
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
    audit: createAuditEntries('asset-5', 'asset', 'user-2'),
  },
];

// Helper function to get asset by ID
export const getAssetById = (id: string): Asset | undefined => {
  return mockAssets.find(asset => asset.id === id);
};
