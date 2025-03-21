
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SLAData {
  percentLeft: number;
  timeLeft: string;
  isBreached: boolean;
  breachTime: number;
  targetHours: number;
}

interface SLAInformationProps {
  responseSLA: SLAData | null;
  resolutionSLA: SLAData | null;
  getSLAIndicatorColor: (progress: number) => string;
}

const SLAInformation: React.FC<SLAInformationProps> = ({
  responseSLA,
  resolutionSLA,
  getSLAIndicatorColor
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">SLA Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Response SLA</span>
            <span className="text-sm">
              {responseSLA?.targetHours} hours target
            </span>
          </div>
          <Progress 
            value={responseSLA?.percentLeft || 0} 
            className="h-2" 
            indicatorClassName={getSLAIndicatorColor(responseSLA?.percentLeft || 0)} 
          />
          <p className="text-xs text-muted-foreground mt-1">
            {responseSLA?.timeLeft === 'Completed' 
              ? 'First response completed' 
              : `${responseSLA?.percentLeft}% time remaining`}
          </p>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Resolution SLA</span>
            <span className="text-sm">
              {resolutionSLA?.targetHours} hours target
            </span>
          </div>
          <Progress 
            value={resolutionSLA?.percentLeft || 0} 
            className="h-2" 
            indicatorClassName={getSLAIndicatorColor(resolutionSLA?.percentLeft || 0)} 
          />
          <p className="text-xs text-muted-foreground mt-1">
            {resolutionSLA?.timeLeft === 'Completed' 
              ? 'Case resolved' 
              : resolutionSLA?.isBreached 
                ? 'SLA breached' 
                : `${resolutionSLA?.percentLeft}% time remaining`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SLAInformation;
