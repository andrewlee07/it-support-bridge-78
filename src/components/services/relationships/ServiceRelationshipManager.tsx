
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Link2, Network } from 'lucide-react';
import { 
  ServiceWithCategory, 
  ServiceRelationship,
  ServiceWithRelationships
} from '@/utils/types/service';
import { getServiceRelationships } from '@/utils/mockData/services/servicesData';
import ServiceRelationshipDialog from './ServiceRelationshipDialog';
import RelationshipItem from './RelationshipItem';
import { toast } from 'sonner';

interface ServiceRelationshipManagerProps {
  service: ServiceWithRelationships;
  onUpdateRelationships: () => void;
  availableServices: ServiceWithCategory[];
}

const ServiceRelationshipManager: React.FC<ServiceRelationshipManagerProps> = ({
  service,
  onUpdateRelationships,
  availableServices
}) => {
  const [activeTab, setActiveTab] = useState<'parent-child' | 'technical-business' | 'all'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const parentChildRelationships = service.relationships.filter(
    rel => rel.relationshipType === 'parent-child'
  );
  
  const technicalBusinessRelationships = service.relationships.filter(
    rel => rel.relationshipType === 'technical-business'
  );
  
  const handleAddRelationship = (relationship: Omit<ServiceRelationship, 'id'>) => {
    // In a real app, this would call an API
    try {
      // Pretend to save
      setTimeout(() => {
        toast.success('Service relationship added successfully');
        onUpdateRelationships();
        setIsAddDialogOpen(false);
      }, 500);
    } catch (error) {
      toast.error('Failed to add service relationship');
    }
  };
  
  const handleDeleteRelationship = (relationshipId: string) => {
    // In a real app, this would call an API
    try {
      // Pretend to delete
      setTimeout(() => {
        toast.success('Service relationship removed successfully');
        onUpdateRelationships();
      }, 500);
    } catch (error) {
      toast.error('Failed to remove service relationship');
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Service Relationships</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Relationship
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Relationships</TabsTrigger>
          <TabsTrigger value="parent-child">Parent/Child</TabsTrigger>
          <TabsTrigger value="technical-business">Technical/Business</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {service.relationships.length === 0 ? (
            <div className="text-center p-4 border border-dashed rounded-md bg-muted">
              <Network className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No relationships defined for this service.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2" 
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Relationship
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {service.relationships.map(relationship => (
                <RelationshipItem 
                  key={relationship.id}
                  relationship={relationship}
                  service={service}
                  onDelete={() => handleDeleteRelationship(relationship.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="parent-child" className="mt-4">
          {parentChildRelationships.length === 0 ? (
            <div className="text-center p-4 border border-dashed rounded-md bg-muted">
              <Link2 className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No parent/child relationships defined.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2" 
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Parent/Child Relationship
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {parentChildRelationships.map(relationship => (
                <RelationshipItem 
                  key={relationship.id}
                  relationship={relationship}
                  service={service}
                  onDelete={() => handleDeleteRelationship(relationship.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="technical-business" className="mt-4">
          {technicalBusinessRelationships.length === 0 ? (
            <div className="text-center p-4 border border-dashed rounded-md bg-muted">
              <Network className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No technical/business relationships defined.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2" 
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Technical/Business Relationship
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {technicalBusinessRelationships.map(relationship => (
                <RelationshipItem 
                  key={relationship.id}
                  relationship={relationship}
                  service={service}
                  onDelete={() => handleDeleteRelationship(relationship.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <ServiceRelationshipDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        service={service}
        availableServices={availableServices}
        onSubmit={handleAddRelationship}
      />
    </div>
  );
};

export default ServiceRelationshipManager;
