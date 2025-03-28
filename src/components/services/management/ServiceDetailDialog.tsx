
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ServiceWithCategory, ServiceCategory } from '@/utils/types/service';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceRelationshipManager from '../relationships/ServiceRelationshipManager';
import { getServiceWithRelationships } from '@/utils/mockData/services/servicesData';
import { toast } from 'sonner';

interface ServiceDetailDialogProps {
  service: ServiceWithCategory | null;
  categories: ServiceCategory[] | null;
  onClose: () => void;
  canConfigureCatalog: boolean;
  availableServices?: ServiceWithCategory[];
}

const ServiceDetailDialog: React.FC<ServiceDetailDialogProps> = ({
  service,
  categories,
  onClose,
  canConfigureCatalog,
  availableServices = []
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const [serviceWithRelationships, setServiceWithRelationships] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  useEffect(() => {
    if (service) {
      const enrichedService = getServiceWithRelationships(service.id);
      setServiceWithRelationships(enrichedService);
    }
  }, [service]);
  
  if (!service) return null;
  
  const handleUpdateService = () => {
    setIsUpdating(true);
    // In a real app, call API to update the service
    setTimeout(() => {
      setIsUpdating(false);
      toast.success('Service updated successfully');
      onClose();
    }, 500);
  };
  
  const handleUpdateRelationships = () => {
    // Refresh the service with relationships
    if (service) {
      const enrichedService = getServiceWithRelationships(service.id);
      setServiceWithRelationships(enrichedService);
    }
  };
  
  const getServiceTypeLabel = () => {
    if (!serviceWithRelationships?.serviceType) return null;
    
    return (
      <Badge variant="outline" className="ml-2">
        {serviceWithRelationships.serviceType === 'technical' ? 'Technical Service' : 'Business Service'}
      </Badge>
    );
  };

  return (
    <Dialog open={!!service} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center">
              Service: {service.name}
              {getServiceTypeLabel()}
            </DialogTitle>
          </div>
          <DialogDescription>
            Service ID: {service.id} | Category: {service.category.name}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Service Details</TabsTrigger>
            <TabsTrigger value="relationships">Relationships</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h3 className="text-lg font-medium">Description</h3>
                <Textarea 
                  readOnly={!canConfigureCatalog}
                  className="mt-2"
                  rows={4}
                  defaultValue={service.description}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Status</h3>
                  <Select disabled={!canConfigureCatalog} defaultValue={service.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="deprecated">Deprecated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Category</h3>
                  <Select disabled={!canConfigureCatalog} defaultValue={service.categoryId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Documentation URL</h3>
                <Input 
                  readOnly={!canConfigureCatalog}
                  defaultValue={service.documentationUrl || ''}
                  placeholder="https://docs.example.com/service"
                />
              </div>
            </div>
            
            {canConfigureCatalog && (
              <div className="flex justify-end">
                <Button onClick={handleUpdateService} disabled={isUpdating}>
                  {isUpdating ? 'Updating...' : 'Update Service'}
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="relationships" className="space-y-4 pt-4">
            {serviceWithRelationships && (
              <ServiceRelationshipManager 
                service={serviceWithRelationships}
                availableServices={availableServices}
                canEdit={canConfigureCatalog}
                onUpdateRelationships={handleUpdateRelationships}
              />
            )}
          </TabsContent>
          
          <TabsContent value="support" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Support Hours</h3>
                <Select disabled={!canConfigureCatalog} defaultValue={service.supportHours}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select support hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Business Hours (9am-5pm)">Business Hours (9am-5pm)</SelectItem>
                    <SelectItem value="Extended Hours (8am-8pm)">Extended Hours (8am-8pm)</SelectItem>
                    <SelectItem value="24/7 Support">24/7 Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Support Team</h3>
                <Input 
                  readOnly={!canConfigureCatalog}
                  defaultValue={service.supportTeamId}
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Support Contact</h3>
                <Input 
                  readOnly={!canConfigureCatalog}
                  defaultValue={service.supportContactId}
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Service Owner</h3>
                <Input 
                  readOnly={!canConfigureCatalog}
                  defaultValue={service.serviceOwnerId}
                />
              </div>
            </div>
            
            {canConfigureCatalog && (
              <div className="flex justify-end">
                <Button onClick={handleUpdateService} disabled={isUpdating}>
                  {isUpdating ? 'Updating...' : 'Update Support Info'}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailDialog;
