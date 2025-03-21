
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import AssetTabs from './list/AssetTabs';
import { useAssets } from '@/hooks/useAssets';
import AssetLoadingIndicator from './detail/AssetLoadingIndicator';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface AssetListProps {
  onAssetClick: (assetId: string) => void;
  onAddAssetClick: () => void;
}

const AssetList: React.FC<AssetListProps> = ({ onAssetClick, onAddAssetClick }) => {
  const { assets, loading, error } = useAssets();

  const handleExport = (type: 'csv' | 'pdf') => {
    console.log(`Exporting assets as ${type}`);
    // In a real implementation, this would trigger an export function
  };

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
    <div className="space-y-6">
      {/* Page Header with export and create buttons */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Asset Management</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                Export to CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                Export to PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={onAddAssetClick}>
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </div>
      </div>
      
      {/* Dashboard Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-secondary/50 border border-border/20 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-3 py-4">
              <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
              <div className="text-4xl font-bold">{assets.length}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 border border-border/20 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-3 py-4">
              <p className="text-sm font-medium text-muted-foreground">Hardware Assets</p>
              <div className="text-4xl font-bold">{assets.filter(a => a.type === 'hardware').length}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 border border-border/20 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-3 py-4">
              <p className="text-sm font-medium text-muted-foreground">Software Assets</p>
              <div className="text-4xl font-bold">{assets.filter(a => a.type === 'software').length}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 border border-border/20 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-3 py-4">
              <p className="text-sm font-medium text-muted-foreground">In Use</p>
              <div className="text-4xl font-bold">{assets.filter(a => a.status === 'in-use').length}</div>
            </div>
          </CardContent>
        </Card>
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
