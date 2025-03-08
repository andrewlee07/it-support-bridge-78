
import React from 'react';
import { Form } from '@/components/ui/form';
import { Asset } from '@/utils/types/asset';
import { getAllUsers } from '@/utils/mockData/users';
import { FormProvider } from 'react-hook-form';
import { useAssetForm } from './hooks/useAssetForm';
import AssetBasicInfo from './sections/AssetBasicInfo';
import AssetTypeStatusSection from './sections/AssetTypeStatusSection';
import AssetLocationSection from './sections/AssetLocationSection';
import AssetDetailsSection from './sections/AssetDetailsSection';
import AssetNotesSection from './sections/AssetNotesSection';
import AssetFormActions from './sections/AssetFormActions';

interface AssetFormProps {
  onCancel: () => void;
  loading: boolean;
  asset?: Asset;
  submitButtonText: string;
  onSubmit: (data: Partial<Asset>) => Promise<void>;
}

const AssetFormBase: React.FC<AssetFormProps> = ({ 
  onCancel, 
  onSubmit, 
  loading,
  asset,
  submitButtonText
}) => {
  const allUsers = getAllUsers();
  const form = useAssetForm(asset);

  const handleSubmit = (data: Partial<Asset>) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <AssetBasicInfo />
          <AssetTypeStatusSection />
          <AssetLocationSection users={allUsers} />
          <AssetDetailsSection />
          <AssetNotesSection />
          <AssetFormActions 
            onCancel={onCancel}
            loading={loading}
            submitButtonText={submitButtonText}
          />
        </form>
      </Form>
    </FormProvider>
  );
};

export default AssetFormBase;
