
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ChangeRequestError: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-xl font-semibold mb-2">Change Request Not Found</h2>
      <p className="text-muted-foreground mb-4">
        The change request you're looking for doesn't exist or you don't have permission to view it.
      </p>
      <Button 
        variant="default"
        onClick={() => navigate('/changes')}
      >
        Return to Changes
      </Button>
    </div>
  );
};

export default ChangeRequestError;
