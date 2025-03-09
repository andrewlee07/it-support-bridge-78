
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  AlertOctagon, 
  AlertTriangle, 
  AlertCircle, 
  AlertSquare, 
  Plus, 
  Building,
  X 
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  getAllBusinessUnits, 
  getBusinessUnitsForService, 
  addServiceBusinessUnit, 
  removeServiceBusinessUnit 
} from '@/utils/mockData/businessUnits';
import { ServiceBusinessUnitCriticality } from '@/utils/types/service';

interface ServiceBusinessUnitSelectorProps {
  serviceId: string;
}

const ServiceBusinessUnitSelector: React.FC<ServiceBusinessUnitSelectorProps> = ({ serviceId }) => {
  const [selectedBusinessUnitId, setSelectedBusinessUnitId] = useState<string>('');
  const [selectedCriticality, setSelectedCriticality] = useState<ServiceBusinessUnitCriticality>('Medium');
  const [notes, setNotes] = useState<string>('');
  
  const allBusinessUnits = getAllBusinessUnits();
  const associatedBusinessUnits = getBusinessUnitsForService(serviceId);
  
  // Filter out already associated business units
  const availableBusinessUnits = allBusinessUnits.filter(
    bu => !associatedBusinessUnits.some(associated => associated.id === bu.id)
  );
  
  const handleAddBusinessUnit = () => {
    if (!selectedBusinessUnitId) return;
    
    addServiceBusinessUnit(serviceId, selectedBusinessUnitId, selectedCriticality, notes);
    
    // Reset form
    setSelectedBusinessUnitId('');
    setSelectedCriticality('Medium');
    setNotes('');
  };
  
  const handleRemoveBusinessUnit = (businessUnitId: string) => {
    removeServiceBusinessUnit(serviceId, businessUnitId);
  };
  
  const getCriticalityIcon = (criticality: ServiceBusinessUnitCriticality) => {
    switch (criticality) {
      case 'Critical':
        return <AlertOctagon className="h-4 w-4 text-destructive" />;
      case 'High':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'Medium':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'Low':
        return <AlertSquare className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };
  
  const getCriticalityBgColor = (criticality: ServiceBusinessUnitCriticality) => {
    switch (criticality) {
      case 'Critical':
        return 'bg-destructive/10';
      case 'High':
        return 'bg-orange-500/10';
      case 'Medium':
        return 'bg-amber-500/10';
      case 'Low':
        return 'bg-blue-500/10';
      default:
        return '';
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building className="h-5 w-5" />
            Business Units
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="businessUnit">Business Unit</Label>
                <Select 
                  value={selectedBusinessUnitId} 
                  onValueChange={setSelectedBusinessUnitId}
                >
                  <SelectTrigger id="businessUnit">
                    <SelectValue placeholder="Select Business Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableBusinessUnits.length > 0 ? (
                      availableBusinessUnits.map(bu => (
                        <SelectItem key={bu.id} value={bu.id}>{bu.name}</SelectItem>
                      ))
                    ) : (
                      <SelectItem value="" disabled>No available business units</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="criticality">Criticality</Label>
                <Select 
                  value={selectedCriticality} 
                  onValueChange={(value) => setSelectedCriticality(value as ServiceBusinessUnitCriticality)}
                >
                  <SelectTrigger id="criticality">
                    <SelectValue placeholder="Select Criticality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="lg:col-span-3">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Optional notes about this business unit relationship" 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="resize-none h-20"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleAddBusinessUnit} 
              disabled={!selectedBusinessUnitId || availableBusinessUnits.length === 0}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Business Unit
            </Button>
          </div>
          
          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-medium">Associated Business Units</h3>
            
            {associatedBusinessUnits.length > 0 ? (
              <div className="space-y-2">
                {associatedBusinessUnits.map(bu => (
                  <div 
                    key={bu.id} 
                    className={`flex items-center justify-between p-3 rounded-md ${getCriticalityBgColor(bu.criticality)}`}
                  >
                    <div className="flex items-center gap-2">
                      {getCriticalityIcon(bu.criticality)}
                      <span className="font-medium">{bu.name}</span>
                      {bu.notes && <span className="text-sm text-muted-foreground ml-2">({bu.notes})</span>}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveBusinessUnit(bu.id)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground text-sm italic">
                No business units associated yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceBusinessUnitSelector;
