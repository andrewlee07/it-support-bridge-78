
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { SecurityCase } from '@/utils/types/security';
import { format, differenceInHours, differenceInMinutes, addHours } from 'date-fns';

type SLAType = 'response' | 'resolution';

interface SecurityCaseSLAIndicatorProps {
  securityCase: SecurityCase;
  defaultSlaType?: SLAType;
  darkMode?: boolean;
}

const SecurityCaseSLAIndicator: React.FC<SecurityCaseSLAIndicatorProps> = ({ 
  securityCase, 
  defaultSlaType = 'resolution',
  darkMode = false
}) => {
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
  const calculateSLAStatus = (slaType: SLAType) => {
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
      timeLeft = `${hours}h ${mins}m remaining`;
    }
    
    return {
      percentLeft: Math.round(percentLeft),
      timeLeft,
      isBreached,
      completed: false
    };
  };
  
  const slaStatus = calculateSLAStatus(defaultSlaType);
  
  // If case is resolved, show completed state
  if (slaStatus.completed) {
    return <div className="text-gray-500">Completed</div>;
  }

  // Calculate gradient color based on percentage left
  const getProgressColor = (percentLeft: number, isBreached: boolean) => {
    if (isBreached) return 'bg-red-600'; // Breached
    
    // Use gradient colors based on time remaining
    if (percentLeft <= 30) {
      return 'bg-gradient-to-r from-red-500 to-amber-500'; // Critical (getting close to breach)
    } else if (percentLeft <= 60) {
      return 'bg-gradient-to-r from-amber-500 to-green-500'; // Warning
    }
    return 'bg-green-500'; // Healthy
  };
  
  const barColor = getProgressColor(slaStatus.percentLeft, slaStatus.isBreached);

  // Dark mode or table mode styling
  const bgClass = darkMode ? 'bg-slate-700' : 'bg-slate-200';
  const textClass = darkMode ? 'text-slate-200' : 'text-slate-700';

  return (
    <div className="space-y-1">
      <span className={`text-sm ${slaStatus.isBreached ? "text-red-500 font-medium" : textClass}`}>
        {slaStatus.timeLeft}
      </span>
      <Progress 
        value={slaStatus.percentLeft} 
        className={`h-2 ${bgClass}`} 
        indicatorClassName={barColor} 
      />
    </div>
  );
};

export default SecurityCaseSLAIndicator;
