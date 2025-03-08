
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SLAConfiguration: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">SLA Configuration</h1>
      <Card>
        <CardHeader>
          <CardTitle>Service Level Agreement Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Configure SLA parameters</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SLAConfiguration;
