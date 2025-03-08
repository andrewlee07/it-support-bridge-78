
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AssetList from '@/components/assets/AssetList';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Asset } from '@/utils/types/asset';
import assetApi from '@/utils/api/assetApi';
import TicketLoadingError from '@/components/tickets/TicketLoadingError';
import AssetDetailView from '@/components/assets/detail/AssetDetailView';
import AssetEditForm from '@/components/assets/form/AssetEditForm';
import AssetLoadingIndicator from '@/components/assets/detail/AssetLoadingIndicator';
import { toast } from 'sonner';

const Assets: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isViewingAsset, setIsViewingAsset] = useState<boolean>(false);
  const [isEditingAsset, setIsEditingAsset] = useState<boolean>(false);
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

  const handleEditClick = () => {
    setIsEditingAsset(true);
  };

  const handleCancelEdit = () => {
    setIsEditingAsset(false);
  };

  const handleSaveAsset = async (data: Partial<Asset>) => {
    if (!selectedAsset) return;
    
    try {
      setLoading(true);
      const response = await assetApi.updateAsset(selectedAsset.id, data);
      
      if (response.success && response.data) {
        setSelectedAsset(response.data);
        setIsEditingAsset(false);
        toast.success("Asset updated successfully");
      } else {
        toast.error(response.message || "Failed to update asset");
      }
    } catch (error) {
      console.error("Error updating asset:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !isEditingAsset && !selectedAsset) {
    return <AssetLoadingIndicator />;
  }

  return (
    <div className="space-y-6">
      <AssetList onAssetClick={handleAssetClick} />

      <Dialog open={isViewingAsset && !!selectedAsset} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Asset Details</DialogTitle>
            {!isEditingAsset && <DialogDescription>View and manage asset information</DialogDescription>}
          </DialogHeader>
          
          {error && (
            <TicketLoadingError entityName="Asset" returnPath="/assets" />
          )}

          {selectedAsset && !isEditingAsset && (
            <AssetDetailView 
              asset={selectedAsset} 
              onClose={handleCloseDialog} 
              onEditClick={handleEditClick} 
            />
          )}

          {selectedAsset && isEditingAsset && (
            <AssetEditForm 
              asset={selectedAsset} 
              onCancel={handleCancelEdit} 
              onSave={handleSaveAsset} 
              loading={loading} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Assets;
