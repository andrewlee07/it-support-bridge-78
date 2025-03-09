
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Calendar, User, Users, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import ServiceTicketsReport from './ServiceTicketsReport';
import ServiceBusinessUnits from './ServiceBusinessUnits';
import ServiceKnowledgeArticles from './ServiceKnowledgeArticles';
import { getUserById } from '@/utils/mockData/users';
import { getTeamById } from '@/utils/mockData/teams';
import { ServiceWithCategory } from '@/utils/types/service';

interface ServiceDetailProps {
  service: ServiceWithCategory;
  onBack: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const supportContact = service.supportContactId ? getUserById(service.supportContactId) : null;
  const supportTeam = service.supportTeamId ? getTeamById(service.supportTeamId) : null;
  const serviceOwner = service.serviceOwnerId ? getUserById(service.serviceOwnerId) : null;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack} size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Services
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{service.name}</h2>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
              {service.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {service.category.name}
            </span>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="business-units">Business Units</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
              <CardDescription>Basic information about this service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Description</h3>
                <p className="text-sm mt-1">{service.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {service.supportHours && (
                  <div>
                    <h3 className="text-sm font-medium">Support Hours</h3>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{service.supportHours}</span>
                    </div>
                  </div>
                )}
                
                {supportContact && (
                  <div>
                    <h3 className="text-sm font-medium">Support Contact</h3>
                    <div className="flex items-center mt-1">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{supportContact.name}</span>
                    </div>
                  </div>
                )}
                
                {supportTeam && (
                  <div>
                    <h3 className="text-sm font-medium">Support Team</h3>
                    <div className="flex items-center mt-1">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{supportTeam.name}</span>
                    </div>
                  </div>
                )}
                
                {serviceOwner && (
                  <div>
                    <h3 className="text-sm font-medium">Service Owner</h3>
                    <div className="flex items-center mt-1">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{serviceOwner.name}</span>
                    </div>
                  </div>
                )}
                
                {service.documentationUrl && (
                  <div>
                    <h3 className="text-sm font-medium">Documentation</h3>
                    <div className="flex items-center mt-1">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm"
                        onClick={() => window.open(service.documentationUrl, '_blank')}
                      >
                        View Documentation
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium">Created</h3>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{format(new Date(service.createdAt), 'MMM d, yyyy')}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium">Last Updated</h3>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{format(new Date(service.updatedAt), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="business-units">
          <ServiceBusinessUnits serviceId={service.id} />
        </TabsContent>
        
        <TabsContent value="knowledge">
          <ServiceKnowledgeArticles serviceId={service.id} />
        </TabsContent>
        
        <TabsContent value="tickets">
          <ServiceTicketsReport serviceId={service.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceDetail;
