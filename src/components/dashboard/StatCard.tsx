
import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowDown, ArrowUp, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  onClick,
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden", 
        onClick && "hover:shadow-md transition-all",
        className
      )}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="rounded-full bg-primary/10 p-2">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline">
            <span className="text-3xl font-semibold">{value}</span>
            {trend && (
              <span className={cn(
                "ml-2 text-xs font-medium flex items-center",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.isPositive ? (
                  <ArrowUp className="mr-0.5 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-0.5 h-3 w-3" />
                )}
                {trend.value}%
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
