
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NoDataPlaceholderProps {
  title: string;
}

const NoDataPlaceholder: React.FC<NoDataPlaceholderProps> = ({ title }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </CardContent>
    </Card>
  );
};

export default NoDataPlaceholder;
