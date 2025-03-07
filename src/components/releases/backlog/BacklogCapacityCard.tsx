
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TagIcon } from 'lucide-react';

interface BacklogCapacityCardProps {
  capacityPercentage: number;
  totalPoints: number;
}

const BacklogCapacityCard: React.FC<BacklogCapacityCardProps> = ({
  capacityPercentage,
  totalPoints
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Capacity Planning</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Capacity</span>
            <span>{capacityPercentage}%</span>
          </div>
          <Progress 
            value={capacityPercentage} 
            className={`h-2 ${capacityPercentage > 90 ? 'bg-red-600' : ''}`}
          />
          <div className="text-sm text-muted-foreground flex items-center">
            <TagIcon className="h-4 w-4 mr-1" />
            {totalPoints} story points allocated
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BacklogCapacityCard;
