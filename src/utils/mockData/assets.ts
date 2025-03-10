
// Mock asset data for demonstration purposes
const mockAssets = [
  {
    id: 'ASSET-001',
    name: 'Dell XPS 15 Laptop',
    type: 'hardware',
    model: 'Dell XPS 15 9500',
    serialNumber: 'XPS-9500-001',
    status: 'active',
    location: 'Main Office',
    assignedTo: 'user-1',
    purchaseDate: new Date('2021-05-15'),
    warrantyExpiration: new Date('2024-05-15'),
    lastAuditDate: new Date('2022-03-10'),
    notes: 'Primary development laptop for frontend team'
  },
  {
    id: 'ASSET-002',
    name: 'iPhone 13 Pro',
    type: 'hardware',
    model: 'Apple iPhone 13 Pro',
    serialNumber: 'IP13-PRO-002',
    status: 'active',
    location: 'Remote',
    assignedTo: 'user-2',
    purchaseDate: new Date('2021-10-20'),
    warrantyExpiration: new Date('2023-10-20'),
    lastAuditDate: new Date('2022-03-15'),
    notes: 'Testing device for mobile apps'
  },
  {
    id: 'ASSET-003',
    name: 'MS Office 365 License',
    type: 'software',
    model: 'Microsoft Office 365 Business',
    serialNumber: 'OFF365-BUS-003',
    status: 'active',
    assignedTo: 'user-3',
    purchaseDate: new Date('2022-01-05'),
    warrantyExpiration: new Date('2023-01-05'),
    lastAuditDate: new Date('2022-03-20'),
    notes: 'Annual subscription'
  },
  {
    id: 'ASSET-004',
    name: 'HP LaserJet Pro',
    type: 'hardware',
    model: 'HP LaserJet Pro M404dn',
    serialNumber: 'HP-M404DN-004',
    status: 'active',
    location: 'Finance Department',
    purchaseDate: new Date('2020-11-12'),
    warrantyExpiration: new Date('2023-11-12'),
    lastAuditDate: new Date('2022-03-25'),
    notes: 'Main printer for finance team'
  },
  {
    id: 'ASSET-005',
    name: 'Adobe Creative Cloud',
    type: 'software',
    model: 'Adobe Creative Cloud Complete',
    serialNumber: 'ADOBE-CC-005',
    status: 'active',
    assignedTo: 'user-4',
    purchaseDate: new Date('2021-12-10'),
    warrantyExpiration: new Date('2022-12-10'),
    lastAuditDate: new Date('2022-04-01'),
    notes: 'Design team subscription'
  },
  {
    id: 'ASSET-006',
    name: 'Cisco Switch',
    type: 'hardware',
    model: 'Cisco Catalyst 9300',
    serialNumber: 'CISCO-9300-006',
    status: 'active',
    location: 'Server Room',
    purchaseDate: new Date('2020-06-23'),
    warrantyExpiration: new Date('2025-06-23'),
    lastAuditDate: new Date('2022-04-05'),
    notes: 'Main network switch for office'
  }
];

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
