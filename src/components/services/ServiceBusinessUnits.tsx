
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Building, 
  User, 
  AlertTriangle, 
  AlertOctagon, 
  AlertCircle, 
  AlertSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ServiceBusinessUnitCriticality } from '@/utils/types/service';
import { getBusinessUnitsForService } from '@/utils/mockData/businessUnits';
import { getUserById } from '@/utils/mockData/users';

interface ServiceBusinessUnitsProps {
  serviceId: string;
}

const ServiceBusinessUnits: React.FC<ServiceBusinessUnitsProps> = ({ serviceId }) => {
  const businessUnits = getBusinessUnitsForService(serviceId);
  
  const getCriticalityIcon = (criticality: ServiceBusinessUnitCriticality) => {
    switch (criticality) {
      case 'Critical':
        return <AlertOctagon className="h-4 w-4 text-destructive" />;
      case 'High':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'Medium':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'Low':
        return <AlertSquare className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };
  
  const getCriticalityColor = (criticality: ServiceBusinessUnitCriticality) => {
    switch (criticality) {
      case 'Critical':
        return 'bg-destructive/10 text-destructive hover:bg-destructive/20';
      case 'High':
        return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20';
      case 'Low':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      default:
        return '';
    }
  };
  
  if (businessUnits.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Building className="h-5 w-5" />
            Business Units
          </CardTitle>
          <CardDescription>
            Business units that use this service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-sm italic">
            No business units associated with this service.
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Building className="h-5 w-5" />
          Business Units
        </CardTitle>
        <CardDescription>
          Business units that use this service
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {businessUnits.map(bu => {
            const managers = bu.managerIds.map(id => getUserById(id)).filter(Boolean);
            
            return (
              <div key={bu.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-md">{bu.name}</h3>
                    <p className="text-sm text-muted-foreground">{bu.description}</p>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge className={getCriticalityColor(bu.criticality)}>
                          <span className="flex items-center gap-1">
                            {getCriticalityIcon(bu.criticality)}
                            {bu.criticality}
                          </span>
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Criticality: {bu.criticality}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                {managers.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-xs text-muted-foreground uppercase font-medium mb-1">Managed by</h4>
                    <div className="flex flex-wrap gap-2">
                      {managers.map(manager => (
                        <div key={manager?.id} className="flex items-center gap-1 text-sm">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span>{manager?.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {bu.notes && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium">Notes:</span> {bu.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceBusinessUnits;
