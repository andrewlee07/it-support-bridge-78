
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Bug } from 'lucide-react';
import { SeverityBadge, StatusBadge } from '../../ui/BugBadges';

interface RecentBugsCardProps {
  bugsData: any;
  isLoadingBugs: boolean;
}

const RecentBugsCard: React.FC<RecentBugsCardProps> = ({ bugsData, isLoadingBugs }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bugs</CardTitle>
        <CardDescription>Latest reported issues</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingBugs ? (
          <div className="animate-pulse">Loading bugs...</div>
        ) : bugsData?.data?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No bugs reported yet
          </div>
        ) : (
          <div className="space-y-4">
            {bugsData?.data?.slice(0, 3).map((bug: any) => (
              <div key={bug.id} className="flex items-start pb-3 border-b">
                <div className="mr-2">
                  <Bug className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{bug.title}</h4>
                  <div className="flex mt-1 space-x-2">
                    <SeverityBadge severity={bug.severity} />
                    <StatusBadge status={bug.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentBugsCard;
