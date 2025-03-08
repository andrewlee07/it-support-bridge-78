
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AssetList from '@/components/assets/AssetList';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Asset } from '@/utils/types/asset';
import assetApi from '@/utils/api/assetApi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Cpu, HardDrive, Info, Server, Smartphone } from 'lucide-react';
import { format } from 'date-fns';

const Assets: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isViewingAsset, setIsViewingAsset] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAsset = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await assetApi.getAssetById(id);
          if (response.success && response.data) {
            setSelectedAsset(response.data);
            setIsViewingAsset(true);
            setError(null);
          } else {
            setError(response.message || 'Failed to load asset details');
            setIsViewingAsset(false);
          }
        } catch (error) {
          console.error('Failed to fetch asset details:', error);
          setError('An unexpected error occurred');
          setIsViewingAsset(false);
        } finally {
          setLoading(false);
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
      case 'hardware':
        return <Server className="h-5 w-5" />;
      case 'desktop':
        return <Cpu className="h-5 w-5" />;
      case 'laptop':
        return <HardDrive className="h-5 w-5" />;
      case 'mobile':
      case 'software':
        return <Smartphone className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
                      selectedAsset.status === 'in-use'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : selectedAsset.status === 'maintenance'
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
                  <p className="mt-1 text-sm">{selectedAsset.notes || 'No description available'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Type</h3>
                    <p className="mt-1 text-sm">{selectedAsset.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Location</h3>
                    <p className="mt-1 text-sm">{selectedAsset.location || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Model</h3>
                    <p className="mt-1 text-sm">{selectedAsset.model || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Manufacturer</h3>
                    <p className="mt-1 text-sm">{selectedAsset.manufacturer || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Serial Number</h3>
                    <p className="mt-1 text-sm">{selectedAsset.serialNumber || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Assigned To</h3>
                    <p className="mt-1 text-sm">{selectedAsset.assignedTo || 'Unassigned'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Purchase Date</h3>
                    <p className="mt-1 text-sm">
                      {selectedAsset.purchaseDate 
                        ? format(new Date(selectedAsset.purchaseDate), 'PPP') 
                        : 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Warranty Expiry</h3>
                    <p className="mt-1 text-sm">
                      {selectedAsset.expiryDate
                        ? format(new Date(selectedAsset.expiryDate), 'PPP')
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
