
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ReleaseDescriptionCardProps {
  description: string;
}

const ReleaseDescriptionCard: React.FC<ReleaseDescriptionCardProps> = ({
  description
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default ReleaseDescriptionCard;
