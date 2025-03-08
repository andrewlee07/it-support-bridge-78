
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SLAList from "@/components/sla/SLAList";
import { SLAModal } from "@/components/sla/SLAModal";
import { SLA } from "@/utils/types/sla";
import { toast } from 'sonner';
import { slaApi } from '@/utils/api/slaApi';

const SLASettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveModal = async (slaData: Partial<SLA>) => {
    try {
      await slaApi.createSLA(slaData as Omit<SLA, 'id'>);
      toast.success("SLA created successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to create SLA");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">SLA Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Level Agreements</CardTitle>
          <CardDescription>
            Configure SLAs for incidents and service requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All SLAs</TabsTrigger>
              <TabsTrigger value="active">Active SLAs</TabsTrigger>
              <TabsTrigger value="inactive">Inactive SLAs</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <SLAList />
            </TabsContent>
            <TabsContent value="active" className="mt-4">
              <SLAList showActive={true} />
            </TabsContent>
            <TabsContent value="inactive" className="mt-4">
              <SLAList showActive={false} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <SLAModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveModal} 
      />
    </div>
  );
};

export default SLASettings;
