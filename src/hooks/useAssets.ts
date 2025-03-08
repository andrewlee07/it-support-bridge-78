
import { useState, useEffect } from 'react';
import { Asset } from '@/utils/types/asset';
import { createAuditEntries } from '@/utils/mockData/auditHelpers';

// Sample assets to display when we don't have real data
const sampleAssets: Asset[] = [
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
  }
];

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        // In a real app, we would fetch from an API
        // For now, we'll just use the sample data
        setAssets(sampleAssets);
        setLoading(false);
      } catch (err) {
        setError('Failed to load assets');
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  return { assets, loading, error };
};
