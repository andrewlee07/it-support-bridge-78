
import React, { useState } from 'react';
import { Asset } from '@/utils/types/asset';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AssetTable from './AssetTable';
import AssetFilters from './AssetFilters';
import { useAssetFilters } from '@/hooks/useAssetFilters';

interface AssetTabsProps {
  assets: Asset[];
  onAssetClick: (assetId: string) => void;
}

const AssetTabs: React.FC<AssetTabsProps> = ({ assets, onAssetClick }) => {
  const [activeTab, setActiveTab] = useState('all');
  
  const {
    searchQuery,
    statusFilter,
    typeFilter,
    setSearchQuery,
    setStatusFilter,
    setTypeFilter,
    statusOptions,
    typeOptions,
    filteredAssets,
    hasActiveFilters,
    resetFilters,
    getAssetCountByType,
    getAssetCountByStatus
  } = useAssetFilters(assets);

  const handleViewAsset = (assetId: string) => {
    onAssetClick(assetId);
  };

  const handleEditAsset = (assetId: string) => {
    onAssetClick(assetId);
  };

  // Filter assets based on active tab
  const getTabAssets = () => {
    if (activeTab === 'all') {
      return filteredAssets;
    } else if (activeTab === 'hardware') {
      return filteredAssets.filter(asset => asset.type === 'hardware');
    } else if (activeTab === 'software') {
      return filteredAssets.filter(asset => asset.type === 'software');
    } else if (activeTab === 'licenses') {
      return filteredAssets.filter(asset => asset.type === 'license');
    }
    return filteredAssets;
  };

  return (
    <div>
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="p-4 bg-secondary/30">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            All Assets ({filteredAssets.length})
          </TabsTrigger>
          <TabsTrigger value="hardware">
            Hardware ({getAssetCountByType('hardware')})
          </TabsTrigger>
          <TabsTrigger value="software">
            Software ({getAssetCountByType('software')})
          </TabsTrigger>
          <TabsTrigger value="licenses">
            Licenses ({getAssetCountByType('license')})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="p-4">
          <AssetFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            hasActiveFilters={hasActiveFilters}
            resetFilters={resetFilters}
            statusOptions={statusOptions}
            typeOptions={typeOptions}
          />
          <AssetTable 
            assets={getTabAssets()} 
            onAssetClick={onAssetClick}
            onViewAsset={handleViewAsset}
            onEditAsset={handleEditAsset}
          />
        </TabsContent>
        
        <TabsContent value="hardware" className="p-4">
          <AssetFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            hasActiveFilters={hasActiveFilters}
            resetFilters={resetFilters}
            statusOptions={statusOptions}
            typeOptions={typeOptions}
          />
          <AssetTable 
            assets={getTabAssets()} 
            onAssetClick={onAssetClick}
            onViewAsset={handleViewAsset}
            onEditAsset={handleEditAsset}
          />
        </TabsContent>
        
        <TabsContent value="software" className="p-4">
          <AssetFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            hasActiveFilters={hasActiveFilters}
            resetFilters={resetFilters}
            statusOptions={statusOptions}
            typeOptions={typeOptions}
          />
          <AssetTable 
            assets={getTabAssets()} 
            onAssetClick={onAssetClick}
            onViewAsset={handleViewAsset}
            onEditAsset={handleEditAsset}
          />
        </TabsContent>
        
        <TabsContent value="licenses" className="p-4">
          <AssetFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            hasActiveFilters={hasActiveFilters}
            resetFilters={resetFilters}
            statusOptions={statusOptions}
            typeOptions={typeOptions}
          />
          <AssetTable 
            assets={getTabAssets()} 
            onAssetClick={onAssetClick}
            onViewAsset={handleViewAsset}
            onEditAsset={handleEditAsset}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssetTabs;
