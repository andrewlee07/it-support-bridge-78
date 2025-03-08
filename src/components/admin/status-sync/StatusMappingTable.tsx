
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BacklogItemStatus } from '@/utils/types/backlogTypes';
import { ReleaseStatus } from '@/utils/types/release';
import { ArrowRightLeft, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { StatusSynchronizationSettings } from '@/utils/types/StatusSynchronizationSettings';

export interface StatusMappingTableProps {
  mappings: Record<ReleaseStatus, BacklogItemStatus>;
  bugMappings: Record<ReleaseStatus, string>;
  onUpdate: (mappings: Record<ReleaseStatus, BacklogItemStatus>, bugMappings: Record<ReleaseStatus, string>) => void;
  isLoading?: boolean;
  // For backward compatibility
  settings?: StatusSynchronizationSettings;
  updateSettings?: (newSettings: StatusSynchronizationSettings) => void;
  isDisabled?: boolean;
}

export const StatusMappingTable: React.FC<StatusMappingTableProps> = ({
  mappings,
  bugMappings,
  onUpdate,
  isLoading = false,
  settings,
  updateSettings,
  isDisabled = false
}) => {
  // If settings is provided, use the mappings from settings
  const actualMappings = settings?.releaseToBacklogMapping || mappings;
  const actualBugMappings = settings?.releaseToBugMapping || bugMappings;
  
  const [tempMappings, setTempMappings] = useState<Record<ReleaseStatus, BacklogItemStatus>>(actualMappings);
  const [tempBugMappings, setTempBugMappings] = useState<Record<ReleaseStatus, string>>(actualBugMappings);
  const [hasChanges, setHasChanges] = useState(false);

  const backlogStatuses: BacklogItemStatus[] = ['open', 'in-progress', 'ready', 'blocked', 'completed', 'deferred'];
  const bugStatuses: string[] = ['open', 'in_progress', 'in-progress', 'fixed', 'resolved', 'closed', 'verified'];
  const releaseStatuses: ReleaseStatus[] = ['Planned', 'In Progress', 'Deployed', 'Cancelled'];

  const handleBacklogMappingChange = (releaseStatus: ReleaseStatus, newStatus: BacklogItemStatus) => {
    setTempMappings(prev => ({
      ...prev,
      [releaseStatus]: newStatus
    }));
    setHasChanges(true);
  };

  const handleBugMappingChange = (releaseStatus: ReleaseStatus, newStatus: string) => {
    setTempBugMappings(prev => ({
      ...prev,
      [releaseStatus]: newStatus
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    if (updateSettings && settings) {
      updateSettings({
        ...settings,
        releaseToBacklogMapping: tempMappings,
        releaseToBugMapping: tempBugMappings
      });
    } else {
      onUpdate(tempMappings, tempBugMappings);
    }
    setHasChanges(false);
  };

  const handleReset = () => {
    setTempMappings(actualMappings);
    setTempBugMappings(actualBugMappings);
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            Status Mappings
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Define how release statuses should map to backlog item and bug statuses when synchronizing
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription>
            Configure how release statuses map to backlog item and bug statuses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Release Status</TableHead>
                <TableHead>Backlog Item Status</TableHead>
                <TableHead>Bug Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {releaseStatuses.map(releaseStatus => (
                <TableRow key={releaseStatus}>
                  <TableCell className="font-medium">{releaseStatus}</TableCell>
                  <TableCell>
                    <Select
                      value={tempMappings[releaseStatus]}
                      onValueChange={(value: BacklogItemStatus) => 
                        handleBacklogMappingChange(releaseStatus, value)
                      }
                      disabled={isDisabled}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {backlogStatuses.map(status => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={tempBugMappings[releaseStatus]}
                      onValueChange={(value) => 
                        handleBugMappingChange(releaseStatus, value)
                      }
                      disabled={isDisabled}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {bugStatuses.map(status => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={handleReset} disabled={!hasChanges || isLoading || isDisabled}>
              Reset
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges || isLoading || isDisabled}>
              Save Mappings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
