
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ClientContract, ServiceWithCategory } from '@/utils/types/service';
import { Check, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ClientContractDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contract: ClientContract) => void;
  contract: ClientContract | null;
  businessServices: ServiceWithCategory[];
}

const ClientContractDialog: React.FC<ClientContractDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  contract,
  businessServices
}) => {
  const [name, setName] = useState('');
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState<'active' | 'pending' | 'completed' | 'terminated'>('active');
  const [selectedBusinessServices, setSelectedBusinessServices] = useState<string[]>([]);
  
  // Initialize form when contract changes
  useEffect(() => {
    if (contract) {
      setName(contract.name);
      setClientName(contract.clientName);
      setDescription(contract.description);
      setStartDate(new Date(contract.startDate).toISOString().split('T')[0]);
      setEndDate(contract.endDate ? new Date(contract.endDate).toISOString().split('T')[0] : '');
      setStatus(contract.status);
      setSelectedBusinessServices(contract.businessServiceIds || []);
    } else {
      // Reset form for new contract
      setName('');
      setClientName('');
      setDescription('');
      setStartDate(new Date().toISOString().split('T')[0]);
      setEndDate('');
      setStatus('active');
      setSelectedBusinessServices([]);
    }
  }, [contract]);
  
  const handleSubmit = () => {
    const contractData: ClientContract = {
      id: contract?.id || `contract-${uuidv4().substring(0, 8)}`,
      name,
      clientName,
      description,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      status,
      businessServiceIds: selectedBusinessServices,
      createdAt: contract?.createdAt || new Date(),
      updatedAt: new Date()
    };
    
    onSave(contractData);
  };
  
  const toggleBusinessService = (serviceId: string) => {
    setSelectedBusinessServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{contract ? 'Edit Client Contract' : 'Create Client Contract'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Contract Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter contract name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter client name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (Optional)</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter contract description"
                rows={3}
              />
            </div>
            
            <div className="space-y-2 col-span-2">
              <Label>Business Services</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Select the business services that support this client contract
              </p>
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                {businessServices.map(service => (
                  <div
                    key={service.id}
                    className={`p-2 border rounded-md flex items-center justify-between cursor-pointer ${
                      selectedBusinessServices.includes(service.id) 
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => toggleBusinessService(service.id)}
                  >
                    <span className="text-sm font-medium">{service.name}</span>
                    {selectedBusinessServices.includes(service.id) ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
              
              {businessServices.length === 0 && (
                <div className="text-center p-4 border border-dashed rounded-md">
                  <p className="text-muted-foreground">
                    No business services available. Create business services first.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!name || !clientName || !startDate || !description || selectedBusinessServices.length === 0}
          >
            {contract ? 'Update Contract' : 'Create Contract'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientContractDialog;
