
import React, { useState } from 'react';
import EventDocumentationTable from '@/components/admin/notifications/EventDocumentationTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Bell, BookOpen, Layers, List, Search, ToggleLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EventDocumentationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState<{ [key: string]: boolean }>({
    incident: true,
    problem: true,
    change: true,
    release: true,
    service: true,
    knownError: true,
    task: true,
    asset: true,
    sla: true,
    test: true,
    security: true,
    knowledge: true,
  });

  const handleFilterToggle = (eventType: string) => {
    setEventFilter(prev => ({
      ...prev,
      [eventType]: !prev[eventType]
    }));
  };

  return (
    <PageTransition>
      <div className="container py-6 mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link to="/admin/notification-configuration">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Notification Configuration
            </Link>
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Event Documentation</h1>
          <p className="text-muted-foreground">
            Comprehensive documentation for all system events and their data structures
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Event Filters</CardTitle>
                <CardDescription>
                  Filter the types of events shown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search events..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Event Categories</Label>
                  <ScrollArea className="h-[280px] pr-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-incident" 
                          checked={eventFilter.incident}
                          onCheckedChange={() => handleFilterToggle('incident')}
                        />
                        <Label htmlFor="filter-incident" className="flex items-center">
                          Incident Events
                          <Badge variant="outline" className="ml-2">12</Badge>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-problem" 
                          checked={eventFilter.problem}
                          onCheckedChange={() => handleFilterToggle('problem')}
                        />
                        <Label htmlFor="filter-problem" className="flex items-center">
                          Problem Events
                          <Badge variant="outline" className="ml-2">7</Badge>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-change" 
                          checked={eventFilter.change}
                          onCheckedChange={() => handleFilterToggle('change')}
                        />
                        <Label htmlFor="filter-change" className="flex items-center">
                          Change Events
                          <Badge variant="outline" className="ml-2">14</Badge>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-release" 
                          checked={eventFilter.release}
                          onCheckedChange={() => handleFilterToggle('release')}
                        />
                        <Label htmlFor="filter-release" className="flex items-center">
                          Release Events
                          <Badge variant="outline" className="ml-2">16</Badge>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-service" 
                          checked={eventFilter.service}
                          onCheckedChange={() => handleFilterToggle('service')}
                        />
                        <Label htmlFor="filter-service" className="flex items-center">
                          Service Request Events
                          <Badge variant="outline" className="ml-2">7</Badge>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-knownError" 
                          checked={eventFilter.knownError}
                          onCheckedChange={() => handleFilterToggle('knownError')}
                        />
                        <Label htmlFor="filter-knownError" className="flex items-center">
                          Known Error Events
                          <Badge variant="outline" className="ml-2">5</Badge>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-task" 
                          checked={eventFilter.task}
                          onCheckedChange={() => handleFilterToggle('task')}
                        />
                        <Label htmlFor="filter-task" className="flex items-center">
                          Task Events
                          <Badge variant="outline" className="ml-2">8</Badge>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-asset" 
                          checked={eventFilter.asset}
                          onCheckedChange={() => handleFilterToggle('asset')}
                        />
                        <Label htmlFor="filter-asset" className="flex items-center">
                          Asset Events
                          <Badge variant="outline" className="ml-2">5</Badge>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-sla" 
                          checked={eventFilter.sla}
                          onCheckedChange={() => handleFilterToggle('sla')}
                        />
                        <Label htmlFor="filter-sla" className="flex items-center">
                          SLA Events
                          <Badge variant="outline" className="ml-2">6</Badge>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-test" 
                          checked={eventFilter.test}
                          onCheckedChange={() => handleFilterToggle('test')}
                        />
                        <Label htmlFor="filter-test" className="flex items-center">
                          Test Events
                          <Badge variant="outline" className="ml-2">9</Badge>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-security" 
                          checked={eventFilter.security}
                          onCheckedChange={() => handleFilterToggle('security')}
                        />
                        <Label htmlFor="filter-security" className="flex items-center">
                          Security Events
                          <Badge variant="outline" className="ml-2">11</Badge>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-knowledge" 
                          checked={eventFilter.knowledge}
                          onCheckedChange={() => handleFilterToggle('knowledge')}
                        />
                        <Label htmlFor="filter-knowledge" className="flex items-center">
                          Knowledge Events
                          <Badge variant="outline" className="ml-2">4</Badge>
                        </Label>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Label className="text-sm font-medium">View Options</Label>
                  <div className="mt-2">
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Show all events" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Show all events</SelectItem>
                        <SelectItem value="implemented">Implemented events only</SelectItem>
                        <SelectItem value="notifiable">Notifiable events only</SelectItem>
                        <SelectItem value="custom">Custom view</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/admin/notification-configuration">
                      <Bell className="h-4 w-4 mr-2" />
                      Notification Settings
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/admin/notification-configuration?tab=templates">
                      <Layers className="h-4 w-4 mr-2" />
                      Notification Templates
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/admin/notification-configuration?tab=channels">
                      <ToggleLeft className="h-4 w-4 mr-2" />
                      Delivery Channels
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/admin/admin-settings">
                      <List className="h-4 w-4 mr-2" />
                      Admin Settings
                    </Link>
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="events">
              <TabsList className="w-full">
                <TabsTrigger value="events" className="flex-1">
                  <Search className="h-4 w-4 mr-2" />
                  Events Explorer
                </TabsTrigger>
                <TabsTrigger value="overview" className="flex-1">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Documentation
                </TabsTrigger>
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
        </div>
      </div>
    </PageTransition>
  );
};

export default EventDocumentationPage;
