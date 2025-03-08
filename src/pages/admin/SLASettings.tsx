
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SLAList from '@/components/sla/SLAList';
import { SLAModal } from '@/components/sla/SLAModal';
import { useState } from 'react';

const SLASettings = () => {
  const [selectedSlaId, setSelectedSlaId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEntityType, setCurrentEntityType] = useState<'incident' | 'service-request'>('incident');

  const handleOpenModal = (id?: string) => {
    setSelectedSlaId(id || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedSlaId(null);
    setIsModalOpen(false);
  };

  const handleTabChange = (value: string) => {
    setCurrentEntityType(value as 'incident' | 'service-request');
  };

  const handleSave = (slaData: any) => {
    console.log('Saving SLA:', slaData);
    setIsModalOpen(false);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SLA Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure service level agreements for different modules
          </p>
        </div>

        <Tabs defaultValue="incident" onValueChange={handleTabChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="incident">Incident SLAs</TabsTrigger>
            <TabsTrigger value="service-request">Service Request SLAs</TabsTrigger>
          </TabsList>

          <TabsContent value="incident" className="space-y-4">
            <SLAList
              entityType="incident"
              showActive={true}
            />
          </TabsContent>

          <TabsContent value="service-request" className="space-y-4">
            <SLAList
              entityType="service-request"
              showActive={true}
            />
          </TabsContent>
        </Tabs>

        <SLAModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          slaId={selectedSlaId}
          entityType={currentEntityType}
        />
      </div>
    </PageTransition>
  );
};

export default SLASettings;
