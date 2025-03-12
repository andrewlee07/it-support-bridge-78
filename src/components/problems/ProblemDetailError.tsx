
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

interface ProblemDetailErrorProps {
  loading: boolean;
  error: string | null;
  returnPath: string;
  entityType: string;
}

const ProblemDetailError: React.FC<ProblemDetailErrorProps> = ({
  loading,
  error,
  returnPath,
  entityType
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="rounded-full bg-amber-100 p-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-amber-600" />
        </div>
        <h2 className="text-xl font-bold mb-2">
          {entityType} Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          The {entityType.toLowerCase()} you're looking for could not be found or may have been deleted.
        </p>
        <Button onClick={() => navigate(returnPath)}>
          Return to {entityType} List
        </Button>
      </div>
    );
  }

  return null;
};

export default ProblemDetailError;
