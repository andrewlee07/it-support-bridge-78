
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { changeApi } from '@/utils/api/change';
import RiskThresholdsForm from '@/components/settings/risk/RiskThresholdsForm';
import { useToast } from '@/hooks/use-toast';
import { RiskThreshold } from '@/utils/types';

const RiskThresholdsTab = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Risk thresholds
  const { data: riskThresholds, isLoading: isLoadingThresholds } = useQuery({
    queryKey: ['riskThresholds'],
    queryFn: () => changeApi.getRiskThresholds(),
  });

  // Mutation for updating thresholds
  const { mutate: updateThresholds, isPending: isSubmitting } = useMutation({
    mutationFn: (thresholds: RiskThreshold[]) => changeApi.updateRiskThresholds(thresholds),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Risk thresholds updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['riskThresholds'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update risk thresholds",
        variant: "destructive",
      });
      console.error("Failed to update thresholds:", error);
    }
  });

  // Handle submitting thresholds form
  const handleThresholdsSubmit = (thresholds: RiskThreshold[]) => {
    updateThresholds(thresholds);
  };

  return (
    <div className="space-y-4">
      {!isLoadingThresholds && riskThresholds?.data && (
        <RiskThresholdsForm 
          thresholds={riskThresholds.data}
          onSubmit={handleThresholdsSubmit}
          isSubmitting={isSubmitting}
        />
      )}
      {isLoadingThresholds && (
        <div className="flex justify-center p-4">Loading thresholds...</div>
      )}
    </div>
  );
};

export default RiskThresholdsTab;
