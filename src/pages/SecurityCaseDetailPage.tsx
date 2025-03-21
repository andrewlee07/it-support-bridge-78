
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Clock, 
  Edit, 
  FileText, 
  Server, 
  MessageSquare,
  Users, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { useAppNavigation } from '@/utils/routes/navigationUtils';
import { getUserNameById } from '@/utils/userUtils';
import { SecurityCase, SecurityCaseTab } from '@/utils/types/security';
import SecurityCaseSLAIndicator from '@/components/security/components/SecurityCaseSLAIndicator';
import { useSecurityCaseDetail } from '@/hooks/security/useSecurityCaseDetail';
import { toast } from 'sonner';
import { useDisclosure } from '@/hooks/useDisclosure';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';

const SecurityCaseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const appNavigation = useAppNavigation();
  const [activeTab, setActiveTab] = useState<SecurityCaseTab>('overview');
  const { isOpen: addNoteDialogOpen, onOpen: openAddNoteDialog, onClose: closeAddNoteDialog } = useDisclosure();
  const [noteText, setNoteText] = useState('');
  
  // Use the security case detail hook
  const { 
    securityCase, 
    loading, 
    error, 
    addNote, 
    updateSecurityCase, 
    resolveSecurityCase, 
    reopenSecurityCase, 
    assignSecurityCase, 
    calculateSLAStatus 
  } = useSecurityCaseDetail(id || '');

  // Log the id parameter and loading state on initial mount only
  useEffect(() => {
    console.log(`SecurityCaseDetailPage mounted with id: ${id}`);
    
    // Return a no-op cleanup function to prevent unnecessary re-renders
    return () => {};
  }, [id]);

  const handleBack = useCallback(() => {
    appNavigation.goToSecurity();
  }, [appNavigation]);

  const handleEdit = useCallback(() => {
    if (id) {
      appNavigation.goToEditSecurityCase(id);
    }
  }, [id, appNavigation]);

  const handleAddNote = useCallback(async () => {
    if (!noteText.trim()) {
      toast.error('Please enter a note');
      return;
    }
    
    if (await addNote(noteText)) {
      setNoteText('');
      closeAddNoteDialog();
      toast.success('Note added successfully');
    }
  }, [addNote, closeAddNoteDialog, noteText]);

  const handleSystemClick = useCallback((system: string) => {
    toast.info(`Viewing details for ${system}`);
    // In a real app, this would navigate to the system details page
  }, []);

  const handleRelatedItemClick = useCallback((itemId: string) => {
    toast.info(`Navigating to ${itemId}`);
    // In a real app, this would navigate to the related item
  }, []);

  // Get status color for badges
  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'Resolved': return 'bg-green-100 text-green-800 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  }, []);

  // Get type color for badges
  const getTypeColor = useCallback((type: string) => {
    switch (type) {
      case 'Data Breach': return 'bg-red-50 text-red-700 border-red-200';
      case 'SAR': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Compliance': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Threat': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  }, []);

  const formatDate = useCallback((dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (error) {
      return dateString;
    }
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 p-4 sm:p-6 w-full max-w-[1400px] mx-auto">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Security Cases
          </Button>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="space-y-2 text-center">
            <div className="h-6 w-24 bg-muted animate-pulse rounded mx-auto"></div>
            <div className="h-4 w-48 bg-muted animate-pulse rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !securityCase) {
    return (
      <div className="space-y-6 p-4 sm:p-6 w-full max-w-[1400px] mx-auto">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Security Cases
          </Button>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Security Case Not Found</h3>
            <p className="text-muted-foreground mt-1">
              {error || "The security case you're looking for doesn't exist or has been removed."}
            </p>
            <Button className="mt-6" onClick={handleBack}>
              Return to Security Cases
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6 p-4 sm:p-6">
      {/* Header with back button and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Security Cases
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button size="sm" className="bg-primary">
            Update Status
          </Button>
        </div>
      </div>

      {/* Main content in two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content column - approximately 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Case header card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-2xl">{securityCase.title}</CardTitle>
                  <CardDescription className="mt-1">
                    <span className="font-mono">{securityCase.id}</span>
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getStatusColor(securityCase.status)}>
                    {securityCase.status}
                  </Badge>
                  <Badge variant="outline" className={getTypeColor(securityCase.type)}>
                    {securityCase.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {securityCase.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Reported By</p>
                  <p className="font-medium">{getUserNameById(securityCase.reportedBy)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Reported At</p>
                  <p className="font-medium">{formatDate(securityCase.reportedAt)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Priority</p>
                  <p className="font-medium">{securityCase.priority}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Impacted Users</p>
                  <p className="font-medium">{securityCase.impactedUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different sections */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={(value) => setActiveTab(value as SecurityCaseTab)}>
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="investigation">Investigation</TabsTrigger>
              <TabsTrigger value="affected-systems">Affected Systems</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="related-items">Related Items</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Remediation Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{securityCase.remediationPlan}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="investigation" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Investigation Steps</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Add Step
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityCase.investigationSteps.map((step, index) => (
                      <div key={index} className="border-l-2 border-muted pl-4 pb-4">
                        <div className="flex justify-between mb-1">
                          <strong className="text-sm font-medium">Step {index + 1}</strong>
                          <span className="text-sm text-muted-foreground">{formatDate(step.date)}</span>
                        </div>
                        <p className="text-sm">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="affected-systems" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Affected Systems</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Add System
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {securityCase.affectedSystems.map((system, index) => (
                      <Card 
                        key={index} 
                        className="bg-muted/40 cursor-pointer hover:bg-muted/60 transition-colors"
                        onClick={() => handleSystemClick(system)}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <Server className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">{system}</h4>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Notes</CardTitle>
                  <Button variant="outline" size="sm" onClick={openAddNoteDialog}>
                    <Plus className="h-4 w-4 mr-2" /> Add Note
                  </Button>
                </CardHeader>
                <CardContent>
                  {securityCase.notes && securityCase.notes.length > 0 ? (
                    <div className="space-y-4">
                      {securityCase.notes.map((note) => (
                        <div key={note.id} className="border rounded-md p-4">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">{getUserNameById(note.createdBy)}</div>
                            <div className="text-sm text-muted-foreground">{formatDate(note.createdAt)}</div>
                          </div>
                          <p className="text-sm">{note.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No notes have been added yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="related-items" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Related Items</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Link Item
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityCase.relatedTickets && securityCase.relatedTickets.length > 0 ? (
                      <div>
                        <h4 className="font-medium mb-3">Related Tickets</h4>
                        <div className="space-y-2">
                          {securityCase.relatedTickets.map((ticketId, index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted/40 transition-colors"
                              onClick={() => handleRelatedItemClick(ticketId)}
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="font-mono">{ticketId}</span>
                              </div>
                              <ExternalLink className="h-4 w-4" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No related tickets found</p>
                      </div>
                    )}
                    {securityCase.relatedAssets && securityCase.relatedAssets.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-medium mb-3">Related Assets</h4>
                        <div className="space-y-2">
                          {securityCase.relatedAssets.map((assetId, index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted/40 transition-colors"
                              onClick={() => handleRelatedItemClick(assetId)}
                            >
                              <div className="flex items-center gap-2">
                                <Server className="h-4 w-4 text-muted-foreground" />
                                <span className="font-mono">{assetId}</span>
                              </div>
                              <ExternalLink className="h-4 w-4" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Side panel column - approximately 1/3 width */}
        <div className="space-y-6">
          {/* SLA Status Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">SLA Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <SecurityCaseSLAIndicator securityCase={securityCase} darkMode={false} />
                
                {securityCase.status !== 'Resolved' && (
                  <div className="text-sm text-muted-foreground flex items-center mt-2">
                    <Clock className="h-4 w-4 mr-1" />
                    {securityCase.firstResponseAt ? (
                      <span>First response in {formatDate(securityCase.firstResponseAt)}</span>
                    ) : (
                      <span>Awaiting first response</span>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Assignee Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              {securityCase.assignedTo ? (
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {getUserNameById(securityCase.assignedTo).charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{getUserNameById(securityCase.assignedTo)}</p>
                    <p className="text-sm text-muted-foreground">Security analyst</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Unassigned</span>
                  <Button variant="outline" size="sm">Assign</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Timeline Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityCase.audit && securityCase.audit.length > 0 ? (
                  <div className="space-y-3">
                    {securityCase.audit.map((entry, index) => (
                      <div key={index} className="border-l-2 border-muted pl-4 pb-3">
                        <div className="text-sm font-medium capitalize">{entry.action || "Update"}</div>
                        <div className="text-sm">{entry.message}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatDate(entry.timestamp)} by {entry.userName || getUserNameById(entry.performedBy || "")}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No activity recorded yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* People involved */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">People Involved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Reported by</div>
                    <div className="font-medium">{getUserNameById(securityCase.reportedBy)}</div>
                  </div>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <Separator />
                {securityCase.assignedTo && (
                  <>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-muted-foreground">Assigned to</div>
                        <div className="font-medium">{getUserNameById(securityCase.assignedTo)}</div>
                      </div>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Separator />
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Note Dialog */}
      <Dialog open={addNoteDialogOpen} onOpenChange={closeAddNoteDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Type your note here..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddNote}>Add Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecurityCaseDetailPage;
