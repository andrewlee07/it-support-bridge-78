
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
  const { toast } = useToast();
  
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
    // Since ChannelFormValues comes from a Zod schema with required fields,
    // we can be confident these fields exist, but TypeScript doesn't know that.
    // We need to explicitly make sure all required fields are present.
    addNewChannel({
      name: data.name,         // Required by NewChannelParams
      type: data.type,         // Required by NewChannelParams
      description: data.description  // Required by NewChannelParams
    });
    
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
