
import React from 'react';
import { Asset } from '@/utils/types/asset';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Cpu, HardDrive, Info, Server, Smartphone } from 'lucide-react';
import { format } from 'date-fns';
import DetailBreadcrumb from '@/components/tickets/detail/DetailBreadcrumb';
import { getUserNameById } from '@/utils/userUtils';

interface AssetDetailViewProps {
  asset: Asset;
  onClose: () => void;
  onEditClick: () => void;
}

const AssetDetailView: React.FC<AssetDetailViewProps> = ({ 
  asset, 
  onClose, 
  onEditClick 
}) => {
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

  return (
    <div className="space-y-6">
      <DetailBreadcrumb 
        entityName="Asset"
        entityId={asset.id}
        parentRoute="/assets"
        parentName="Assets"
      />
      
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          {getAssetIcon(asset.type)}
        </div>
        <div>
          <h2 className="text-xl font-bold">{asset.name}</h2>
          <p className="text-sm text-muted-foreground">{asset.id}</p>
        </div>
        <div className="ml-auto">
          <Badge
            className={
              asset.status === 'in-use'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : asset.status === 'maintenance'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }
          >
            {asset.status}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium">Description</h3>
          <p className="mt-1 text-sm">{asset.notes || 'No description available'}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium">Type</h3>
            <p className="mt-1 text-sm">{asset.type}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Location</h3>
            <p className="mt-1 text-sm">{asset.location || 'Not specified'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Model</h3>
            <p className="mt-1 text-sm">{asset.model || 'Not specified'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Manufacturer</h3>
            <p className="mt-1 text-sm">{asset.manufacturer || 'Not specified'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Serial Number</h3>
            <p className="mt-1 text-sm">{asset.serialNumber || 'Not specified'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Assigned To</h3>
            <p className="mt-1 text-sm">{getUserNameById(asset.assignedTo)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Purchase Date</h3>
            <p className="mt-1 text-sm">
              {asset.purchaseDate 
                ? format(new Date(asset.purchaseDate), 'PPP') 
                : 'Not specified'}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Warranty Expiry</h3>
            <p className="mt-1 text-sm">
              {asset.expiryDate
                ? format(new Date(asset.expiryDate), 'PPP')
                : 'No warranty'}
            </p>
          </div>
        </div>

        {asset.notes && (
          <div>
            <h3 className="text-sm font-medium">Notes</h3>
            <p className="mt-1 text-sm">{asset.notes}</p>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={onEditClick}>Edit Asset</Button>
      </div>
    </div>
  );
};

export default AssetDetailView;
