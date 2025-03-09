
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import PageTransition from '@/components/shared/PageTransition';
import ReleasesErrorBoundary from '@/components/shared/ReleasesErrorBoundary';
import { useUserProfile } from '@/hooks/useUserProfile';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileInformation from '@/components/profile/ProfileInformation';

const UserProfile = () => {
  const {
    user,
    isEditing,
    getInitials,
    handleEditProfile,
    handleSaveProfile,
    handleCancelEdit
  } = useUserProfile();

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Not Available</CardTitle>
            <CardDescription>You must be logged in to view your profile</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <PageTransition>
      <ReleasesErrorBoundary>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">User Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProfileHeader 
              user={user}
              isEditing={isEditing}
              getInitials={getInitials}
              onEdit={handleEditProfile}
              onSave={handleSaveProfile}
              onCancel={handleCancelEdit}
            />
            
            <ProfileInformation user={user} />
          </div>
        </div>
      </ReleasesErrorBoundary>
    </PageTransition>
  );
};

export default UserProfile;
