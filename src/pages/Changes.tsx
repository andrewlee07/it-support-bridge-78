
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, FileText, Plus, AlertTriangle } from 'lucide-react';

const Changes = () => {
  // Sample change requests data
  const changes = [
    {
      id: 'CR-2023-001',
      title: 'Network Infrastructure Upgrade',
      status: 'approved',
      priority: 'high',
      createdDate: '2023-06-15',
      implementationDate: '2023-07-10',
      description: 'Upgrade network infrastructure to improve performance and reliability.'
    },
    {
      id: 'CR-2023-002',
      title: 'Email Server Migration',
      status: 'pending',
      priority: 'medium',
      createdDate: '2023-06-20',
      implementationDate: '2023-07-15',
      description: 'Migrate email server to the new cloud platform.'
    },
    {
      id: 'CR-2023-003',
      title: 'Security Patch Deployment',
      status: 'in-progress',
      priority: 'critical',
      createdDate: '2023-06-25',
      implementationDate: '2023-06-30',
      description: 'Deploy security patches to all servers to address vulnerabilities.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Change Management</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage system and infrastructure changes
            </p>
          </div>
          <Button className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            New Change Request
          </Button>
        </div>

        <Tabs defaultValue="all" className="animate-fade-in">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Changes</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {changes.map((change) => (
              <Card key={change.id} className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-medium">{change.title}</CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">{change.id}</div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(change.status)}>
                        {change.status.charAt(0).toUpperCase() + change.status.slice(1)}
                      </Badge>
                      <Badge className={getPriorityColor(change.priority)}>
                        {change.priority.charAt(0).toUpperCase() + change.priority.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">{change.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Created: {change.createdDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Implementation: {change.implementationDate}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            {changes.filter(c => c.status === 'pending').map((change) => (
              <Card key={change.id} className="shadow-sm">
                {/* Same card content as above */}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-medium">{change.title}</CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">{change.id}</div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(change.status)}>
                        {change.status.charAt(0).toUpperCase() + change.status.slice(1)}
                      </Badge>
                      <Badge className={getPriorityColor(change.priority)}>
                        {change.priority.charAt(0).toUpperCase() + change.priority.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">{change.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Created: {change.createdDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Implementation: {change.implementationDate}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
            {changes.filter(c => c.status === 'pending').length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No pending change requests</h3>
                <p className="text-muted-foreground mt-1">There are no change requests waiting for approval.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-4">
            {/* For simplicity, we're showing changes with future implementation dates */}
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Upcoming changes view</h3>
              <p className="text-muted-foreground mt-1">This view will be implemented in a future update.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Completed changes view</h3>
              <p className="text-muted-foreground mt-1">This view will be implemented in a future update.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Changes;
