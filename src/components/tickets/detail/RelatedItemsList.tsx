
import React from 'react';
import { Bug } from 'lucide-react';
import { RelatedItem } from '@/utils/types/ticket';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListTodo } from 'lucide-react';

interface RelatedItemsListProps {
  items: RelatedItem[];
  type: 'incident' | 'service';
}

const RelatedItemsList: React.FC<RelatedItemsListProps> = ({ items, type }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-muted-foreground italic text-sm py-2">
        No {type === 'incident' ? 'bugs' : 'backlog items'} have been created from this {type === 'incident' ? 'incident' : 'service request'}.
      </div>
    );
  }

  const getStatusColor = (item: RelatedItem) => {
    if (item.type === 'bug') {
      return item.status.toLowerCase() === 'resolved' || 
             item.status.toLowerCase() === 'closed' || 
             item.status.toLowerCase() === 'fixed' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-amber-100 text-amber-800';
    } else {
      return item.status.toLowerCase() === 'completed' || 
             item.status.toLowerCase() === 'done' || 
             item.status.toLowerCase() === 'closed' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-amber-100 text-amber-800';
    }
  };

  return (
    <div className="space-y-3">
      {items.map(item => (
        <Card key={item.id} className="border border-muted shadow-sm">
          <CardHeader className="py-2 px-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {item.type === 'bug' ? (
                <Bug className="h-4 w-4 text-red-500" />
              ) : (
                <ListTodo className="h-4 w-4 text-blue-500" />
              )}
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-3">
            <div className="flex justify-between items-center">
              <Badge 
                variant="outline" 
                className={`${getStatusColor(item)}`}
              >
                {item.status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Created: {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RelatedItemsList;
