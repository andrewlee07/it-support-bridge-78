
import React from 'react';
import EventDocumentationTable from '@/components/admin/notifications/EventDocumentationTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EventDocumentationPage: React.FC = () => {
  return (
    <div className="container py-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Event Documentation</h1>
        <p className="text-muted-foreground">
          Comprehensive documentation for all system events
        </p>
      </div>
      
      <Tabs defaultValue="events">
        <TabsList className="w-full">
          <TabsTrigger value="events" className="flex-1">Events</TabsTrigger>
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events">
          <EventDocumentationTable />
        </TabsContent>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Naming Convention</CardTitle>
                <CardDescription>
                  Standardized naming pattern for all events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><code className="bg-muted px-1 rounded">&#123;process&#125;.&#123;action&#125;</code>: Basic event format</li>
                  <li><code className="bg-muted px-1 rounded">&#123;process&#125;.&#123;action&#125;.&#123;qualifier&#125;</code>: Extended format with qualifier</li>
                </ul>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Examples:</h4>
                  <ul className="space-y-1 ml-4 list-disc">
                    <li><code>incident.created</code> - Basic incident creation</li>
                    <li><code>incident.created.p1</code> - P1 incident creation</li>
                    <li><code>sla.warning.response</code> - Response SLA warning</li>
                    <li><code>task.overdue.critical</code> - Critical task is overdue</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Event Qualifier Types</CardTitle>
                <CardDescription>
                  Standard qualifiers used across events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li>
                    <div className="font-medium">Priority Qualifiers</div>
                    <div className="flex gap-2 mt-1">
                      <code className="bg-muted px-1 rounded">p1</code>
                      <code className="bg-muted px-1 rounded">p2</code>
                      <code className="bg-muted px-1 rounded">p3</code>
                      <code className="bg-muted px-1 rounded">p4</code>
                    </div>
                  </li>
                  <li>
                    <div className="font-medium">Severity Qualifiers</div>
                    <div className="flex gap-2 mt-1">
                      <code className="bg-muted px-1 rounded">critical</code>
                      <code className="bg-muted px-1 rounded">high</code>
                      <code className="bg-muted px-1 rounded">medium</code>
                      <code className="bg-muted px-1 rounded">low</code>
                    </div>
                  </li>
                  <li>
                    <div className="font-medium">Time Qualifiers</div>
                    <div className="flex gap-2 mt-1">
                      <code className="bg-muted px-1 rounded">approaching</code> (75% or more of time elapsed)
                      <code className="bg-muted px-1 rounded">imminent</code> (90% or more of time elapsed)
                    </div>
                  </li>
                  <li>
                    <div className="font-medium">SLA Type Qualifiers</div>
                    <div className="flex gap-2 mt-1">
                      <code className="bg-muted px-1 rounded">response</code>
                      <code className="bg-muted px-1 rounded">resolution</code>
                      <code className="bg-muted px-1 rounded">update</code>
                    </div>
                  </li>
                  <li>
                    <div className="font-medium">Outcome Qualifiers</div>
                    <div className="flex gap-2 mt-1">
                      <code className="bg-muted px-1 rounded">success</code>
                      <code className="bg-muted px-1 rounded">failure</code>
                      <code className="bg-muted px-1 rounded">partial</code>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Event Data Structure</CardTitle>
                <CardDescription>
                  Standard fields present in all events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Core Fields</h4>
                    <ul className="space-y-1 ml-4 list-disc">
                      <li><code className="font-mono">id</code>: Unique identifier for the event</li>
                      <li><code className="font-mono">type</code>: Event type following naming convention</li>
                      <li><code className="font-mono">source</code>: System component that generated the event</li>
                      <li><code className="font-mono">timestamp</code>: When the event occurred</li>
                      <li><code className="font-mono">data</code>: Primary data payload for the event</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Optional Fields</h4>
                    <ul className="space-y-1 ml-4 list-disc">
                      <li><code className="font-mono">actor</code>: User or system that triggered the event</li>
                      <li><code className="font-mono">entity</code>: Primary record associated with the event</li>
                      <li><code className="font-mono">changes</code>: What changed (for update events)</li>
                      <li><code className="font-mono">metadata</code>: Additional contextual information</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Example Event Object</h4>
                  <pre className="bg-muted p-3 rounded text-xs overflow-auto">
{`{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "type": "incident.created.p1",
  "source": "web-portal",
  "timestamp": "2023-06-15T14:30:45.123Z",
  "data": {
    "incidentId": "INC-1234",
    "title": "Database server down",
    "description": "Production database is not responding",
    "priority": "p1",
    "affectedService": "Payment Processing"
  },
  "actor": {
    "id": "user-123",
    "name": "John Smith",
    "type": "user",
    "email": "john.smith@example.com"
  },
  "entity": {
    "id": "INC-1234",
    "type": "incident",
    "name": "Database server down",
    "url": "/incidents/INC-1234"
  },
  "metadata": {
    "correlationId": "abcd-1234-efgh-5678",
    "origin": "web-portal",
    "userId": "user-123",
    "tenantId": "tenant-abc",
    "severity": "critical",
    "tags": ["production", "database", "outage"]
  }
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventDocumentationPage;
