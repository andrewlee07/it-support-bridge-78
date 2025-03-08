
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Button } from '@/components/ui/button';
import { Plus, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SLAList from '@/components/sla/SLAList';
import { useDisclosure } from '@/hooks/useDisclosure';
import { SLAModal } from '@/components/sla/SLAModal';
import { SLA } from '@/utils/types/sla';

const SLASettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const handleSaveSLA = (slaData: Partial<SLA>) => {
    // Handle saving the SLA
    onClose();
  };
  
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SLA Management</h1>
            <p className="text-muted-foreground mt-1">
              Configure and manage Service Level Agreements
            </p>
          </div>
          <Button onClick={onOpen} className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Add SLA
          </Button>
        </div>

        <Tabs defaultValue="active" className="animate-fade-in">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active SLAs</TabsTrigger>
            <TabsTrigger value="inactive">Inactive SLAs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-0">
            <SLAList showActive={true} />
          </TabsContent>
          
          <TabsContent value="inactive" className="mt-0">
            <SLAList showActive={false} />
          </TabsContent>
        </Tabs>
        
        <SLAModal 
          isOpen={isOpen} 
          onClose={onClose} 
          onSave={handleSaveSLA}
        />
      </div>
    </PageTransition>
  );
};

export default SLASettings;
