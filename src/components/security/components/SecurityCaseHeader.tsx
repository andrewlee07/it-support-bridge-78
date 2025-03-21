
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, BookPlus, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SecurityCase } from '@/utils/types/security';
import { getUserNameById } from '@/utils/userUtils';

interface SecurityCaseHeaderProps {
  securityCase: SecurityCase;
  handleBack: () => void;
  getPriorityColor: (priority: string) => string;
  formatDate: (dateString: string) => string;
}

const SecurityCaseHeader: React.FC<SecurityCaseHeaderProps> = ({
  securityCase,
  handleBack,
  getPriorityColor,
  formatDate
}) => {
  return (
    <>
      {/* Header with back button and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Email User
          </Button>
          <Button variant="outline" size="sm">
            <Phone className="mr-2 h-4 w-4" />
            Call User
          </Button>
          <Button variant="outline" size="sm">
            <BookPlus className="mr-2 h-4 w-4" />
            Add KB Article
          </Button>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Case Title and Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{securityCase.title}</h1>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="font-medium">{getUserNameById(securityCase.reportedBy)}</span>
            <span>|</span>
            <span>Opened: {formatDate(securityCase.reportedAt)}</span>
          </div>
          <Badge className={getPriorityColor(securityCase.priority)}>
            {securityCase.priority.toUpperCase()}
          </Badge>
        </div>
      </div>
    </>
  );
};

export default SecurityCaseHeader;
