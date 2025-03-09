
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/shared/PageTransition';

interface BugDetailErrorProps {
  returnPath?: string;
}

const BugDetailError: React.FC<BugDetailErrorProps> = ({ returnPath = '/bugs' }) => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
        <h2 className="text-2xl font-bold mb-4">Bug Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The bug you are looking for could not be found.
        </p>
        <Button 
          variant="default" 
          size="lg"
          className="px-6"
          onClick={() => navigate(returnPath)}
        >
          Return to Bugs
        </Button>
      </div>
    </PageTransition>
  );
};

export default BugDetailError;
