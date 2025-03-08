
import { useState, useEffect } from 'react';
import { ConfigurableEntityType, MandatoryFieldConfig } from '@/utils/types/configuration';
import { useToast } from './use-toast';
import { getMandatoryFieldsConfig, updateMandatoryFieldsConfig } from '@/api/statusSynchronization';

export const useMandatoryFields = (entityType: ConfigurableEntityType) => {
  const [mandatoryFields, setMandatoryFields] = useState<MandatoryFieldConfig[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchMandatoryFields = async () => {
    setIsLoading(true);
    try {
      const fields = await getMandatoryFieldsConfig(entityType);
      // Group regular fields first, then resolution fields
      const sortedFields = [...fields].sort((a, b) => {
        // First by resolution field (non-resolution first)
        if ((a.isResolutionField || false) !== (b.isResolutionField || false)) {
          return (a.isResolutionField || false) ? 1 : -1;
        }
        // Then by display name
        return a.displayName.localeCompare(b.displayName);
      });
      setMandatoryFields(sortedFields);
      setError(null);
    } catch (err) {
      setError('Failed to load mandatory fields');
      toast({
        title: 'Error',
        description: 'Failed to load mandatory fields configuration',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMandatoryFields();
  }, [entityType]);

  const updateMandatoryFields = async (fields: MandatoryFieldConfig[]) => {
    setIsLoading(true);
    try {
      await updateMandatoryFieldsConfig(entityType, fields);
      setMandatoryFields(fields);
      toast({
        title: 'Success',
        description: 'Mandatory fields configuration has been updated',
      });
      return true;
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update mandatory fields configuration',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const refresh = () => {
    fetchMandatoryFields();
  };

  return {
    mandatoryFields,
    updateMandatoryFields,
    isLoading,
    error,
    refresh
  };
};
