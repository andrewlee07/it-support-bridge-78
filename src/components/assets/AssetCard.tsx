
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Laptop, Monitor, Server, Smartphone } from 'lucide-react';

interface AssetCardProps {
  asset: {
    id: string;
    name: string;
    type: string;
    status: string;
    assignedTo: string;
    purchaseDate: string;
    warranty: string;
    location: string;
  };
  onView: (assetId: string) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, onView }) => {
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-use':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'available':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'in-repair':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'retired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'laptop':
        return <Laptop className="h-8 w-8" />;
      case 'mobile':
        return <Smartphone className="h-8 w-8" />;
      case 'server':
        return <Server className="h-8 w-8" />;
      case 'monitor':
        return <Monitor className="h-8 w-8" />;
      case 'network':
        return <Server className="h-8 w-8" />;
      default:
        return <Monitor className="h-8 w-8" />;
    }
  };

  const handleClick = () => {
    navigate(`/assets/${asset.id}`);
    onView(asset.id);
  };

  return (
    <Card 
      key={asset.id} 
      className="shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{asset.name}</CardTitle>
          <Badge className={getStatusColor(asset.status)}>
            {asset.status.replace('-', ' ').charAt(0).toUpperCase() + asset.status.replace('-', ' ').slice(1)}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">{asset.id}</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start">
          <div className="mr-4 p-2 bg-background rounded-md border">
            {getAssetIcon(asset.type)}
          </div>
          <div className="flex flex-col text-sm">
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              <span className="text-muted-foreground">Assigned to:</span>
              <span>{asset.assignedTo}</span>
              
              <span className="text-muted-foreground">Location:</span>
              <span>{asset.location}</span>
              
              <span className="text-muted-foreground">Purchased:</span>
              <span>{asset.purchaseDate}</span>
              
              <span className="text-muted-foreground">Warranty:</span>
              <span>{asset.warranty}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCard;
