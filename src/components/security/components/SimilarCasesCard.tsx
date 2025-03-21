
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const SimilarCasesCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Similar Security Cases</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer">
            <h4 className="font-medium">SEC00042: Customer API data exposure</h4>
            <p className="text-sm text-muted-foreground">Resolved on Jan 15, 2023</p>
          </div>
          <div className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer">
            <h4 className="font-medium">SEC00078: API gateway misconfiguration</h4>
            <p className="text-sm text-muted-foreground">Resolved on Mar 22, 2023</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimilarCasesCard;
