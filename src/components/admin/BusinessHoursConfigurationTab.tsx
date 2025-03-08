
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BusinessHours, WorkingDay, DaylightSavingRule } from '@/utils/types/businessHours';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Trash } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const workingDays: WorkingDay[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const timeZones = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'Europe/London', label: 'London' },
  { value: 'America/New_York', label: 'New York' },
  { value: 'America/Los_Angeles', label: 'Los Angeles' },
  { value: 'Asia/Tokyo', label: 'Tokyo' },
  { value: 'Australia/Sydney', label: 'Sydney' }
];

interface BusinessHoursConfigurationTabProps {
  moduleType: 'incident' | 'service-request';
}

const BusinessHoursConfigurationTab: React.FC<BusinessHoursConfigurationTabProps> = ({ moduleType }) => {
  const [activeTab, setActiveTab] = useState('hours');
  const [selectedWorkingDays, setSelectedWorkingDays] = useState<WorkingDay[]>(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']);
  const [dstRules, setDstRules] = useState<Partial<DaylightSavingRule>[]>([]);
  const [pauseSLA, setPauseSLA] = useState({
    outsideBusinessHours: true,
    duringPendingStatus: true
  });

  const businessHoursSchema = z.object({
    name: z.string().min(1, "Name is required"),
    startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format"),
    endTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format"),
    timeZone: z.string().min(1, "Time zone is required")
  });

  const form = useForm<z.infer<typeof businessHoursSchema>>({
    resolver: zodResolver(businessHoursSchema),
    defaultValues: {
      name: `${moduleType === 'incident' ? 'Incident' : 'Service Request'} Business Hours`,
      startTime: '08:00',
      endTime: '17:00',
      timeZone: 'UTC'
    }
  });

  const addDstRule = () => {
    const currentYear = new Date().getFullYear();
    setDstRules([
      ...dstRules, 
      { 
        id: `dst-${Date.now()}`,
        name: `DST ${currentYear}`,
        offsetMinutes: 60,
        year: currentYear,
        isActive: true
      }
    ]);
  };

  const removeDstRule = (index: number) => {
    const newRules = [...dstRules];
    newRules.splice(index, 1);
    setDstRules(newRules);
  };

  const updateDstRule = (index: number, field: keyof DaylightSavingRule, value: any) => {
    const newRules = [...dstRules];
    newRules[index] = { ...newRules[index], [field]: value };
    setDstRules(newRules);
  };

  const handleSubmit = (data: z.infer<typeof businessHoursSchema>) => {
    // Here we would save the business hours configuration
    const businessHours: Partial<BusinessHours> = {
      name: data.name,
      startTime: data.startTime,
      endTime: data.endTime,
      workingDays: selectedWorkingDays,
      timeZone: data.timeZone,
      dstRules: dstRules as DaylightSavingRule[],
      entityType: moduleType,
      isActive: true
    };

    console.log('Saving business hours:', businessHours);
    console.log('SLA pause settings:', pauseSLA);
    
    toast.success('Business hours configuration saved');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Business Hours Configuration</h3>
          <p className="text-muted-foreground mt-1">
            Configure business hours and SLA calculation for {moduleType === 'incident' ? 'incidents' : 'service requests'}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="hours">Business Hours</TabsTrigger>
          <TabsTrigger value="dst">Daylight Saving Time</TabsTrigger>
          <TabsTrigger value="sla-settings">SLA Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Define your organization's standard business hours</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Configuration Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Give this business hours configuration a descriptive name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time (24h format)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="08:00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time (24h format)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="17:00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="timeZone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Zone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time zone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeZones.map(tz => (
                              <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the time zone for this business hours configuration
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormLabel>Working Days</FormLabel>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mt-2">
                      {workingDays.map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox 
                            id={day} 
                            checked={selectedWorkingDays.includes(day)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedWorkingDays([...selectedWorkingDays, day]);
                              } else {
                                setSelectedWorkingDays(selectedWorkingDays.filter(d => d !== day));
                              }
                            }}
                          />
                          <label 
                            htmlFor={day}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="submit">Save Business Hours</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dst" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daylight Saving Time Rules</CardTitle>
              <CardDescription>Define when clocks go forward or back</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dstRules.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No DST rules configured. Add a rule below.
                  </div>
                ) : (
                  dstRules.map((rule, index) => (
                    <div key={rule.id} className="border rounded-md p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{rule.name}</div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeDstRule(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <FormLabel htmlFor={`dst-start-${index}`}>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id={`dst-start-${index}`}
                                variant="outline"
                                className="w-full justify-start text-left font-normal mt-1"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {rule.startDate ? (
                                  format(rule.startDate, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={rule.startDate}
                                onSelect={(date) => date && updateDstRule(index, 'startDate', date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div>
                          <FormLabel htmlFor={`dst-end-${index}`}>End Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id={`dst-end-${index}`}
                                variant="outline"
                                className="w-full justify-start text-left font-normal mt-1"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {rule.endDate ? (
                                  format(rule.endDate, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={rule.endDate}
                                onSelect={(date) => date && updateDstRule(index, 'endDate', date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <FormLabel htmlFor={`dst-offset-${index}`}>Offset (minutes)</FormLabel>
                          <Input
                            id={`dst-offset-${index}`}
                            type="number"
                            value={rule.offsetMinutes || 60}
                            onChange={(e) => updateDstRule(index, 'offsetMinutes', parseInt(e.target.value))}
                            className="mt-1"
                          />
                        </div>

                        <div className="flex items-center space-x-2 pt-8">
                          <Switch
                            id={`dst-active-${index}`}
                            checked={rule.isActive}
                            onCheckedChange={(checked) => updateDstRule(index, 'isActive', checked)}
                          />
                          <FormLabel htmlFor={`dst-active-${index}`}>Active</FormLabel>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                <Button onClick={addDstRule} variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add DST Rule
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={form.handleSubmit(handleSubmit)}>Save DST Configuration</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sla-settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SLA Calculation Settings</CardTitle>
              <CardDescription>Configure how SLAs are calculated</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Switch 
                    id="pause-outside-hours"
                    checked={pauseSLA.outsideBusinessHours}
                    onCheckedChange={(checked) => setPauseSLA({...pauseSLA, outsideBusinessHours: checked})}
                  />
                  <FormLabel htmlFor="pause-outside-hours" className="font-medium">Pause SLAs outside business hours</FormLabel>
                </div>
                <p className="text-sm text-muted-foreground ml-10">
                  SLA timers will be paused outside of configured business hours (8am-5pm, Monday-Friday)
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Switch 
                    id="pause-pending"
                    checked={pauseSLA.duringPendingStatus}
                    onCheckedChange={(checked) => setPauseSLA({...pauseSLA, duringPendingStatus: checked})}
                  />
                  <FormLabel htmlFor="pause-pending" className="font-medium">Pause SLAs when ticket is in pending status</FormLabel>
                </div>
                <p className="text-sm text-muted-foreground ml-10">
                  SLA resolution timers will be paused when a ticket is in pending status
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-md space-y-1">
                <p className="font-medium text-blue-800">Response SLA Configuration</p>
                <p className="text-sm text-blue-700">
                  Response SLA is calculated as the time until the first case note update is added.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={form.handleSubmit(handleSubmit)}>Save SLA Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessHoursConfigurationTab;
