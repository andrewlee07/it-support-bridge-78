
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RiskAssessmentConfiguration: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Risk Assessment Configuration</h1>
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Configure risk assessment parameters</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentConfiguration;
