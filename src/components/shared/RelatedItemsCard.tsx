
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Bug, ClipboardList, AlertCircle, Box, Package, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface RelatedItem {
  id: string;
  title: string;
  type: 'bug' | 'testCase' | 'incident' | 'asset' | 'problem' | 'release' | 'backlogItem' | 'service' | 'security' | 'knownError' | 'task';
  status?: string;
  url: string;
}

interface RelatedItemsCardProps {
  items: RelatedItem[];
  title?: string;
  description?: string;
  onAddRelatedItem?: () => void;
  showAddButton?: boolean;
  maxItems?: number;
}

const getItemIcon = (type: string) => {
  switch (type) {
    case 'bug':
      return <Bug className="h-4 w-4 text-red-500" />;
    case 'testCase':
      return <ClipboardList className="h-4 w-4 text-purple-500" />;
    case 'incident':
      return <AlertCircle className="h-4 w-4 text-amber-500" />;
    case 'problem':
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    case 'knownError':
      return <AlertCircle className="h-4 w-4 text-red-800" />;
    case 'asset':
      return <Box className="h-4 w-4 text-blue-500" />;
    case 'release':
      return <Package className="h-4 w-4 text-green-500" />;
    case 'backlogItem':
      return <FileText className="h-4 w-4 text-orange-500" />;
    case 'task':
      return <ClipboardList className="h-4 w-4 text-indigo-500" />;
    case 'service':
      return <Box className="h-4 w-4 text-teal-500" />;
    case 'security':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <ExternalLink className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string | undefined) => {
  if (!status) return 'bg-gray-100 text-gray-800';
  
  switch (status.toLowerCase()) {
    case 'open':
    case 'active':
    case 'new':
      return 'bg-blue-100 text-blue-800';
    case 'in-progress':
    case 'under-investigation':  
      return 'bg-yellow-100 text-yellow-800';
    case 'resolved':
    case 'deployed':
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'closed':
      return 'bg-purple-100 text-purple-800';
    case 'pending':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const RelatedItemsCard: React.FC<RelatedItemsCardProps> = ({
  items = [],
  title = "Related Items",
  description = "Items from other systems related to this item",
  onAddRelatedItem,
  showAddButton = true,
  maxItems = 5
}) => {
  const displayedItems = items.slice(0, maxItems);
  const hasMoreItems = items.length > maxItems;
  
  const handleItemClick = (item: RelatedItem) => {
    toast.info(`Navigating to ${item.type}: ${item.title}`);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {showAddButton && onAddRelatedItem && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onAddRelatedItem}
            >
              Add item
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No related items found
          </div>
        ) : (
          <div className="space-y-3">
            {displayedItems.map((item) => (
              <div key={item.id} className="flex items-start border-b pb-2 last:border-0 last:pb-0">
                <div className="mt-0.5 mr-2">
                  {getItemIcon(item.type)}
                </div>
                <div className="flex-grow">
                  <Link 
                    to={item.url} 
                    className="text-sm font-medium hover:underline"
                    onClick={() => handleItemClick(item)}
                  >
                    {item.title}
                  </Link>
                  <div className="flex mt-1">
                    <span className="text-xs text-muted-foreground capitalize">
                      {item.type.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    {item.status && (
                      <Badge variant="outline" className={`ml-2 text-xs ${getStatusColor(item.status)}`}>
                        {item.status}
                      </Badge>
                    )}
                  </div>
                </div>
                <Link to={item.url}>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
            ))}
            
            {hasMoreItems && (
              <div className="text-center pt-2">
                <Button variant="link" size="sm">
                  View all {items.length} items
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RelatedItemsCard;
