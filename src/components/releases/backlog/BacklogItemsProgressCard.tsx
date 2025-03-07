
import React from 'react';
import { BacklogItem } from '@/utils/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface BacklogItemsProgressCardProps {
  backlogItems: BacklogItem[];
  totalItems: number;
  completedItems: number;
  progressPercentage: number;
}

const BacklogItemsProgressCard: React.FC<BacklogItemsProgressCardProps> = ({
  completedItems,
  totalItems,
  progressPercentage
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Release Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completion</span>
            <span>{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="text-sm text-muted-foreground">
            {completedItems} of {totalItems} items completed
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BacklogItemsProgressCard;
