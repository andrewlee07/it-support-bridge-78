
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RiskThreshold } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Schema for the thresholds form
const thresholdsFormSchema = z.object({
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

type ThresholdsFormValues = z.infer<typeof thresholdsFormSchema>;

interface RiskThresholdsFormProps {
  thresholds: RiskThreshold[];
  onSubmit: (thresholds: RiskThreshold[]) => void;
  isSubmitting?: boolean;
}

const RiskThresholdsForm: React.FC<RiskThresholdsFormProps> = ({
  thresholds,
  onSubmit,
  isSubmitting = false,
}) => {
  // Find the thresholds for each risk level
  const lowThreshold = thresholds.find(t => t.level === 'low') || { minScore: 1, maxScore: 2 };
  const mediumThreshold = thresholds.find(t => t.level === 'medium') || { minScore: 2, maxScore: 4 };
  const highThreshold = thresholds.find(t => t.level === 'high') || { minScore: 4, maxScore: 5 };

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

  const handleSubmit = (values: ThresholdsFormValues) => {
    const updatedThresholds: RiskThreshold[] = [
      { ...lowThreshold, level: 'low', minScore: values.lowMin, maxScore: values.lowMax },
      { ...mediumThreshold, level: 'medium', minScore: values.mediumMin, maxScore: values.mediumMax },
      { ...highThreshold, level: 'high', minScore: values.highMin, maxScore: values.highMax },
    ];
    
    onSubmit(updatedThresholds);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Risk Thresholds Configuration</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Low Risk Thresholds */}
              <div className="space-y-4 border p-4 rounded-md">
                <h3 className="font-medium">Low Risk</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="lowMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Score</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lowMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Score</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Medium Risk Thresholds */}
              <div className="space-y-4 border p-4 rounded-md">
                <h3 className="font-medium">Medium Risk</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="mediumMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Score</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mediumMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Score</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* High Risk Thresholds */}
              <div className="space-y-4 border p-4 rounded-md">
                <h3 className="font-medium">High Risk</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="highMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Score</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="highMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Score</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            
            <FormDescription>
              Configure the risk score ranges for Low, Medium, and High risk levels. 
              Scores are calculated as a weighted average of question answers on a scale of 1-5.
            </FormDescription>
          </CardContent>
          
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="ml-auto">
              {isSubmitting ? 'Saving...' : 'Save Thresholds'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default RiskThresholdsForm;
