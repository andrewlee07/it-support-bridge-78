
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ExternalLink, Briefcase, Building, Filter } from 'lucide-react';
import { ClientContract, ServiceWithCategory } from '@/utils/types/service';
import { getClientContracts, getBusinessServicesForContract } from '@/utils/mockData/services/servicesData';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ClientContractDialog from './ClientContractDialog';
import { toast } from 'sonner';

interface ClientContractListProps {
  businessServices: ServiceWithCategory[];
}

const ClientContractList: React.FC<ClientContractListProps> = ({ businessServices }) => {
  const [contracts, setContracts] = useState<ClientContract[]>(getClientContracts());
  const [isContractDialogOpen, setIsContractDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<ClientContract | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'completed' | 'terminated'>('all');

  const filteredContracts = contracts.filter(contract => {
    if (statusFilter === 'all') return true;
    return contract.status === statusFilter;
  });

  const handleCreateContract = () => {
    setSelectedContract(null);
    setIsContractDialogOpen(true);
  };

  const handleEditContract = (contract: ClientContract) => {
    setSelectedContract(contract);
    setIsContractDialogOpen(true);
  };

  const handleSaveContract = (contract: ClientContract) => {
    // In a real app, this would call an API
    setContracts(prevContracts => {
      if (selectedContract) {
        // Update existing contract
        return prevContracts.map(c => c.id === selectedContract.id ? contract : c);
      } else {
        // Create new contract
        return [...prevContracts, contract];
      }
    });
    
    setIsContractDialogOpen(false);
    toast.success(selectedContract ? 'Contract updated successfully' : 'Contract created successfully');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Client Contracts</h2>
          <p className="text-muted-foreground">Manage client contracts that are supported by business services</p>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter: {statusFilter === 'all' ? 'All Statuses' : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Only`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                Active Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                Pending Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('completed')}>
                Completed Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('terminated')}>
                Terminated Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={handleCreateContract}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contract
          </Button>
        </div>
      </div>
      
      {filteredContracts.length === 0 ? (
        <Card>
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <Briefcase className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No {statusFilter !== 'all' ? statusFilter : ''} contracts found</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding client contracts that are supported by your business services.
            </p>
            <Button onClick={handleCreateContract}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Contract
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContracts.map(contract => (
            <Card key={contract.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant={contract.status === 'active' ? 'default' : 
                      contract.status === 'pending' ? 'secondary' : 
                      contract.status === 'completed' ? 'outline' : 'destructive'}>
                      {contract.status}
                    </Badge>
                    <CardTitle className="mt-2">{contract.name}</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditContract(contract)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="flex items-center">
                  <Building className="h-4 w-4 mr-1 text-muted-foreground" />
                  {contract.clientName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">Start: </span>
                  {new Date(contract.startDate).toLocaleDateString()}
                  {contract.endDate && (
                    <>
                      <span className="font-medium ml-2">End: </span>
                      {new Date(contract.endDate).toLocaleDateString()}
                    </>
                  )}
                </div>
                <p className="text-sm line-clamp-2 mb-3">{contract.description}</p>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Supported by:</p>
                  <div className="flex flex-wrap gap-1">
                    {getBusinessServicesForContract(contract.id).map(service => (
                      <Badge key={service.id} variant="outline" className="text-xs">
                        {service.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <ClientContractDialog
        isOpen={isContractDialogOpen}
        onClose={() => setIsContractDialogOpen(false)}
        onSave={handleSaveContract}
        contract={selectedContract}
        businessServices={businessServices}
      />
    </div>
  );
};

export default ClientContractList;
