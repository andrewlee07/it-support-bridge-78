
import React from 'react';
import { Asset } from '@/utils/types/asset';
import AssetFormBase from './AssetFormBase';

interface AssetAddFormProps {
  onCancel: () => void;
  onSave: (data: Omit<Asset, 'id' | 'createdAt' | 'updatedAt' | 'audit'>) => Promise<void>;
  loading: boolean;
}

const AssetAddForm: React.FC<AssetAddFormProps> = ({ 
  onCancel, 
  onSave, 
  loading 
}) => {
  return (
    <AssetFormBase
      onCancel={onCancel}
      onSubmit={onSave}
      loading={loading}
      submitButtonText="Add Asset"
    />
  );
};

export default AssetAddForm;
