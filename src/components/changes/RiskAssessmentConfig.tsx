
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { RiskAssessmentQuestion, RiskAssessmentQuestionOption, RiskThreshold } from '@/utils/types';
import { PlusCircle, Trash2, ArrowUpDown, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RiskAssessmentConfigProps {
  questions: RiskAssessmentQuestion[];
  thresholds: RiskThreshold[];
  onSaveQuestions: (questions: RiskAssessmentQuestion[]) => void;
  onSaveThresholds: (thresholds: RiskThreshold[]) => void;
}

const RiskAssessmentConfig: React.FC<RiskAssessmentConfigProps> = ({
  questions: initialQuestions,
  thresholds: initialThresholds,
  onSaveQuestions,
  onSaveThresholds
}) => {
  const [questions, setQuestions] = useState<RiskAssessmentQuestion[]>(initialQuestions);
  const [thresholds, setThresholds] = useState<RiskThreshold[]>(initialThresholds);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);
  const { toast } = useToast();
  
  const handleQuestionChange = (index: number, field: keyof RiskAssessmentQuestion, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setQuestions(updatedQuestions);
  };
  
  const handleOptionChange = (questionIndex: number, optionIndex: number, field: keyof RiskAssessmentQuestionOption, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[optionIndex] = {
      ...updatedQuestions[questionIndex].answers[optionIndex],
      [field]: field === 'value' ? Number(value) : value
    };
    setQuestions(updatedQuestions);
  };
  
  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    const newOptionId = `${updatedQuestions[questionIndex].id}-a${updatedQuestions[questionIndex].answers.length + 1}`;
    
    updatedQuestions[questionIndex].answers.push({
      id: newOptionId,
      text: '',
      value: 1
    });
    
    setQuestions(updatedQuestions);
  };
  
  const removeOption = (questionIndex: number, optionIndex: number) => {
    if (questions[questionIndex].answers.length <= 1) {
      toast({
        title: "Cannot remove option",
        description: "A question must have at least one option",
        variant: "destructive"
      });
      return;
    }
    
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };
  
  const addQuestion = () => {
    const newQuestionId = `question-${questions.length + 1}`;
    
    const newQuestion: RiskAssessmentQuestion = {
      id: newQuestionId,
      question: '',
      weight: 1,
      answers: [
        {
          id: `${newQuestionId}-a1`,
          text: '',
          value: 1
        }
      ],
      isRequired: true,
      active: true
    };
    
    setQuestions([...questions, newQuestion]);
    setActiveQuestionIndex(questions.length);
  };
  
  const removeQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    setActiveQuestionIndex(null);
  };
  
  const handleToggleActive = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].active = !updatedQuestions[index].active;
    setQuestions(updatedQuestions);
  };
  
  const handleThresholdChange = (index: number, field: keyof RiskThreshold, value: any) => {
    const updatedThresholds = [...thresholds];
    updatedThresholds[index] = {
      ...updatedThresholds[index],
      [field]: field === 'minScore' || field === 'maxScore' ? Number(value) : value
    };
    setThresholds(updatedThresholds);
  };
  
  const handleSaveQuestions = () => {
    // Validate questions
    const invalidQuestions = questions.filter(q => !q.question.trim());
    if (invalidQuestions.length > 0) {
      toast({
        title: "Cannot save questions",
        description: "All questions must have content",
        variant: "destructive"
      });
      return;
    }
    
    // Validate options
    for (const q of questions) {
      const invalidOptions = q.answers.filter(a => !a.text.trim());
      if (invalidOptions.length > 0) {
        toast({
          title: "Cannot save questions",
          description: `Question "${q.question}" has options without text`,
          variant: "destructive"
        });
        return;
      }
    }
    
    onSaveQuestions(questions);
    toast({
      title: "Questions saved",
      description: "Risk assessment questions have been updated",
    });
  };
  
  const handleSaveThresholds = () => {
    // Validate thresholds
    for (let i = 0; i < thresholds.length - 1; i++) {
      if (thresholds[i].maxScore !== thresholds[i + 1].minScore) {
        toast({
          title: "Cannot save thresholds",
          description: "Threshold ranges must be continuous",
          variant: "destructive"
        });
        return;
      }
    }
    
    onSaveThresholds(thresholds);
    toast({
      title: "Thresholds saved",
      description: "Risk level thresholds have been updated",
    });
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>Risk Assessment Configuration</CardTitle>
        <CardDescription>
          Manage risk assessment questions and scoring thresholds
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="questions">
          <TabsList className="mb-4">
            <TabsTrigger value="questions">Questions & Answers</TabsTrigger>
            <TabsTrigger value="thresholds">Risk Thresholds</TabsTrigger>
          </TabsList>
          
          <TabsContent value="questions" className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={addQuestion} size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Question List */}
              <div className="border rounded-md p-3 space-y-2">
                <h3 className="font-medium">Questions</h3>
                <div className="space-y-1">
                  {questions.map((question, index) => (
                    <div 
                      key={question.id}
                      className={`text-sm p-2 rounded cursor-pointer flex justify-between items-center ${
                        activeQuestionIndex === index ? 'bg-primary/10' : 'hover:bg-muted'
                      } ${!question.active ? 'opacity-50' : ''}`}
                      onClick={() => setActiveQuestionIndex(index)}
                    >
                      <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[80%]">
                        {question.question || 'Untitled Question'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleActive(index);
                          }}
                          title={question.active ? "Deactivate" : "Activate"}
                        >
                          {question.active ? (
                            <Edit className="h-3 w-3" />
                          ) : (
                            <ArrowUpDown className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeQuestion(index);
                          }}
                          title="Remove question"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {questions.length === 0 && (
                    <div className="text-sm text-muted-foreground text-center py-6">
                      No questions added yet
                    </div>
                  )}
                </div>
              </div>
              
              {/* Question Details */}
              <div className="border rounded-md p-3 md:col-span-2">
                {activeQuestionIndex !== null ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="question">Question</Label>
                      <Input 
                        id="question"
                        value={questions[activeQuestionIndex].question}
                        onChange={(e) => handleQuestionChange(activeQuestionIndex, 'question', e.target.value)}
                        placeholder="Enter question text"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="weight">Weight</Label>
                      <Input 
                        id="weight"
                        type="number"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={questions[activeQuestionIndex].weight}
                        onChange={(e) => handleQuestionChange(activeQuestionIndex, 'weight', Number(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Higher weights give this question more influence on the risk score
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Answer Options</Label>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => addOption(activeQuestionIndex)}
                        >
                          <PlusCircle className="mr-1 h-3 w-3" />
                          Add Option
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {questions[activeQuestionIndex].answers.map((option, optionIndex) => (
                          <div key={option.id} className="flex gap-2 items-center">
                            <div className="flex-grow">
                              <Input 
                                value={option.text}
                                onChange={(e) => handleOptionChange(activeQuestionIndex, optionIndex, 'text', e.target.value)}
                                placeholder="Answer text"
                              />
                            </div>
                            <div className="w-16">
                              <Input 
                                type="number"
                                min="1"
                                max="5"
                                value={option.value}
                                onChange={(e) => handleOptionChange(activeQuestionIndex, optionIndex, 'value', e.target.value)}
                                title="Risk value (1-5)"
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeOption(activeQuestionIndex, optionIndex)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    Select a question or add a new one to edit
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSaveQuestions}>Save Questions</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="thresholds">
            <div className="space-y-6">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-4">Risk Level Thresholds</h3>
                
                <div className="space-y-4">
                  {thresholds.map((threshold, index) => (
                    <div key={threshold.id} className="grid grid-cols-3 gap-4 items-center">
                      <div>
                        <Label className="mb-1 block">{threshold.level.charAt(0).toUpperCase() + threshold.level.slice(1)} Risk</Label>
                      </div>
                      <div>
                        <Label className="text-xs block mb-1">Min Score</Label>
                        <Input 
                          type="number" 
                          step="0.1"
                          value={threshold.minScore}
                          onChange={(e) => handleThresholdChange(index, 'minScore', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-xs block mb-1">Max Score</Label>
                        <Input 
                          type="number" 
                          step="0.1"
                          value={threshold.maxScore}
                          onChange={(e) => handleThresholdChange(index, 'maxScore', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground">
                    Note: Ensure there are no gaps between threshold ranges (e.g., if Low ends at 2, Medium should start at 2)
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveThresholds}>Save Thresholds</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RiskAssessmentConfig;
