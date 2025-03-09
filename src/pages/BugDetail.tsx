
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import { Bug } from '@/utils/types/test/bug';
import { useQuery } from '@tanstack/react-query';
import { fetchBugById, updateBug } from '@/utils/mockData/testData';
import { useToast } from '@/hooks/use-toast';
import BugForm from '@/components/test-management/BugForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge, SeverityBadge } from '@/components/test-management/ui/BugBadges';
import { Badge } from '@/components/ui/badge';
import DetailBreadcrumb from '@/components/tickets/detail/DetailBreadcrumb';
import TicketLoadingError from '@/components/tickets/TicketLoadingError';

const BugDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Fetch bug details
  const { 
    data: bug, 
    isLoading, 
    isError, 
    refetch 
  } = useQuery({
    queryKey: ['bug', id],
    queryFn: () => fetchBugById(id || ''),
    enabled: !!id,
  });

  // Helper function to get user display name
  const getUserDisplayName = (userId: string) => {
    // This would be replaced with actual user lookup
    const userMap: Record<string, string> = {
      'user-1': 'John Doe',
      'user-2': 'Jane Smith',
    };
    return userMap[userId] || userId;
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    refetch();
    toast({
      title: 'Bug updated',
      description: 'The bug has been updated successfully.',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !bug?.data) {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
          <h2 className="text-2xl font-bold mb-4">Bug Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The bug you are looking for could not be found.
          </p>
          <Button 
            variant="default" 
            size="lg"
            className="px-6"
            onClick={() => navigate('/bugs')}
          >
            Return to Bugs
          </Button>
        </div>
      </PageTransition>
    );
  }

  const bugData = bug.data as Bug;

  return (
    <PageTransition>
      <div className="space-y-6">
        <DetailBreadcrumb 
          entityName="Bug"
          entityId={bugData.id}
          parentRoute="/bugs"
          parentName="Bugs"
        />

        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/bugs')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Bugs
          </Button>
          <Button onClick={() => setIsEditDialogOpen(true)} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Bug
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">{bugData.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  <SeverityBadge severity={bugData.severity} />
                  <StatusBadge status={bugData.status} />
                  <Badge variant="outline" className="capitalize">
                    {bugData.priority} priority
                  </Badge>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <div>ID: {bugData.id}</div>
                <div>Reported by: {getUserDisplayName(bugData.reportedBy || bugData.createdBy || '')}</div>
                <div>Reported on: {new Date(bugData.createdAt).toLocaleString()}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{bugData.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Steps to Reproduce</h3>
              <ol className="list-decimal pl-5 space-y-2">
                {bugData.stepsToReproduce.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            {bugData.attachment && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Screenshot</h3>
                <div className="border rounded-md p-2">
                  <img 
                    src={bugData.attachment} 
                    alt="Bug screenshot" 
                    className="max-h-80 object-contain mx-auto" 
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              {bugData.assignedDeveloper && (
                <div>
                  <span className="font-semibold">Assigned to:</span> {getUserDisplayName(bugData.assignedDeveloper)}
                </div>
              )}
              {bugData.relatedTestCase && (
                <div>
                  <span className="font-semibold">Related test case:</span> {bugData.relatedTestCase}
                </div>
              )}
              <div>
                <span className="font-semibold">Last updated:</span> {new Date(bugData.updatedAt).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Bug Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <BugForm 
              initialData={bugData}
              onSuccess={handleEditSuccess}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default BugDetail;
