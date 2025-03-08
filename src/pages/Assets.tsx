
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AssetList from '@/components/assets/AssetList';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Asset } from '@/utils/types/asset';
import { fetchAssets, fetchAssetById } from '@/utils/api/assetApi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Cpu, HardDrive, Info, Server, Smartphone } from 'lucide-react';
import { format } from 'date-fns';

const Assets: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isViewingAsset, setIsViewingAsset] = useState<boolean>(!!id);

  useEffect(() => {
    const loadAsset = async () => {
      if (id) {
        try {
          const response = await fetchAssetById(id);
          if (response.data) {
            setSelectedAsset(response.data);
            setIsViewingAsset(true);
          }
        } catch (error) {
          console.error('Failed to fetch asset details:', error);
          setIsViewingAsset(false);
        }
      } else {
        setIsViewingAsset(false);
        setSelectedAsset(null);
      }
    };

    loadAsset();
  }, [id]);

  const handleAssetClick = (assetId: string) => {
    navigate(`/assets/${assetId}`);
  };

  const handleCloseDialog = () => {
    navigate('/assets');
  };

  const getAssetIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'server':
        return <Server className="h-5 w-5" />;
      case 'desktop':
        return <Cpu className="h-5 w-5" />;
      case 'laptop':
        return <HardDrive className="h-5 w-5" />;
      case 'mobile':
        return <Smartphone className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <AssetList onAssetClick={handleAssetClick} />

      <Dialog open={isViewingAsset && !!selectedAsset} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Asset Details</DialogTitle>
          </DialogHeader>
          {selectedAsset && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {getAssetIcon(selectedAsset.type)}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedAsset.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedAsset.id}</p>
                </div>
                <div className="ml-auto">
                  <Badge
                    className={
                      selectedAsset.status === 'Active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : selectedAsset.status === 'Maintenance'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }
                  >
                    {selectedAsset.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Description</h3>
                  <p className="mt-1 text-sm">{selectedAsset.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Type</h3>
                    <p className="mt-1 text-sm">{selectedAsset.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Location</h3>
                    <p className="mt-1 text-sm">{selectedAsset.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Model</h3>
                    <p className="mt-1 text-sm">{selectedAsset.model}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Manufacturer</h3>
                    <p className="mt-1 text-sm">{selectedAsset.manufacturer}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Serial Number</h3>
                    <p className="mt-1 text-sm">{selectedAsset.serialNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Assigned To</h3>
                    <p className="mt-1 text-sm">{selectedAsset.assignedTo || 'Unassigned'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Purchase Date</h3>
                    <p className="mt-1 text-sm">
                      {format(new Date(selectedAsset.purchaseDate), 'PPP')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Warranty Expiry</h3>
                    <p className="mt-1 text-sm">
                      {selectedAsset.warrantyExpiry
                        ? format(new Date(selectedAsset.warrantyExpiry), 'PPP')
                        : 'No warranty'}
                    </p>
                  </div>
                </div>

                {selectedAsset.notes && (
                  <div>
                    <h3 className="text-sm font-medium">Notes</h3>
                    <p className="mt-1 text-sm">{selectedAsset.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCloseDialog}>
                  Close
                </Button>
                <Button>Edit Asset</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Assets;
