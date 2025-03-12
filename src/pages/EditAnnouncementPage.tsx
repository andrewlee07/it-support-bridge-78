
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Megaphone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AnnouncementForm from '@/components/announcements/AnnouncementForm';
import { AnnouncementFormValues } from '@/components/announcements/announcementSchema';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import PageTransition from '@/components/shared/PageTransition';

const EditAnnouncementPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { 
    fetchAnnouncementById, 
    updateExistingAnnouncement, 
    selectedAnnouncement, 
    setSelectedAnnouncement 
  } = useAnnouncements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnnouncement = async () => {
      if (!id) {
        setError('No announcement ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const announcement = await fetchAnnouncementById(id);
        if (!announcement) {
          setError('Announcement not found');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadAnnouncement();

    // Cleanup function to reset selected announcement when component unmounts
    return () => {
      setSelectedAnnouncement(null);
    };
  }, [id, fetchAnnouncementById, setSelectedAnnouncement]);

  const handleSubmit = async (data: AnnouncementFormValues) => {
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      const result = await updateExistingAnnouncement(id, data);
      
      if (result) {
        navigate('/announcements');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center">
              <Megaphone className="mr-2 h-5 w-5" />
              Edit Announcement
            </h1>
            <p className="text-muted-foreground">
              Update an existing announcement
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/announcements')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Announcements
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-10">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">Error</h3>
                <p className="text-muted-foreground">{error}</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate('/announcements')}
                >
                  Back to Announcements
                </Button>
              </div>
            ) : selectedAnnouncement ? (
              <AnnouncementForm 
                initialData={selectedAnnouncement} 
                onSubmit={handleSubmit} 
                isSubmitting={isSubmitting} 
              />
            ) : null}
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default EditAnnouncementPage;
