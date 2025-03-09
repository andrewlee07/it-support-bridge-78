
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Clock, Users, Calendar, Check, FileText, Link as LinkIcon } from 'lucide-react';
import { getServiceById } from '@/utils/mockData/services';
import { ServiceWithCategory } from '@/utils/types/service';
import { Separator } from '@/components/ui/separator';
import { useServices } from '@/hooks/useServices';

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceWithCategory | null>(null);
  const [relatedServices, setRelatedServices] = useState<ServiceWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { services } = useServices();
  
  useEffect(() => {
    if (!serviceId) {
      navigate('/service-catalog');
      return;
    }
    
    const fetchService = async () => {
      setLoading(true);
      try {
        const foundService = getServiceById(serviceId);
        
        if (foundService) {
          setService(foundService);
          
          // For now, simulate related services with other services from the same category
          // In a real implementation, this would use actual relationship data
          if (services) {
            const relatedServs = services
              .filter(s => s.id !== serviceId && s.categoryId === foundService.categoryId)
              .slice(0, 3);
            setRelatedServices(relatedServs);
          }
        } else {
          console.error(`Service with ID ${serviceId} not found`);
        }
      } catch (error) {
        console.error('Error fetching service details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchService();
  }, [serviceId, navigate, services]);

  if (loading) {
    return (
      <PageTransition>
        <div className="container mx-auto py-6 space-y-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!service) {
    return (
      <PageTransition>
        <div className="container mx-auto py-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Not Found</CardTitle>
              <CardDescription>
                The service you're looking for doesn't exist or has been removed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/service-catalog')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Service Catalog
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto py-6 space-y-8">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/service-catalog')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Catalog
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="text-sm breadcrumbs text-muted-foreground">
            <span>Service Catalog</span>
            <span className="mx-2">/</span>
            <span>{service.category.name}</span>
            <span className="mx-2">/</span>
            <span>{service.name}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="w-full md:w-2/3 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{service.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {service.category.name}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={service.status === 'active' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    <span 
                      className={`mr-1.5 inline-block h-2 w-2 rounded-full ${
                        service.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                      }`} 
                    />
                    {service.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="support">Support</TabsTrigger>
                    <TabsTrigger value="documentation">Documentation</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="pt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Service Level</h3>
                        <p>{service.price || 'Not specified'}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Requires Approval</h3>
                        <p>{service.approvalRequired ? 'Yes' : 'No'}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Service Owner</h3>
                        <p>{service.serviceOwnerId ? 'John Smith' : 'Not assigned'}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                        <p>{new Date(service.updatedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button>
                        Request This Service
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="support" className="pt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h3 className="font-medium">Support Hours</h3>
                          <p className="text-muted-foreground">{service.supportHours || 'Not specified'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h3 className="font-medium">Support Team</h3>
                          <p className="text-muted-foreground">{service.supportTeamId ? 'IT Support Team' : 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button variant="outline">
                        Contact Support
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="documentation" className="pt-4 space-y-4">
                    {service.documentationUrl ? (
                      <div className="flex items-start space-x-3">
                        <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h3 className="font-medium">Documentation</h3>
                          <a 
                            href={service.documentationUrl} 
                            className="text-blue-600 hover:underline"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            View Documentation
                          </a>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic">No documentation available for this service.</p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Related Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                {relatedServices.length > 0 ? (
                  <div className="space-y-4">
                    {relatedServices.map(relatedService => (
                      <div key={relatedService.id} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">{relatedService.name}</h4>
                          <p className="text-sm text-muted-foreground">{relatedService.description.substring(0, 60)}...</p>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto mt-1" 
                            onClick={() => navigate(`/service-catalog/${relatedService.id}`)}
                          >
                            View details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">No related services found.</p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Requests (Last 30 days)</h4>
                    <p className="text-xl font-semibold">24</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Average Fulfillment Time</h4>
                    <p className="text-xl font-semibold">1.5 days</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Satisfaction Rating</h4>
                    <div className="flex items-center">
                      <p className="text-xl font-semibold">4.2/5</p>
                      <div className="ml-2 flex">
                        {[1, 2, 3, 4].map(i => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ServiceDetail;
