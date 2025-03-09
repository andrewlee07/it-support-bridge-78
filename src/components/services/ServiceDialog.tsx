
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ServiceForm, { ServiceFormProps } from './ServiceForm';
import { Service, ServiceCategory } from '@/utils/types/service';

interface ServiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  service?: Service;
  categories: ServiceCategory[];
  onSubmit: (values: any) => void;
  isSubmitting: boolean;
}

const ServiceDialog: React.FC<ServiceDialogProps> = ({
  isOpen,
  onClose,
  service,
  categories,
  onSubmit,
  isSubmitting
}) => {
  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  const title = service ? 'Edit Service' : 'Add New Service';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ServiceForm
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          initialValues={service}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;
