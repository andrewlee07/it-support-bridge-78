
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SLAForm from './SLAForm';
import { SLA } from '@/utils/types';
import { toast } from 'sonner';

interface SLAModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: SLA;
}

export const SLAModal: React.FC<SLAModalProps> = ({ isOpen, onClose, initialData }) => {
  const handleSubmit = (data: Partial<SLA>) => {
    console.log('SLA submitted:', data);
    // Here you would typically save the SLA to the backend
    
    // Simulate success
    toast.success(initialData ? 'SLA updated successfully' : 'SLA created successfully');
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit SLA' : 'Create New SLA'}</DialogTitle>
        </DialogHeader>
        <SLAForm 
          initialData={initialData} 
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
