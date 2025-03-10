
// Mock asset data for demonstration purposes
export const mockAssets = [
  {
    id: 'ASSET-001',
    name: 'Dell XPS 15 Laptop',
    type: 'hardware',
    model: 'Dell XPS 15 9500',
    serialNumber: 'XPS-9500-001',
    status: 'in-use',
    location: 'Main Office',
    assignedTo: 'user-1',
    purchaseDate: new Date('2021-05-15'),
    expiryDate: new Date('2024-05-15'),
    manufacturer: 'Dell',
    notes: 'Primary development laptop for frontend team',
    createdAt: new Date('2021-05-15'),
    updatedAt: new Date('2021-05-15'),
    audit: []
  },
  {
    id: 'ASSET-002',
    name: 'iPhone 13 Pro',
    type: 'hardware',
    model: 'Apple iPhone 13 Pro',
    serialNumber: 'IP13-PRO-002',
    status: 'in-use',
    location: 'Remote',
    assignedTo: 'user-2',
    purchaseDate: new Date('2021-10-20'),
    expiryDate: new Date('2023-10-20'),
    manufacturer: 'Apple',
    notes: 'Testing device for mobile apps',
    createdAt: new Date('2021-10-20'),
    updatedAt: new Date('2021-10-20'),
    audit: []
  },
  {
    id: 'ASSET-003',
    name: 'MS Office 365 License',
    type: 'software',
    model: 'Microsoft Office 365 Business',
    serialNumber: 'OFF365-BUS-003',
    status: 'in-use',
    assignedTo: 'user-3',
    purchaseDate: new Date('2022-01-05'),
    expiryDate: new Date('2023-01-05'),
    manufacturer: 'Microsoft',
    notes: 'Annual subscription',
    createdAt: new Date('2022-01-05'),
    updatedAt: new Date('2022-01-05'),
    audit: []
  },
  {
    id: 'ASSET-004',
    name: 'HP LaserJet Pro',
    type: 'hardware',
    model: 'HP LaserJet Pro M404dn',
    serialNumber: 'HP-M404DN-004',
    status: 'available',
    location: 'Finance Department',
    purchaseDate: new Date('2020-11-12'),
    expiryDate: new Date('2023-11-12'),
    manufacturer: 'HP',
    notes: 'Main printer for finance team',
    createdAt: new Date('2020-11-12'),
    updatedAt: new Date('2020-11-12'),
    audit: []
  },
  {
    id: 'ASSET-005',
    name: 'Adobe Creative Cloud',
    type: 'software',
    model: 'Adobe Creative Cloud Complete',
    serialNumber: 'ADOBE-CC-005',
    status: 'in-use',
    assignedTo: 'user-4',
    purchaseDate: new Date('2021-12-10'),
    expiryDate: new Date('2022-12-10'),
    manufacturer: 'Adobe',
    notes: 'Design team subscription',
    createdAt: new Date('2021-12-10'),
    updatedAt: new Date('2021-12-10'),
    audit: []
  },
  {
    id: 'ASSET-006',
    name: 'Cisco Switch',
    type: 'hardware',
    model: 'Cisco Catalyst 9300',
    serialNumber: 'CISCO-9300-006',
    status: 'in-use',
    location: 'Server Room',
    purchaseDate: new Date('2020-06-23'),
    expiryDate: new Date('2025-06-23'),
    manufacturer: 'Cisco',
    notes: 'Main network switch for office',
    createdAt: new Date('2020-06-23'),
    updatedAt: new Date('2020-06-23'),
    audit: []
  }
];

// Generate a new asset ID
export const generateAssetId = () => {
  const lastAsset = mockAssets[mockAssets.length - 1];
  const lastIdNumber = parseInt(lastAsset.id.split('-')[1]);
  const newIdNumber = lastIdNumber + 1;
  return `ASSET-${newIdNumber.toString().padStart(3, '0')}`;
};

// Helper function to get all assets
export const getAllAssets = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAssets;
};

// Helper function to get an asset by ID
export const getAssetById = (id: string) => {
  return mockAssets.find(asset => asset.id === id);
};

// Helper function to get assets by type
export const getAssetsByType = (type: string) => {
  return mockAssets.filter(asset => asset.type === type);
};

// Helper function to get assets by status
export const getAssetsByStatus = (status: string) => {
  return mockAssets.filter(asset => asset.status === status);
};

// Helper function to get assets by assignee
export const getAssetsByAssignee = (assigneeId: string) => {
  return mockAssets.filter(asset => asset.assignedTo === assigneeId);
};
