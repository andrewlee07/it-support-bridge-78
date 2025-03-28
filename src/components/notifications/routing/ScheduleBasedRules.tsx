
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Clock, 
  CalendarDays, 
  Trash2, 
  Edit2, 
  Calendar, 
  AlarmClock, 
  MoreHorizontal
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

// Types for schedule-based rules
interface TimeWindow {
  id: string;
  startTime: string;
  endTime: string;
  daysOfWeek: number[]; // 0 = Sunday, 1 = Monday, etc.
}

interface ScheduleRule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  timeWindows: TimeWindow[];
  timezone: string;
  channels: {
    inWindow: string;
    outOfWindow: string;
  };
  priority: number;
  createdAt: string;
  updatedAt: string;
}

// Mock data
const mockScheduleRules: ScheduleRule[] = [
  {
    id: "schedule-1",
    name: "Business Hours Routing",
    description: "Route notifications differently during business hours",
    isActive: true,
    timeWindows: [
      {
        id: "window-1",
        startTime: "09:00",
        endTime: "17:00",
        daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
      }
    ],
    timezone: "America/New_York",
    channels: {
      inWindow: "channel-slack",
      outOfWindow: "channel-email"
    },
    priority: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "schedule-2",
    name: "Weekend Support",
    description: "Route notifications during weekend support hours",
    isActive: false,
    timeWindows: [
      {
        id: "window-2",
        startTime: "10:00",
        endTime: "16:00",
        daysOfWeek: [0, 6], // Saturday and Sunday
      }
    ],
    timezone: "America/Los_Angeles",
    channels: {
      inWindow: "channel-sms",
      outOfWindow: "channel-email"
    },
    priority: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Available timezones (simplified list)
const timezones = [
  { id: "America/New_York", name: "Eastern Time (ET)" },
  { id: "America/Chicago", name: "Central Time (CT)" },
  { id: "America/Denver", name: "Mountain Time (MT)" },
  { id: "America/Los_Angeles", name: "Pacific Time (PT)" },
  { id: "America/Anchorage", name: "Alaska Time (AKT)" },
  { id: "Pacific/Honolulu", name: "Hawaii Time (HT)" },
  { id: "Etc/UTC", name: "Coordinated Universal Time (UTC)" },
  { id: "Europe/London", name: "Greenwich Mean Time (GMT)" },
  { id: "Europe/Paris", name: "Central European Time (CET)" },
  { id: "Asia/Tokyo", name: "Japan Standard Time (JST)" }
];

// Mock channels data
const channels = [
  { id: 'channel-email', name: 'Email' },
  { id: 'channel-slack', name: 'Slack' },
  { id: 'channel-teams', name: 'Microsoft Teams' },
  { id: 'channel-sms', name: 'SMS' },
  { id: 'channel-inapp', name: 'In-App Notification' }
];

const ScheduleBasedRules = () => {
  const { toast } = useToast();
  const [scheduleRules, setScheduleRules] = useState<ScheduleRule[]>(mockScheduleRules);
  
  const [isRuleDialogOpen, setIsRuleDialogOpen] = useState(false);
  const [isWindowDialogOpen, setIsWindowDialogOpen] = useState(false);
  
  const [selectedRule, setSelectedRule] = useState<ScheduleRule | null>(null);
  const [selectedTimeWindow, setSelectedTimeWindow] = useState<TimeWindow | null>(null);
  
  const [ruleFormValues, setRuleFormValues] = useState<Partial<ScheduleRule>>({
    name: '',
    description: '',
    isActive: true,
    timeWindows: [],
    timezone: 'America/New_York',
    channels: {
      inWindow: '',
      outOfWindow: ''
    },
    priority: 10
  });
  
  const [windowFormValues, setWindowFormValues] = useState<Partial<TimeWindow>>({
    startTime: '09:00',
    endTime: '17:00',
    daysOfWeek: [1, 2, 3, 4, 5] // Monday to Friday
  });

  // Handler functions
  const handleAddRule = () => {
    setSelectedRule(null);
    setRuleFormValues({
      name: '',
      description: '',
      isActive: true,
      timeWindows: [],
      timezone: 'America/New_York',
      channels: {
        inWindow: '',
        outOfWindow: ''
      },
      priority: scheduleRules.length + 1
    });
    setIsRuleDialogOpen(true);
  };

  const handleEditRule = (rule: ScheduleRule) => {
    setSelectedRule(rule);
    setRuleFormValues({
      name: rule.name,
      description: rule.description,
      isActive: rule.isActive,
      timeWindows: [...rule.timeWindows],
      timezone: rule.timezone,
      channels: { ...rule.channels },
      priority: rule.priority
    });
    setIsRuleDialogOpen(true);
  };

  const handleDeleteRule = (id: string) => {
    setScheduleRules(scheduleRules.filter(rule => rule.id !== id));
    
    toast({
      title: "Rule deleted",
      description: "Schedule rule has been removed"
    });
  };

  const handleAddTimeWindow = () => {
    if (!selectedRule && !ruleFormValues.timeWindows) return;
    
    setSelectedTimeWindow(null);
    setWindowFormValues({
      startTime: '09:00',
      endTime: '17:00',
      daysOfWeek: [1, 2, 3, 4, 5] // Monday to Friday
    });
    setIsWindowDialogOpen(true);
  };

  const handleEditTimeWindow = (window: TimeWindow) => {
    setSelectedTimeWindow(window);
    setWindowFormValues({
      startTime: window.startTime,
      endTime: window.endTime,
      daysOfWeek: [...window.daysOfWeek]
    });
    setIsWindowDialogOpen(true);
  };

  const handleDeleteTimeWindow = (windowId: string) => {
    const updatedWindows = (ruleFormValues.timeWindows || []).filter(w => w.id !== windowId);
    setRuleFormValues({ ...ruleFormValues, timeWindows: updatedWindows });
    
    toast({
      title: "Time window removed",
      description: "Time window has been removed from the schedule"
    });
  };

  const handleSubmitRule = () => {
    if (!ruleFormValues.name || !ruleFormValues.channels?.inWindow || !ruleFormValues.channels?.outOfWindow) {
      toast({
        title: "Validation Error",
        description: "Name and channel settings are required",
        variant: "destructive"
      });
      return;
    }

    if ((ruleFormValues.timeWindows || []).length === 0) {
      toast({
        title: "Validation Error",
        description: "At least one time window is required",
        variant: "destructive"
      });
      return;
    }

    if (selectedRule) {
      // Update existing rule
      setScheduleRules(scheduleRules.map(rule => 
        rule.id === selectedRule.id
          ? {
              ...rule,
              name: ruleFormValues.name || rule.name,
              description: ruleFormValues.description || rule.description,
              isActive: ruleFormValues.isActive ?? rule.isActive,
              timeWindows: ruleFormValues.timeWindows || rule.timeWindows,
              timezone: ruleFormValues.timezone || rule.timezone,
              channels: ruleFormValues.channels || rule.channels,
              priority: ruleFormValues.priority || rule.priority,
              updatedAt: new Date().toISOString()
            }
          : rule
      ));
      toast({
        title: "Rule updated",
        description: "Schedule rule has been updated successfully"
      });
    } else {
      // Create new rule
      const newRule: ScheduleRule = {
        id: uuidv4(),
        name: ruleFormValues.name || '',
        description: ruleFormValues.description || '',
        isActive: ruleFormValues.isActive ?? true,
        timeWindows: ruleFormValues.timeWindows || [],
        timezone: ruleFormValues.timezone || 'America/New_York',
        channels: ruleFormValues.channels || {
          inWindow: '',
          outOfWindow: ''
        },
        priority: ruleFormValues.priority || scheduleRules.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setScheduleRules([...scheduleRules, newRule]);
      toast({
        title: "Rule created",
        description: "Schedule rule has been created successfully"
      });
    }
    
    setIsRuleDialogOpen(false);
  };

  const handleSubmitTimeWindow = () => {
    if (!windowFormValues.startTime || !windowFormValues.endTime || !(windowFormValues.daysOfWeek || []).length) {
      toast({
        title: "Validation Error",
        description: "Start time, end time, and at least one day are required",
        variant: "destructive"
      });
      return;
    }

    const timeWindows = [...(ruleFormValues.timeWindows || [])];
    
    if (selectedTimeWindow) {
      // Update existing window
      const windowIndex = timeWindows.findIndex(w => w.id === selectedTimeWindow.id);
      
      if (windowIndex !== -1) {
        timeWindows[windowIndex] = {
          ...timeWindows[windowIndex],
          startTime: windowFormValues.startTime || timeWindows[windowIndex].startTime,
          endTime: windowFormValues.endTime || timeWindows[windowIndex].endTime,
          daysOfWeek: windowFormValues.daysOfWeek || timeWindows[windowIndex].daysOfWeek
        };
      }
    } else {
      // Add new window
      const newWindow: TimeWindow = {
        id: uuidv4(),
        startTime: windowFormValues.startTime || '09:00',
        endTime: windowFormValues.endTime || '17:00',
        daysOfWeek: windowFormValues.daysOfWeek || [1, 2, 3, 4, 5]
      };
      
      timeWindows.push(newWindow);
    }
    
    setRuleFormValues({ ...ruleFormValues, timeWindows });
    setIsWindowDialogOpen(false);
    
    toast({
      title: selectedTimeWindow ? "Time window updated" : "Time window added",
      description: `Time window has been ${selectedTimeWindow ? 'updated' : 'added'} successfully`
    });
  };

  // Helper functions
  const getDayName = (day: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[day];
  };

  const formatDays = (days: number[]) => {
    if (!days.length) return 'No days selected';
    
    if (days.length === 7) return 'Every day';
    if (days.length === 5 && days.includes(1) && days.includes(2) && days.includes(3) && days.includes(4) && days.includes(5)) 
      return 'Weekdays';
    if (days.length === 2 && days.includes(0) && days.includes(6)) 
      return 'Weekends';
    
    return days.map(day => getDayName(day)).join(', ');
  };

  const formatTime = (time: string) => {
    try {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours, 10);
      const suffix = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      return `${displayHour}:${minutes} ${suffix}`;
    } catch (e) {
      return time;
    }
  };

  const getChannelName = (channelId: string) => {
    return channels.find(c => c.id === channelId)?.name || channelId;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Schedule-Based Rules</CardTitle>
          <CardDescription>
            Configure notification routing based on time windows and schedules
          </CardDescription>
        </div>
        <Button onClick={handleAddRule}>
          <Plus className="h-4 w-4 mr-2" />
          Add Schedule Rule
        </Button>
      </CardHeader>
      <CardContent>
        {scheduleRules.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No schedule rules configured. Add a rule to get started.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Time Windows</TableHead>
                <TableHead>Timezone</TableHead>
                <TableHead>Channel Routing</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduleRules.sort((a, b) => a.priority - b.priority).map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <div className="font-medium">{rule.name}</div>
                    <div className="text-xs text-muted-foreground">{rule.description}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {rule.timeWindows.map(window => (
                        <div key={window.id} className="flex items-center space-x-1 text-xs">
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(window.startTime)} - {formatTime(window.endTime)}</span>
                          <span className="text-muted-foreground">({formatDays(window.daysOfWeek)})</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>
                        {timezones.find(tz => tz.id === rule.timezone)?.name || rule.timezone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-xs">
                        <Badge variant="outline" className="font-normal">In Window</Badge>
                        <span>{getChannelName(rule.channels.inWindow)}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs">
                        <Badge variant="outline" className="font-normal bg-muted">Out of Window</Badge>
                        <span>{getChannelName(rule.channels.outOfWindow)}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={rule.isActive ? "default" : "secondary"}>
                      {rule.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditRule(rule)}
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteRule(rule.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Schedule Rule Dialog */}
        <Dialog open={isRuleDialogOpen} onOpenChange={setIsRuleDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {selectedRule ? 'Edit Schedule Rule' : 'Add Schedule Rule'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ruleName">Rule Name</Label>
                  <Input
                    id="ruleName"
                    value={ruleFormValues.name || ''}
                    onChange={(e) => setRuleFormValues({ ...ruleFormValues, name: e.target.value })}
                    placeholder="Enter rule name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ruleDescription">Description</Label>
                  <Input
                    id="ruleDescription"
                    value={ruleFormValues.description || ''}
                    onChange={(e) => setRuleFormValues({ ...ruleFormValues, description: e.target.value })}
                    placeholder="Enter rule description"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={ruleFormValues.timezone || 'America/New_York'}
                    onValueChange={(value) => setRuleFormValues({ ...ruleFormValues, timezone: value })}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map(timezone => (
                        <SelectItem key={timezone.id} value={timezone.id}>
                          {timezone.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rulePriority">Priority</Label>
                  <Input
                    id="rulePriority"
                    type="number"
                    min={1}
                    value={ruleFormValues.priority || ''}
                    onChange={(e) => setRuleFormValues({ ...ruleFormValues, priority: parseInt(e.target.value) })}
                    placeholder="Enter priority (lower runs first)"
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Switch 
                    id="isActive" 
                    checked={ruleFormValues.isActive} 
                    onCheckedChange={(checked) => setRuleFormValues({ ...ruleFormValues, isActive: checked })}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <Label>Time Windows</Label>
                    <Button variant="outline" size="sm" onClick={handleAddTimeWindow}>
                      <Plus className="h-3 w-3 mr-1" />
                      Add Window
                    </Button>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    {(ruleFormValues.timeWindows || []).length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Time Range</TableHead>
                            <TableHead>Days</TableHead>
                            <TableHead className="w-16">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(ruleFormValues.timeWindows || []).map(window => (
                            <TableRow key={window.id}>
                              <TableCell>
                                {formatTime(window.startTime)} - {formatTime(window.endTime)}
                              </TableCell>
                              <TableCell>
                                {formatDays(window.daysOfWeek)}
                              </TableCell>
                              <TableCell>
                                <div className="flex justify-end space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => handleEditTimeWindow(window)}
                                  >
                                    <Edit2 className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-destructive hover:text-destructive"
                                    onClick={() => handleDeleteTimeWindow(window.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        No time windows defined. Add one to continue.
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="inWindowChannel">In-Window Channel</Label>
                  <Select
                    value={ruleFormValues.channels?.inWindow || ''}
                    onValueChange={(value) => setRuleFormValues({ 
                      ...ruleFormValues, 
                      channels: { 
                        ...(ruleFormValues.channels || {}), 
                        inWindow: value 
                      } 
                    })}
                  >
                    <SelectTrigger id="inWindowChannel">
                      <SelectValue placeholder="Select channel for in-window" />
                    </SelectTrigger>
                    <SelectContent>
                      {channels.map(channel => (
                        <SelectItem key={channel.id} value={channel.id}>
                          {channel.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Channel to use when the current time is within a defined window
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="outOfWindowChannel">Out-of-Window Channel</Label>
                  <Select
                    value={ruleFormValues.channels?.outOfWindow || ''}
                    onValueChange={(value) => setRuleFormValues({ 
                      ...ruleFormValues, 
                      channels: { 
                        ...(ruleFormValues.channels || {}), 
                        outOfWindow: value 
                      } 
                    })}
                  >
                    <SelectTrigger id="outOfWindowChannel">
                      <SelectValue placeholder="Select channel for out-of-window" />
                    </SelectTrigger>
                    <SelectContent>
                      {channels.map(channel => (
                        <SelectItem key={channel.id} value={channel.id}>
                          {channel.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Channel to use when the current time is outside any defined window
                  </p>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRuleDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitRule}>
                {selectedRule ? 'Update Rule' : 'Create Rule'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Time Window Dialog */}
        <Dialog open={isWindowDialogOpen} onOpenChange={setIsWindowDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedTimeWindow ? 'Edit Time Window' : 'Add Time Window'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={windowFormValues.startTime || ''}
                    onChange={(e) => setWindowFormValues({ ...windowFormValues, startTime: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={windowFormValues.endTime || ''}
                    onChange={(e) => setWindowFormValues({ ...windowFormValues, endTime: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Days of Week</Label>
                <div className="grid grid-cols-7 gap-1 mt-2">
                  {[0, 1, 2, 3, 4, 5, 6].map(day => (
                    <Button
                      key={day}
                      type="button"
                      variant={(windowFormValues.daysOfWeek || []).includes(day) ? "default" : "outline"}
                      className="aspect-square h-10 p-0"
                      onClick={() => {
                        const currentDays = windowFormValues.daysOfWeek || [];
                        const updatedDays = currentDays.includes(day)
                          ? currentDays.filter(d => d !== day)
                          : [...currentDays, day];
                        
                        setWindowFormValues({ ...windowFormValues, daysOfWeek: updatedDays });
                      }}
                    >
                      {getDayName(day)}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <div className="space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setWindowFormValues({ ...windowFormValues, daysOfWeek: [1, 2, 3, 4, 5] })}
                  >
                    Weekdays
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setWindowFormValues({ ...windowFormValues, daysOfWeek: [0, 6] })}
                  >
                    Weekends
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setWindowFormValues({ ...windowFormValues, daysOfWeek: [0, 1, 2, 3, 4, 5, 6] })}
                  >
                    All Days
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsWindowDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitTimeWindow}>
                {selectedTimeWindow ? 'Update Window' : 'Add Window'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ScheduleBasedRules;
