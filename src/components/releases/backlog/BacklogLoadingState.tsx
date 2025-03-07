
import React from 'react';

const BacklogLoadingState: React.FC = () => {
  return (
    <div className="h-40 flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  );
};

export default BacklogLoadingState;
