
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  ServiceWithCategory, 
  ServiceRelationship, 
  ServiceWithRelationships 
} from '@/utils/types/service';
import { Label } from '@/components/ui/label';

interface ServiceRelationshipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceWithRelationships;
  availableServices: ServiceWithCategory[];
  onSubmit: (relationship: Omit<ServiceRelationship, 'id'>) => void;
}

const ServiceRelationshipDialog: React.FC<ServiceRelationshipDialogProps> = ({
  isOpen,
  onClose,
  service,
  availableServices,
  onSubmit
}) => {
  const [relationshipType, setRelationshipType] = useState<'parent-child' | 'technical-business' | 'related-to'>('related-to');
  const [targetServiceId, setTargetServiceId] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [strength, setStrength] = useState<'weak' | 'medium' | 'strong'>('medium');
  const [direction, setDirection] = useState<'source' | 'target'>('source');
  
  const handleSubmit = () => {
    // Determine source and target based on selected direction and relationship type
    let sourceServiceId: string;
    let targetServiceId_: string;
    
    if (relationshipType === 'parent-child') {
      // If we're setting this service as a parent
      if (direction === 'target') {
        sourceServiceId = targetServiceId;
        targetServiceId_ = service.id;
      } else {
        // If we're setting this service as a child
        sourceServiceId = service.id;
        targetServiceId_ = targetServiceId;
      }
    } else {
      // For other relationship types
      if (direction === 'source') {
        sourceServiceId = service.id;
        targetServiceId_ = targetServiceId;
      } else {
        sourceServiceId = targetServiceId;
        targetServiceId_ = service.id;
      }
    }
    
    onSubmit({
      sourceServiceId,
      targetServiceId: targetServiceId_,
      relationshipType,
      description,
      strength
    });
    
    // Reset form
    setRelationshipType('related-to');
    setTargetServiceId('');
    setDescription('');
    setStrength('medium');
    setDirection('source');
  };
  
  // Filter the available services based on relationship type
  const filteredAvailableServices = availableServices.filter(s => {
    // Don't include the current service
    if (s.id === service.id) return false;
    
    // For parent-child relationships, only allow same service type
    if (relationshipType === 'parent-child') {
      return s.serviceType === service.serviceType;
    }
    
    // For technical-business relationships
    if (relationshipType === 'technical-business') {
      // If the current service is technical, only show business services
      if (service.serviceType === 'technical') {
        return s.serviceType === 'business';
      }
      // If the current service is business, only show technical services
      return s.serviceType === 'technical';
    }
    
    // For other relationship types, show all services
    return true;
  });
  
  // Get relationship type label based on service types
  const getRelationshipTypeLabel = () => {
    if (relationshipType === 'parent-child') {
      return direction === 'source' ? 
        "Set as child of selected service" : 
        "Set as parent of selected service";
    }
    
    if (relationshipType === 'technical-business') {
      if (service.serviceType === 'technical') {
        return direction === 'source' ? 
          "This technical service supports selected business service" :
          "Selected technical service supports this business service";
      } else {
        return direction === 'source' ? 
          "This business service is supported by selected technical service" :
          "Selected business service is supported by this technical service";
      }
    }
    
    return direction === 'source' ? 
      "This service relates to selected service" : 
      "Selected service relates to this service";
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Service Relationship</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Relationship Type</Label>
            <Select
              value={relationshipType}
              onValueChange={(value) => setRelationshipType(value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select relationship type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parent-child">Parent/Child</SelectItem>
                <SelectItem value="technical-business">Technical/Business</SelectItem>
                <SelectItem value="related-to">Related Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Relationship Direction</Label>
            <Select
              value={direction}
              onValueChange={(value) => setDirection(value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="source">{service.name} is the source</SelectItem>
                <SelectItem value="target">{service.name} is the target</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">{getRelationshipTypeLabel()}</p>
          </div>
          
          <div className="space-y-2">
            <Label>Related Service</Label>
            <Select
              value={targetServiceId}
              onValueChange={setTargetServiceId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {filteredAvailableServices.map(service => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} ({service.serviceType})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Relationship Strength</Label>
            <Select
              value={strength}
              onValueChange={(value) => setStrength(value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select strength" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weak">Weak</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="strong">Strong</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Description (Optional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the relationship"
              className="min-h-[80px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!targetServiceId}>Create Relationship</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRelationshipDialog;
