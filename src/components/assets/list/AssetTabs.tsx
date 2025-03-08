
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tag, Calendar } from 'lucide-react';
import { Asset } from '@/utils/types/asset';
import AssetGrid from './AssetGrid';
import AssetEmptyState from './AssetEmptyState';

interface AssetTabsProps {
  assets: Asset[];
  onAssetClick: (assetId: string) => void;
}

const AssetTabs: React.FC<AssetTabsProps> = ({ assets, onAssetClick }) => {
  const hardwareAssets = assets.filter(a => a.type === 'hardware');
  
  return (
    <Tabs defaultValue="all" className="animate-fade-in">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Assets</TabsTrigger>
        <TabsTrigger value="hardware">Hardware</TabsTrigger>
        <TabsTrigger value="software">Software</TabsTrigger>
        <TabsTrigger value="licenses">Licenses</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        {assets.length > 0 ? (
          <AssetGrid assets={assets} onAssetClick={onAssetClick} />
        ) : (
          <AssetEmptyState 
            icon={Tag} 
            title="No Assets Found" 
            description="There are no assets available in the system." 
          />
        )}
      </TabsContent>
      
      <TabsContent value="hardware" className="mt-0">
        {hardwareAssets.length > 0 ? (
          <AssetGrid assets={hardwareAssets} onAssetClick={onAssetClick} />
        ) : (
          <AssetEmptyState 
            icon={Tag} 
            title="No Hardware Assets" 
            description="There are no hardware assets available in the system." 
          />
        )}
      </TabsContent>
      
      <TabsContent value="software" className="mt-0">
        <AssetEmptyState 
          icon={Tag} 
          title="Software Assets" 
          description="Software asset tracking will be available in a future update." 
        />
      </TabsContent>
      
      <TabsContent value="licenses" className="mt-0">
        <AssetEmptyState 
          icon={Calendar} 
          title="License Management" 
          description="License management will be available in a future update." 
        />
      </TabsContent>
    </Tabs>
  );
};

export default AssetTabs;
