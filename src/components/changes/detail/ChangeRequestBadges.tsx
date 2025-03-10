
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RiskLevel, ChangeStatus } from '@/utils/types/change';

interface ChangeRequestBadgesProps {
  status: ChangeStatus;
  riskLevel: RiskLevel;
  canUpdateStatus: boolean;
  onStatusChange: (status: ChangeStatus) => void;
}

const ChangeRequestBadges: React.FC<ChangeRequestBadgesProps> = ({
  status,
  riskLevel,
  canUpdateStatus,
  onStatusChange
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };
  
  const getRiskLevelColor = (level: RiskLevel) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  // Available status options to transition to
  const getAvailableStatusOptions = () => {
    const allStatuses: ChangeStatus[] = ['draft', 'submitted', 'approved', 'in-progress', 'completed', 'failed', 'cancelled'];
    // Remove current status from options
    return allStatuses.filter(s => s !== status);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {canUpdateStatus ? (
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          <Select onValueChange={(value) => onStatusChange(value as ChangeStatus)}>
            <SelectTrigger className="h-8 w-[150px] text-xs">
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableStatusOptions().map((option) => (
                <SelectItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <Badge className={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )}
      <Badge className={getRiskLevelColor(riskLevel)}>
        {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
      </Badge>
    </div>
  );
};

export default ChangeRequestBadges;
