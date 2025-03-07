
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { format } from 'date-fns';
import { getReleases } from '@/utils/api/release/releaseQueries';
import { Release } from '@/utils/api/release/types';

interface BacklogItemDetailProps {
  item: BacklogItem;
  onEdit: (item: BacklogItem) => void;
  onDelete: (id: string) => void;
}

const BacklogItemDetail: React.FC<BacklogItemDetailProps> = ({ item, onEdit, onDelete }) => {
  const [releaseName, setReleaseName] = useState<string>('None');

  useEffect(() => {
    // If the item has a releaseId, fetch the release name
    const fetchReleaseName = async () => {
      if (item.releaseId) {
        try {
          const releases = await getReleases();
          const release = releases.find(r => r.id === item.releaseId);
          if (release) {
            setReleaseName(release.name);
          }
        } catch (error) {
          console.error('Error fetching release:', error);
        }
      }
    };

    fetchReleaseName();
  }, [item.releaseId]);

  return (
    <Card className="w-full shadow-sm">
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
      
      <CardContent className="text-sm pt-0">
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
      </CardContent>
      
      <CardFooter className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" onClick={() => onEdit(item)}>Edit</Button>
        <Button variant="destructive" onClick={() => onDelete(item.id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default BacklogItemDetail;
