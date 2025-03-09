
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ServiceWithCategory, ServiceCategory } from '@/utils/types/service';
import ServiceList from '@/components/services/ServiceList';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { logAdminAction } from '@/utils/auditLogging';
import { encryptObject, decryptObject } from '@/utils/encryption';

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
  const { userHasPermission, user } = useAuth();
  const [selectedService, setSelectedService] = useState<ServiceWithCategory | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<ServiceWithCategory>>({});
  
  const handleEditService = (service: ServiceWithCategory) => {
    // Decrypt any encrypted fields (in a real app with actual encrypted data)
    const decryptedService = decryptObject(service) as ServiceWithCategory;
    
    setSelectedService(decryptedService);
    setEditFormData(decryptedService);
    setIsEditing(true);
    
    // Log the audit action
    logAdminAction({
      user,
      entityId: service.id,
      entityType: "service",
      action: 'view_edit_form',
      details: `Opened edit form for service: ${service.name}`
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveService = () => {
    if (!selectedService || !editFormData) return;
    
    // In a real implementation, this would call an API to update the service
    // Encrypt sensitive data before sending to the server
    const dataToSave = encryptObject(editFormData);
    
    toast.success(`Service "${selectedService?.name}" updated successfully`);
    
    // Log the update action with before/after values
    logAdminAction({
      user,
      entityId: selectedService.id,
      entityType: "service",
      action: 'update_service',
      details: `Updated service: ${selectedService.name}`,
      oldValue: JSON.stringify(selectedService),
      newValue: JSON.stringify(editFormData)
    });
    
    setIsEditing(false);
    setSelectedService(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedService(null);
    setEditFormData({});
  };

  const handleToggleStatus = (service: ServiceWithCategory) => {
    // In a real implementation, this would call an API to update the service status
    const newStatus = service.status === 'active' ? 'inactive' : 'active';
    toast.success(`Service "${service.name}" marked as ${newStatus}`);
    
    // Log the status change
    logAdminAction({
      user,
      entityId: service.id,
      entityType: "service",
      action: 'toggle_service_status',
      details: `Changed service status from ${service.status} to ${newStatus}`,
      oldValue: service.status,
      newValue: newStatus
    });
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
                  name="name"
                  className="w-full px-3 py-2 border rounded-md" 
                  value={editFormData.name || ''}
                  onChange={handleInputChange}
                  readOnly={!hasConfigPermission}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select 
                  name="categoryId"
                  className="w-full px-3 py-2 border rounded-md"
                  value={editFormData.categoryId || ''}
                  onChange={handleInputChange}
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
                name="description"
                className="w-full px-3 py-2 border rounded-md h-24" 
                value={editFormData.description || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select 
                name="status"
                className="w-full px-3 py-2 border rounded-md"
                value={editFormData.status || ''}
                onChange={handleInputChange}
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
