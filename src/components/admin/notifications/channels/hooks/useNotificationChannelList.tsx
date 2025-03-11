
import { useState } from 'react';
import { useNotificationChannels } from './useNotificationChannels';
import { ChannelFormValues } from '../dialogs/NewChannelDialog';
import { useToast } from '@/hooks/use-toast';

export const useNotificationChannelList = () => {
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
  
  const selectedChannel = selectedChannelId 
    ? filteredChannels.find(c => c.id === selectedChannelId) 
    : null;
  
  const handleNewChannel = () => {
    setIsNewChannelDialogOpen(true);
  };
  
  const handleConfigureChannel = (channelId: string) => {
    setSelectedChannelId(channelId);
    setIsConfigureDialogOpen(true);
  };
  
  const handleAddChannel = (data: ChannelFormValues) => {
    // This data is fully validated by zod schema, so we know all required properties are present
    addNewChannel(data);
    setIsNewChannelDialogOpen(false);
  };
  
  const handleSaveConfiguration = (data: ChannelFormValues) => {
    // In a real app, this would update the channel in the database
    console.log("Updating channel:", selectedChannelId, data);
    setIsConfigureDialogOpen(false);
  };
  
  return {
    searchQuery,
    setSearchQuery,
    filteredChannels,
    toggleChannelEnabled,
    isNewChannelDialogOpen,
    setIsNewChannelDialogOpen,
    isConfigureDialogOpen,
    setIsConfigureDialogOpen,
    selectedChannelId,
    selectedChannel,
    handleNewChannel,
    handleConfigureChannel,
    handleAddChannel,
    handleSaveConfiguration
  };
};
