
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';

interface BacklogItemBasicDetailsProps {
  item: BacklogItem;
  releaseName: string;
}

const BacklogItemBasicDetails: React.FC<BacklogItemBasicDetailsProps> = ({ 
  item, 
  releaseName 
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="font-semibold text-muted-foreground mb-1">Assignee</p>
          <p>{item.assignee || 'Unassigned'}</p>
        </div>
        <div>
          <p className="font-semibold text-muted-foreground mb-1">Release</p>
          <p>{releaseName}</p>
        </div>
        <div>
          <p className="font-semibold text-muted-foreground mb-1">Story Points</p>
          <p>{item.storyPoints || 'Not estimated'}</p>
        </div>
        <div>
          <p className="font-semibold text-muted-foreground mb-1">Due Date</p>
          <p>{item.dueDate ? format(new Date(item.dueDate), 'MMM d, yyyy') : 'No due date'}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="font-semibold text-muted-foreground mb-1">Description</p>
        <p className="whitespace-pre-line">{item.description}</p>
      </div>
      
      {item.labels && item.labels.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold text-muted-foreground mb-1">Labels</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {item.labels.map((label, index) => (
              <Badge key={index} variant="outline">{label}</Badge>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        <span>Created: {format(new Date(item.createdAt), 'MMM d, yyyy')}</span>
        <span>•</span>
        <span>Last updated: {format(new Date(item.updatedAt), 'MMM d, yyyy')}</span>
      </div>
    </>
  );
};

export default BacklogItemBasicDetails;
