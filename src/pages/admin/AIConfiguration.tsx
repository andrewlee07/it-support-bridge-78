
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AIConfiguration: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-4o-mini');
  const [enableAI, setEnableAI] = useState(true);
  const [temperature, setTemperature] = useState('0.5');
  const [isSaving, setIsSaving] = useState(false);
  const [requestLimitPerDay, setRequestLimitPerDay] = useState('50');
  const [requestLimitPerHour, setRequestLimitPerHour] = useState('10');
  
  // Load saved settings on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('aiSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setApiKey(parsedSettings.apiKey || '');
        setModel(parsedSettings.model || 'gpt-4o-mini');
        setEnableAI(parsedSettings.enableAI !== undefined ? parsedSettings.enableAI : true);
        setTemperature(parsedSettings.temperature?.toString() || '0.5');
        setRequestLimitPerDay(parsedSettings.requestLimitPerDay?.toString() || '50');
        setRequestLimitPerHour(parsedSettings.requestLimitPerHour?.toString() || '10');
      } catch (error) {
        console.error('Error parsing saved AI settings:', error);
      }
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter an OpenAI API key');
      return;
    }
    
    setIsSaving(true);
    
    // In a real app, this would save to database or API
    setTimeout(() => {
      // Save settings to localStorage for demo purposes
      const settings = {
        apiKey,
        model,
        enableAI,
        temperature: parseFloat(temperature),
        requestLimitPerDay: parseInt(requestLimitPerDay),
        requestLimitPerHour: parseInt(requestLimitPerHour)
      };
      localStorage.setItem('aiSettings', JSON.stringify(settings));
      
      toast.success('AI configuration saved successfully');
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">AI Configuration</h1>
        <p className="text-muted-foreground">Configure AI settings for the portal and knowledge base</p>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          You need to provide an OpenAI API key to enable AI features in the portal.
          Your API key is stored securely and never shared.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="models">Model Configuration</TabsTrigger>
          <TabsTrigger value="limits">Usage Limits</TabsTrigger>
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
                <Label htmlFor="apiKey">OpenAI API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your OpenAI API key"
                />
                <p className="text-xs text-muted-foreground">
                  Required for AI features to work. Get your key from the OpenAI website.
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
                    <SelectItem value="gpt-4o-mini">GPT-4o Mini (Fastest, most economical)</SelectItem>
                    <SelectItem value="gpt-4o">GPT-4o (Most powerful)</SelectItem>
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

        <TabsContent value="limits">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Usage Limits</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Set limits to prevent abuse and control API costs
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requestLimitPerHour">Requests per hour (per user)</Label>
                <Input
                  id="requestLimitPerHour"
                  type="number"
                  min="1"
                  max="100"
                  value={requestLimitPerHour}
                  onChange={(e) => setRequestLimitPerHour(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requestLimitPerDay">Requests per day (per user)</Label>
                <Input
                  id="requestLimitPerDay"
                  type="number"
                  min="1"
                  max="1000"
                  value={requestLimitPerDay}
                  onChange={(e) => setRequestLimitPerDay(e.target.value)}
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
