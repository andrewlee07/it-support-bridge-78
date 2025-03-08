
import React from 'react';
import { Asset } from '@/utils/types/asset';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Cpu, HardDrive, Info, Server, Smartphone } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AssetCardProps {
  asset: Asset;
  onClick?: () => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'retired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
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
    <Card 
      className="shadow-sm hover:shadow-md transition-shadow h-full cursor-pointer" 
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs text-muted-foreground mb-1">{asset.id}</div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">
                {getAssetIcon(asset.type)}
              </span>
              <h3 className="text-base font-semibold">{asset.name}</h3>
            </div>
          </div>
          <Badge className={getStatusColor(asset.status)}>
            {asset.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {asset.description}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-muted-foreground">Model</div>
            <div className="text-sm font-medium">{asset.model}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Serial</div>
            <div className="text-sm font-medium truncate">{asset.serialNumber}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="h-3 w-3 mr-1" />
          Purchased: {formatDistanceToNow(new Date(asset.purchaseDate), { addSuffix: true })}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AssetCard;
