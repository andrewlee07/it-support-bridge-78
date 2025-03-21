
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RelatedItem } from '@/utils/types/ticket';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface RelatedItemsTabProps {
  relatedItems: RelatedItem[];
  onAddRelatedItem?: () => void;
}

const RelatedItemsTab: React.FC<RelatedItemsTabProps> = ({ 
  relatedItems, 
  onAddRelatedItem 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Related Items</CardTitle>
        {onAddRelatedItem && (
          <Button size="sm" onClick={onAddRelatedItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Related Item
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {relatedItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No related items found
          </div>
        ) : (
          <div className="space-y-4">
            {relatedItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/5"
              >
                <div className="flex items-center gap-3">
                  <Badge variant={getBadgeVariant(item.type)}>{item.type}</Badge>
                  <div>
                    <Link 
                      to={getItemUrl(item)} 
                      className="font-medium hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">{item.status}</p>
                  </div>
                </div>
                <Badge variant="outline">{item.relationship}</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

function getBadgeVariant(type: string): "default" | "secondary" | "outline" | "destructive" {
  switch (type.toLowerCase()) {
    case 'incident':
      return "destructive";
    case 'problem':
      return "default";
    case 'change':
      return "secondary";
    default:
      return "outline";
  }
}

function getItemUrl(item: RelatedItem): string {
  switch (item.type.toLowerCase()) {
    case 'incident':
      return `/incidents/${item.id}`;
    case 'problem':
      return `/problems/${item.id}`;
    case 'change':
      return `/changes/${item.id}`;
    case 'service-request':
      return `/service-requests/${item.id}`;
    default:
      return `/${item.type.toLowerCase()}s/${item.id}`;
  }
}

export default RelatedItemsTab;
