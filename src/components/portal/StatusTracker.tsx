
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle, Clock } from 'lucide-react';

type Step = {
  label: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
};

interface StatusTrackerProps {
  steps: Step[];
  className?: string;
}

const StatusTracker: React.FC<StatusTrackerProps> = ({ steps, className }) => {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-sm font-medium">Status</h3>
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute top-5 left-3.5 h-full w-px bg-muted -mt-5" 
             style={{ height: `calc(100% - 2.5rem)` }}
        />
        
        {/* Steps */}
        <div className="space-y-6 relative">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="relative z-10">
                {step.status === 'completed' ? (
                  <CheckCircle className="h-7 w-7 text-primary" />
                ) : step.status === 'current' ? (
                  <Clock className="h-7 w-7 text-primary" />
                ) : (
                  <Circle className="h-7 w-7 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className={cn(
                  "font-medium",
                  step.status === 'completed' ? "text-primary" : 
                  step.status === 'current' ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.label}
                </p>
                {step.date && (
                  <p className="text-xs text-muted-foreground mt-1">{step.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusTracker;
