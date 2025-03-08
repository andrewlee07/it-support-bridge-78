
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SLA } from '@/utils/types/sla';
import SLAForm from './SLAForm';

export interface SLAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (slaData: Partial<SLA>) => void;
  sla?: SLA;
  slaId?: string | null;
  entityType?: 'incident' | 'service-request';
}

export const SLAModal: React.FC<SLAModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  sla,
  slaId,
  entityType
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{slaId ? 'Edit SLA' : 'Create New SLA'}</DialogTitle>
        </DialogHeader>
        <SLAForm 
          defaultValues={sla} 
          onSubmit={onSave}
          onCancel={onClose}
          entityType={entityType}
        />
      </DialogContent>
    </Dialog>
  );
};
