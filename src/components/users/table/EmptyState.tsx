
import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center p-8 border rounded-md bg-muted/10">
      <p className="text-muted-foreground">No users found</p>
    </div>
  );
};

export default EmptyState;
