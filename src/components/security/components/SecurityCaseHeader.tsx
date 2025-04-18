
import React from 'react';
import { Button } from '@/components/ui/button';
import { SecurityCase } from '@/utils/types/security';
import { ArrowLeft } from 'lucide-react';
import WatchButton from '@/components/shared/WatchButton';

interface SecurityCaseHeaderProps {
  securityCase: SecurityCase;
  handleBack: () => void;
  getPriorityColor: (priority: string) => string;
  formatDate: (date: string) => string;
}

const SecurityCaseHeader: React.FC<SecurityCaseHeaderProps> = ({ 
  securityCase, 
  handleBack, 
  getPriorityColor,
  formatDate
}) => {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{securityCase.title}</h1>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Case #{securityCase.id}</span>
            <span>•</span>
            <span>Created {formatDate(securityCase.reportedAt)}</span>
            <span>•</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(securityCase.priority)}`}>
              {securityCase.priority} Priority
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <WatchButton 
          item={{
            id: securityCase.id,
            type: 'incident', // Using 'incident' as a general type for security cases
            title: securityCase.title,
            status: securityCase.status,
            createdAt: new Date(securityCase.reportedAt)
          }}
          variant="outline"
          size="sm"
        />
        <Button variant="outline" size="sm">
          Export
        </Button>
        <Button variant="outline" size="sm">
          Share
        </Button>
        <Button size="sm">
          Update Status
        </Button>
      </div>
    </div>
  );
};

export default SecurityCaseHeader;
