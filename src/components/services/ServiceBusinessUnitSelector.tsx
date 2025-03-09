
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle } from 'lucide-react';
import { BusinessUnit, ServiceBusinessUnitCriticality } from '@/utils/types/service';
import { SERVICE_BUSINESS_UNIT_CRITICALITY } from '@/utils/types/service';

interface ServiceBusinessUnitSelectorProps {
  businessUnits: BusinessUnit[];
  selectedBusinessUnits: (BusinessUnit & { criticality: ServiceBusinessUnitCriticality, notes?: string })[];
  onAdd: (businessUnitId: string, criticality: ServiceBusinessUnitCriticality, notes?: string) => void;
  onRemove: (businessUnitId: string) => void;
  onUpdate: (businessUnitId: string, criticality: ServiceBusinessUnitCriticality, notes?: string) => void;
}

const ServiceBusinessUnitSelector: React.FC<ServiceBusinessUnitSelectorProps> = ({
  businessUnits,
  selectedBusinessUnits,
  onAdd,
  onRemove,
  onUpdate
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBusinessUnitId, setSelectedBusinessUnitId] = useState<string>('');
  const [criticality, setCriticality] = useState<ServiceBusinessUnitCriticality>('Medium');
  const [notes, setNotes] = useState<string>('');

  const handleAddBusinessUnit = () => {
    if (selectedBusinessUnitId) {
      onAdd(selectedBusinessUnitId, criticality, notes);
      setIsDialogOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedBusinessUnitId('');
    setCriticality('Medium');
    setNotes('');
  };

  const availableBusinessUnits = businessUnits.filter(
    bu => !selectedBusinessUnits.some(selected => selected.id === bu.id)
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Business Units</h3>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          disabled={availableBusinessUnits.length === 0}
        >
          Add Business Unit
        </Button>
      </div>

      {selectedBusinessUnits.length === 0 ? (
        <div className="text-center p-4 border rounded-md bg-muted/30">
          <p className="text-muted-foreground">No business units associated with this service</p>
        </div>
      ) : (
        <div className="space-y-3">
          {selectedBusinessUnits.map(bu => (
            <div 
              key={bu.id} 
              className="p-3 border rounded-md flex flex-col gap-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{bu.name}</h4>
                  <p className="text-sm text-muted-foreground">{bu.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {bu.criticality === 'Critical' && (
                      <AlertTriangle className="h-4 w-4 text-destructive mr-1" />
                    )}
                    <span 
                      className={`text-sm font-medium px-2 py-1 rounded ${
                        bu.criticality === 'Critical' 
                          ? 'bg-destructive/15 text-destructive' 
                          : bu.criticality === 'High' 
                            ? 'bg-orange-500/15 text-orange-500' 
                            : bu.criticality === 'Medium' 
                              ? 'bg-amber-500/15 text-amber-500' 
                              : 'bg-blue-500/15 text-blue-500'
                      }`}
                    >
                      {bu.criticality}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onRemove(bu.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
              
              {bu.notes && (
                <div className="bg-muted/30 p-2 rounded-sm text-sm">
                  <span className="font-medium">Notes:</span> {bu.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Business Unit</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="business-unit">Business Unit</Label>
              <Select 
                value={selectedBusinessUnitId} 
                onValueChange={setSelectedBusinessUnitId}
              >
                <SelectTrigger id="business-unit">
                  <SelectValue placeholder="Select a business unit" />
                </SelectTrigger>
                <SelectContent>
                  {availableBusinessUnits.map(bu => (
                    <SelectItem key={bu.id} value={bu.id}>
                      {bu.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="criticality">Criticality</Label>
              <Select 
                value={criticality} 
                onValueChange={(value) => setCriticality(value as ServiceBusinessUnitCriticality)}
              >
                <SelectTrigger id="criticality">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_BUSINESS_UNIT_CRITICALITY.map(level => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific considerations for this business unit"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddBusinessUnit} disabled={!selectedBusinessUnitId}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceBusinessUnitSelector;
