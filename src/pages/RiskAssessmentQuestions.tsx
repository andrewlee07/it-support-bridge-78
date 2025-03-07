
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { riskAssessmentApi } from '@/utils/api/change/riskAssessmentApi';
import PageTransition from '@/components/shared/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import { RiskAssessmentQuestion } from '@/utils/types';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import RiskAssessmentQuestionForm from '@/components/settings/risk/RiskAssessmentQuestionForm';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';

const RiskAssessmentQuestions = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<RiskAssessmentQuestion | null>(null);
  
  const queryClient = useQueryClient();
  
  // Fetch risk assessment questions
  const { data: questions = [], isLoading } = useQuery({
    queryKey: ['riskQuestions'],
    queryFn: async () => {
      const response = await riskAssessmentApi.getRiskAssessmentQuestions();
      return response.data || [];
    }
  });
  
  // Mutation to update questions
  const updateQuestionsMutation = useMutation({
    mutationFn: async (updatedQuestions: RiskAssessmentQuestion[]) => {
      return await riskAssessmentApi.updateRiskAssessmentQuestions(updatedQuestions, 'user-1');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['riskQuestions'] });
      toast.success('Risk assessment question updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update risk assessment question');
      console.error(error);
    }
  });
  
  const handleToggleActive = (question: RiskAssessmentQuestion) => {
    const updatedQuestions = questions.map(q => 
      q.id === question.id ? { ...q, active: !q.active } : q
    );
    
    updateQuestionsMutation.mutate(updatedQuestions);
  };
  
  const handleSubmitQuestion = (questionData: RiskAssessmentQuestion) => {
    const isEditing = !!editingQuestion;
    let updatedQuestions: RiskAssessmentQuestion[];
    
    if (isEditing) {
      updatedQuestions = questions.map(q => 
        q.id === questionData.id ? questionData : q
      );
    } else {
      updatedQuestions = [...questions, questionData];
    }
    
    updateQuestionsMutation.mutate(updatedQuestions);
    setEditingQuestion(null);
    setShowForm(false);
  };
  
  const handleEditQuestion = (question: RiskAssessmentQuestion) => {
    setEditingQuestion(question);
    setShowForm(true);
  };
  
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Risk Assessment Questions</h1>
            <p className="text-muted-foreground mt-1">
              Manage questions used for change request risk assessments
            </p>
          </div>
          <Button onClick={() => { setEditingQuestion(null); setShowForm(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse">Loading questions...</div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {questions.map((question) => (
              <Card key={question.id} className={question.active ? '' : 'opacity-70'}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      {question.question}
                    </CardTitle>
                    <Badge variant="outline">
                      Weight: {question.weight}
                    </Badge>
                  </div>
                  <CardDescription>
                    {question.isRequired ? 'Required' : 'Optional'} Question
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mt-2 mb-4">
                    <h4 className="text-sm font-medium mb-2">Answer Options:</h4>
                    <ul className="space-y-1 text-sm">
                      {question.answers.map((answer) => (
                        <li key={answer.id} className="flex justify-between">
                          <span>{answer.text}</span>
                          <span className="text-muted-foreground">Value: {answer.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={question.active}
                        onCheckedChange={() => handleToggleActive(question)}
                      />
                      <span className="text-sm">
                        {question.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditQuestion(question)}>
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{editingQuestion ? 'Edit Question' : 'Add New Question'}</DialogTitle>
            </DialogHeader>
            <RiskAssessmentQuestionForm
              initialData={editingQuestion || undefined}
              onSubmit={handleSubmitQuestion}
              onCancel={() => setShowForm(false)}
              isSubmitting={updateQuestionsMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default RiskAssessmentQuestions;
