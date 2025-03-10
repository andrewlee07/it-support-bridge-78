
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Check, X, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { getUserById } from '@/utils/mockData';

// Mock data for approvals - in a real app, this would come from an API
interface Approval {
  id: string;
  itemId: string;
  itemType: 'change' | 'release';
  itemTitle: string;
  requestedBy: string;
  requestedAt: Date;
  approvalRole: string;
  itemStatus: string;
}

const UserApprovals = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('pending');
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch approvals from an API
    const fetchApprovals = async () => {
      setIsLoading(true);
      // Mock data
      const mockApprovals: Approval[] = [
        {
          id: 'apr-1',
          itemId: 'CHG00001',
          itemType: 'change',
          itemTitle: 'Network Upgrade for North Office',
          requestedBy: 'user-2',
          requestedAt: new Date(Date.now() - 86400000 * 2),
          approvalRole: 'IT Manager',
          itemStatus: 'submitted'
        },
        {
          id: 'apr-2',
          itemId: 'REL00003',
          itemType: 'release',
          itemTitle: 'Q2 Software Release',
          requestedBy: 'user-3',
          requestedAt: new Date(Date.now() - 86400000),
          approvalRole: 'Change Manager',
          itemStatus: 'pending'
        },
        {
          id: 'apr-3',
          itemId: 'CHG00002',
          itemType: 'change',
          itemTitle: 'Database Server Upgrade',
          requestedBy: 'user-1',
          requestedAt: new Date(),
          approvalRole: 'IT Staff',
          itemStatus: 'submitted'
        }
      ];
      
      setApprovals(mockApprovals);
      setIsLoading(false);
    };

    fetchApprovals();
  }, [user?.id]);

  const handleApprove = (approvalId: string) => {
    // In a real app, call an API to approve the item
    toast.success("Item approved successfully");
    setApprovals(prev => prev.filter(a => a.id !== approvalId));
  };

  const handleReject = (approvalId: string) => {
    // In a real app, call an API to reject the item
    toast.success("Item rejected");
    setApprovals(prev => prev.filter(a => a.id !== approvalId));
  };

  const handleViewItem = (itemType: string, itemId: string) => {
    if (itemType === 'change') {
      navigate(`/changes/${itemId}`);
    } else if (itemType === 'release') {
      navigate(`/releases/${itemId}`);
    }
  };

  const renderApprovalItem = (approval: Approval) => {
    const requester = getUserById(approval.requestedBy);
    
    return (
      <Card key={approval.id} className="mb-4">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="uppercase text-xs">
                  {approval.itemType}
                </Badge>
                <span className="text-sm font-medium">{approval.itemId}</span>
              </div>
              <h3 className="text-lg font-medium mb-2">{approval.itemTitle}</h3>
              <div className="text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <span>Requested by: {requester?.name || 'Unknown'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{format(new Date(approval.requestedAt), 'MMM d, yyyy')}</span>
                </div>
                <div className="mt-1">
                  <span className="text-primary">Role: {approval.approvalRole}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleViewItem(approval.itemType, approval.itemId)}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
            <Button 
              size="sm" 
              variant="outline" 
              className="border-red-200 text-red-600 hover:bg-red-50"
              onClick={() => handleReject(approval.id)}
            >
              <X className="h-4 w-4 mr-1" />
              Reject
            </Button>
            <Button 
              size="sm"
              onClick={() => handleApprove(approval.id)}
            >
              <Check className="h-4 w-4 mr-1" />
              Approve
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Approvals</h1>
            <p className="text-muted-foreground">
              View and manage change and release approvals assigned to you
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="pending">
              Pending Approvals
              {approvals.length > 0 && (
                <Badge className="ml-2 bg-primary text-white">{approvals.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">Completed Approvals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-6">
            {isLoading ? (
              <div className="py-8 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : approvals.length > 0 ? (
              <div>
                {approvals.map(renderApprovalItem)}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-medium mb-2">No Pending Approvals</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    You don't have any pending approval requests. When you are assigned as an approver, items will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <Card>
              <CardContent className="py-8 flex flex-col items-center justify-center">
                <h3 className="text-xl font-medium mb-2">Approval History</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Your approval history will be displayed here. Currently, there are no completed approvals to show.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default UserApprovals;
