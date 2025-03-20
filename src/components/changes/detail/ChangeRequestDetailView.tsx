
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChangeRequest } from '@/utils/types/change';
import { useAuth } from '@/contexts/AuthContext';
import { Megaphone } from 'lucide-react';
import ChangeRequestHeader from './ChangeRequestHeader';
import ChangeRequestDetails from './ChangeRequestDetails';
import ChangeRequestTimeline from './ChangeRequestTimeline';
import ChangeRiskAssessment from './ChangeRiskAssessment';
import ChangeImplementationDetails from './ChangeImplementationDetails';
import CreateAnnouncementDialog from '../CreateAnnouncementDialog';

interface ChangeRequestDetailViewProps {
  changeRequest: ChangeRequest;
  onApprove?: () => void;
  onReject?: () => void;
  onEdit?: () => void;
  onUpdateStatus?: (status: string, closureReason?: string) => void;
  onAddImplementor?: (userId: string) => void;
  onAddApprover?: (userId: string, role: string) => void;
  onClose?: () => void;
}

const ChangeRequestDetailView: React.FC<ChangeRequestDetailViewProps> = ({
  changeRequest,
  onApprove,
  onReject,
  onEdit,
  onUpdateStatus,
  onAddImplementor,
  onAddApprover,
  onClose
}) => {
  const { user } = useAuth();
  const [createAnnouncementDialogOpen, setCreateAnnouncementDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <ChangeRequestHeader 
        changeRequest={changeRequest}
        onEdit={onEdit}
        onUpdateStatus={onUpdateStatus}
      />
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          className="flex items-center"
          onClick={() => setCreateAnnouncementDialogOpen(true)}
        >
          <Megaphone className="mr-2 h-4 w-4" />
          Create Announcement
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="details" onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="activity">Activity Timeline</TabsTrigger>
              <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 mt-4">
              <ChangeRequestDetails 
                changeRequest={changeRequest}
                onApprove={onApprove}
                onReject={onReject}
                onClose={onClose}
                canApprove={user?.role === 'admin' || user?.role === 'change-manager'}
                canReject={user?.role === 'admin' || user?.role === 'change-manager'}
                canClose={changeRequest.status === 'in-progress'}
              />
            </TabsContent>
            
            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChangeRequestTimeline 
                    audit={changeRequest.audit}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="risk" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChangeRiskAssessment 
                    assessmentAnswers={changeRequest.assessmentAnswers || []}
                    riskScore={changeRequest.riskScore}
                    riskLevel={changeRequest.riskLevel}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="implementation" className="mt-4">
              <ChangeImplementationDetails
                implementationPlan={changeRequest.implementationPlan}
                rollbackPlan={changeRequest.rollbackPlan}
                implementor={changeRequest.implementor}
                onAddImplementor={onAddImplementor}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-sm font-medium">{changeRequest.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Level</p>
                    <p className="text-sm font-medium">{changeRequest.riskLevel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="text-sm font-medium">{new Date(changeRequest.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="text-sm font-medium">{new Date(changeRequest.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {changeRequest.approvedBy ? (
                  <div>
                    <p className="text-sm text-muted-foreground">Approved By</p>
                    <p className="text-sm font-medium">{changeRequest.approvedBy}</p>
                    <p className="text-sm text-muted-foreground mt-1">Date</p>
                    <p className="text-sm font-medium">
                      {changeRequest.approvedAt 
                        ? new Date(changeRequest.approvedAt).toLocaleDateString() 
                        : 'N/A'}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm">No approvals yet</p>
                )}
                
                {user?.role === 'admin' && !changeRequest.approvedBy && (
                  <Button 
                    onClick={onApprove} 
                    className="w-full mt-2"
                  >
                    Approve
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Related Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No related changes found</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Create Announcement Dialog */}
      <CreateAnnouncementDialog
        open={createAnnouncementDialogOpen}
        onOpenChange={setCreateAnnouncementDialogOpen}
        changeRequest={changeRequest}
        onSuccess={() => {
          // Handle announcement creation success
        }}
      />
    </div>
  );
};

export default ChangeRequestDetailView;
