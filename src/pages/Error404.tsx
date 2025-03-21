
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Error404: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] px-4">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
      <h2 className="mt-4 text-2xl font-medium text-gray-700 dark:text-gray-300">
        Page not found
      </h2>
      <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default Error404;
