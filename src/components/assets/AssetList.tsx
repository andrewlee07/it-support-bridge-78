
import React from 'react';
import AssetCard from './AssetCard';
import { Tag, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Asset } from '@/utils/types/asset';
import { createAuditEntries } from '@/utils/mockData/auditHelpers';

interface AssetListProps {
  onAssetClick: (assetId: string) => void;
}

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

const AssetList: React.FC<AssetListProps> = ({ onAssetClick }) => {
  const assets = sampleAssets; // Using sample data

  return (
    <Tabs defaultValue="all" className="animate-fade-in">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Assets</TabsTrigger>
        <TabsTrigger value="hardware">Hardware</TabsTrigger>
        <TabsTrigger value="software">Software</TabsTrigger>
        <TabsTrigger value="licenses">Licenses</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset) => (
            <AssetCard 
              key={asset.id} 
              asset={asset} 
              onClick={() => onAssetClick(asset.id)} 
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="hardware" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.filter(a => a.type === 'hardware').map((asset) => (
            <AssetCard 
              key={asset.id} 
              asset={asset} 
              onClick={() => onAssetClick(asset.id)} 
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="software" className="mt-0">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Tag className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Software Assets</h3>
          <p className="text-muted-foreground mt-1">Software asset tracking will be available in a future update.</p>
        </div>
      </TabsContent>
      
      <TabsContent value="licenses" className="mt-0">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">License Management</h3>
          <p className="text-muted-foreground mt-1">License management will be available in a future update.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AssetList;
