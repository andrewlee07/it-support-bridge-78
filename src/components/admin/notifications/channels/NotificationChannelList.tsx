
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useNotificationChannels } from './hooks/useNotificationChannels';
import ChannelSearchBar from './components/ChannelSearchBar';
import ChannelTable from './components/ChannelTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const channelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  description: z.string().min(1, "Description is required")
});

type ChannelFormValues = z.infer<typeof channelSchema>;

const NotificationChannelList: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    filteredChannels,
    toggleChannelEnabled,
    addNewChannel
  } = useNotificationChannels();
  
  const [isNewChannelDialogOpen, setIsNewChannelDialogOpen] = useState(false);
  const [isConfigureDialogOpen, setIsConfigureDialogOpen] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const selectedChannel = selectedChannelId 
    ? filteredChannels.find(c => c.id === selectedChannelId) 
    : null;
  
  const form = useForm<ChannelFormValues>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      name: "",
      type: "email",
      description: ""
    }
  });
  
  const handleNewChannel = () => {
    form.reset({
      name: "",
      type: "email",
      description: ""
    });
    setIsNewChannelDialogOpen(true);
  };
  
  const handleConfigureChannel = (channelId: string) => {
    setSelectedChannelId(channelId);
    const channel = filteredChannels.find(c => c.id === channelId);
    if (channel) {
      form.reset({
        name: channel.name,
        type: channel.type,
        description: channel.description
      });
    }
    setIsConfigureDialogOpen(true);
  };
  
  const handleAddChannel = (data: ChannelFormValues) => {
    addNewChannel(data);
    setIsNewChannelDialogOpen(false);
    toast({
      title: "Channel created",
      description: "New notification channel has been created successfully."
    });
  };
  
  const handleSaveConfiguration = (data: ChannelFormValues) => {
    // In a real app, this would update the channel in the database
    console.log("Updating channel:", selectedChannelId, data);
    setIsConfigureDialogOpen(false);
    toast({
      title: "Channel updated",
      description: "Channel configuration has been updated successfully."
    });
  };
    
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <ChannelSearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <Button onClick={handleNewChannel}>
          <Plus className="h-4 w-4 mr-2" />
          New Channel
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <ChannelTable 
            channels={filteredChannels}
            onToggleChannel={toggleChannelEnabled}
            onConfigureChannel={handleConfigureChannel}
          />
        </CardContent>
      </Card>
      
      {/* New Channel Dialog */}
      <Dialog open={isNewChannelDialogOpen} onOpenChange={setIsNewChannelDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Notification Channel</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddChannel)} className="space-y-4 py-4">
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
                <Button variant="outline" type="button" onClick={() => setIsNewChannelDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Channel</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Configure Channel Dialog */}
      <Dialog open={isConfigureDialogOpen} onOpenChange={setIsConfigureDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Configure Channel: {selectedChannel?.name}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSaveConfiguration)} className="space-y-4 py-4">
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
                <Button variant="outline" type="button" onClick={() => setIsConfigureDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationChannelList;
