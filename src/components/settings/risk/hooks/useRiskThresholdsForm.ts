
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RiskThreshold } from '@/utils/types';
import { ensureThresholdId } from '@/utils/api/change';

// Schema for the thresholds form
export const thresholdsFormSchema = z.object({
  lowMin: z.number().min(1).max(5),
  lowMax: z.number().min(1).max(5),
  mediumMin: z.number().min(1).max(5),
  mediumMax: z.number().min(1).max(5),
  highMin: z.number().min(1).max(5),
  highMax: z.number().min(1).max(5),
}).refine(data => data.lowMax >= data.lowMin, {
  message: "Low max must be greater than or equal to low min",
  path: ["lowMax"],
}).refine(data => data.mediumMax >= data.mediumMin, {
  message: "Medium max must be greater than or equal to medium min",
  path: ["mediumMax"],
}).refine(data => data.highMax >= data.highMin, {
  message: "High max must be greater than or equal to high min",
  path: ["highMax"],
}).refine(data => data.mediumMin > data.lowMax, {
  message: "Medium min must be greater than low max",
  path: ["mediumMin"],
}).refine(data => data.highMin > data.mediumMax, {
  message: "High min must be greater than medium max",
  path: ["highMin"],
});

export type ThresholdsFormValues = z.infer<typeof thresholdsFormSchema>;

export const useRiskThresholdsForm = (thresholds: RiskThreshold[]) => {
  // Find the thresholds for each risk level
  const lowThreshold = thresholds.find(t => t.level === 'low') || 
    { id: '', minScore: 1, maxScore: 2, level: 'low' as const };
  const mediumThreshold = thresholds.find(t => t.level === 'medium') || 
    { id: '', minScore: 2, maxScore: 4, level: 'medium' as const };
  const highThreshold = thresholds.find(t => t.level === 'high') || 
    { id: '', minScore: 4, maxScore: 5, level: 'high' as const };

  const form = useForm<ThresholdsFormValues>({
    resolver: zodResolver(thresholdsFormSchema),
    defaultValues: {
      lowMin: lowThreshold.minScore,
      lowMax: lowThreshold.maxScore,
      mediumMin: mediumThreshold.minScore,
      mediumMax: mediumThreshold.maxScore,
      highMin: highThreshold.minScore,
      highMax: highThreshold.maxScore,
    },
  });

  const formValuesToThresholds = (values: ThresholdsFormValues): RiskThreshold[] => {
    return [
      ensureThresholdId({ 
        id: lowThreshold.id, 
        level: 'low', 
        minScore: values.lowMin, 
        maxScore: values.lowMax 
      }),
      ensureThresholdId({ 
        id: mediumThreshold.id, 
        level: 'medium', 
        minScore: values.mediumMin, 
        maxScore: values.mediumMax 
      }),
      ensureThresholdId({ 
        id: highThreshold.id, 
        level: 'high', 
        minScore: values.highMin, 
        maxScore: values.highMax 
      }),
    ];
  };

  return {
    form,
    formValuesToThresholds,
    thresholds: {
      lowThreshold,
      mediumThreshold,
      highThreshold
    }
  };
};
