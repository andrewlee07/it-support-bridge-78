import React, { useState } from 'react';
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
  const [activeStatusFilter, setActiveStatusFilter] = useState<string | null>(null);
  const [activeTypeFilter, setActiveTypeFilter] = useState<string | null>(null);

  const handleExport = (type: 'csv' | 'pdf') => {
    console.log(`Exporting assets as ${type}`);
    // In a real implementation, this would trigger an export function
  };

  // Filter counts
  const getTotalAssets = () => assets.length;
  const getHardwareAssets = () => assets.filter(a => a.type === 'hardware').length;
  const getSoftwareAssets = () => assets.filter(a => a.type === 'software').length;
  const getInUseAssets = () => assets.filter(a => a.status === 'in-use').length;

  // Handlers for filter cards
  const handleTotalAssetsClick = () => {
    setActiveStatusFilter(null);
    setActiveTypeFilter(null);
  };

  const handleHardwareAssetsClick = () => {
    setActiveTypeFilter(activeTypeFilter === 'hardware' ? null : 'hardware');
    // Keep the status filter active
  };

  const handleSoftwareAssetsClick = () => {
    setActiveTypeFilter(activeTypeFilter === 'software' ? null : 'software');
    // Keep the status filter active
  };

  const handleInUseAssetsClick = () => {
    setActiveStatusFilter(activeStatusFilter === 'in-use' ? null : 'in-use');
    // Keep the type filter active
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
        <Card 
          className={`bg-secondary/50 border ${activeStatusFilter === null && activeTypeFilter === null ? 'border-primary/50 shadow-md' : 'border-border/20 shadow-sm'} cursor-pointer transition-all hover:shadow-md`}
          onClick={handleTotalAssetsClick}
        >
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-3 py-4">
              <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
              <div className="text-4xl font-bold">{getTotalAssets()}</div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`bg-secondary/50 border ${activeTypeFilter === 'hardware' ? 'border-primary/50 shadow-md' : 'border-border/20 shadow-sm'} cursor-pointer transition-all hover:shadow-md`}
          onClick={handleHardwareAssetsClick}
        >
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-3 py-4">
              <p className="text-sm font-medium text-muted-foreground">Hardware Assets</p>
              <div className="text-4xl font-bold">{getHardwareAssets()}</div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`bg-secondary/50 border ${activeTypeFilter === 'software' ? 'border-primary/50 shadow-md' : 'border-border/20 shadow-sm'} cursor-pointer transition-all hover:shadow-md`}
          onClick={handleSoftwareAssetsClick}
        >
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-3 py-4">
              <p className="text-sm font-medium text-muted-foreground">Software Assets</p>
              <div className="text-4xl font-bold">{getSoftwareAssets()}</div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`bg-secondary/50 border ${activeStatusFilter === 'in-use' ? 'border-primary/50 shadow-md' : 'border-border/20 shadow-sm'} cursor-pointer transition-all hover:shadow-md`}
          onClick={handleInUseAssetsClick}
        >
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-3 py-4">
              <p className="text-sm font-medium text-muted-foreground">In Use</p>
              <div className="text-4xl font-bold">{getInUseAssets()}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-secondary/50 border border-border/20 shadow-sm">
        <CardContent className="p-0">
          <AssetTabs 
            assets={assets.filter(asset => {
              // Apply the active filters from the cards
              const matchesTypeFilter = activeTypeFilter === null || asset.type === activeTypeFilter;
              const matchesStatusFilter = activeStatusFilter === null || asset.status === activeStatusFilter;
              return matchesTypeFilter && matchesStatusFilter;
            })} 
            onAssetClick={onAssetClick} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetList;
