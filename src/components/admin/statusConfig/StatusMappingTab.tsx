
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormItem,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import { StatusMappingConfiguration, ReleaseStatus } from '@/utils/statusSynchronization/statusMappings';

interface StatusMappingTabProps {
  releaseStatuses: ReleaseStatus[];
}

const StatusMappingTab: React.FC<StatusMappingTabProps> = ({ releaseStatuses }) => {
  const { control } = useFormContext<StatusMappingConfiguration>();
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Release to Backlog Item Status Mappings</h3>
        <div className="space-y-4">
          {releaseStatuses.map((releaseStatus) => (
            <Controller
              key={`backlog-${releaseStatus}`}
              control={control}
              name={`releaseToBacklogMapping.${releaseStatus}` as any}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>When Release Status is <strong>{releaseStatus}</strong></FormLabel>
                    <FormDescription>
                      Set Backlog Item Status to:
                    </FormDescription>
                  </div>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value as string}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="deferred">Deferred</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Release to Bug Status Mappings</h3>
        <div className="space-y-4">
          {releaseStatuses.map((releaseStatus) => (
            <Controller
              key={`bug-${releaseStatus}`}
              control={control}
              name={`releaseToBugMapping.${releaseStatus}` as any}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>When Release Status is <strong>{releaseStatus}</strong></FormLabel>
                    <FormDescription>
                      Set Bug Status to:
                    </FormDescription>
                  </div>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value as string}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusMappingTab;
