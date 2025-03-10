
import React from 'react';
import { useRouteError } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
  const error = useRouteError() as any;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Oops!</h1>
        <p className="mb-4 text-muted-foreground">Something went wrong.</p>
        <div className="p-4 bg-muted rounded-md mb-4 text-left overflow-auto">
          <p className="font-mono text-sm">
            {error?.statusText || error?.message || 'An unexpected error has occurred.'}
          </p>
        </div>
        <a href="/" className="text-primary hover:underline">
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
