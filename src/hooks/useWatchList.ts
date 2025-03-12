
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export type WatchableItemType = 
  'incident' | 
  'service' | 
  'task' | 
  'problem' | 
  'release' | 
  'bug' | 
  'backlogItem';

export interface WatchableItem {
  id: string;
  type: WatchableItemType;
  title: string;
  status: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Local storage key for watch list
const WATCH_LIST_KEY = 'watchlist';

export const useWatchList = () => {
  const { user } = useAuth();
  const userId = user?.id || 'anonymous';
  const [watchList, setWatchList] = useState<WatchableItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load watch list from localStorage on component mount
  useEffect(() => {
    const loadWatchList = () => {
      try {
        const storedWatchList = localStorage.getItem(`${WATCH_LIST_KEY}-${userId}`);
        if (storedWatchList) {
          setWatchList(JSON.parse(storedWatchList));
        }
      } catch (error) {
        console.error('Error loading watch list:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWatchList();
  }, [userId]);

  // Save watch list to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(`${WATCH_LIST_KEY}-${userId}`, JSON.stringify(watchList));
    }
  }, [watchList, userId, isLoading]);

  // Check if an item is in the watch list
  const isWatched = (itemId: string, itemType: WatchableItemType): boolean => {
    return watchList.some(item => item.id === itemId && item.type === itemType);
  };

  // Add an item to the watch list
  const addToWatchList = (item: WatchableItem) => {
    if (!isWatched(item.id, item.type)) {
      setWatchList(prev => [...prev, item]);
      toast.success(`Added to your Watch List`);
    }
  };

  // Remove an item from the watch list
  const removeFromWatchList = (itemId: string, itemType: WatchableItemType) => {
    setWatchList(prev => prev.filter(item => !(item.id === itemId && item.type === itemType)));
    toast.success(`Removed from your Watch List`);
  };

  // Toggle an item in the watch list
  const toggleWatchItem = (item: WatchableItem) => {
    if (isWatched(item.id, item.type)) {
      removeFromWatchList(item.id, item.type);
    } else {
      addToWatchList(item);
    }
  };

  return {
    watchList,
    isWatched,
    addToWatchList,
    removeFromWatchList,
    toggleWatchItem,
    isLoading
  };
};
