
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface SecurityCaseLoadingStateProps {
  handleBack: () => void;
}

const SecurityCaseLoadingState: React.FC<SecurityCaseLoadingStateProps> = ({
  handleBack
}) => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="space-y-2 text-center">
          <div className="h-6 w-24 bg-muted animate-pulse rounded mx-auto"></div>
          <div className="h-4 w-48 bg-muted animate-pulse rounded mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCaseLoadingState;
