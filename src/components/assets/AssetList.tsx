
import React from 'react';
import AssetCard from './AssetCard';
import { Tag, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Asset {
  id: string;
  name: string;
  type: string;
  status: string;
  assignedTo: string;
  purchaseDate: string;
  warranty: string;
  location: string;
}

interface AssetListProps {
  assets: Asset[];
  onViewAsset: (assetId: string) => void;
}

const AssetList: React.FC<AssetListProps> = ({ assets, onViewAsset }) => {
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
              onView={onViewAsset} 
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="hardware" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.filter(a => ['laptop', 'mobile', 'server', 'monitor', 'network'].includes(a.type)).map((asset) => (
            <AssetCard 
              key={asset.id} 
              asset={asset} 
              onView={onViewAsset} 
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
