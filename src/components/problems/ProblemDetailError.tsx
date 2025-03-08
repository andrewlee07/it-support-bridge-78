
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-semibold mb-2">{entityType} Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The {entityType.toLowerCase()} you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <Button 
          className="btn-primary"
          onClick={() => navigate(returnPath)}
        >
          Return to {entityType}s
        </Button>
      </div>
    );
  }

  return null;
};

export default ProblemDetailError;
