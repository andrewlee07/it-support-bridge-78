
import React, { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { getAllAssets } from '@/utils/mockData/assets';

interface AssetServiceSectionProps {
  form: UseFormReturn<any>;
  type: 'incident' | 'problem';
}

const AssetServiceSection: React.FC<AssetServiceSectionProps> = ({ form, type }) => {
  const [assets, setAssets] = useState<any[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState<string>('');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  
  // Get all the form values
  const formValues = form.watch();
  
  // Get all assets
  useEffect(() => {
    const fetchAssets = async () => {
      const allAssets = await getAllAssets();
      setAssets(allAssets);
    };
    
    fetchAssets();
  }, []);
  
  // Update associatedAssets in form when selectedAssets changes
  useEffect(() => {
    form.setValue('associatedAssets', selectedAssets);
  }, [selectedAssets, form]);
  
  // Initialize selectedAssets from form values if they exist
  useEffect(() => {
    if (formValues.associatedAssets && formValues.associatedAssets.length > 0) {
      setSelectedAssets(formValues.associatedAssets);
    }
  }, [formValues.associatedAssets]);
  
  const handleAddAsset = () => {
    if (selectedAssetId && !selectedAssets.includes(selectedAssetId)) {
      setSelectedAssets([...selectedAssets, selectedAssetId]);
      setSelectedAssetId('');
    }
  };
  
  const handleRemoveAsset = (assetId: string) => {
    setSelectedAssets(selectedAssets.filter(id => id !== assetId));
  };
  
  const getAssetNameById = (assetId: string) => {
    const asset = assets.find(a => a.id === assetId);
    return asset ? `${asset.name} (${asset.id})` : assetId;
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Associated Assets & Services</h3>
      
      {/* Asset Selection */}
      <div className="space-y-4">
        <FormLabel>Assets</FormLabel>
        <div className="flex gap-2">
          <Select
            value={selectedAssetId}
            onValueChange={setSelectedAssetId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an asset to associate" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {assets.map(asset => (
                  <SelectItem key={asset.id} value={asset.id}>
                    {asset.name} - {asset.model} ({asset.id})
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button 
            type="button" 
            onClick={handleAddAsset}
            disabled={!selectedAssetId}
          >
            Add
          </Button>
        </div>
        
        {/* Display selected assets */}
        {selectedAssets.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedAssets.map(assetId => (
              <Badge key={assetId} variant="secondary" className="flex items-center gap-1">
                {getAssetNameById(assetId)}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0"
                  onClick={() => handleRemoveAsset(assetId)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
        
        <FormField
          control={form.control}
          name="associatedAssets"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      
      {/* Associated Service is already handled by ServiceSelection component */}
      <FormDescription>
        Associate relevant assets with this {type}. The service is selected in the service section above.
      </FormDescription>
    </div>
  );
};

export default AssetServiceSection;
