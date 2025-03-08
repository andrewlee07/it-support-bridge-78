
import React from 'react';
import { RiskThreshold } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { Form, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRiskThresholdsForm, ThresholdsFormValues } from './hooks/useRiskThresholdsForm';
import RiskThresholdsGrid from './components/RiskThresholdsGrid';

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
  const { form, formValuesToThresholds } = useRiskThresholdsForm(thresholds);

  const handleSubmit = (values: ThresholdsFormValues) => {
    const updatedThresholds = formValuesToThresholds(values);
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
            <RiskThresholdsGrid form={form} />
            
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
