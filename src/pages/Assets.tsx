
import React, { useState } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AssetList from '@/components/assets/AssetList';
import AssetSearchBar from '@/components/assets/AssetSearchBar';
import { sampleAssets } from '@/components/assets/sampleAssetData';
import { useToast } from '@/hooks/use-toast';

const Assets = () => {
  const [assets] = useState(sampleAssets);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAssetForm, setShowAssetForm] = useState(false);
  const { toast } = useToast();
  
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
  };

  const handleAssetFormSuccess = () => {
    setShowAssetForm(false);
    toast({
      title: "Asset created",
      description: "The asset has been created successfully."
    });
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
          <Button className="shrink-0" onClick={() => setShowAssetForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Asset
          </Button>
        </div>

        <AssetSearchBar onSearch={handleSearch} onFilter={handleFilter} />
        
        <AssetList 
          assets={assets} 
          onViewAsset={handleViewAsset} 
        />

        <Dialog open={showAssetForm} onOpenChange={setShowAssetForm}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Asset</DialogTitle>
            </DialogHeader>
            <div className="py-6">
              <p className="text-center text-muted-foreground">
                Asset form would be implemented here. This is a placeholder.
              </p>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setShowAssetForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAssetFormSuccess}>
                  Create Asset
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default Assets;
