
import React, { useEffect, useState } from 'react';
import { getServiceById } from '@/utils/mockData/services';
import { getTeamById } from '@/utils/mockData/services';
import { getUserById } from '@/utils/mockData/users';
import { Card } from '@/components/ui/card';
import { FileText, Clock, User, Users, ExternalLink, Building, AlertTriangle } from 'lucide-react';
import { ServiceWithCategory } from '@/utils/types/service';
import { Button } from '@/components/ui/button';
import { getBusinessUnitsForService } from '@/utils/mockData/businessUnits';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ServiceContextInfoProps {
  serviceId: string;
}

const ServiceContextInfo: React.FC<ServiceContextInfoProps> = ({ serviceId }) => {
  const [service, setService] = useState<ServiceWithCategory | null>(null);
  const [supportContact, setSupportContact] = useState<any>(null);
  const [supportTeam, setSupportTeam] = useState<any>(null);
  const [serviceOwner, setServiceOwner] = useState<any>(null);
  const [businessUnits, setBusinessUnits] = useState<any[]>([]);
  const [isBusinessUnitsOpen, setIsBusinessUnitsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!serviceId) return;
    
    // Get service details
    const serviceDetails = getServiceById(serviceId);
    if (serviceDetails) {
      setService(serviceDetails);
      
      // Get support contact
      if (serviceDetails.supportContactId) {
        const contact = getUserById(serviceDetails.supportContactId);
        setSupportContact(contact);
      } else {
        setSupportContact(null);
      }
      
      // Get support team
      if (serviceDetails.supportTeamId) {
        const team = getTeamById(serviceDetails.supportTeamId);
        setSupportTeam(team);
      } else {
        setSupportTeam(null);
      }
      
      // Get service owner
      if (serviceDetails.serviceOwnerId) {
        const owner = getUserById(serviceDetails.serviceOwnerId);
        setServiceOwner(owner);
      } else {
        setServiceOwner(null);
      }
      
      // Get business units
      const busUnits = getBusinessUnitsForService(serviceId);
      setBusinessUnits(busUnits);
      
      // If there are critical business units, open the collapsible by default
      const hasCriticalBusinessUnit = busUnits.some(bu => bu.criticality === 'Critical');
      setIsBusinessUnitsOpen(hasCriticalBusinessUnit);
    }
  }, [serviceId]);
  
  if (!service) return null;
  
  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case 'Critical':
        return 'text-destructive';
      case 'High':
        return 'text-orange-500';
      case 'Medium':
        return 'text-amber-500';
      case 'Low':
        return 'text-blue-500';
      default:
        return '';
    }
  };
  
  return (
    <Card className="p-4 mt-4 bg-muted/20">
      <h3 className="text-sm font-medium mb-3">Service Information</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-start">
          <Clock className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
          <div>
            <span className="font-medium">Support Hours:</span>
            <p>{service.supportHours || 'Not specified'}</p>
          </div>
        </div>
        
        {supportContact && (
          <div className="flex items-start">
            <User className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
            <div>
              <span className="font-medium">Support Contact:</span>
              <p>{supportContact.name}</p>
            </div>
          </div>
        )}
        
        {supportTeam && (
          <div className="flex items-start">
            <Users className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
            <div>
              <span className="font-medium">Support Team:</span>
              <p>{supportTeam.name}</p>
            </div>
          </div>
        )}
        
        {serviceOwner && (
          <div className="flex items-start">
            <User className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
            <div>
              <span className="font-medium">Service Owner:</span>
              <p>{serviceOwner.name}</p>
            </div>
          </div>
        )}
        
        {service.documentationUrl && (
          <div className="flex items-start">
            <FileText className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
            <div>
              <span className="font-medium">Documentation:</span>
              <p>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm"
                  onClick={() => window.open(service.documentationUrl, '_blank')}
                >
                  View Documentation
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </p>
            </div>
          </div>
        )}
        
        {businessUnits.length > 0 && (
          <Collapsible
            open={isBusinessUnitsOpen}
            onOpenChange={setIsBusinessUnitsOpen}
            className="mt-2"
          >
            <div className="flex items-start">
              <Building className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
              <div className="w-full">
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium">
                  <span>Business Impact:</span>
                  {isBusinessUnitsOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-1 space-y-1">
                  {businessUnits.map(bu => (
                    <div key={bu.id} className="pl-1 py-1 border-l-2 border-muted-foreground/20">
                      <div className="flex items-start justify-between">
                        <span>{bu.name}</span>
                        <span className={`text-xs font-medium ${getCriticalityColor(bu.criticality)}`}>
                          {bu.criticality === 'Critical' && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                          {bu.criticality}
                        </span>
                      </div>
                      {bu.criticality === 'Critical' && bu.notes && (
                        <p className="text-xs text-muted-foreground mt-0.5">{bu.notes}</p>
                      )}
                    </div>
                  ))}
                </CollapsibleContent>
              </div>
            </div>
          </Collapsible>
        )}
      </div>
    </Card>
  );
};

export default ServiceContextInfo;
