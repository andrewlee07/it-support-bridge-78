
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ThresholdsFormValues } from '../hooks/useRiskThresholdsForm';
import RiskLevelCard from './RiskLevelCard';

interface RiskThresholdsGridProps {
  form: UseFormReturn<ThresholdsFormValues>;
}

const RiskThresholdsGrid: React.FC<RiskThresholdsGridProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <RiskLevelCard 
        title="Low Risk" 
        minField="lowMin" 
        maxField="lowMax" 
        form={form} 
      />
      
      <RiskLevelCard 
        title="Medium Risk" 
        minField="mediumMin" 
        maxField="mediumMax" 
        form={form} 
      />
      
      <RiskLevelCard 
        title="High Risk" 
        minField="highMin" 
        maxField="highMax" 
        form={form} 
      />
    </div>
  );
};

export default RiskThresholdsGrid;
