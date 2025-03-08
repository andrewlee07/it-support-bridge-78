
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFormContext } from 'react-hook-form';
import { Asset, AssetType, AssetStatus } from '@/utils/types/asset';

const AssetTypeStatusSection = () => {
  const form = useFormContext<Partial<Asset>>();
  
  // Make sure we have properly defined values for asset types and statuses
  const assetTypes: { label: string; value: AssetType }[] = [
    { label: 'Hardware', value: 'hardware' },
    { label: 'Software', value: 'software' },
    { label: 'License', value: 'license' },
    { label: 'Other', value: 'other' },
  ];

  const assetStatuses: { label: string; value: AssetStatus }[] = [
    { label: 'Available', value: 'available' },
    { label: 'In Use', value: 'in-use' },
    { label: 'Maintenance', value: 'maintenance' },
    { label: 'Retired', value: 'retired' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Asset Type</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value || "hardware"}
              defaultValue={field.value || "hardware"}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {assetTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value || "available"}
              defaultValue={field.value || "available"}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select asset status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {assetStatuses.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AssetTypeStatusSection;
