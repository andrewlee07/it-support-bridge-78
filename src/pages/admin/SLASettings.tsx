
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SLAList from '@/components/sla/SLAList';
import { SLAModal } from '@/components/sla/SLAModal';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Breadcrumb from '@/components/shared/Breadcrumb';

const SLASettings = () => {
  const [selectedSlaId, setSelectedSlaId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEntityType, setCurrentEntityType] = useState<'incident' | 'service-request'>('incident');

  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'SLA Overview' }
  ];

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
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SLA Overview</h1>
          <p className="text-muted-foreground mt-1">
            View all service level agreements across different modules
          </p>
        </div>

        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4" />
          <AlertTitle>Configuration Notice</AlertTitle>
          <AlertDescription className="pt-2">
            <p className="mb-2">This is a view-only overview of all SLAs across the system. For module-specific SLA configuration:</p>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/incident-configuration">Incident SLAs</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/service-request-configuration">Service Request SLAs</Link>
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>

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
