
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Megaphone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AnnouncementForm from '@/components/announcements/AnnouncementForm';
import { AnnouncementFormValues } from '@/components/announcements/announcementSchema';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { useAuth } from '@/contexts/AuthContext';
import PageTransition from '@/components/shared/PageTransition';

const CreateAnnouncementPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createNewAnnouncement } = useAnnouncements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: AnnouncementFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const result = await createNewAnnouncement({
        ...data,
        createdBy: user.id,
        creatorName: `${user.firstName} ${user.lastName}`,
      });
      
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
              Create Announcement
            </h1>
            <p className="text-muted-foreground">
              Create a new announcement for users
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/announcements')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Announcements
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <AnnouncementForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default CreateAnnouncementPage;
