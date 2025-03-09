
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/utils/types/user';

interface ProfileHeaderProps {
  user: User;
  isEditing: boolean;
  getInitials: (name: string) => string;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  user, 
  isEditing,
  getInitials, 
  onEdit,
  onSave,
  onCancel
}) => {
  return (
    <Card className="md:col-span-1">
      <CardHeader className="text-center pb-2">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarFallback className="text-xl bg-primary/10 text-primary">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
        <Badge className="mt-2">{user.role}</Badge>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="default" className="w-1/2" onClick={onSave}>
              Save
            </Button>
            <Button variant="outline" className="w-1/2" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button variant="outline" className="w-full mt-4" onClick={onEdit}>
            Edit Profile
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
