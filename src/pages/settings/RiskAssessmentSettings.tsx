
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RiskAssessmentQuestion, RiskThreshold } from '@/utils/types';
import { changeApi } from '@/utils/api/changeApi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import RiskAssessmentQuestionForm from '@/components/settings/risk/RiskAssessmentQuestionForm';
import RiskThresholdsForm from '@/components/settings/risk/RiskThresholdsForm';
import { useAuth } from '@/contexts/AuthContext';

const RiskAssessmentSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<RiskAssessmentQuestion | undefined>(undefined);
  
  // Fetch risk assessment questions
  const { 
    data: questions, 
    isLoading: isLoadingQuestions, 
    error: questionsError 
  } = useQuery({
    queryKey: ['riskQuestions'],
    queryFn: async () => {
      const response = await changeApi.getRiskAssessmentQuestions();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch risk questions');
      }
      return response.data;
    },
  });
  
  // Fetch risk thresholds
  const { 
    data: thresholds, 
    isLoading: isLoadingThresholds, 
    error: thresholdsError 
  } = useQuery({
    queryKey: ['riskThresholds'],
    queryFn: async () => {
      const response = await changeApi.getRiskThresholds();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch risk thresholds');
      }
      return response.data;
    },
  });
  
  // Mutation for saving questions
  const updateQuestionsMutation = useMutation({
    mutationFn: async (updatedQuestions: RiskAssessmentQuestion[]) => {
      const response = await changeApi.updateRiskAssessmentQuestions(updatedQuestions, user?.id || '');
      if (!response.success) {
        throw new Error(response.error || 'Failed to update questions');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['riskQuestions'] });
      toast({
        title: 'Success',
        description: 'Risk assessment questions updated successfully',
      });
      setIsQuestionDialogOpen(false);
      setEditingQuestion(undefined);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update questions: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
  
  // Mutation for saving thresholds
  const updateThresholdsMutation = useMutation({
    mutationFn: async (updatedThresholds: RiskThreshold[]) => {
      const response = await changeApi.updateRiskThresholds(updatedThresholds, user?.id || '');
      if (!response.success) {
        throw new Error(response.error || 'Failed to update thresholds');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['riskThresholds'] });
      toast({
        title: 'Success',
        description: 'Risk thresholds updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update thresholds: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
  
  // Handle saving a question
  const handleSaveQuestion = (questionData: RiskAssessmentQuestion) => {
    if (!questions) return;
    
    let updatedQuestions: RiskAssessmentQuestion[];
    
    if (editingQuestion) {
      // Update existing question
      updatedQuestions = questions.map(q => 
        q.id === questionData.id ? questionData : q
      );
    } else {
      // Add new question
      updatedQuestions = [...questions, questionData];
    }
    
    updateQuestionsMutation.mutate(updatedQuestions);
  };
  
  // Handle deleting a question
  const handleDeleteQuestion = (questionId: string) => {
    if (!questions) return;
    
    if (window.confirm('Are you sure you want to delete this question? This action cannot be undone.')) {
      // Instead of removing, we just mark it as inactive
      const updatedQuestions = questions.map(q => 
        q.id === questionId ? { ...q, active: false } : q
      );
      
      updateQuestionsMutation.mutate(updatedQuestions);
    }
  };
  
  // Handle saving thresholds
  const handleSaveThresholds = (updatedThresholds: RiskThreshold[]) => {
    updateThresholdsMutation.mutate(updatedThresholds);
  };
  
  // Opening the question form dialog
  const openQuestionDialog = (question?: RiskAssessmentQuestion) => {
    setEditingQuestion(question);
    setIsQuestionDialogOpen(true);
  };
  
  // Closing the question form dialog
  const closeQuestionDialog = () => {
    setEditingQuestion(undefined);
    setIsQuestionDialogOpen(false);
  };
  
  // Loading states
  if (isLoadingQuestions || isLoadingThresholds) {
    return (
      <PageTransition>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Risk Assessment Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure risk assessment questions and thresholds
            </p>
          </div>
          
          <Skeleton className="h-[500px] w-full" />
        </div>
      </PageTransition>
    );
  }
  
  // Error states
  if (questionsError || thresholdsError) {
    return (
      <PageTransition>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Risk Assessment Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure risk assessment questions and thresholds
            </p>
          </div>
          
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {questionsError ? (questionsError as Error).message : (thresholdsError as Error).message}
            </AlertDescription>
          </Alert>
          
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </PageTransition>
    );
  }
  
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Assessment Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure risk assessment questions and thresholds
          </p>
        </div>
        
        <Tabs defaultValue="questions" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="thresholds">Risk Thresholds</TabsTrigger>
          </TabsList>
          
          <TabsContent value="questions" className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={() => openQuestionDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>
            
            {questions && questions.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {/* Only show active questions */}
                {questions.filter(q => q.active).map((question) => (
                  <Card key={question.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          {question.question}
                          {question.isRequired && (
                            <span className="ml-2 text-sm text-red-500">*</span>
                          )}
                        </CardTitle>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openQuestionDialog(question)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-destructive hover:text-destructive/90"
                            onClick={() => handleDeleteQuestion(question.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription>
                        Weight: {question.weight} 
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-2">
                        {question.answers.map((answer) => (
                          <div key={answer.id} className="flex justify-between items-center text-sm py-1 px-2 bg-secondary/30 rounded">
                            <span>{answer.text}</span>
                            <span className="font-medium">{answer.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  No risk assessment questions configured. Add some questions to get started.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="thresholds">
            {thresholds && (
              <RiskThresholdsForm 
                thresholds={thresholds}
                onSubmit={handleSaveThresholds}
                isSubmitting={updateThresholdsMutation.isPending}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={isQuestionDialogOpen} onOpenChange={setIsQuestionDialogOpen}>
        <DialogContent className="max-w-3xl">
          <RiskAssessmentQuestionForm
            initialData={editingQuestion}
            onSubmit={handleSaveQuestion}
            onCancel={closeQuestionDialog}
            isSubmitting={updateQuestionsMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
};

export default RiskAssessmentSettings;
