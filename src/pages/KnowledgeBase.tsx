
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';

const KnowledgeBase: React.FC = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground mt-1">
            Browse and search knowledge articles
          </p>
        </div>
        <div className="glass-panel p-6 rounded-lg">
          <p>Knowledge Base content will be implemented here.</p>
        </div>
      </div>
    </PageTransition>
  );
};

export default KnowledgeBase;
