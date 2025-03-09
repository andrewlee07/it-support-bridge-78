
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ServiceWithCategory } from '@/utils/types/service';
import ServiceBusinessUnits from './ServiceBusinessUnits';
import ServiceKnowledgeArticles from './ServiceKnowledgeArticles';
import { 
  LayoutDashboard, 
  Building, 
  Book, 
  Ticket, 
  Clock, 
  User, 
  Users, 
  ExternalLink 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getUserById } from '@/utils/mockData/users';
import { getTeamById } from '@/utils/mockData/services';

interface ServiceTabsDetailProps {
  service: ServiceWithCategory;
}

const ServiceTabsDetail: React.FC<ServiceTabsDetailProps> = ({ service }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  const supportContact = service.supportContactId ? getUserById(service.supportContactId) : null;
  const supportTeam = service.supportTeamId ? getTeamById(service.supportTeamId) : null;
  const serviceOwner = service.serviceOwnerId ? getUserById(service.serviceOwnerId) : null;
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="overview" className="flex items-center gap-1">
          <LayoutDashboard className="h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="business-units" className="flex items-center gap-1">
          <Building className="h-4 w-4" />
          Business Units
        </TabsTrigger>
        <TabsTrigger value="knowledge" className="flex items-center gap-1">
          <Book className="h-4 w-4" />
          Knowledge
        </TabsTrigger>
        <TabsTrigger value="tickets" className="flex items-center gap-1">
          <Ticket className="h-4 w-4" />
          Tickets
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
              <CardDescription>Basic information about this service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Description</h3>
                <p className="mt-1 text-sm">{service.description}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Category</h3>
                <p className="mt-1 text-sm">{service.category.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Status</h3>
                <p className="mt-1 text-sm capitalize">{service.status}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Support Information</CardTitle>
              <CardDescription>Support resources and contacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Support Hours</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{service.supportHours || 'Not specified'}</p>
                </div>
              </div>
              
              {supportContact && (
                <div>
                  <h3 className="text-sm font-medium">Support Contact</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{supportContact.name}</p>
                  </div>
                </div>
              )}
              
              {supportTeam && (
                <div>
                  <h3 className="text-sm font-medium">Support Team</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{supportTeam.name}</p>
                  </div>
                </div>
              )}
              
              {serviceOwner && (
                <div>
                  <h3 className="text-sm font-medium">Service Owner</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{serviceOwner.name}</p>
                  </div>
                </div>
              )}
              
              {service.documentationUrl && (
                <div>
                  <h3 className="text-sm font-medium">Documentation</h3>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-sm flex items-center gap-1 mt-1"
                    onClick={() => window.open(service.documentationUrl, '_blank')}
                  >
                    View Documentation
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="business-units">
        <ServiceBusinessUnits serviceId={service.id} />
      </TabsContent>
      
      <TabsContent value="knowledge">
        <ServiceKnowledgeArticles serviceId={service.id} />
      </TabsContent>
      
      <TabsContent value="tickets">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Tickets
            </CardTitle>
            <CardDescription>
              Recent tickets related to this service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-sm italic">
              Ticket integration will be implemented in a future update.
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ServiceTabsDetail;
