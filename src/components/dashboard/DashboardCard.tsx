
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <Card className={cn("overflow-hidden card-shadow", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default DashboardCard;
