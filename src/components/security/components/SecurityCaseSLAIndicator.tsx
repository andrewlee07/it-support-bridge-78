
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { SecurityCase } from '@/utils/types/security';
import { format, differenceInHours, differenceInMinutes, addHours } from 'date-fns';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Clock, CheckCircle2 } from 'lucide-react';

type SLAType = 'response' | 'resolution';

interface SecurityCaseSLAIndicatorProps {
  securityCase: SecurityCase;
  defaultSlaType?: SLAType;
}

const SecurityCaseSLAIndicator: React.FC<SecurityCaseSLAIndicatorProps> = ({ 
  securityCase, 
  defaultSlaType = 'resolution' 
}) => {
  const [slaType, setSlaType] = useState<SLAType>(defaultSlaType);

  // Get SLA target hours based on priority and SLA type
  const getSLATargetHours = (priority: string, type: SLAType): number => {
    const targets = {
      response: {
        High: 1,
        Medium: 4,
        Low: 8
      },
      resolution: {
        High: 24,
        Medium: 48,
        Low: 72
      }
    };
    
    return targets[type][priority as keyof typeof targets[typeof type]] || 
           (type === 'response' ? 4 : 48); // Default fallback
  };

  // Calculate SLA status
  const calculateSLAStatus = () => {
    // For resolved cases
    if (securityCase.status === 'Resolved') {
      return {
        percentLeft: 100,
        timeLeft: 'Completed',
        isBreached: false,
        completed: true
      };
    }
    
    const reportedAt = new Date(securityCase.reportedAt);
    const targetHours = getSLATargetHours(securityCase.priority, slaType);
    const slaTarget = addHours(reportedAt, targetHours);
    
    // For response SLA, check if first response exists
    if (slaType === 'response' && securityCase.firstResponseAt) {
      return {
        percentLeft: 100,
        timeLeft: 'Responded',
        isBreached: false,
        completed: true
      };
    }
    
    // Calculate time remaining
    const now = new Date();
    const isBreached = now > slaTarget;
    
    // Calculate percentage of time left
    const totalDuration = slaTarget.getTime() - reportedAt.getTime();
    const elapsedDuration = now.getTime() - reportedAt.getTime();
    const percentUsed = Math.min(100, Math.max(0, (elapsedDuration / totalDuration) * 100));
    const percentLeft = Math.max(0, 100 - percentUsed);
    
    // Format time left as a readable string
    let timeLeft = '';
    if (isBreached) {
      const hours = differenceInHours(now, slaTarget);
      const mins = differenceInMinutes(now, slaTarget) % 60;
      timeLeft = `Overdue by ${hours > 0 ? `${hours}h ` : ''}${mins}m`;
    } else {
      const hours = differenceInHours(slaTarget, now);
      const mins = differenceInMinutes(slaTarget, now) % 60;
      timeLeft = `${hours > 0 ? `${hours}h ` : ''}${mins}m remaining`;
    }
    
    return {
      percentLeft: Math.round(percentLeft),
      timeLeft,
      isBreached,
      completed: false
    };
  };
  
  const slaStatus = calculateSLAStatus();
  
  // If case is resolved, show completed state
  if (slaStatus.completed) {
    return <div className="text-gray-500">Completed</div>;
  }
  
  // Calculate gradient color based on percentage left
  const getGradientColor = (percentLeft: number) => {
    if (percentLeft <= 0) return 'bg-red-600'; // Breached
    if (percentLeft <= 30) return 'bg-gradient-to-r from-red-500 to-amber-500'; // At risk
    if (percentLeft <= 60) return 'bg-gradient-to-r from-amber-500 to-green-500'; // Warning
    return 'bg-green-500'; // On target
  };
  
  const barColor = getGradientColor(slaStatus.percentLeft);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <ToggleGroup 
            type="single" 
            value={slaType} 
            onValueChange={(value) => value && setSlaType(value as SLAType)}
            className="border rounded-md"
          >
            <ToggleGroupItem value="response" size="sm" className="px-2 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Response
            </ToggleGroupItem>
            <ToggleGroupItem value="resolution" size="sm" className="px-2 text-xs">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Resolution
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <span className="text-sm">
          {slaStatus.isBreached ? (
            <span className="text-red-600 font-medium">{slaStatus.timeLeft}</span>
          ) : (
            <span>{slaStatus.timeLeft}</span>
          )}
        </span>
      </div>
      <Progress 
        value={slaStatus.percentLeft} 
        className="h-2" 
        indicatorClassName={barColor} 
      />
    </div>
  );
};

export default SecurityCaseSLAIndicator;
