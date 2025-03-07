
import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RiskThresholdsForm from '@/components/settings/risk/RiskThresholdsForm';
import RiskAssessmentQuestionForm from '@/components/settings/risk/RiskAssessmentQuestionForm';
import { changeApi } from '@/utils/api/changeApi';
import PageTransition from '@/components/shared/PageTransition';
import { RiskAssessmentQuestion, RiskThreshold } from '@/utils/types';
import { useToast } from '@/hooks/use-toast';

const RiskAssessmentSettings = () => {
  const { toast } = useToast();

  // Fetch risk assessment questions
  const { data: questionsData, isLoading: isLoadingQuestions, refetch: refetchQuestions } = useQuery({
    queryKey: ['riskQuestions'],
    queryFn: async () => {
      const response = await changeApi.getRiskAssessmentQuestions();
      return response.data;
    }
  });

  // Fetch risk thresholds
  const { data: thresholdsData, isLoading: isLoadingThresholds, refetch: refetchThresholds } = useQuery({
    queryKey: ['riskThresholds'],
    queryFn: async () => {
      const response = await changeApi.getRiskThresholds();
      return response.data;
    }
  });

  // Mutation for saving a question
  const questionMutation = useMutation({
    mutationFn: async (questionData: RiskAssessmentQuestion) => {
      const response = await changeApi.saveRiskAssessmentQuestion(questionData);
      return response.data;
    },
    onSuccess: () => {
      toast({ 
        title: "Question saved",
        description: "Risk assessment question has been saved successfully" 
      });
      refetchQuestions();
    },
    onError: () => {
      toast({ 
        title: "Error saving question",
        description: "There was a problem saving the risk assessment question",
        variant: "destructive"
      });
    }
  });

  // Mutation for saving thresholds
  const thresholdMutation = useMutation({
    mutationFn: async (thresholdData: RiskThreshold[]) => {
      const response = await changeApi.saveRiskThresholds(thresholdData);
      return response.data;
    },
    onSuccess: () => {
      toast({ 
        title: "Thresholds saved",
        description: "Risk thresholds have been saved successfully" 
      });
      refetchThresholds();
    },
    onError: () => {
      toast({ 
        title: "Error saving thresholds",
        description: "There was a problem saving the risk thresholds",
        variant: "destructive"
      });
    }
  });

  // Dummy functions for handling empty forms
  const handleCancelQuestion = () => {
    // In a real app, would redirect to questions list or clear form
    console.log('Question edit cancelled');
  };

  return (
    <PageTransition>
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Risk Assessment Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure risk assessment questions and thresholds for change management
            </p>
          </div>

          <Tabs defaultValue="questions" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="questions">Assessment Questions</TabsTrigger>
              <TabsTrigger value="thresholds">Risk Thresholds</TabsTrigger>
            </TabsList>
            
            <TabsContent value="questions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment Questions</CardTitle>
                  <CardDescription>
                    Configure the questions that will be used to assess the risk level of change requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingQuestions ? (
                    <div className="flex items-center justify-center h-40">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <RiskAssessmentQuestionForm
                      initialData={undefined}
                      onSubmit={(data) => questionMutation.mutate(data)}
                      onCancel={handleCancelQuestion}
                      isSubmitting={questionMutation.isPending}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="thresholds" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Thresholds</CardTitle>
                  <CardDescription>
                    Define the thresholds for determining risk levels based on assessment scores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingThresholds ? (
                    <div className="flex items-center justify-center h-40">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <RiskThresholdsForm
                      thresholds={thresholdsData || []}
                      onSubmit={(data) => thresholdMutation.mutate(data)}
                      isSubmitting={thresholdMutation.isPending}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default RiskAssessmentSettings;
