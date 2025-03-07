
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Trash } from 'lucide-react';
import { ReleaseItem } from '@/utils/types';
import { getItemTypeIcon } from '../utils/releaseHelpers';

interface ReleaseItemsProps {
  items: ReleaseItem[];
  onAddItem: () => void;
  onRemoveItem: (itemId: string) => void;
}

const ReleaseItems: React.FC<ReleaseItemsProps> = ({
  items,
  onAddItem,
  onRemoveItem
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Work Items</CardTitle>
          <Button size="sm" onClick={onAddItem}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
        <CardDescription>
          Items included in this release
        </CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No items added to this release yet.</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={onAddItem}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Your First Item
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="flex justify-between items-center p-3 rounded-md border"
              >
                <div className="flex items-center">
                  {getItemTypeIcon(item.itemType)}
                  <span>
                    {item.itemType.charAt(0).toUpperCase() + item.itemType.slice(1)}: {item.itemId}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReleaseItems;
