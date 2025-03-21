
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Server } from 'lucide-react';
import { SecurityCase } from '@/utils/types/security';

interface AffectedServicesCardProps {
  securityCase: SecurityCase;
  handleSystemClick: (system: string) => void;
}

const AffectedServicesCard: React.FC<AffectedServicesCardProps> = ({
  securityCase,
  handleSystemClick
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle>Affected Services</CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" /> Add Service
        </Button>
      </CardHeader>
      <CardContent>
        {securityCase.affectedSystems && securityCase.affectedSystems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityCase.affectedSystems.map((system, index) => (
              <Card 
                key={index} 
                className="bg-muted/40 cursor-pointer hover:bg-muted/60 transition-colors"
                onClick={() => handleSystemClick(system)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <Server className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{system}</h4>
                    <p className="text-sm text-muted-foreground">Service</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <Server className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No affected services have been added yet</p>
            <Button variant="outline" className="mt-4">
              <Plus className="h-4 w-4 mr-2" /> Add Service
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AffectedServicesCard;
