
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import AnnouncementForm from './AnnouncementForm';
import { AnnouncementFormValues } from './announcementSchema';
import { createAnnouncementFromIncident } from '@/utils/mockData/announcements';
import { useToast } from '@/hooks/use-toast';
import { Megaphone } from 'lucide-react';
import { Ticket } from '@/utils/types';

interface CreateAnnouncementFromIncidentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incident: Ticket;
  onSuccess?: () => void;
}

const CreateAnnouncementFromIncidentDialog: React.FC<CreateAnnouncementFromIncidentDialogProps> = ({
  open,
  onOpenChange,
  incident,
  onSuccess
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (data: AnnouncementFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await createAnnouncementFromIncident(incident.id, {
        title: data.title || `Service Disruption: ${incident.title}`,
        content: data.content,
        status: data.status,
        priority: data.priority,
        type: data.type,
        expiresAt: data.expiresAt,
        audienceGroups: data.audienceGroups,
        createdBy: 'user-1', // In a real app, use the current user ID
        creatorName: 'System Administrator', // In a real app, use the current user name
      });
      
      if (response.success) {
        toast({
          title: 'Announcement Created',
          description: 'The announcement has been created successfully from the incident.',
        });
        
        if (onSuccess) {
          onSuccess();
        }
        
        onOpenChange(false);
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to create announcement',
          variant: 'destructive',
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Pre-fill content from incident
  const initialData = {
    title: `Service Disruption: ${incident.title}`,
    content: `<p><strong>Incident Information:</strong></p>
<p>We are currently experiencing an issue with our services. Our team is actively working on resolving this as quickly as possible.</p>
<p><strong>Affected Service:</strong> ${incident.serviceId || 'Multiple Services'}</p>
<p><strong>Impact:</strong> ${incident.description || 'Service disruption'}</p>
<p>We apologize for any inconvenience this may cause. We will provide updates as more information becomes available.</p>`,
    status: 'active',
    priority: 'high',
    type: 'outage',
    relatedIncidentId: incident.id,
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Megaphone className="mr-2 h-5 w-5" />
            Create Announcement from Incident
          </DialogTitle>
          <DialogDescription>
            Create a public announcement based on this incident. This will be visible to users in the portal.
          </DialogDescription>
        </DialogHeader>
        
        <AnnouncementForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          incidentId={incident.id}
        />
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAnnouncementFromIncidentDialog;
