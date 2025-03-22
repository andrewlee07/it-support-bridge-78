
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Edit, 
  MoreHorizontal,
  Calendar, 
  Tag
} from 'lucide-react';
import { Asset } from '@/utils/types/asset';
import { formatDistanceToNow } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface AssetTableProps {
  assets: Asset[];
  onAssetClick: (assetId: string) => void;
  onViewAsset: (assetId: string) => void;
  onEditAsset: (assetId: string) => void;
}

const AssetTable: React.FC<AssetTableProps> = ({
  assets,
  onAssetClick,
  onViewAsset,
  onEditAsset
}) => {
  // Get asset status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'in-use':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'retired':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  // Get asset type color
  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'hardware':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100';
      case 'software':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'license':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  // Format date to display
  const formatDate = (date: Date | undefined): string => {
    if (!date) return 'Not specified';
    return date.toLocaleDateString();
  };

  // Get time elapsed since creation
  const getTimeDifference = (date: Date | undefined): string => {
    if (!date) return '';
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[120px]">Type</TableHead>
              <TableHead className="w-[150px]">Location</TableHead>
              <TableHead className="w-[180px]">Purchase Date</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No assets found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              assets.map((asset) => (
                <TableRow 
                  key={asset.id} 
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => onAssetClick(asset.id)}
                >
                  <TableCell className="font-medium font-mono text-xs">{asset.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{asset.name}</p>
                      {asset.serialNumber && (
                        <p className="text-xs text-muted-foreground">
                          S/N: {asset.serialNumber}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(asset.status)}>
                      {asset.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTypeColor(asset.type)}>
                      {asset.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {asset.location || 'Not specified'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{formatDate(asset.purchaseDate)}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {asset.purchaseDate 
                                ? getTimeDifference(asset.purchaseDate) 
                                : 'Purchase date not specified'}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {asset.expiryDate && (
                      <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        <span>Expires: {formatDate(asset.expiryDate)}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end space-x-1" onClick={(e) => e.stopPropagation()}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewAsset(asset.id);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditAsset(asset.id);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <DropdownMenu>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>More Options</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Change Status</DropdownMenuItem>
                          <DropdownMenuItem>Assign to User</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Retire Asset
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AssetTable;
