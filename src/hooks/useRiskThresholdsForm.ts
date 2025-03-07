
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RiskThreshold } from '@/utils/types';
import { ensureThresholdId } from '@/utils/formHelpers';

// Schema for risk thresholds
const thresholdSchema = z.object({
  lowMinScore: z.number().min(1).max(5),
  lowMaxScore: z.number().min(1).max(5),
  mediumMinScore: z.number().min(1).max(5),
  mediumMaxScore: z.number().min(1).max(5),
  highMinScore: z.number().min(1).max(5),
  highMaxScore: z.number().min(1).max(5),
}).refine(data => data.lowMaxScore >= data.lowMinScore, {
  message: "Low max score must be greater than or equal to min score",
  path: ["lowMaxScore"]
}).refine(data => data.mediumMaxScore >= data.mediumMinScore, {
  message: "Medium max score must be greater than or equal to min score",
  path: ["mediumMaxScore"]
}).refine(data => data.highMaxScore >= data.highMinScore, {
  message: "High max score must be greater than or equal to min score",
  path: ["highMaxScore"]
}).refine(data => data.mediumMinScore >= data.lowMaxScore, {
  message: "Medium min score must be greater than or equal to low max score",
  path: ["mediumMinScore"]
}).refine(data => data.highMinScore >= data.mediumMaxScore, {
  message: "High min score must be greater than or equal to medium max score",
  path: ["highMinScore"]
});

export type ThresholdFormValues = z.infer<typeof thresholdSchema>;

export const useRiskThresholdsForm = (thresholds: RiskThreshold[]) => {
  // Find thresholds by level
  const lowThreshold = thresholds.find(t => t.level === 'low') || { level: 'low', minScore: 1, maxScore: 2 };
  const mediumThreshold = thresholds.find(t => t.level === 'medium') || { level: 'medium', minScore: 2, maxScore: 4 };
  const highThreshold = thresholds.find(t => t.level === 'high') || { level: 'high', minScore: 4, maxScore: 5 };

  // Initialize form with default values
  const form = useForm<ThresholdFormValues>({
    resolver: zodResolver(thresholdSchema),
    defaultValues: {
      lowMinScore: lowThreshold.minScore,
      lowMaxScore: lowThreshold.maxScore,
      mediumMinScore: mediumThreshold.minScore,
      mediumMaxScore: mediumThreshold.maxScore,
      highMinScore: highThreshold.minScore,
      highMaxScore: highThreshold.maxScore,
    }
  });

  // Convert form values to threshold array
  const formValuesToThresholds = (values: ThresholdFormValues): RiskThreshold[] => {
    return [
      ensureThresholdId({
        id: lowThreshold.id,
        level: 'low' as const,
        minScore: values.lowMinScore,
        maxScore: values.lowMaxScore
      }),
      ensureThresholdId({
        id: mediumThreshold.id,
        level: 'medium' as const,
        minScore: values.mediumMinScore,
        maxScore: values.mediumMaxScore
      }),
      ensureThresholdId({
        id: highThreshold.id,
        level: 'high' as const,
        minScore: values.highMinScore,
        maxScore: values.highMaxScore
      })
    ];
  };

  return {
    form,
    formValuesToThresholds
  };
};
