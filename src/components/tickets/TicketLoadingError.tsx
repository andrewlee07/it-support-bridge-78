
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

interface TicketLoadingErrorProps {
  returnPath: string;
  entityName: string;
}

const TicketLoadingError: React.FC<TicketLoadingErrorProps> = ({ 
  returnPath, 
  entityName 
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center">
      <AlertCircle className="h-16 w-16 text-destructive mb-4" />
      <h1 className="text-2xl font-bold mb-2">Unable to load {entityName}</h1>
      <p className="text-muted-foreground mb-6">
        The {entityName.toLowerCase()} you are looking for could not be found or an error occurred.
      </p>
      <Button asChild>
        <Link to={returnPath}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to {entityName} List
        </Link>
      </Button>
    </div>
  );
};

export default TicketLoadingError;
