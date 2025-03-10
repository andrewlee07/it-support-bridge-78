
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ServiceList from './ServiceList';
import { useServices } from '@/hooks/useServices';
import { ServiceWithCategory } from '@/utils/types/service';
import { useAuth } from '@/contexts/AuthContext';
import { Settings, Search } from 'lucide-react';

interface ServiceManagementProps {
  inServiceCatalog?: boolean;
}

const ServiceManagement: React.FC<ServiceManagementProps> = ({ 
  inServiceCatalog = true 
}) => {
  const { services, categories, isLoading } = useServices();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceWithCategory | null>(null);
  const { userHasPermission } = useAuth();

  const canConfigureCatalog = userHasPermission('Manage Service Catalog Config');
  const canManageContent = userHasPermission('Manage Service Catalog Content') || canConfigureCatalog;

  if (!canManageContent) {
    return null;
  }

  const handleSelectService = (service: ServiceWithCategory) => {
    setSelectedService(service);
    // In a real app, this would open a modal or navigate to edit page
    console.log(`Selected service: ${service.name}`);
  };

  const handleEditService = (serviceId: string) => {
    const service = services?.find(s => s.id === serviceId) || null;
    setSelectedService(service);
    // In a real app, this would open a modal or navigate to edit page
    console.log(`Editing service: ${serviceId}`);
  };

  return (
    <>
      {inServiceCatalog && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Manage Services
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Service Management</DialogTitle>
              <DialogDescription>
                {canConfigureCatalog 
                  ? "Manage services and their details in the catalog" 
                  : "Update service details and status"}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <ServiceList 
                services={services || []}
                categories={categories}
                onEditService={handleSelectService}
                onAddService={canConfigureCatalog ? () => console.log("Add service") : undefined}
                isLoading={isLoading}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {!inServiceCatalog && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Service Management</h2>
            {canConfigureCatalog && (
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/admin/service-catalogue-configuration'}
              >
                <Settings className="h-4 w-4 mr-2" />
                Advanced Configuration
              </Button>
            )}
          </div>
          <ServiceList 
            services={services || []}
            categories={categories}
            onEditService={handleSelectService}
            onAddService={canConfigureCatalog ? () => console.log("Add service") : undefined}
            isLoading={isLoading}
          />
        </div>
      )}

      {/* Service Edit Dialog - in a real app, this would be a separate component */}
      {selectedService && (
        <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Service: {selectedService.name}</DialogTitle>
              <DialogDescription>
                Update service details and information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Service Name
                </label>
                <Input id="name" defaultValue={selectedService.name} 
                  disabled={!canConfigureCatalog} />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Select disabled={!canConfigureCatalog} defaultValue={selectedService.categoryId}>
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
                <textarea 
                  id="description" 
                  defaultValue={selectedService.description}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select defaultValue={selectedService.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="supportContact" className="text-sm font-medium">
                  Support Contact
                </label>
                <Select defaultValue={selectedService.supportContactId || "none"}>
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
                <Select defaultValue={selectedService.serviceOwnerId || "none"}>
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
                <Select defaultValue={selectedService.supportHours || "not-specified"}>
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
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedService(null)}>
                Cancel
              </Button>
              <Button onClick={() => setSelectedService(null)}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ServiceManagement;
