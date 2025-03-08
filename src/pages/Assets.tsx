import React, { useState } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AssetList from '@/components/assets/AssetList';
import AssetSearchBar from '@/components/assets/AssetSearchBar';
import { sampleAssets } from '@/components/assets/sampleAssetData';

const Assets = () => {
  const navigate = useNavigate();
  const [assets] = useState(sampleAssets);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // In a real app, this would filter the assets based on the search term
    console.log(`Searching for: ${term}`);
  };
  
  const handleFilter = () => {
    // In a real app, this would open a filter dialog or panel
    console.log('Opening filter options');
  };
  
  const handleViewAsset = (assetId: string) => {
    // In a real app, this would navigate to the asset detail page
    console.log(`Viewing asset: ${assetId}`);
    // Placeholder navigation - in a real app would go to actual asset page
    // navigate(`/assets/${assetId}`);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Asset Management</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage hardware and software assets
            </p>
          </div>
          <Button className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </div>

        <AssetSearchBar onSearch={handleSearch} onFilter={handleFilter} />
        
        <AssetList 
          assets={assets} 
          onViewAsset={handleViewAsset} 
        />
      </div>
    </PageTransition>
  );
};

export default Assets;
