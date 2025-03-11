
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { NotificationChannel } from '@/utils/types/eventBus/notificationTypes';
import { channelSchema, ChannelFormValues } from './NewChannelDialog';

interface ConfigureChannelDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedChannel: NotificationChannel | null;
  onSaveConfiguration: (data: ChannelFormValues) => void;
}

const ConfigureChannelDialog: React.FC<ConfigureChannelDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedChannel,
  onSaveConfiguration
}) => {
  const { toast } = useToast();
  
  const form = useForm<ChannelFormValues>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      name: selectedChannel?.name || "",
      type: selectedChannel?.type || "email",
      description: selectedChannel?.description || ""
    }
  });
  
  // Update form when selected channel changes
  React.useEffect(() => {
    if (selectedChannel) {
      form.reset({
        name: selectedChannel.name,
        type: selectedChannel.type,
        description: selectedChannel.description
      });
    }
  }, [selectedChannel, form]);
  
  const handleSubmit = (data: ChannelFormValues) => {
    onSaveConfiguration(data);
    toast({
      title: "Channel updated",
      description: "Channel configuration has been updated successfully."
    });
  };
  
  if (!selectedChannel) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configure Channel: {selectedChannel?.name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter channel name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select channel type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="slack">Slack</SelectItem>
                      <SelectItem value="teams">Microsoft Teams</SelectItem>
                      <SelectItem value="inApp">In-App</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="webhook">Webhook</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter channel description" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigureChannelDialog;
