
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AssetTabs from './list/AssetTabs';
import { useAssets } from '@/hooks/useAssets';
import AssetLoadingIndicator from './detail/AssetLoadingIndicator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
      <Card className="bg-secondary/50 border border-border/20 shadow-sm">
        <CardContent className="p-4 text-center">
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Assets</h2>
        <Button onClick={onAddAssetClick} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Asset
        </Button>
      </div>
      
      <Card className="bg-secondary/50 border border-border/20 shadow-sm">
        <CardContent className="p-0">
          <AssetTabs assets={assets} onAssetClick={onAssetClick} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetList;
