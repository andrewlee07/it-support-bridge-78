
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export interface TicketLoadingErrorProps {
  returnPath: string;
  entityName: string;
}

const TicketLoadingError: React.FC<TicketLoadingErrorProps> = ({
  returnPath,
  entityName
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="rounded-full bg-amber-100 p-3 mb-4">
        <AlertTriangle className="h-6 w-6 text-amber-600" />
      </div>
      <h2 className="text-xl font-bold mb-2">
        {entityName} Not Found
      </h2>
      <p className="text-muted-foreground mb-6">
        The {entityName.toLowerCase()} you're looking for could not be found or may have been deleted.
      </p>
      <Button onClick={() => navigate(returnPath)}>
        Return to {entityName} List
      </Button>
    </div>
  );
};

export default TicketLoadingError;
