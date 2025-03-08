
import { useForm } from 'react-hook-form';
import { Asset, AssetType, AssetStatus } from '@/utils/types/asset';

export function useAssetForm(asset?: Asset) {
  const defaultValues = asset ? {
    name: asset.name,
    type: asset.type,
    status: asset.status,
    notes: asset.notes || '',
    location: asset.location || '',
    model: asset.model || '',
    manufacturer: asset.manufacturer || '',
    serialNumber: asset.serialNumber || '',
    assignedTo: asset.assignedTo || '',
  } : {
    name: '',
    type: 'hardware' as AssetType,
    status: 'available' as AssetStatus,
    notes: '',
    location: '',
    model: '',
    manufacturer: '',
    serialNumber: '',
    assignedTo: '',
  };
  
  const form = useForm<Partial<Asset>>({
    defaultValues,
  });

  return form;
}
