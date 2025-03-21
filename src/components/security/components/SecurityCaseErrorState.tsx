
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SecurityCaseErrorStateProps {
  handleBack: () => void;
  error?: string;
}

const SecurityCaseErrorState: React.FC<SecurityCaseErrorStateProps> = ({
  handleBack,
  error
}) => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Security Case Not Found</h3>
          <p className="text-muted-foreground mt-1">
            {error || "The security case you're looking for doesn't exist or has been removed."}
          </p>
          <Button className="mt-6" onClick={handleBack}>
            Return to Security Cases
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityCaseErrorState;
