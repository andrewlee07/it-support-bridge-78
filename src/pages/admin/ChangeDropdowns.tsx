
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChangeDropdowns: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Change Request Dropdowns</h1>
      <Card>
        <CardHeader>
          <CardTitle>Dropdown Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage change request dropdown options</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangeDropdowns;
