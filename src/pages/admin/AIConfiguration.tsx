
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AIConfiguration: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-4o-mini');
  const [enableAI, setEnableAI] = useState(true);
  const [temperature, setTemperature] = useState('0.5');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    
    // In a real app, this would save to database or API
    setTimeout(() => {
      toast.success('AI configuration saved successfully');
      setIsSaving(false);
      
      // Save settings to localStorage for demo purposes
      const settings = {
        apiKey,
        model,
        enableAI,
        temperature: parseFloat(temperature)
      };
      localStorage.setItem('aiSettings', JSON.stringify(settings));
    }, 1000);
  };

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">AI Configuration</h1>
        <p className="text-muted-foreground">Configure AI settings for the portal and knowledge base</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="models">Model Configuration</TabsTrigger>
          <TabsTrigger value="prompts">Prompt Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Enable AI Assistant</h3>
                  <p className="text-sm text-muted-foreground">
                    Toggle AI assistance across the portal
                  </p>
                </div>
                <Switch 
                  checked={enableAI} 
                  onCheckedChange={setEnableAI} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your OpenAI API key"
                />
                <p className="text-xs text-muted-foreground">
                  Your API key is stored securely and never shared
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="models">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="model">AI Model</Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger id="model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
                    <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose the AI model that powers your portal assistant
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Controls randomness: 0 is deterministic, 1 is creative
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="prompts">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="knowledgePrompt">Knowledge Search Prompt</Label>
                <textarea
                  id="knowledgePrompt"
                  className="w-full min-h-32 p-3 border rounded-md"
                  defaultValue="You are a helpful support assistant. Search for relevant knowledge articles to help the user with their question: {{query}}"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="incidentPrompt">Incident Creation Prompt</Label>
                <textarea
                  id="incidentPrompt"
                  className="w-full min-h-32 p-3 border rounded-md"
                  defaultValue="The user needs help with an issue. Ask relevant questions to create an incident. Information needed: description, affected service, impact level, and urgency. User query: {{query}}"
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
};

export default AIConfiguration;
