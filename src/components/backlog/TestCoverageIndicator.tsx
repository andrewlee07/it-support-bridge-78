
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TestCoverageIndicatorProps {
  coveragePercentage: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const TestCoverageIndicator: React.FC<TestCoverageIndicatorProps> = ({
  coveragePercentage,
  size = 'md',
  showText = true,
  className
}) => {
  // Ensure the percentage is between 0 and 100
  const percentage = Math.max(0, Math.min(100, coveragePercentage));
  
  // Determine color based on coverage percentage
  let colorClass = '';
  if (percentage < 30) {
    colorClass = 'bg-red-500';
  } else if (percentage < 70) {
    colorClass = 'bg-yellow-500';
  } else {
    colorClass = 'bg-green-500';
  }

  // Size-based styles
  const sizeStyles = {
    sm: 'h-1.5 text-xs',
    md: 'h-2 text-sm',
    lg: 'h-3 text-base'
  };

  // Text to display
  const coverageText = `${percentage.toFixed(0)}%`;

  // Label placement based on size
  const labelClass = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className={cn("space-y-1", className)}>
      {showText && (
        <div className="flex justify-between items-center">
          <span className={cn("text-gray-600 font-medium", labelClass)}>Test Coverage</span>
          <span className={cn("font-medium", labelClass, {
            'text-red-600': percentage < 30,
            'text-yellow-600': percentage >= 30 && percentage < 70,
            'text-green-600': percentage >= 70
          })}>
            {coverageText}
          </span>
        </div>
      )}
      <div className="relative">
        <Progress 
          value={percentage} 
          className={cn("w-full", sizeStyles[size])}
        />
        <div 
          className={cn("absolute top-0 left-0 h-full transition-all", colorClass)} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default TestCoverageIndicator;
