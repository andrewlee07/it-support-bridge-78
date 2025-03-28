
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardBoxProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  isActive?: boolean;
  onClick?: () => void;
}

const StatCardBox: React.FC<StatCardBoxProps> = ({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBgColor,
  isActive = false,
  onClick,
}) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-colors",
        isActive ? `${iconBgColor.replace('bg-', 'bg-')}/50 border-${iconColor.replace('text-', '')}-200 dark:bg-${iconColor.replace('text-', '')}-900/20 dark:border-${iconColor.replace('text-', '')}-800` : ''
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={cn("h-12 w-12 rounded-full flex items-center justify-center", iconBgColor)}>
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCardBox;
