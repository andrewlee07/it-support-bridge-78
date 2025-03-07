import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Calendar, Clock, FileText, Plus, AlertTriangle, Filter, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { changeApi } from '@/utils/api/changeApi';
import { emailNotificationApi } from '@/utils/api/emailNotificationApi';
import { ChangeRequest, ChangeStatus } from '@/utils/types';
import { format } from 'date-fns';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Changes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedChangeId, setSelectedChangeId] = useState<string | null>(null);

  // Query for change requests
  const { data: changesData, isLoading, isError, refetch } = useQuery({
    queryKey: ['changes', activeTab, searchQuery],
    queryFn: async () => {
      let statusFilter: ChangeStatus[] = [];
      
      switch (activeTab) {
        case 'pending':
          statusFilter = ['submitted'];
          break;
        case 'upcoming':
          statusFilter = ['approved'];
          break;
        case 'completed':
          statusFilter = ['completed'];
          break;
        default:
          // 'all' tab - no status filter
          break;
      }
      
      const response = await changeApi.getChangeRequests(1, 50, {
        status: statusFilter.length > 0 ? statusFilter : undefined,
        search: searchQuery || undefined
      });
      
      return response;
    }
  });

  // Mutation for approving change requests
  const approveMutation = useMutation({
    mutationFn: async (changeId: string) => {
      return await changeApi.approveChangeRequest(changeId, user!.id);
    },
    onSuccess: async (data) => {
      if (data.success && data.data) {
        toast({
          title: "Change request approved",
          description: "The change request has been successfully approved.",
        });
        
        // Send notification email
        if (data.data.createdBy) {
          await emailNotificationApi.sendChangeRequestEmail(
            data.data.id,
            'change-approved',
            data.data.title,
            [data.data.createdBy]
          );
        }
        
        // Refetch change requests
        queryClient.invalidateQueries({ queryKey: ['changes'] });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to approve change request. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Mutation for rejecting change requests
  const rejectMutation = useMutation({
    mutationFn: async ({ changeId, reason }: { changeId: string; reason: string }) => {
      return await changeApi.rejectChangeRequest(changeId, user!.id, reason);
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Change request rejected",
          description: "The change request has been rejected.",
        });
        
        setRejectDialogOpen(false);
        setRejectionReason('');
        
        // Refetch change requests
        queryClient.invalidateQueries({ queryKey: ['changes'] });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to reject change request. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleApprove = (changeId: string) => {
    if (!user) return;
    approveMutation.mutate(changeId);
  };

  const handleRejectClick = (changeId: string) => {
    setSelectedChangeId(changeId);
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = () => {
    if (!selectedChangeId || !rejectionReason.trim()) return;
    
    rejectMutation.mutate({
      changeId: selectedChangeId,
      reason: rejectionReason
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const handleCreateNewRequest = () => {
    navigate('/changes/new');
  };

  const handleViewChange = (changeId: string) => {
    navigate(`/changes/${changeId}`);
  };

  const changes = changesData?.items || [];

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
          <Button className="shrink-0" onClick={handleCreateNewRequest}>
            <Plus className="mr-2 h-4 w-4" />
            New Change Request
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search change requests..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon" title="Filter" className="shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Changes</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                <h3 className="text-lg font-medium">Error loading change requests</h3>
                <p className="text-muted-foreground mt-1">Please try again later</p>
                <Button variant="outline" className="mt-4" onClick={() => refetch()}>
                  Try Again
                </Button>
              </div>
            ) : changes.length > 0 ? (
              changes.map((change) => (
                <Card key={change.id} className="shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-medium">{change.title}</CardTitle>
                        <div className="text-sm text-muted-foreground mt-1">CR-{change.id}</div>
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
                      <span>Created: {format(new Date(change.createdAt), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex gap-2">
                      {change.status === 'submitted' && user?.role === 'admin' && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleRejectClick(change.id)}>
                            Reject
                          </Button>
                          <Button size="sm" onClick={() => handleApprove(change.id)}>
                            Approve
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" onClick={() => handleViewChange(change.id)}>
                        View
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No change requests found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery ? 'Try a different search query' : 'Create your first change request to get started'}
                </p>
                {!searchQuery && (
                  <Button className="mt-4" onClick={handleCreateNewRequest}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Change Request
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                <h3 className="text-lg font-medium">Error loading change requests</h3>
                <p className="text-muted-foreground mt-1">Please try again later</p>
              </div>
            ) : changes.length > 0 ? (
              changes.map((change) => (
                <Card key={change.id} className="shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-medium">{change.title}</CardTitle>
                        <div className="text-sm text-muted-foreground mt-1">CR-{change.id}</div>
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
                      <span>Created: {format(new Date(change.createdAt), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex gap-2">
                      {user?.role === 'admin' && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleRejectClick(change.id)}>
                            Reject
                          </Button>
                          <Button size="sm" onClick={() => handleApprove(change.id)}>
                            Approve
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" onClick={() => handleViewChange(change.id)}>
                        View
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No pending change requests</h3>
                <p className="text-muted-foreground mt-1">There are no change requests waiting for approval.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                <h3 className="text-lg font-medium">Error loading change requests</h3>
                <p className="text-muted-foreground mt-1">Please try again later</p>
              </div>
            ) : changes.length > 0 ? (
              changes.map((change) => (
                <Card key={change.id} className="shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-medium">{change.title}</CardTitle>
                        <div className="text-sm text-muted-foreground mt-1">CR-{change.id}</div>
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
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        Implementation: {format(new Date(change.startDate), 'MMM d')} - {format(new Date(change.endDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end pt-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewChange(change.id)}>
                      View
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No upcoming changes</h3>
                <p className="text-muted-foreground mt-1">There are no approved changes scheduled for implementation.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                <h3 className="text-lg font-medium">Error loading change requests</h3>
                <p className="text-muted-foreground mt-1">Please try again later</p>
              </div>
            ) : changes.length > 0 ? (
              changes.map((change) => (
                <Card key={change.id} className="shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-medium">{change.title}</CardTitle>
                        <div className="text-sm text-muted-foreground mt-1">CR-{change.id}</div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(change.status)}>
                          {change.status.charAt(0).toUpperCase() + change.status.slice(1)}
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
                      <span>Completed: {format(new Date(change.updatedAt), 'MMM d, yyyy')}</span>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleViewChange(change.id)}>
                      View
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No completed changes</h3>
                <p className="text-muted-foreground mt-1">There are no completed change requests yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Change Request</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="rejection-reason">Reason for rejection</Label>
            <Textarea
              id="rejection-reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please provide a reason for rejection"
              className="mt-2"
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectConfirm}
              disabled={!rejectionReason.trim()}
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
};

export default Changes;
