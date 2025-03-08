
import React from 'react';
import { Asset } from '@/utils/types/asset';
import AssetFormBase from './AssetFormBase';

interface AssetEditFormProps {
  asset: Asset;
  onCancel: () => void;
  onSave: (data: Partial<Asset>) => Promise<void>;
  loading: boolean;
}

const AssetEditForm: React.FC<AssetEditFormProps> = ({ 
  asset, 
  onCancel, 
  onSave, 
  loading 
}) => {
  return (
    <AssetFormBase
      asset={asset}
      onCancel={onCancel}
      onSubmit={onSave}
      loading={loading}
      submitButtonText="Save Changes"
    />
  );
};

export default AssetEditForm;
