
import React from 'react';
import { SecurityCase } from '@/utils/types/security';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { getUserNameById } from '@/utils/userUtils';

interface SecurityCaseInfoCardProps {
  securityCase: SecurityCase;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  getTypeColor: (type: string) => string;
  formatDate: (dateString: string) => string;
  handleSystemClick: (system: string) => void;
}

const SecurityCaseInfoCard: React.FC<SecurityCaseInfoCardProps> = ({
  securityCase,
  getStatusColor,
  getPriorityColor,
  getTypeColor,
  formatDate,
  handleSystemClick
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Security Case Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">ID</p>
            <p className="font-mono">
              <Link to={`/security/case/${securityCase.id}`} className="hover:underline text-blue-600">
                {securityCase.id}
              </Link>
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <Badge className={getStatusColor(securityCase.status)}>
              {securityCase.status}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Priority</p>
            <Badge className={getPriorityColor(securityCase.priority)}>
              {securityCase.priority}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Type</p>
            <Badge variant="outline" className={getTypeColor(securityCase.type)}>
              {securityCase.type}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Reported By</p>
            <p>{getUserNameById(securityCase.reportedBy)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Reported On</p>
            <p>{formatDate(securityCase.reportedAt)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Impacted Users</p>
            <p>{securityCase.impactedUsers}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
            <p>{securityCase.assignedTo ? getUserNameById(securityCase.assignedTo) : "Unassigned"}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
          <p className="text-sm">{securityCase.description}</p>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground mb-1">Remediation Plan</p>
          <p className="text-sm">{securityCase.remediationPlan}</p>
        </div>
        
        {securityCase.affectedSystems && securityCase.affectedSystems.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Affected Services</p>
            <div className="flex flex-wrap gap-2">
              {securityCase.affectedSystems.map((system, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-blue-50 text-blue-700 cursor-pointer hover:bg-blue-100"
                  onClick={() => handleSystemClick(system)}
                >
                  {system}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityCaseInfoCard;
