
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Construction } from 'lucide-react';

const ProblemManagement = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Problem Management</h1>
            <p className="text-muted-foreground mt-1">
              Identify, analyze, and resolve recurring issues
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Problem Management</CardTitle>
              <CardDescription>Track and resolve underlying issues</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Alert>
                <Construction className="h-4 w-4" />
                <AlertTitle>Under Construction</AlertTitle>
                <AlertDescription>
                  The Problem Management module is currently under development. 
                  Check back soon for updates.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProblemManagement;
