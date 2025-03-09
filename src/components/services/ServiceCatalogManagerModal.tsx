
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ServiceWithCategory, ServiceCategory } from '@/utils/types/service';
import ServiceList from '@/components/services/ServiceList';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ServiceCatalogManagerModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  services: ServiceWithCategory[];
  categories: ServiceCategory[];
}

const ServiceCatalogManagerModal: React.FC<ServiceCatalogManagerModalProps> = ({
  isOpen,
  setIsOpen,
  services,
  categories,
}) => {
  const { userHasPermission } = useAuth();
  const [selectedService, setSelectedService] = useState<ServiceWithCategory | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEditService = (service: ServiceWithCategory) => {
    setSelectedService(service);
    setIsEditing(true);
  };

  const handleSaveService = () => {
    // In a real implementation, this would call an API to update the service
    toast.success(`Service "${selectedService?.name}" updated successfully`);
    setIsEditing(false);
    setSelectedService(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedService(null);
  };

  const handleToggleStatus = (service: ServiceWithCategory) => {
    // In a real implementation, this would call an API to update the service status
    const newStatus = service.status === 'active' ? 'inactive' : 'active';
    toast.success(`Service "${service.name}" marked as ${newStatus}`);
  };

  const hasConfigPermission = userHasPermission('manage_service_catalog_config');

  // If editing, show the edit form
  if (isEditing && selectedService) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Service: {selectedService.name}</DialogTitle>
            <DialogDescription>
              Update service details or modify its status
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md" 
                  value={selectedService.name}
                  readOnly={!hasConfigPermission}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select 
                  className="w-full px-3 py-2 border rounded-md"
                  value={selectedService.categoryId}
                  disabled={!hasConfigPermission}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea 
                className="w-full px-3 py-2 border rounded-md h-24" 
                value={selectedService.description}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select 
                className="w-full px-3 py-2 border rounded-md"
                value={selectedService.status}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleSaveService}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Service Catalog Management</DialogTitle>
          <DialogDescription>
            {hasConfigPermission 
              ? "Edit service details or mark services as active/inactive" 
              : "As a Service Catalog Manager, you can edit service details and mark services as active/inactive"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <ServiceList 
            services={services} 
            categories={categories}
            onEditService={handleEditService}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceCatalogManagerModal;
