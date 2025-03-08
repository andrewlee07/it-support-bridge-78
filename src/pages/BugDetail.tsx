
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import { fetchBugById, updateBug } from '@/utils/mockData/bugs';
import { Bug } from '@/utils/types/test/bug';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Check } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { StatusBadge, SeverityBadge } from '@/components/test-management/ui/BugBadges';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import BugForm from '@/components/test-management/BugForm';

const BugDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bug, setBug] = useState<Bug | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBug = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await fetchBugById(id);
          if (response.success && response.data) {
            setBug(response.data);
          } else {
            setError(response.message || 'Failed to load bug');
          }
        } else {
          setError('Invalid bug ID');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBug();
  }, [id]);

  const handleEditBug = () => {
    setIsEditDialogOpen(true);
  };

  const handleBugUpdated = (updatedBug: Bug) => {
    setBug(updatedBug);
    setIsEditDialogOpen(false);
    toast({
      title: "Bug Updated",
      description: "The bug has been successfully updated."
    });
  };

  // Helper function to get user display name
  const getUserDisplayName = (userId: string) => {
    // This would be replaced with actual user lookup
    const userMap: Record<string, string> = {
      'user-1': 'John Doe',
      'user-2': 'Jane Smith',
    };
    return userMap[userId] || userId;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !bug) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-semibold mb-2">Bug Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The bug you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <Button 
          variant="default"
          onClick={() => navigate('/bugs')}
        >
          Return to Bugs
        </Button>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/bugs')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bugs
          </Button>
          <h1 className="text-2xl font-bold">Bug: {bug.id}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <h2 className="text-xl font-bold">{bug.title}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <SeverityBadge severity={bug.severity} />
                    <StatusBadge status={bug.status} />
                    <Badge variant="outline" className="capitalize">
                      {bug.priority} priority
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleEditBug}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Description</h3>
                    <p className="text-sm">{bug.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Steps to Reproduce</h3>
                    <ol className="list-decimal pl-5 text-sm">
                      {bug.stepsToReproduce.map((step, index) => (
                        <li key={index} className="mb-1">{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  {bug.attachment && (
                    <div>
                      <h3 className="text-sm font-medium mb-1">Attachment</h3>
                      <div className="border rounded-md p-2">
                        <img 
                          src={bug.attachment} 
                          alt="Bug screenshot" 
                          className="max-h-60 object-contain mx-auto" 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <h3 className="text-lg font-medium">Details</h3>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium">Status</h4>
                    <StatusBadge status={bug.status} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Severity</h4>
                    <SeverityBadge severity={bug.severity} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Priority</h4>
                    <Badge variant="outline" className="capitalize">
                      {bug.priority}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Reported By</h4>
                    <p className="text-sm">{getUserDisplayName(bug.createdBy || bug.reportedBy || '')}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Reported On</h4>
                    <p className="text-sm">{new Date(bug.createdAt).toLocaleString()}</p>
                  </div>
                  {bug.assignedDeveloper && (
                    <div>
                      <h4 className="text-sm font-medium">Assigned To</h4>
                      <p className="text-sm">{getUserDisplayName(bug.assignedDeveloper)}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-medium">Last Updated</h4>
                    <p className="text-sm">{new Date(bug.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {bug.relatedTestCase && (
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-medium">Related Test Case</h3>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-sm">{bug.relatedTestCase}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 text-primary"
                    onClick={() => navigate(`/test-cases/${bug.relatedTestCase}`)}
                  >
                    View Test Case
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-3xl">
            <BugForm 
              initialData={bug} 
              onSuccess={handleBugUpdated}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default BugDetail;
