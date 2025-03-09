
import React, { useEffect, useState } from 'react';
import { getServiceById } from '@/utils/mockData/services';
import { getTeamById } from '@/utils/mockData/services';
import { getUserById } from '@/utils/mockData/users';
import { Card } from '@/components/ui/card';
import { FileText, Clock, User, Users, ExternalLink } from 'lucide-react';
import { ServiceWithCategory } from '@/utils/types/service';
import { Button } from '@/components/ui/button';

interface ServiceContextInfoProps {
  serviceId: string;
}

const ServiceContextInfo: React.FC<ServiceContextInfoProps> = ({ serviceId }) => {
  const [service, setService] = useState<ServiceWithCategory | null>(null);
  const [supportContact, setSupportContact] = useState<any>(null);
  const [supportTeam, setSupportTeam] = useState<any>(null);
  const [serviceOwner, setServiceOwner] = useState<any>(null);

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
      }
      
      // Get support team
      if (serviceDetails.supportTeamId) {
        const team = getTeamById(serviceDetails.supportTeamId);
        setSupportTeam(team);
      }
      
      // Get service owner
      if (serviceDetails.serviceOwnerId) {
        const owner = getUserById(serviceDetails.serviceOwnerId);
        setServiceOwner(owner);
      }
    }
  }, [serviceId]);
  
  if (!service) return null;
  
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
      </div>
    </Card>
  );
};

export default ServiceContextInfo;
