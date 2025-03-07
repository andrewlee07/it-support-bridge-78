
import React from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, User, Clock, CheckCircle } from 'lucide-react';

interface ReleaseDetailsCardProps {
  plannedDate: string | Date;
  owner: string;
  createdAt: string | Date;
  approvedAt?: string | Date;
}

const ReleaseDetailsCard: React.FC<ReleaseDetailsCardProps> = ({
  plannedDate,
  owner,
  createdAt,
  approvedAt
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Release Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Planned Date: {format(new Date(plannedDate), 'PPP')}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Owner: {owner}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Created: {format(new Date(createdAt), 'PPP')}</span>
          </div>
          {approvedAt && (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Approved: {format(new Date(approvedAt), 'PPP')}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReleaseDetailsCard;
