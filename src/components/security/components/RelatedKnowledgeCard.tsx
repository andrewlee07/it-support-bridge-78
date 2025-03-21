
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const RelatedKnowledgeCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Related Knowledge</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer">
            <h4 className="font-medium">Data Breach Response Protocol</h4>
            <p className="text-sm text-muted-foreground">Standard procedures for containing and remediation</p>
          </div>
          <div className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer">
            <h4 className="font-medium">API Security Guidelines</h4>
            <p className="text-sm text-muted-foreground">Best practices for securing API endpoints</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedKnowledgeCard;
