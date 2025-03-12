
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarOff, ExternalLink, Star } from 'lucide-react';
import { useWatchList, WatchableItem } from '@/hooks/useWatchList';
import { format } from 'date-fns';

const WatchListCard: React.FC = () => {
  const { watchList, removeFromWatchList, isLoading } = useWatchList();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Watch List
          </CardTitle>
          <CardDescription>Items you're following</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get path based on item type
  const getItemPath = (item: WatchableItem) => {
    switch (item.type) {
      case 'incident':
        return `/incidents/${item.id}`;
      case 'service':
        return `/service-requests/${item.id}`;
      case 'task':
        return `/tasks/${item.id}`;
      case 'problem':
        return `/problems/${item.id}`;
      case 'release':
        return `/releases/${item.id}`;
      case 'bug':
        return `/bugs/${item.id}`;
      case 'backlogItem':
        return `/backlog/items/${item.id}`;
      default:
        return '#';
    }
  };

  // Get display name for item type
  const getTypeName = (type: string) => {
    switch (type) {
      case 'incident':
        return 'Incident';
      case 'service':
        return 'Service Request';
      case 'task':
        return 'Task';
      case 'problem':
        return 'Problem';
      case 'release':
        return 'Release';
      case 'bug':
        return 'Bug';
      case 'backlogItem':
        return 'Backlog Item';
      default:
        return type;
    }
  };

  // Handle clicking on an item
  const handleItemClick = (item: WatchableItem) => {
    navigate(getItemPath(item));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Watch List
        </CardTitle>
        <CardDescription>Items you're following</CardDescription>
      </CardHeader>
      <CardContent>
        {watchList.length === 0 ? (
          <div className="text-center py-6 space-y-3">
            <StarOff className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground">You're not watching any items yet</p>
            <p className="text-sm text-muted-foreground">
              Star items across the system to keep track of them here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {watchList.map((item) => (
              <div 
                key={`${item.type}-${item.id}`} 
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{item.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {item.id}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary" className="text-xs">
                      {getTypeName(item.type)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(item.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWatchList(item.id, item.type);
                    }}
                    aria-label="Remove from watch list"
                  >
                    <StarOff className="h-4 w-4" />
                  </Button>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WatchListCard;
