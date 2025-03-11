
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useNotificationChannels } from './hooks/useNotificationChannels';
import ChannelSearchBar from './components/ChannelSearchBar';
import ChannelTable from './components/ChannelTable';

const NotificationChannelList: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    filteredChannels,
    toggleChannelEnabled
  } = useNotificationChannels();
    
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <ChannelSearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Channel
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <ChannelTable 
            channels={filteredChannels}
            onToggleChannel={toggleChannelEnabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationChannelList;
