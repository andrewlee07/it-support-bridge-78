
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BacklogItem } from '@/utils/types/backlogTypes';

interface ItemHeaderWithStatusProps {
  item: BacklogItem;
}

const ItemHeaderWithStatus: React.FC<ItemHeaderWithStatusProps> = ({ item }) => {
  return (
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
        <div className="flex space-x-2">
          <Badge variant={item.priority === 'critical' ? 'destructive' : 
                        item.priority === 'high' ? 'default' : 
                        item.priority === 'medium' ? 'secondary' : 'outline'}>
            {item.priority}
          </Badge>
          <Badge variant="outline">{item.type}</Badge>
          <Badge variant={
            item.status === 'completed' ? 'default' : 
            item.status === 'in-progress' ? 'secondary' : 
            item.status === 'blocked' ? 'destructive' : 'outline'
          }>
            {item.status}
          </Badge>
        </div>
      </div>
    </CardHeader>
  );
};

export default ItemHeaderWithStatus;
