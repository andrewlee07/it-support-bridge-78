
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { createReminder } from '@/utils/api/taskApi';
import { toast } from 'sonner';
import { Ticket } from '@/utils/types/ticket';
import { useAuth } from '@/contexts/AuthContext';

interface ReminderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: Ticket;
  onReminderSet?: (note: string) => void;
}

const reminderSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().optional(),
  dueDate: z.date({ required_error: "Please select a date" }),
  priority: z.enum(["low", "medium", "high"], { required_error: "Please select a priority" }),
  email: z.boolean().default(true),
  inApp: z.boolean().default(true),
  teams: z.boolean().default(false),
  sms: z.boolean().default(false),
});

type ReminderFormValues = z.infer<typeof reminderSchema>;

const ReminderDialog: React.FC<ReminderDialogProps> = ({
  isOpen,
  onOpenChange,
  ticket,
  onReminderSet
}) => {
  const { user } = useAuth();
  
  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      title: `Reminder for ${ticket.type === 'incident' ? 'Incident' : 'Service Request'} ${ticket.id}`,
      description: `Follow up on: ${ticket.title}`,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      priority: "medium",
      email: true,
      inApp: true,
      teams: false,
      sms: false,
    },
  });

  const onSubmit = async (data: ReminderFormValues) => {
    if (!user) return;
    
    try {
      const reminder = {
        title: data.title,
        description: data.description || '',
        dueDate: data.dueDate.toISOString(),
        createdBy: user.id,
        recipients: [user.id],
        priority: data.priority,
        relatedItemId: ticket.id,
        relatedItemType: ticket.type,
        enabledChannels: {
          email: data.email,
          teams: data.teams,
          inApp: data.inApp,
          sms: data.sms,
        }
      };
      
      const response = await createReminder(reminder);
      
      if (response.success) {
        toast.success("Reminder set successfully");
        
        if (onReminderSet) {
          const noteText = `Reminder set for ${format(data.dueDate, 'PPP')} - ${data.title}`;
          onReminderSet(noteText);
        }
        
        onOpenChange(false);
      } else {
        toast.error("Failed to set reminder");
      }
    } catch (error) {
      console.error('Error setting reminder:', error);
      toast.error("An error occurred while setting the reminder");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Reminder</DialogTitle>
          <DialogDescription>
            Create a reminder for this {ticket.type === 'incident' ? 'incident' : 'service request'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Notification Channels</h4>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notify" className="text-sm">Email</Label>
                      <Switch
                        id="email-notify"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="inApp"
                  render={({ field }) => (
                    <div className="flex items-center justify-between">
                      <Label htmlFor="inapp-notify" className="text-sm">In-App</Label>
                      <Switch
                        id="inapp-notify"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="teams"
                  render={({ field }) => (
                    <div className="flex items-center justify-between">
                      <Label htmlFor="teams-notify" className="text-sm">Microsoft Teams</Label>
                      <Switch
                        id="teams-notify"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="sms"
                  render={({ field }) => (
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-notify" className="text-sm">SMS</Label>
                      <Switch
                        id="sms-notify"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit">Set Reminder</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderDialog;
