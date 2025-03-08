
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useModuleConfigurations } from '@/hooks/useModuleConfigurations';
import ModuleConfigurationCard from '@/components/admin/ModuleConfigurationCard';

const IncidentConfiguration = () => {
  const { configurations, isLoading, updateConfiguration } = useModuleConfigurations('incident');

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Incident Configuration</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="sla">SLA Settings</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="autoClose">Auto-Close Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Configure general incident settings.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sla" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>SLA Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Configure SLA settings for incidents.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="workflow" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Configure workflow settings for incidents.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="autoClose" className="mt-0">
          <div className="grid gap-4">
            <h2 className="text-xl font-semibold">Auto-Close Settings</h2>
            <p className="text-muted-foreground">
              Configure when incidents are automatically closed after resolution.
            </p>
            
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full" />
              </div>
            ) : (
              <div className="grid gap-4">
                {configurations
                  .filter(config => config.configType === 'autoClose')
                  .map(config => (
                    <ModuleConfigurationCard
                      key={config.id}
                      configuration={config}
                      onUpdate={updateConfiguration}
                    />
                  ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IncidentConfiguration;
