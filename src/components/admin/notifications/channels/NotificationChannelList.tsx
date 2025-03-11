
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useNotificationChannels } from './hooks/useNotificationChannels';
import ChannelSearchBar from './components/ChannelSearchBar';
import ChannelTable from './components/ChannelTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

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
  
  const handleNewChannel = () => {
    setIsNewChannelDialogOpen(true);
  };
  
  const handleConfigureChannel = (channelId: string) => {
    setSelectedChannelId(channelId);
    setIsConfigureDialogOpen(true);
  };
  
  const handleAddMockChannel = () => {
    addNewChannel({
      name: "New Channel",
      type: "teams",
      description: "A new notification channel"
    });
    setIsNewChannelDialogOpen(false);
    toast({
      title: "Channel created",
      description: "New notification channel has been created successfully."
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Notification Channel</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              This is a placeholder for the channel creation form. In a production environment, this would include fields for channel name, type, and configuration options.
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsNewChannelDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMockChannel}>
              Add Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Configure Channel Dialog */}
      <Dialog open={isConfigureDialogOpen} onOpenChange={setIsConfigureDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure Channel</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              This is a placeholder for the channel configuration form. In a production environment, this would include fields for editing channel settings, delivery options, and more.
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsConfigureDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setIsConfigureDialogOpen(false);
              toast({
                title: "Channel updated",
                description: "Channel configuration has been updated successfully."
              });
            }}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationChannelList;
