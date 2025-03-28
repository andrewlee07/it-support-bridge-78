
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
    <Dialog open={!!service} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center">
            <DialogTitle>Service: {service.name}</DialogTitle>
            {getServiceTypeLabel()}
          </div>
          <DialogDescription>
            Manage service details, relationships, and client contracts
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="relationships">Relationships</TabsTrigger>
            {serviceWithRelationships?.serviceType === 'business' && (
              <TabsTrigger value="contracts">Client Contracts</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="details">
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Service Name
                </label>
                <Input id="name" defaultValue={service.name} 
                  disabled={!canConfigureCatalog} />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
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
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea 
                  id="description" 
                  defaultValue={service.description}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select defaultValue={service.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="deprecated">Deprecated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="serviceType" className="text-sm font-medium">
                  Service Type
                </label>
                <Select 
                  defaultValue={serviceWithRelationships?.serviceType || 'technical'}
                  disabled={!canConfigureCatalog}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Service</SelectItem>
                    <SelectItem value="business">Business Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="supportContact" className="text-sm font-medium">
                  Support Contact
                </label>
                <Select defaultValue={service.supportContactId || "none"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select support contact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="user-1">John Doe</SelectItem>
                    <SelectItem value="user-2">Jane Smith</SelectItem>
                    <SelectItem value="user-4">Morgan Lee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="serviceOwner" className="text-sm font-medium">
                  Service Owner
                </label>
                <Select defaultValue={service.serviceOwnerId || "none"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="user-1">John Doe</SelectItem>
                    <SelectItem value="user-5">Casey Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="supportHours" className="text-sm font-medium">
                  Support Hours
                </label>
                <Select defaultValue={service.supportHours || "not-specified"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select support hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-specified">Not specified</SelectItem>
                    <SelectItem value="Business Hours (9am-5pm)">Business Hours (9am-5pm)</SelectItem>
                    <SelectItem value="Extended Hours (8am-8pm)">Extended Hours (8am-8pm)</SelectItem>
                    <SelectItem value="24/7 Support">24/7 Support</SelectItem>
                    <SelectItem value="Limited Support">Limited Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="relationships">
            {serviceWithRelationships ? (
              <ServiceRelationshipManager 
                service={serviceWithRelationships}
                onUpdateRelationships={handleUpdateRelationships}
                availableServices={availableServices.filter(s => s.id !== service.id)}
              />
            ) : (
              <div className="text-center p-4">
                <p className="text-muted-foreground">Loading relationships...</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="contracts">
            {serviceWithRelationships?.serviceType === 'business' ? (
              <div className="py-4">
                <h3 className="text-lg font-medium mb-2">Client Contracts</h3>
                {/* This would normally display contracts associated with this business service */}
                <p className="text-muted-foreground">
                  Manage client contracts from the Contracts tab in Service Catalog Management.
                </p>
              </div>
            ) : null}
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleUpdateService} disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailDialog;
