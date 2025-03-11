
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import ChannelSearchBar from './components/ChannelSearchBar';
import ChannelTable from './components/ChannelTable';
import NewChannelDialog from './dialogs/NewChannelDialog';
import ConfigureChannelDialog from './dialogs/ConfigureChannelDialog';
import { useNotificationChannelList } from './hooks/useNotificationChannelList';

const NotificationChannelList: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    filteredChannels,
    toggleChannelEnabled,
    isNewChannelDialogOpen,
    setIsNewChannelDialogOpen,
    isConfigureDialogOpen,
    setIsConfigureDialogOpen,
    selectedChannel,
    handleNewChannel,
    handleConfigureChannel,
    handleAddChannel,
    handleSaveConfiguration
  } = useNotificationChannelList();
    
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
      <NewChannelDialog
        isOpen={isNewChannelDialogOpen}
        onOpenChange={setIsNewChannelDialogOpen}
        onAddChannel={handleAddChannel}
      />
      
      {/* Configure Channel Dialog */}
      <ConfigureChannelDialog 
        isOpen={isConfigureDialogOpen}
        onOpenChange={setIsConfigureDialogOpen}
        selectedChannel={selectedChannel}
        onSaveConfiguration={handleSaveConfiguration}
      />
    </div>
  );
};

export default NotificationChannelList;
