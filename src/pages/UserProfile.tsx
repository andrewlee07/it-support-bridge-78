
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, Mail, Phone, Shield, User } from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import ReleasesErrorBoundary from '@/components/shared/ReleasesErrorBoundary';

const UserProfile = () => {
  const { user } = useAuth();
  
  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

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
                <Button variant="outline" className="w-full mt-4">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Personal and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Full Name</p>
                    <p className="text-sm text-muted-foreground">{user.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Role</p>
                    <p className="text-sm text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Account Security</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-sm">Two-factor authentication</p>
                      </div>
                      <Badge variant={user.mfaEnabled ? "default" : "outline"}>
                        {user.mfaEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-sm">Last login</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ReleasesErrorBoundary>
    </PageTransition>
  );
};

export default UserProfile;
