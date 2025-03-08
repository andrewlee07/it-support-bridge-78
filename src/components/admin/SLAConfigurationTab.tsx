
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SLA, TicketType } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import { slaApi } from '@/utils/api/slaApi';
import { mockSLAs } from '@/utils/mockData/slas';
import { SLAModal } from '@/components/sla/SLAModal';

interface SLAConfigurationTabProps {
  ticketType: TicketType;
}

const SLAConfigurationTab: React.FC<SLAConfigurationTabProps> = ({ ticketType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSla, setSelectedSla] = useState<SLA | null>(null);

  // In a real app, this would fetch from the API
  // For now, we're using the mock data
  const { data: slas, isLoading } = useQuery({
    queryKey: ['slas', ticketType],
    queryFn: () => {
      // In a real application, this would call slaApi.getSLAsByType(ticketType)
      // For now, we filter the mock data
      const filteredSLAs = mockSLAs.filter(sla => sla.ticketType === ticketType);
      return { data: filteredSLAs };
    },
  });

  const handleEditSLA = (sla: SLA) => {
    setSelectedSla(sla);
    setIsModalOpen(true);
  };

  const handleAddSLA = () => {
    setSelectedSla(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSla(null);
  };

  // Convert ticketType to entityType format required by SLAModal
  const getEntityType = (type: TicketType): 'incident' | 'service-request' => {
    return type === 'incident' ? 'incident' : 'service-request';
  };

  const handleSaveSLA = (slaData: Partial<SLA>) => {
    // This would typically make an API call to save the SLA
    console.log('Saving SLA:', slaData);
    closeModal();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">SLA Configuration</h3>
          <p className="text-muted-foreground mt-1">
            Configure service level agreements for {ticketType === 'incident' ? 'incidents' : 'service requests'}
          </p>
        </div>
        <Button onClick={handleAddSLA} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add SLA
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Priority</TableHead>
                <TableHead>Response Time (hrs)</TableHead>
                <TableHead>Resolution Time (hrs)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">Loading SLAs...</TableCell>
                </TableRow>
              ) : slas?.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">No SLAs configured.</TableCell>
                </TableRow>
              ) : (
                slas?.data?.map(sla => (
                  <TableRow key={sla.id}>
                    <TableCell className="font-medium">{sla.priorityLevel}</TableCell>
                    <TableCell>{sla.responseTimeHours}</TableCell>
                    <TableCell>{sla.resolutionTimeHours}</TableCell>
                    <TableCell>{sla.isActive ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEditSLA(sla)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isModalOpen && (
        <SLAModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          onSave={handleSaveSLA}
          sla={selectedSla} 
          entityType={getEntityType(ticketType)}
        />
      )}
    </div>
  );
};

export default SLAConfigurationTab;
