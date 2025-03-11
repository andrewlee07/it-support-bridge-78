
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NotificationChannel, ChannelRoutingRule, ChannelTestResult } from '@/utils/types/eventBus';
import { ChevronDown, ChevronUp, Plus, Trash, Settings2, RefreshCw, AlertTriangle, Check } from 'lucide-react';
import { toast } from 'sonner';
import MultiChannelNotificationService from '@/utils/eventBus/MultiChannelNotificationService';
import { mockNotifications } from '@/components/shared/notifications/mockNotifications';

interface MultiChannelConfigSectionProps {
  onUpdate?: () => void;
}

const MultiChannelConfigSection: React.FC<MultiChannelConfigSectionProps> = ({ onUpdate }) => {
  const [activeTab, setActiveTab] = useState('channels');
  const [isChannelDialogOpen, setIsChannelDialogOpen] = useState(false);
  const [isRuleDialogOpen, setIsRuleDialogOpen] = useState(false);
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [testResults, setTestResults] = useState<ChannelTestResult[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  
  const channelService = MultiChannelNotificationService.getInstance();
  const channels = channelService.getChannels();
  const routingRules = channelService.getRoutingRules();
  
  // Move a channel up in priority
  const moveChannelUp = (index: number) => {
    if (index <= 0) return;
    
    const channelId = channels[index].id;
    const newPriority = channels[index - 1].priority - 1;
    channelService.updateChannel(channelId, { priority: newPriority });
    
    if (onUpdate) onUpdate();
    toast.success('Channel priority updated');
  };
  
  // Move a channel down in priority
  const moveChannelDown = (index: number) => {
    if (index >= channels.length - 1) return;
    
    const channelId = channels[index].id;
    const newPriority = channels[index + 1].priority + 1;
    channelService.updateChannel(channelId, { priority: newPriority });
    
    if (onUpdate) onUpdate();
    toast.success('Channel priority updated');
  };
  
  // Toggle channel enabled state
  const toggleChannelEnabled = (id: string, currentState: boolean) => {
    channelService.updateChannel(id, { enabled: !currentState });
    
    if (onUpdate) onUpdate();
    toast.success(`Channel ${currentState ? 'disabled' : 'enabled'}`);
  };
  
  // Toggle rule active state
  const toggleRuleActive = (id: string, currentState: boolean) => {
    channelService.updateRoutingRule(id, { isActive: !currentState });
    
    if (onUpdate) onUpdate();
    toast.success(`Routing rule ${currentState ? 'disabled' : 'enabled'}`);
  };
  
  // Test all channels
  const testAllChannels = async () => {
    setIsTesting(true);
    
    try {
      // Use a sample notification for testing
      const testNotification = mockNotifications[0];
      const results = await channelService.testAllChannels(testNotification);
      setTestResults(results);
    } catch (error) {
      toast.error('Failed to test channels');
      console.error('Channel test error:', error);
    } finally {
      setIsTesting(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="channels">Notification Channels</TabsTrigger>
          <TabsTrigger value="routing">Routing Rules</TabsTrigger>
        </TabsList>
        
        <TabsContent value="channels" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Available Channels</h3>
            <div className="flex gap-2">
              <Button 
                onClick={() => setIsTestDialogOpen(true)} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                Test Channels
              </Button>
              <Button 
                onClick={() => setIsChannelDialogOpen(true)} 
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Channel
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Channel</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead>Capabilities</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {channels.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No channels configured. Add your first channel to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    channels
                      .sort((a, b) => a.priority - b.priority)
                      .map((channel, index) => (
                        <TableRow key={channel.id}>
                          <TableCell className="font-medium">
                            {channel.name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{channel.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-mono">{channel.priority}</span>
                              <div className="flex flex-col">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-5 w-5" 
                                  onClick={() => moveChannelUp(index)}
                                  disabled={index === 0}
                                >
                                  <ChevronUp className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-5 w-5" 
                                  onClick={() => moveChannelDown(index)}
                                  disabled={index === channels.length - 1}
                                >
                                  <ChevronDown className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Switch 
                              checked={channel.enabled} 
                              onCheckedChange={() => toggleChannelEnabled(channel.id, channel.enabled)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1 flex-wrap">
                              {channel.capabilities.supportsFormatting && (
                                <Badge variant="secondary" className="text-xs px-1">Format</Badge>
                              )}
                              {channel.capabilities.supportsAttachments && (
                                <Badge variant="secondary" className="text-xs px-1">Files</Badge>
                              )}
                              {channel.capabilities.supportsThreading && (
                                <Badge variant="secondary" className="text-xs px-1">Threading</Badge>
                              )}
                              {channel.capabilities.supportsAcknowledgement && (
                                <Badge variant="secondary" className="text-xs px-1">Ack</Badge>
                              )}
                              {channel.capabilities.supportsReply && (
                                <Badge variant="secondary" className="text-xs px-1">Reply</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Settings2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="routing" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Routing Rules</h3>
            <Button 
              onClick={() => setIsRuleDialogOpen(true)} 
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Rule Name</TableHead>
                    <TableHead>Conditions</TableHead>
                    <TableHead>Target Channel</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routingRules.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No routing rules configured. Add your first rule to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    routingRules
                      .sort((a, b) => a.priority - b.priority)
                      .map((rule) => {
                        const targetChannel = channels.find(c => c.id === rule.channelId);
                        
                        return (
                          <TableRow key={rule.id}>
                            <TableCell className="font-medium">
                              {rule.name}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {rule.conditions.map((condition, i) => (
                                  <Badge key={i} variant="outline" className="text-xs px-1">
                                    {condition.field} {condition.operator} {String(condition.value)}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              {targetChannel ? (
                                <Badge>{targetChannel.name}</Badge>
                              ) : (
                                <Badge variant="destructive">Missing Channel</Badge>
                              )}
                            </TableCell>
                            <TableCell>{rule.priority}</TableCell>
                            <TableCell>
                              <Switch 
                                checked={rule.isActive} 
                                onCheckedChange={() => toggleRuleActive(rule.id, rule.isActive)}
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <Settings2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Channel Dialog */}
      <Dialog open={isChannelDialogOpen} onOpenChange={setIsChannelDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Notification Channel</DialogTitle>
            <DialogDescription>
              Configure a new channel for delivering notifications
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="channel-name" className="text-right">
                Name
              </Label>
              <Input
                id="channel-name"
                placeholder="Channel name"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="channel-type" className="text-right">
                Type
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select channel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="slack">Slack</SelectItem>
                  <SelectItem value="inApp">In-App</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="webhook">Webhook</SelectItem>
                  <SelectItem value="teams">Microsoft Teams</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="channel-priority" className="text-right">
                Priority
              </Label>
              <Input
                id="channel-priority"
                type="number"
                placeholder="1"
                min="1"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="channel-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="channel-description"
                placeholder="Channel description"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right">
                <Label>Capabilities</Label>
              </div>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cap-formatting">Supports formatting</Label>
                  <Switch id="cap-formatting" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="cap-attachments">Supports attachments</Label>
                  <Switch id="cap-attachments" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="cap-threading">Supports threading</Label>
                  <Switch id="cap-threading" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="cap-ack">Supports acknowledgement</Label>
                  <Switch id="cap-ack" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="cap-reply">Supports reply</Label>
                  <Switch id="cap-reply" />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsChannelDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success("Channel added successfully");
              setIsChannelDialogOpen(false);
              if (onUpdate) onUpdate();
            }}>
              Add Channel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Routing Rule Dialog */}
      <Dialog open={isRuleDialogOpen} onOpenChange={setIsRuleDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Routing Rule</DialogTitle>
            <DialogDescription>
              Create a rule to route notifications to specific channels
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rule-name" className="text-right">
                Name
              </Label>
              <Input
                id="rule-name"
                placeholder="Rule name"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rule-channel" className="text-right">
                Target Channel
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select target channel" />
                </SelectTrigger>
                <SelectContent>
                  {channels.map(channel => (
                    <SelectItem key={channel.id} value={channel.id}>
                      {channel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rule-fallback" className="text-right">
                Fallback Channel
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select fallback channel (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {channels.map(channel => (
                    <SelectItem key={channel.id} value={channel.id}>
                      {channel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rule-priority" className="text-right">
                Priority
              </Label>
              <Input
                id="rule-priority"
                type="number"
                placeholder="1"
                min="1"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <div className="text-right pt-2">
                <Label>Conditions</Label>
              </div>
              <div className="col-span-3 space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="grid grid-cols-3 gap-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="audience">Audience</SelectItem>
                        <SelectItem value="importance">Importance</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                        <SelectItem value="tags">Tags</SelectItem>
                        <SelectItem value="time">Time</SelectItem>
                        <SelectItem value="userPreference">User Preference</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Operator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="startsWith">Starts With</SelectItem>
                        <SelectItem value="endsWith">Ends With</SelectItem>
                        <SelectItem value="greaterThan">Greater Than</SelectItem>
                        <SelectItem value="lessThan">Less Than</SelectItem>
                        <SelectItem value="in">In</SelectItem>
                        <SelectItem value="notIn">Not In</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Input placeholder="Value" />
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Condition
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rule-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="rule-description"
                placeholder="Rule description"
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRuleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success("Routing rule added successfully");
              setIsRuleDialogOpen(false);
              if (onUpdate) onUpdate();
            }}>
              Add Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Test Channels Dialog */}
      <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Test Notification Channels</DialogTitle>
            <DialogDescription>
              Send test notifications to all configured channels
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {testResults.length === 0 ? (
              <div className="text-center p-4">
                <p className="text-muted-foreground mb-4">
                  Click the button below to test all active notification channels.
                </p>
                <Button 
                  onClick={testAllChannels} 
                  disabled={isTesting}
                  className="w-full"
                >
                  {isTesting ? "Testing Channels..." : "Test All Channels"}
                </Button>
              </div>
            ) : (
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {testResults.map((result) => (
                    <Card key={result.channelId} className={result.success ? "border-green-200" : "border-red-200"}>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-sm font-medium">
                            {result.channelName}
                          </CardTitle>
                          {result.success ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <Check className="h-3 w-3 mr-1" />
                              Success
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Failed
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        {result.success ? (
                          <>
                            <p className="text-sm text-muted-foreground mb-2">
                              Delivery time: {result.deliveryTime?.toFixed(0)}ms
                            </p>
                            {result.messagePreview && (
                              <div className="bg-muted p-2 rounded text-xs font-mono whitespace-pre-wrap">
                                {result.messagePreview}
                              </div>
                            )}
                          </>
                        ) : (
                          <p className="text-sm text-red-600">
                            {result.error || "Unknown error"}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTestDialogOpen(false)}>
              Close
            </Button>
            {testResults.length > 0 && (
              <Button 
                onClick={testAllChannels} 
                disabled={isTesting}
              >
                Test Again
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MultiChannelConfigSection;
