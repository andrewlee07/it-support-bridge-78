import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Clock, CheckCircle2, XCircle } from "lucide-react";
import { getSLAs } from "@/utils/mockData/slas";
import { SLAModal } from "./SLAModal";
import { SLA } from "@/utils/types/sla";

type SLAListProps = {
  entityType?: string;
};

const SLAList = ({ entityType }: SLAListProps) => {
  const [slas, setSlas] = useState<SLA[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedSLA, setSelectedSLA] = useState<SLA | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    loadSLAs();
  }, []);

  const loadSLAs = () => {
    const fetchedSLAs = getSLAs();
    setSlas(fetchedSLAs);
  };

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
    loadSLAs();
  };

  // Filter SLAs based on entityType if provided
  const filteredSLAs = slas.filter(sla => {
    if (!entityType) return true;
    if (entityType === 'incident' && sla.ticketType === 'incident') return true;
    if (entityType === 'service-request' && sla.ticketType === 'service_request') return true;
    return !entityType;
  });

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
      </div>

      <SLAModal
        isOpen={isCreateModalOpen}
        onClose={closeModals}
        onSubmit={closeModals}
      />

      {selectedSLA && (
        <SLAModal
          isOpen={isEditModalOpen}
          onClose={closeModals}
          onSubmit={closeModals}
          sla={selectedSLA}
        />
      )}
    </div>
  );
};

export default SLAList;
