
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  EVENT_GROUPS, 
  EVENT_DOCUMENTATION,
  getEventDocumentation,
  getProcessEvents,
  EventDocumentation
} from '@/utils/eventBus/docs/EventDocumentation';

const EventDocumentationTable: React.FC = () => {
  const [selectedProcess, setSelectedProcess] = useState<string>('Incident Management');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentEvent, setCurrentEvent] = useState<EventDocumentation | null>(null);
  
  // Get events for the selected process
  const eventsForProcess = getProcessEvents(selectedProcess);
  
  // Filter events based on search query
  const filteredEvents = searchQuery 
    ? eventsForProcess.filter(event => event.toLowerCase().includes(searchQuery.toLowerCase()))
    : eventsForProcess;
  
  // Handle event selection for detail view
  const handleEventSelect = (eventType: string) => {
    const eventDoc = getEventDocumentation(eventType as any);
    if (eventDoc) {
      setCurrentEvent(eventDoc);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/4">
          <Select value={selectedProcess} onValueChange={setSelectedProcess}>
            <SelectTrigger>
              <SelectValue placeholder="Select process" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_GROUPS.map(group => (
                <SelectItem key={group.name} value={group.name}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:flex-1">
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>
                {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredEvents.map(event => (
                  <div 
                    key={event} 
                    className={`p-2 rounded cursor-pointer ${currentEvent?.type === event ? 'bg-secondary' : 'hover:bg-secondary/30'}`}
                    onClick={() => handleEventSelect(event)}
                  >
                    <div className="font-medium truncate">{event}</div>
                  </div>
                ))}
                
                {filteredEvents.length === 0 && (
                  <div className="p-4 text-center text-muted-foreground">
                    No events found.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          {currentEvent ? (
            <Card>
              <CardHeader>
                <CardTitle>{currentEvent.type}</CardTitle>
                <CardDescription>
                  {currentEvent.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details">
                  <TabsList className="w-full">
                    <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                    <TabsTrigger value="channels" className="flex-1">Channels & Recipients</TabsTrigger>
                    <TabsTrigger value="example" className="flex-1">Example Data</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Required Fields</h3>
                        <div className="flex flex-wrap gap-2">
                          {currentEvent.dataFields
                            .filter(field => field.required)
                            .map(field => (
                              <Badge key={field.name} variant="default">{field.name}</Badge>
                            ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Optional Fields</h3>
                        <div className="flex flex-wrap gap-2">
                          {currentEvent.dataFields
                            .filter(field => !field.required)
                            .map(field => (
                              <Badge key={field.name} variant="outline">{field.name}</Badge>
                            ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Source</h3>
                        <Badge variant="secondary">{currentEvent.source}</Badge>
                      </div>

                      {currentEvent.notes && currentEvent.notes.length > 0 && (
                        <div>
                          <h3 className="font-medium mb-2">Notes</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {currentEvent.notes.map((note, index) => (
                              <li key={index} className="text-sm text-muted-foreground">{note}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="channels">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Default Recipients</h3>
                        <div className="flex flex-wrap gap-2">
                          {/* This is a placeholder - we'll need to add recipient data to the EventDocumentation type */}
                          <span className="text-muted-foreground">Recipients based on event context</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Default Channels</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">In-app</Badge>
                          <Badge variant="outline">Email</Badge>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="example">
                    <div className="rounded bg-muted p-4 overflow-auto max-h-[400px]">
                      <pre className="text-xs">
                        {currentEvent.example ? JSON.stringify(currentEvent.example, null, 2) : 'No example data available'}
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                <p>Select an event to view its documentation</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDocumentationTable;
