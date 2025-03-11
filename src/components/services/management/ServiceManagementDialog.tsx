
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import ServiceList from '../ServiceList';
import { ServiceWithCategory, ServiceCategory } from '@/utils/types/service';

interface ServiceManagementDialogProps {
  services: ServiceWithCategory[] | null;
  categories: ServiceCategory[] | null;
  onEditService: (service: ServiceWithCategory) => void;
  canConfigureCatalog: boolean;
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddService?: () => void;
}

const ServiceManagementDialog: React.FC<ServiceManagementDialogProps> = ({
  services,
  categories,
  onEditService,
  canConfigureCatalog,
  isLoading,
  isOpen,
  setIsOpen,
  onAddService
}) => {
  return (
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
            categories={categories || []}
            onEditService={onEditService}
            onAddService={canConfigureCatalog ? onAddService : undefined}
            isLoading={isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceManagementDialog;
