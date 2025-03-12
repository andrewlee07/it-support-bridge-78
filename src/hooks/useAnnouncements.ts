
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  getAnnouncements, 
  getAnnouncementById, 
  createAnnouncement, 
  updateAnnouncement, 
  deleteAnnouncement 
} from '@/utils/mockData/announcements';
import { Announcement, AnnouncementStatus, AnnouncementPriority, AnnouncementType } from '@/utils/types';

export function useAnnouncements(initialFilters?: {
  status?: AnnouncementStatus;
  priority?: AnnouncementPriority;
  type?: AnnouncementType;
  search?: string;
}) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalAnnouncements, setTotalAnnouncements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters || {});
  const { toast } = useToast();

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await getAnnouncements({
        ...filters,
        page: currentPage,
        limit: 10
      });
      
      if (response.success && response.data) {
        setAnnouncements(response.data.items);
        setTotalAnnouncements(response.data.total);
      } else {
        setError('Failed to fetch announcements');
        toast({
          title: 'Error',
          description: response.error || 'Failed to fetch announcements',
          variant: 'destructive',
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAnnouncementById = async (id: string) => {
    setLoading(true);
    try {
      const response = await getAnnouncementById(id);
      
      if (response.success && response.data) {
        setSelectedAnnouncement(response.data);
        return response.data;
      } else {
        setError('Failed to fetch announcement details');
        toast({
          title: 'Error',
          description: response.error || 'Failed to fetch announcement details',
          variant: 'destructive',
        });
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createNewAnnouncement = async (data: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      const response = await createAnnouncement(data);
      
      if (response.success && response.data) {
        toast({
          title: 'Announcement Created',
          description: 'The announcement has been created successfully.',
        });
        return response.data;
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to create announcement',
          variant: 'destructive',
        });
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateExistingAnnouncement = async (id: string, data: Partial<Announcement>) => {
    setLoading(true);
    try {
      const response = await updateAnnouncement(id, data);
      
      if (response.success && response.data) {
        toast({
          title: 'Announcement Updated',
          description: 'The announcement has been updated successfully.',
        });
        return response.data;
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to update announcement',
          variant: 'destructive',
        });
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteExistingAnnouncement = async (id: string) => {
    setLoading(true);
    try {
      const response = await deleteAnnouncement(id);
      
      if (response.success) {
        toast({
          title: 'Announcement Deleted',
          description: 'The announcement has been deleted successfully.',
        });
        return true;
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to delete announcement',
          variant: 'destructive',
        });
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: typeof filters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Fetch announcements when component mounts or filters/page change
  useEffect(() => {
    fetchAnnouncements();
  }, [filters, currentPage]);

  return {
    announcements,
    selectedAnnouncement,
    loading,
    error,
    totalAnnouncements,
    currentPage,
    setCurrentPage,
    filters,
    updateFilters,
    fetchAnnouncements,
    fetchAnnouncementById,
    createNewAnnouncement,
    updateExistingAnnouncement,
    deleteExistingAnnouncement,
    setSelectedAnnouncement
  };
}
