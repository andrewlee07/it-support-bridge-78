
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// Fix the imports to use default imports instead of named imports
import RiskThresholdsForm from '@/components/settings/risk/RiskThresholdsForm';
import RiskAssessmentQuestionForm from '@/components/settings/risk/RiskAssessmentQuestionForm';
import { changeApi } from '@/utils/api/changeApi';
import PageTransition from '@/components/shared/PageTransition';

const RiskAssessmentSettings = () => {
  // Fetch risk assessment questions
  const { data: questionsData, isLoading: isLoadingQuestions } = useQuery({
    queryKey: ['riskQuestions'],
    queryFn: async () => {
      const response = await changeApi.getRiskAssessmentQuestions();
      return response.data;
    }
  });

  // Fetch risk thresholds
  const { data: thresholdsData, isLoading: isLoadingThresholds } = useQuery({
    queryKey: ['riskThresholds'],
    queryFn: async () => {
      const response = await changeApi.getRiskThresholds();
      return response.data;
    }
  });

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
                    <RiskAssessmentQuestionForm questions={questionsData || []} />
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
                    <RiskThresholdsForm thresholds={thresholdsData || []} />
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
