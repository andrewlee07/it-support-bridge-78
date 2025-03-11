
import React from 'react';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, MoreVertical, MoveDiagonal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KanbanCardProps {
  item: BacklogItem;
  onEdit: () => void;
  onStatusChange: (status: BacklogItemStatus) => void;
  columnSize: 'compact' | 'standard';
  // Add the index prop but make it optional to maintain compatibility
  index?: number;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  item,
  onEdit,
  onStatusChange,
  columnSize,
  // We won't use the index prop, but we're adding it to the props interface
  // to satisfy TypeScript
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'bug':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'task':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'enhancement':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'technical-debt':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  return (
    <Card 
      className="shadow-sm hover:shadow transition-shadow cursor-pointer"
      onClick={onEdit}
    >
      <CardContent className={cn(
        "flex flex-col",
        columnSize === 'compact' ? "p-2 space-y-1" : "p-3 space-y-2"
      )}>
        <div className="flex justify-between items-start gap-2">
          <h3 className={cn(
            "font-medium line-clamp-2",
            columnSize === 'compact' ? "text-sm" : "text-base"
          )}>
            {item.title}
          </h3>
          <div className="flex items-center">
            <MoveDiagonal className="h-3 w-3 text-muted-foreground mr-1" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 p-0"
                  onClick={(e) => e.stopPropagation()} // Prevent card click when clicking menu
                >
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  onEdit();
                }}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                
                <DropdownMenuItem className="font-medium px-2 py-1.5 text-muted-foreground" disabled>
                  Change Status
                </DropdownMenuItem>
                
                {['open', 'in-progress', 'ready', 'blocked', 'completed', 'deferred'].map(status => {
                  if (status !== item.status) {
                    return (
                      <DropdownMenuItem
                        key={status}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          onStatusChange(status as BacklogItemStatus);
                        }}
                        className="pl-4"
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                      </DropdownMenuItem>
                    );
                  }
                  return null;
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {columnSize === 'standard' && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1 mt-1">
          <Badge className={getPriorityColor(item.priority)} variant="outline">
            {item.priority}
          </Badge>
          
          <Badge className={getTypeColor(item.type)} variant="outline">
            {item.type.replace('-', ' ')}
          </Badge>
          
          {item.storyPoints && (
            <Badge variant="outline" className="bg-background">
              {item.storyPoints} pts
            </Badge>
          )}
        </div>
      </CardContent>
      
      {columnSize === 'standard' && (
        <CardFooter className="p-2 pt-0 text-xs text-muted-foreground">
          <div className="w-full flex justify-between items-center">
            <span>#{item.id.substring(0, 8)}</span>
            {item.assignee && (
              <span>Assigned: {typeof item.assignee === 'string' ? item.assignee.substring(0, 8) : item.assignee}</span>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default KanbanCard;
