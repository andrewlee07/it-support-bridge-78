
import React from 'react';

const KanbanLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default KanbanLoading;
