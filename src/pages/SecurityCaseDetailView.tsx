
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Mail, Phone, BookPlus, Save, Clock, AlertTriangle, FileText, Users, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { SecurityCase, SecurityCaseTab } from '@/utils/types/security';
import { Progress } from '@/components/ui/progress';
import { getUserNameById } from '@/utils/userUtils';
import { useSecurityCaseDetail } from '@/hooks/security/useSecurityCaseDetail';
import { toast } from 'sonner';

const SecurityCaseDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SecurityCaseTab>('overview');
  const [newNote, setNewNote] = useState('');
  
  const {
    securityCase,
    loading,
    error,
    updateSecurityCase,
    addNote,
    resolveSecurityCase,
    reopenSecurityCase,
    assignSecurityCase,
    calculateSLAStatus
  } = useSecurityCaseDetail(id || '');

  const handleAddNote = () => {
    if (newNote.trim()) {
      addNote(newNote);
      setNewNote('');
      toast.success('Note added successfully');
    } else {
      toast.error('Note cannot be empty');
    }
  };

  const handleBackClick = () => {
    navigate('/security');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full inline-block mb-2"></div>
          <p>Loading security case...</p>
        </div>
      </div>
    );
  }

  if (error || !securityCase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error Loading Security Case</h2>
        <p className="text-muted-foreground mb-6">{error || 'Security case not found'}</p>
        <Button onClick={handleBackClick}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Security Cases
        </Button>
      </div>
    );
  }

  // Calculate SLA information
  const responseSLA = calculateSLAStatus(securityCase, 'response');
  const resolutionSLA = calculateSLAStatus(securityCase, 'resolution');
  
  const getSLAIndicatorColor = (percentLeft: number) => {
    if (percentLeft <= 20) return "bg-red-500";
    if (percentLeft <= 50) return "bg-amber-500";
    return "bg-green-500";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return "bg-blue-100 text-blue-800";
      case 'Pending': return "bg-yellow-100 text-yellow-800";
      case 'Resolved': return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return "bg-red-100 text-red-800";
      case 'Medium': return "bg-orange-100 text-orange-800";
      case 'Low': return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Data Breach': return "bg-red-50 text-red-700 border-red-200";
      case 'SAR': return "bg-purple-50 text-purple-700 border-purple-200";
      case 'Compliance': return "bg-blue-50 text-blue-700 border-blue-200";
      case 'Threat': return "bg-orange-50 text-orange-700 border-orange-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'dd MMM yyyy, HH:mm');
  };

  return (
    <div className="max-w-full space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleBackClick}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Security Case: {securityCase.id}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Reported By: {getUserNameById(securityCase.reportedBy)}</span>
              <span>•</span>
              <span>Opened: {formatDate(securityCase.reportedAt)}</span>
              <Badge 
                className={getPriorityColor(securityCase.priority) + " ml-2"}
              >
                {securityCase.priority}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Notify Stakeholders
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="default" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={(value) => setActiveTab(value as SecurityCaseTab)}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="investigation">Investigation</TabsTrigger>
          <TabsTrigger value="affected-systems">Affected Systems</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="related-items">Related Items</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Security Case Information Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Security Case Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">ID</p>
                      <p>{securityCase.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <Badge className={getStatusColor(securityCase.status)}>
                        {securityCase.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Type</p>
                      <Badge className={getTypeColor(securityCase.type)}>
                        {securityCase.type}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Priority</p>
                      <Badge className={getPriorityColor(securityCase.priority)}>
                        {securityCase.priority}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reported By</p>
                      <p>{getUserNameById(securityCase.reportedBy)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reported Date</p>
                      <p>{formatDate(securityCase.reportedAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                      <p>{securityCase.assignedTo ? getUserNameById(securityCase.assignedTo) : 'Unassigned'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Impacted Users</p>
                      <p>{securityCase.impactedUsers}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Title</p>
                    <p className="text-lg font-medium">{securityCase.title}</p>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
                    <p className="text-sm">{securityCase.description}</p>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Remediation Plan</p>
                    <p className="text-sm">{securityCase.remediationPlan || 'No remediation plan documented yet.'}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Investigation Timeline */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Investigation Timeline</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[400px] overflow-y-auto">
                  <div className="space-y-4">
                    {securityCase.investigationSteps && securityCase.investigationSteps.length > 0 ? (
                      securityCase.investigationSteps.map((step, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            {index < securityCase.investigationSteps.length - 1 && <div className="w-0.5 h-full bg-gray-200" />}
                          </div>
                          <div className="pb-4">
                            <div className="flex items-baseline gap-2">
                              <p className="text-xs text-muted-foreground">
                                {formatDate(step.date)}
                              </p>
                            </div>
                            <p className="text-sm">{step.text}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No investigation steps recorded yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Log */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Activity Log</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[400px] overflow-y-auto">
                  <div className="space-y-4">
                    {securityCase.audit && securityCase.audit.length > 0 ? (
                      securityCase.audit.map((entry, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div 
                              className={`w-3 h-3 rounded-full ${
                                entry.message?.includes('updated') ? 'bg-blue-500' :
                                entry.message?.includes('note') ? 'bg-purple-500' :
                                entry.message?.includes('closed') ? 'bg-red-500' :
                                entry.message?.includes('resolved') ? 'bg-green-500' :
                                'bg-gray-500'
                              }`} 
                            />
                            {index < (securityCase.audit?.length || 0) - 1 && <div className="w-0.5 h-full bg-gray-200" />}
                          </div>
                          <div className="pb-4">
                            <div className="flex items-baseline gap-2">
                              <p className="font-medium">{entry.performedBy ? getUserNameById(entry.performedBy) : entry.userName || 'System'}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(entry.timestamp)}
                              </p>
                            </div>
                            <p className="text-sm">{entry.message || entry.action || 'Activity recorded'}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No activity recorded yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Add Note Section */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Add Note</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Type your note here..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="min-h-[100px] mb-3"
                  />
                  <Button onClick={handleAddNote}>Add Note</Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Side Panel */}
            <div className="space-y-6">
              {/* SLA Information Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">SLA Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Response SLA</span>
                      <span className="text-sm">{
                        responseSLA.timeLeft === 'Completed' 
                          ? 'Responded' 
                          : responseSLA.isBreached 
                            ? 'Breached' 
                            : formatDate(securityCase.reportedAt ? new Date(new Date(securityCase.reportedAt).getTime() + responseSLA.targetHours * 60 * 60 * 1000).toISOString() : undefined)
                      }</span>
                    </div>
                    <Progress 
                      value={responseSLA.percentLeft} 
                      className="h-2" 
                      // Apply color based on status
                      indicatorClassName={
                        responseSLA.isBreached 
                          ? "bg-red-500" 
                          : getSLAIndicatorColor(responseSLA.percentLeft)
                      } 
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {responseSLA.timeLeft === 'Completed' 
                        ? 'Response requirements met' 
                        : responseSLA.isBreached 
                          ? 'SLA Breached' 
                          : `${responseSLA.percentLeft}% time remaining`
                      }
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Resolution SLA</span>
                      <span className="text-sm">{
                        resolutionSLA.timeLeft === 'Completed' 
                          ? 'Resolved' 
                          : resolutionSLA.isBreached 
                            ? 'Breached' 
                            : formatDate(securityCase.reportedAt ? new Date(new Date(securityCase.reportedAt).getTime() + resolutionSLA.targetHours * 60 * 60 * 1000).toISOString() : undefined)
                      }</span>
                    </div>
                    <Progress 
                      value={resolutionSLA.percentLeft} 
                      className="h-2" 
                      indicatorClassName={
                        resolutionSLA.isBreached 
                          ? "bg-red-500" 
                          : getSLAIndicatorColor(resolutionSLA.percentLeft)
                      } 
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {resolutionSLA.timeLeft === 'Completed' 
                        ? 'Resolution requirements met' 
                        : resolutionSLA.isBreached 
                          ? 'SLA Breached' 
                          : `${resolutionSLA.percentLeft}% time remaining`
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Affected Systems */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Affected Systems</CardTitle>
                </CardHeader>
                <CardContent>
                  {securityCase.affectedSystems && securityCase.affectedSystems.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {securityCase.affectedSystems.map((system, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                          {system}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No systems identified yet.</p>
                  )}
                </CardContent>
              </Card>

              {/* Related Items */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Related Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Related Tickets</h4>
                      {securityCase.relatedTickets && securityCase.relatedTickets.length > 0 ? (
                        <div className="space-y-2">
                          {securityCase.relatedTickets.map((ticket, index) => (
                            <div key={index} className="p-2 border rounded-md text-sm hover:bg-accent transition-colors cursor-pointer">
                              {ticket}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No related tickets</p>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Related Assets</h4>
                      {securityCase.relatedAssets && securityCase.relatedAssets.length > 0 ? (
                        <div className="space-y-2">
                          {securityCase.relatedAssets.map((asset, index) => (
                            <div key={index} className="p-2 border rounded-md text-sm hover:bg-accent transition-colors cursor-pointer">
                              {asset}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No related assets</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {securityCase.status !== 'Resolved' ? (
                      <Button 
                        className="w-full" 
                        variant="default" 
                        onClick={() => resolveSecurityCase('Issue mitigated and documented')}
                      >
                        Resolve Case
                      </Button>
                    ) : (
                      <Button 
                        className="w-full" 
                        variant="destructive" 
                        onClick={() => reopenSecurityCase('Additional investigation required')}
                      >
                        Reopen Case
                      </Button>
                    )}
                    
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => {
                        toast.info('This would open an assignment dialog');
                      }}
                    >
                      Assign Case
                    </Button>
                    
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => {
                        toast.info('This would link to knowledge base articles');
                      }}
                    >
                      Find Related Knowledge
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Investigation Tab Content */}
        <TabsContent value="investigation">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Investigation Details</h3>
              <div className="space-y-4">
                <div className="border p-4 rounded-md bg-muted/20">
                  <h4 className="font-medium mb-2">Investigation Progress</h4>
                  <div className="space-y-4">
                    {securityCase.investigationSteps && securityCase.investigationSteps.length > 0 ? (
                      securityCase.investigationSteps.map((step, index) => (
                        <div key={index} className="bg-background p-3 rounded-md border">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{`Step ${index + 1}`}</span>
                            <span className="text-sm text-muted-foreground">{formatDate(step.date)}</span>
                          </div>
                          <p>{step.text}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No investigation steps documented yet.</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Add Investigation Step</h4>
                  <Textarea 
                    placeholder="Document the next step in the investigation..."
                    className="mb-3 min-h-[100px]"
                  />
                  <Button>Add Investigation Step</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Affected Systems Tab Content */}
        <TabsContent value="affected-systems">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Affected Systems Analysis</h3>
              <div className="space-y-4">
                <div className="border p-4 rounded-md bg-muted/20">
                  <h4 className="font-medium mb-2">Systems Affected</h4>
                  {securityCase.affectedSystems && securityCase.affectedSystems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {securityCase.affectedSystems.map((system, index) => (
                        <div key={index} className="bg-background p-3 rounded-md border">
                          <div className="flex items-center mb-1">
                            <Shield className="h-4 w-4 mr-2 text-blue-500" />
                            <span className="font-medium">{system}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Impact assessment pending</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No affected systems documented yet.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notes Tab Content */}
        <TabsContent value="notes">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Case Notes</h3>
                <Button variant="outline" size="sm">
                  Add Note
                </Button>
              </div>
              <div className="space-y-4">
                {securityCase.notes && securityCase.notes.length > 0 ? (
                  securityCase.notes.map((note) => (
                    <div key={note.id} className="border p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{getUserNameById(note.createdBy)}</span>
                        <span className="text-sm text-muted-foreground">{formatDate(note.createdAt)}</span>
                      </div>
                      <p className="text-sm">{note.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No notes have been added yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Related Items Tab Content */}
        <TabsContent value="related-items">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Related Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Related Tickets</h4>
                  {securityCase.relatedTickets && securityCase.relatedTickets.length > 0 ? (
                    <div className="space-y-2">
                      {securityCase.relatedTickets.map((ticket, index) => (
                        <div key={index} className="border p-3 rounded-md hover:bg-accent transition-colors cursor-pointer">
                          <div className="flex justify-between">
                            <span className="font-medium">{ticket}</span>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border rounded-md">
                      <p className="text-muted-foreground">No related tickets found.</p>
                      <Button variant="outline" size="sm" className="mt-2">Link Ticket</Button>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-medium mb-3">Related Assets</h4>
                  {securityCase.relatedAssets && securityCase.relatedAssets.length > 0 ? (
                    <div className="space-y-2">
                      {securityCase.relatedAssets.map((asset, index) => (
                        <div key={index} className="border p-3 rounded-md hover:bg-accent transition-colors cursor-pointer">
                          <div className="flex justify-between">
                            <span className="font-medium">{asset}</span>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border rounded-md">
                      <p className="text-muted-foreground">No related assets found.</p>
                      <Button variant="outline" size="sm" className="mt-2">Link Asset</Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityCaseDetailView;
