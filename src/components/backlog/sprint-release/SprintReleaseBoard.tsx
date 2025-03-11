
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BacklogItem } from '@/utils/types/backlogTypes';

interface SprintReleaseBoardProps {
  sprints: {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    capacity: number;
    items: BacklogItem[];
  }[];
  releases: {
    id: string;
    name: string;
    plannedDate: Date;
    items: BacklogItem[];
  }[];
}

const SprintReleaseBoard: React.FC<SprintReleaseBoardProps> = ({
  sprints,
  releases
}) => {
  const calculateProgress = (items: BacklogItem[]) => {
    const completed = items.filter(item => item.status === 'completed').length;
    return items.length > 0 ? (completed / items.length) * 100 : 0;
  };

  const calculateCapacityUsage = (items: BacklogItem[], capacity: number) => {
    const totalPoints = items.reduce((sum, item) => sum + (item.storyPoints || 0), 0);
    return capacity > 0 ? (totalPoints / capacity) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sprints Section */}
        <Card>
          <CardHeader>
            <CardTitle>Sprints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sprints.map(sprint => (
                <div key={sprint.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{sprint.name}</h3>
                    <span className="text-sm text-muted-foreground">
                      {sprint.startDate.toLocaleDateString()} - {sprint.endDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(calculateProgress(sprint.items))}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all" 
                        style={{ width: `${calculateProgress(sprint.items)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Capacity</span>
                      <span>{Math.round(calculateCapacityUsage(sprint.items, sprint.capacity))}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${
                          calculateCapacityUsage(sprint.items, sprint.capacity) > 100 
                            ? 'bg-destructive' 
                            : 'bg-primary'
                        }`}
                        style={{ width: `${Math.min(calculateCapacityUsage(sprint.items, sprint.capacity), 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Releases Section */}
        <Card>
          <CardHeader>
            <CardTitle>Releases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {releases.map(release => (
                <div key={release.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{release.name}</h3>
                    <span className="text-sm text-muted-foreground">
                      Due: {release.plannedDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(calculateProgress(release.items))}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all" 
                        style={{ width: `${calculateProgress(release.items)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SprintReleaseBoard;
