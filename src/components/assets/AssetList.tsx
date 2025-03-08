
import React from 'react';
import AssetTabs from './list/AssetTabs';
import { useAssets } from '@/hooks/useAssets';
import AssetLoadingIndicator from './detail/AssetLoadingIndicator';

interface AssetListProps {
  onAssetClick: (assetId: string) => void;
}

const AssetList: React.FC<AssetListProps> = ({ onAssetClick }) => {
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

  return <AssetTabs assets={assets} onAssetClick={onAssetClick} />;
};

export default AssetList;
