import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Clock, CheckCircle2, XCircle } from "lucide-react";
import { SLAModal } from "./SLAModal";
import { SLA } from "@/utils/types/sla";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { slaApi } from "@/utils/api/slaApi";

export type SLAListProps = {
  entityType?: string;
  showActive?: boolean;
};

const SLAList = ({ entityType, showActive }: SLAListProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedSLA, setSelectedSLA] = useState<SLA | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch SLAs
  const { data, isLoading } = useQuery({
    queryKey: ['slas'],
    queryFn: () => slaApi.getAllSLAs()
  });

  const slas = data?.data || [];

  const openCreateModal = () => {
    setSelectedSLA(null);
    setIsCreateModalOpen(true);
  };

  const openEditModal = (sla: SLA) => {
    setSelectedSLA(sla);
    setIsEditModalOpen(true);
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedSLA(null);
    queryClient.invalidateQueries({ queryKey: ['slas'] });
  };

  // Filter SLAs based on entityType and active status
  const filteredSLAs = slas.filter(sla => {
    // Filter by active status if showActive is defined
    if (showActive !== undefined && sla.isActive !== showActive) {
      return false;
    }
    
    // Filter by entity type if provided
    if (!entityType) return true;
    if (entityType === 'incident' && sla.ticketType === 'incident') return true;
    if (entityType === 'service-request' && sla.ticketType === 'service') return true;
    if (entityType === 'security-case' && sla.ticketType === 'security-case') return true;
    return false;
  });

  const handleSLASubmit = async (slaData: Partial<SLA>) => {
    try {
      if (selectedSLA) {
        // Update existing SLA
        await slaApi.updateSLA(selectedSLA.id, slaData);
        toast({
          title: "SLA Updated",
          description: "The SLA has been updated successfully.",
        });
      } else {
        // Create new SLA
        await slaApi.createSLA(slaData as Omit<SLA, 'id'>);
        toast({
          title: "SLA Created",
          description: "The new SLA has been created successfully.",
        });
      }
      closeModals();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save SLA. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Service Level Agreements</h2>
        <Button onClick={openCreateModal}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New SLA
        </Button>
      </div>

      <div className="border rounded-md">
        {isLoading ? (
          <div className="p-8 text-center">Loading SLAs...</div>
        ) : filteredSLAs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No SLAs configured yet.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={openCreateModal}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add your first SLA
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Resolution Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSLAs.map((sla) => (
                <TableRow key={sla.id}>
                  <TableCell>{sla.name}</TableCell>
                  <TableCell>
                    <Badge className="capitalize">{sla.priorityLevel}</Badge>
                  </TableCell>
                  <TableCell>{sla.ticketType}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {sla.responseTimeHours} Hours
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {sla.resolutionTimeHours} Hours
                    </div>
                  </TableCell>
                  <TableCell>
                    {sla.isActive ? (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-red-600">
                        <XCircle className="h-4 w-4" />
                        <span>Inactive</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(sla)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <SLAModal
        isOpen={isCreateModalOpen}
        onClose={closeModals}
        onSave={handleSLASubmit}
        entityType={entityType as 'incident' | 'service-request' | 'security-case' | undefined}
      />

      {selectedSLA && (
        <SLAModal
          isOpen={isEditModalOpen}
          onClose={closeModals}
          onSave={handleSLASubmit}
          sla={selectedSLA}
          entityType={entityType as 'incident' | 'service-request' | 'security-case' | undefined}
        />
      )}
    </div>
  );
};

export default SLAList;
