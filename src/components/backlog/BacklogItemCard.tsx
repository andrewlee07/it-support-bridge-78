
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  ChevronRight, 
  TagIcon, 
  TestTube 
} from 'lucide-react';
import { format } from 'date-fns';
import TestCoverageIndicator from './TestCoverageIndicator';

interface BacklogItemCardProps {
  backlogItem: BacklogItem;
  onClick: () => void;
}

const BacklogItemCard: React.FC<BacklogItemCardProps> = ({ backlogItem, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'ready':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'blocked':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'completed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'deferred':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={getStatusColor(backlogItem.status)}>
            {backlogItem.status.charAt(0).toUpperCase() + backlogItem.status.slice(1).replace('-', ' ')}
          </Badge>
          {backlogItem.storyPoints !== undefined && (
            <Badge variant="outline" className="font-mono">
              {backlogItem.storyPoints} {backlogItem.storyPoints === 1 ? 'point' : 'points'}
            </Badge>
          )}
        </div>
        <h3 className="text-lg font-medium mt-2 line-clamp-2">{backlogItem.title}</h3>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {backlogItem.description}
        </p>
        
        {/* Test Coverage Indicator */}
        {backlogItem.testCoverage && (
          <div className="mb-4">
            <TestCoverageIndicator coverage={backlogItem.testCoverage} size="sm" />
          </div>
        )}
        
        <div className="flex flex-wrap items-center justify-between mt-4">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            {format(new Date(backlogItem.createdAt), 'MMM d, yyyy')}
          </div>
          
          <div className="flex items-center">
            {backlogItem.labels.length > 0 && (
              <div className="flex mr-3 max-w-[150px] overflow-hidden">
                <TagIcon className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                <div className="flex space-x-1 overflow-hidden">
                  {backlogItem.labels.slice(0, 2).map((label, index) => (
                    <span key={index} className="text-xs text-muted-foreground truncate">
                      {label}
                    </span>
                  ))}
                  {backlogItem.labels.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{backlogItem.labels.length - 2}
                    </span>
                  )}
                </div>
              </div>
            )}
            
            <Button variant="ghost" size="icon" onClick={onClick}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BacklogItemCard;
