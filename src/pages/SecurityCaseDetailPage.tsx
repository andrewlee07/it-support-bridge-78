
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
  Plus,
  Mail,
  Phone,
  BookPlus,
  Save
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
import { Progress } from '@/components/ui/progress';

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
      toast.info('Edit functionality would open here');
      // appNavigation.goToEditSecurityCase(id);
    }
  }, [id]);

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

  // Get priority color for badges
  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case 'Critical': 
      case 'High': return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'Medium': return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
      case 'Low': return 'bg-green-100 text-green-800 hover:bg-green-100';
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

  // Calculate SLA status
  const responseSLA = securityCase ? calculateSLAStatus(securityCase, 'response') : null;
  const resolutionSLA = securityCase ? calculateSLAStatus(securityCase, 'resolution') : null;

  // Function to determine color for SLA indicator
  const getSLAIndicatorColor = (progress: number) => {
    if (progress <= 20) return "bg-red-500";
    if (progress <= 50) return "bg-amber-500";
    return "bg-green-500";
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
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
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
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
    <div className="container mx-auto px-4 py-6 w-full max-w-full">
      {/* Header with back button and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Email User
          </Button>
          <Button variant="outline" size="sm">
            <Phone className="mr-2 h-4 w-4" />
            Call User
          </Button>
          <Button variant="outline" size="sm">
            <BookPlus className="mr-2 h-4 w-4" />
            Add KB Article
          </Button>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Case Title and Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{securityCase.title}</h1>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="font-medium">{getUserNameById(securityCase.reportedBy)}</span>
            <span>|</span>
            <span>Opened: {formatDate(securityCase.reportedAt)}</span>
          </div>
          <Badge className={getPriorityColor(securityCase.priority)}>
            {securityCase.priority.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={(value) => setActiveTab(value as SecurityCaseTab)}>
        <TabsList className="mb-6 border-b w-full justify-start rounded-none h-auto p-0">
          <TabsTrigger 
            value="overview" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-4"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="notes" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-4"
          >
            Notes
          </TabsTrigger>
          <TabsTrigger 
            value="affected-systems" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-4"
          >
            Affected Services
          </TabsTrigger>
          <TabsTrigger 
            value="related-items" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-4"
          >
            Related Items
          </TabsTrigger>
        </TabsList>

        {/* Main Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content column - approximately 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab content panels */}
            <TabsContent value="overview" className="mt-0 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Security Case Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">ID</p>
                      <p className="font-mono">
                        <Link to={`/security/case/${securityCase.id}`} className="hover:underline text-blue-600">
                          {securityCase.id}
                        </Link>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <Badge className={getStatusColor(securityCase.status)}>
                        {securityCase.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Priority</p>
                      <Badge className={getPriorityColor(securityCase.priority)}>
                        {securityCase.priority}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Type</p>
                      <Badge variant="outline" className={getTypeColor(securityCase.type)}>
                        {securityCase.type}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reported By</p>
                      <p>{getUserNameById(securityCase.reportedBy)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reported On</p>
                      <p>{formatDate(securityCase.reportedAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Impacted Users</p>
                      <p>{securityCase.impactedUsers}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                      <p>{securityCase.assignedTo ? getUserNameById(securityCase.assignedTo) : "Unassigned"}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
                    <p className="text-sm">{securityCase.description}</p>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Remediation Plan</p>
                    <p className="text-sm">{securityCase.remediationPlan}</p>
                  </div>
                  
                  {securityCase.affectedSystems && securityCase.affectedSystems.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Affected Services</p>
                      <div className="flex flex-wrap gap-2">
                        {securityCase.affectedSystems.map((system, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="bg-blue-50 text-blue-700 cursor-pointer hover:bg-blue-100"
                            onClick={() => handleSystemClick(system)}
                          >
                            {system}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Activity Timeline */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[400px] overflow-y-auto">
                  <div className="space-y-4">
                    {securityCase.audit && securityCase.audit.map((entry, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            {entry.action === 'created' && <FileText className="h-4 w-4" />}
                            {entry.action === 'updated' && <Edit className="h-4 w-4" />}
                            {entry.action === 'note-added' && <MessageSquare className="h-4 w-4" />}
                            {entry.action === 'resolved' && <AlertTriangle className="h-4 w-4" />}
                          </div>
                          {index < securityCase.audit.length - 1 && <div className="w-0.5 h-full bg-muted" />}
                        </div>
                        <div className="pb-4">
                          <div className="flex items-baseline gap-2">
                            <p className="font-medium">{entry.userName || getUserNameById(entry.performedBy || '')}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(entry.timestamp)}
                            </p>
                          </div>
                          <p className="text-sm">{entry.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="mt-0 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle>Case Notes</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={openAddNoteDialog}>
                      <Plus className="h-4 w-4 mr-2" /> Add Note
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Case Notes section */}
                  {securityCase.notes && securityCase.notes.length > 0 ? (
                    <div className="space-y-4">
                      {securityCase.notes.map((note) => (
                        <div key={note.id} className="border-l-2 border-gray-300 pl-4 pb-4 mb-3">
                          <div className="flex justify-between mb-1">
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
                      <Button variant="outline" className="mt-4" onClick={openAddNoteDialog}>
                        <Plus className="h-4 w-4 mr-2" /> Add First Note
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="affected-systems" className="mt-0 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle>Affected Services</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Add Service
                  </Button>
                </CardHeader>
                <CardContent>
                  {securityCase.affectedSystems && securityCase.affectedSystems.length > 0 ? (
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
                              <p className="text-sm text-muted-foreground">Service</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <Server className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No affected services have been added yet</p>
                      <Button variant="outline" className="mt-4">
                        <Plus className="h-4 w-4 mr-2" /> Add Service
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="related-items" className="mt-0 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle>Related Items</CardTitle>
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
                              className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/40 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <Link 
                                  to={`/tickets/${ticketId}`}
                                  className="font-mono hover:underline text-blue-600"
                                >
                                  {ticketId}
                                </Link>
                              </div>
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
                              className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/40 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <Server className="h-4 w-4 text-muted-foreground" />
                                <Link 
                                  to={`/assets/${assetId}`}
                                  className="font-mono hover:underline text-blue-600"
                                >
                                  {assetId}
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          {/* Side panel column - approximately 1/3 width */}
          <div className="space-y-6">
            {/* SLA Status Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">SLA Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Response SLA</span>
                    <span className="text-sm">
                      {responseSLA?.targetHours} hours target
                    </span>
                  </div>
                  <Progress 
                    value={responseSLA?.percentLeft || 0} 
                    className="h-2" 
                    indicatorClassName={getSLAIndicatorColor(responseSLA?.percentLeft || 0)} 
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {responseSLA?.timeLeft === 'Completed' 
                      ? 'First response completed' 
                      : `${responseSLA?.percentLeft}% time remaining`}
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Resolution SLA</span>
                    <span className="text-sm">
                      {resolutionSLA?.targetHours} hours target
                    </span>
                  </div>
                  <Progress 
                    value={resolutionSLA?.percentLeft || 0} 
                    className="h-2" 
                    indicatorClassName={getSLAIndicatorColor(resolutionSLA?.percentLeft || 0)} 
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {resolutionSLA?.timeLeft === 'Completed' 
                      ? 'Case resolved' 
                      : resolutionSLA?.isBreached 
                        ? 'SLA breached' 
                        : `${resolutionSLA?.percentLeft}% time remaining`}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Assignee Card */}
            <Card>
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

            {/* Related Knowledge */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Related Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                    <h4 className="font-medium">Data Breach Response Protocol</h4>
                    <p className="text-sm text-muted-foreground">Standard procedures for containing and remediation</p>
                  </div>
                  <div className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                    <h4 className="font-medium">API Security Guidelines</h4>
                    <p className="text-sm text-muted-foreground">Best practices for securing API endpoints</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Security Cases */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Similar Security Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                    <h4 className="font-medium">SEC00042: Customer API data exposure</h4>
                    <p className="text-sm text-muted-foreground">Resolved on Jan 15, 2023</p>
                  </div>
                  <div className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                    <h4 className="font-medium">SEC00078: API gateway misconfiguration</h4>
                    <p className="text-sm text-muted-foreground">Resolved on Mar 22, 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>

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
