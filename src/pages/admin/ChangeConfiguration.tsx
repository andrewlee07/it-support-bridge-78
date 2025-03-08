
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { useQuery } from '@tanstack/react-query';
import { dropdownConfigurationApi } from '@/utils/api/dropdownConfigurationApi';
import { changeApi } from '@/utils/api/change';
import { ConfigurableEntityType } from '@/utils/types';
import DropdownConfigList from '@/components/settings/dropdowns/DropdownConfigList';
import DropdownConfigForm from '@/components/settings/dropdowns/DropdownConfigForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRiskThresholdsForm } from '@/hooks/useRiskThresholdsForm';
import { RiskThresholdsForm } from '@/components/settings/risk/RiskThresholdsForm';
import { RiskAssessmentQuestionForm } from '@/components/settings/risk/RiskAssessmentQuestionForm';
import { useState as useStateCustom } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const ChangeConfiguration = () => {
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const entityType: ConfigurableEntityType = 'change';
  const { user } = useAuth();
  
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  // Dropdown configurations
  const { data: configurations, isLoading, refetch } = useQuery({
    queryKey: ['dropdownConfigurations', entityType],
    queryFn: () => dropdownConfigurationApi.getDropdownConfigurationsByEntity(entityType),
  });

  // Risk assessment questions
  const { data: riskQuestions, isLoading: isLoadingQuestions, refetch: refetchQuestions } = useQuery({
    queryKey: ['riskAssessmentQuestions'],
    queryFn: () => changeApi.getRiskAssessmentQuestions(),
  });

  // Risk thresholds
  const { data: riskThresholds, isLoading: isLoadingThresholds } = useQuery({
    queryKey: ['riskThresholds'],
    queryFn: () => changeApi.getRiskThresholds(),
  });

  const handleAddNew = () => {
    setIsAddingNew(true);
    setSelectedConfigId(null);
  };

  const handleSelectConfig = (id: string) => {
    setSelectedConfigId(id);
    setIsAddingNew(false);
  };

  const handleFormClose = () => {
    setIsAddingNew(false);
    setSelectedConfigId(null);
    refetch();
  };

  const handleAddQuestion = () => {
    setIsAddingQuestion(true);
    setSelectedQuestionId(null);
  };

  const handleSelectQuestion = (id: string) => {
    setSelectedQuestionId(id);
    setIsAddingQuestion(false);
  };

  const handleQuestionFormClose = () => {
    setIsAddingQuestion(false);
    setSelectedQuestionId(null);
    refetchQuestions();
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Change Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure change management settings, dropdowns, and risk assessment
          </p>
        </div>

        <Tabs defaultValue="dropdowns">
          <TabsList className="mb-4">
            <TabsTrigger value="dropdowns">Dropdown Fields</TabsTrigger>
            <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
            <TabsTrigger value="workflow">Workflow Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dropdowns" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <DropdownConfigList
                  entityType={entityType}
                  configurations={configurations?.data || []}
                  isLoading={isLoading}
                  onAddNew={handleAddNew}
                  onSelectConfig={handleSelectConfig}
                  selectedConfigId={selectedConfigId}
                />
              </div>
              <div className="md:col-span-2">
                {(isAddingNew || selectedConfigId) && (
                  <DropdownConfigForm
                    entityType={entityType}
                    configId={selectedConfigId}
                    onClose={handleFormClose}
                    isNew={isAddingNew}
                  />
                )}
                {!isAddingNew && !selectedConfigId && (
                  <div className="flex h-full items-center justify-center border rounded-lg p-8 bg-muted/30">
                    <div className="text-center">
                      <h3 className="text-lg font-medium">No Configuration Selected</h3>
                      <p className="text-muted-foreground mt-1">
                        Select a configuration to edit or add a new one
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="risk" className="space-y-6">
            <Tabs defaultValue="questions">
              <TabsList className="mb-4">
                <TabsTrigger value="questions">Risk Questions</TabsTrigger>
                <TabsTrigger value="thresholds">Risk Thresholds</TabsTrigger>
              </TabsList>
              
              <TabsContent value="questions" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <Card className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Risk Assessment Questions</h3>
                        <Button variant="outline" size="sm" onClick={handleAddQuestion}>
                          Add New
                        </Button>
                      </div>
                      
                      {isLoadingQuestions ? (
                        <div className="flex justify-center p-4">Loading questions...</div>
                      ) : (
                        <div className="space-y-2">
                          {riskQuestions?.data?.map((question) => (
                            <div 
                              key={question.id} 
                              className={`p-3 border rounded-md cursor-pointer hover:bg-muted transition-colors ${
                                selectedQuestionId === question.id ? 'border-primary bg-primary/10' : ''
                              }`}
                              onClick={() => handleSelectQuestion(question.id)}
                            >
                              <p className="font-medium truncate">{question.question}</p>
                              <p className="text-xs text-muted-foreground">Weight: {question.weight}</p>
                              <p className="text-xs text-muted-foreground">{question.answers.length} options</p>
                            </div>
                          ))}
                          
                          {riskQuestions?.data?.length === 0 && (
                            <div className="p-4 text-center text-muted-foreground">
                              No questions defined yet
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  </div>
                  <div className="md:col-span-2">
                    {(isAddingQuestion || selectedQuestionId) && (
                      <RiskAssessmentQuestionForm
                        questionId={selectedQuestionId}
                        isNew={isAddingQuestion}
                        onClose={handleQuestionFormClose}
                        userId={user?.id || ''}
                      />
                    )}
                    {!isAddingQuestion && !selectedQuestionId && (
                      <div className="flex h-full items-center justify-center border rounded-lg p-8 bg-muted/30">
                        <div className="text-center">
                          <h3 className="text-lg font-medium">No Question Selected</h3>
                          <p className="text-muted-foreground mt-1">
                            Select a question to edit or add a new one
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="thresholds" className="space-y-4">
                {!isLoadingThresholds && riskThresholds?.data && (
                  <RiskThresholdsForm 
                    initialThresholds={riskThresholds.data}
                    userId={user?.id || ''} 
                  />
                )}
                {isLoadingThresholds && (
                  <div className="flex justify-center p-4">Loading thresholds...</div>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          <TabsContent value="workflow" className="space-y-4">
            {/* Workflow Configuration Component will go here */}
            <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
              <div className="text-center">
                <h3 className="text-lg font-medium">Workflow Configuration</h3>
                <p className="text-muted-foreground mt-1">
                  Configure change management workflow and approval process
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default ChangeConfiguration;
