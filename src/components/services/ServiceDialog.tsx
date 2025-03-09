
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Service, ServiceCategory } from '@/utils/types/service';
import ServiceForm, { ServiceFormValues } from './ServiceForm';

interface ServiceDialogProps {
  isOpen: boolean;
  service?: Service;
  categories: ServiceCategory[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ServiceFormValues) => void;
  isSubmitting?: boolean;
}

const ServiceDialog: React.FC<ServiceDialogProps> = ({
  isOpen,
  service,
  categories,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}) => {
  const isEditing = !!service;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the details of this service.'
              : 'Create a new service in the IT Service Catalog.'}
          </DialogDescription>
        </DialogHeader>
        
        <ServiceForm
          service={service}
          categories={categories}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;
