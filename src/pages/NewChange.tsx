
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NewChange: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">New Change Request</h1>
      <Card>
        <CardHeader>
          <CardTitle>Change Request Form</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Create a new change request</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewChange;
