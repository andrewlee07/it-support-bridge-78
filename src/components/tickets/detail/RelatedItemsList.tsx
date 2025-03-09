
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Paperclip, Bug, Package } from 'lucide-react';
import { RelatedItem } from '@/utils/types/ticket';
import { Badge } from '@/components/ui/badge';

interface RelatedItemsListProps {
  items: RelatedItem[];
}

const RelatedItemsList: React.FC<RelatedItemsListProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-blue-500 text-white';
      case 'in progress':
      case 'in-progress':
        return 'bg-amber-500 text-white';
      case 'closed':
        return 'bg-green-500 text-white';
      case 'resolved':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return <Bug className="h-4 w-4" />;
      case 'backlogItem':
        return <Package className="h-4 w-4" />;
      default:
        return <Paperclip className="h-4 w-4" />;
    }
  };

  const getItemUrl = (item: RelatedItem) => {
    switch (item.type) {
      case 'bug':
        return `/bugs/${item.id}`;
      case 'backlogItem':
        return `/backlog?item=${item.id}`;
      default:
        return '#';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <Paperclip className="h-5 w-5" />
          <span>Related Items</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-3">
                <div className="rounded-full p-1.5 bg-muted">
                  {getTypeIcon(item.type)}
                </div>
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-muted-foreground flex space-x-2 items-center">
                    <span>{item.id}</span>
                    <Badge variant="secondary" className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to={getItemUrl(item)}>View</Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedItemsList;
