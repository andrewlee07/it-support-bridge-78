
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle, Megaphone } from 'lucide-react';
import AnnouncementsFilter from '@/components/announcements/AnnouncementsFilter';
import AnnouncementsList from '@/components/announcements/AnnouncementsList';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import PageTransition from '@/components/shared/PageTransition';

const AnnouncementsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    announcements,
    totalAnnouncements,
    currentPage,
    setCurrentPage,
    filters,
    updateFilters,
    loading,
    deleteExistingAnnouncement
  } = useAnnouncements();

  const handleCreateAnnouncement = () => {
    navigate('/announcements/create');
  };

  const handleViewAnnouncement = (id: string) => {
    navigate(`/announcements/${id}`);
  };

  const handleEditAnnouncement = (id: string) => {
    navigate(`/announcements/edit/${id}`);
  };

  const handleDeleteAnnouncement = async (id: string) => {
    await deleteExistingAnnouncement(id);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center">
              <Megaphone className="mr-2 h-5 w-5" />
              Announcements
            </h1>
            <p className="text-muted-foreground">
              Create and manage announcements for users
            </p>
          </div>
          <Button onClick={handleCreateAnnouncement}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Announcement
          </Button>
        </div>

        <AnnouncementsFilter
          status={filters.status}
          priority={filters.priority}
          type={filters.type}
          search={filters.search}
          onFilterChange={updateFilters}
        />

        <AnnouncementsList
          announcements={announcements}
          totalAnnouncements={totalAnnouncements}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onView={handleViewAnnouncement}
          onEdit={handleEditAnnouncement}
          onDelete={handleDeleteAnnouncement}
          loading={loading}
        />
      </div>
    </PageTransition>
  );
};

export default AnnouncementsPage;
