
import React from 'react';
import { Asset } from '@/utils/types/asset';
import AssetCard from '../AssetCard';

interface AssetGridProps {
  assets: Asset[];
  onAssetClick: (assetId: string) => void;
}

const AssetGrid: React.FC<AssetGridProps> = ({ assets, onAssetClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {assets.map((asset) => (
        <AssetCard 
          key={asset.id} 
          asset={asset} 
          onClick={() => onAssetClick(asset.id)} 
        />
      ))}
    </div>
  );
};

export default AssetGrid;
