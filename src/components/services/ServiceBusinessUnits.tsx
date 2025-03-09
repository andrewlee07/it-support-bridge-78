
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getBusinessUnitsForService } from '@/utils/mockData/businessUnits';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { ServiceBusinessUnitCriticality } from '@/utils/types/service';

interface ServiceBusinessUnitsProps {
  serviceId: string;
}

const ServiceBusinessUnits: React.FC<ServiceBusinessUnitsProps> = ({ serviceId }) => {
  const [businessUnits, setBusinessUnits] = useState<any[]>([]);
  
  useEffect(() => {
    // Get business units for the service
    const busUnits = getBusinessUnitsForService(serviceId);
    setBusinessUnits(busUnits);
  }, [serviceId]);
  
  const getCriticalityColor = (criticality: ServiceBusinessUnitCriticality) => {
    switch (criticality) {
      case 'Critical':
        return 'text-destructive bg-destructive/15';
      case 'High':
        return 'text-orange-500 bg-orange-500/15';
      case 'Medium':
        return 'text-amber-500 bg-amber-500/15';
      case 'Low':
        return 'text-blue-500 bg-blue-500/15';
      default:
        return '';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Units</CardTitle>
        <CardDescription>
          Departments affected by or using this service
        </CardDescription>
      </CardHeader>
      <CardContent>
        {businessUnits.length === 0 ? (
          <div className="text-center p-4 border rounded-md bg-muted/30">
            <p className="text-muted-foreground">No business units associated with this service</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {businessUnits.map(bu => (
                <div key={bu.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{bu.name}</h3>
                    <Badge className={`${getCriticalityColor(bu.criticality)} ml-2 flex items-center`}>
                      {bu.criticality === 'Critical' && (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      )}
                      {bu.criticality}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{bu.description}</p>
                  {bu.notes && (
                    <div className="bg-muted/30 p-2 rounded-sm text-sm mt-2">
                      <span className="font-medium">Notes:</span> {bu.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceBusinessUnits;
