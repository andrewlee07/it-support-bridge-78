
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { changeApi } from '@/utils/api/change';
import RiskThresholdsForm from '@/components/settings/risk/RiskThresholdsForm';

const RiskThresholdsTab = () => {
  // Risk thresholds
  const { data: riskThresholds, isLoading: isLoadingThresholds } = useQuery({
    queryKey: ['riskThresholds'],
    queryFn: () => changeApi.getRiskThresholds(),
  });

  // Handle submitting thresholds form
  const handleThresholdsSubmit = (thresholds: any) => {
    console.log('Saving thresholds:', thresholds);
    // API call would go here
  };

  return (
    <div className="space-y-4">
      {!isLoadingThresholds && riskThresholds?.data && (
        <RiskThresholdsForm 
          thresholds={riskThresholds.data}
          onSubmit={handleThresholdsSubmit}
          isSubmitting={false}
        />
      )}
      {isLoadingThresholds && (
        <div className="flex justify-center p-4">Loading thresholds...</div>
      )}
    </div>
  );
};

export default RiskThresholdsTab;
