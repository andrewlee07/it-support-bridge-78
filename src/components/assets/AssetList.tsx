
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AssetTabs from './list/AssetTabs';
import { useAssets } from '@/hooks/useAssets';
import AssetLoadingIndicator from './detail/AssetLoadingIndicator';

interface AssetListProps {
  onAssetClick: (assetId: string) => void;
  onAddAssetClick: () => void;
}

const AssetList: React.FC<AssetListProps> = ({ onAssetClick, onAddAssetClick }) => {
  const { assets, loading, error } = useAssets();

  if (loading) {
    return <AssetLoadingIndicator />;
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Assets</h2>
        <Button onClick={onAddAssetClick} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Asset
        </Button>
      </div>
      <AssetTabs assets={assets} onAssetClick={onAssetClick} />
    </div>
  );
};

export default AssetList;
