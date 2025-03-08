
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound } from 'lucide-react';
import UserMFAList from './security/mfa/UserMFAList';
import UserMFASearch from './security/mfa/UserMFASearch';
import { useUserMFAManagement } from './security/mfa/useUserMFAManagement';

const UserMFASettings = () => {
  const { 
    users,
    isLoading,
    searchQuery,
    handleSearchChange,
    handleToggleMFA,
    loadUsers
  } = useUserMFAManagement();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <KeyRound className="h-5 w-5 text-muted-foreground" />
            <CardTitle>User MFA Management</CardTitle>
          </div>
          <CardDescription>
            Enable or disable multi-factor authentication for specific users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <UserMFASearch 
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onRefresh={loadUsers}
            />
            
            <UserMFAList 
              users={users}
              isLoading={isLoading}
              onToggleMFA={handleToggleMFA}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserMFASettings;
