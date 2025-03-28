import React from 'react';
import { Ticket } from '@/utils/types/ticket';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, BookPlus, Save, AlertCircle, Bug, ClipboardList, Megaphone } from 'lucide-react';
import { format } from 'date-fns';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getUserNameById } from '@/utils/userUtils';
import { Textarea } from '@/components/ui/textarea';

interface IncidentDetailLayoutProps {
  ticket: Ticket;
  onAddNote: (note: string) => void;
  onUpdateTicket: (data: any) => void;
  onCloseTicket: (data: any) => void;
  onReopenTicket: (reason: string) => void;
}

const IncidentDetailLayout: React.FC<IncidentDetailLayoutProps> = ({
  ticket,
  onAddNote,
  onUpdateTicket,
  onCloseTicket,
  onReopenTicket
}) => {
  const [newComment, setNewComment] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('overview');
  
  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddNote(newComment);
      setNewComment('');
    }
  };

  const calculateSlaProgress = (created: Date, target: Date) => {
    const now = new Date();
    const totalDuration = target.getTime() - created.getTime();
    const elapsedDuration = now.getTime() - created.getTime();
    const progress = Math.min(100, Math.max(0, (elapsedDuration / totalDuration) * 100));
    
    // Return percentage remaining (not percentage used)
    return 100 - Math.floor(progress);
  };

  // Mock SLA targets for demonstration
  const responseSLA = new Date(new Date(ticket.createdAt).getTime() + 2 * 60 * 60 * 1000); // 2 hours
  const resolutionSLA = new Date(new Date(ticket.createdAt).getTime() + 24 * 60 * 60 * 1000); // 24 hours
  
  const responseSLAProgress = calculateSlaProgress(new Date(ticket.createdAt), responseSLA);
  const resolutionSLAProgress = calculateSlaProgress(new Date(ticket.createdAt), resolutionSLA);
  
  const getSLAIndicatorColor = (progress: number) => {
    if (progress <= 20) return "bg-red-500";
    if (progress <= 50) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className="max-w-full space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Link to="/incidents">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{ticket.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Owner: {getUserNameById(ticket.assignedTo || '')}</span>
              <span>•</span>
              <span>Opened: {format(new Date(ticket.createdAt), 'dd/MM/yyyy')}</span>
              <Badge 
                className={
                  ticket.priority === 'P1' ? 
                  "bg-red-100 text-red-800 ml-2" : 
                  ticket.priority === 'P2' ? 
                  "bg-orange-100 text-orange-800 ml-2" : 
                  "bg-yellow-100 text-yellow-800 ml-2"
                }
              >
                {ticket.priority === 'P1' ? 'CRITICAL' : 
                 ticket.priority === 'P2' ? 'HIGH' : 'MEDIUM'}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Email User
          </Button>
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Call User
          </Button>
          <Button variant="outline" size="sm">
            <BookPlus className="h-4 w-4 mr-2" />
            Add KB Article
          </Button>
          <Button variant="default" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="relatedItems">Related Items</TabsTrigger>
          <TabsTrigger value="impactAnalysis">Impact Analysis</TabsTrigger>
          <TabsTrigger value="configItems">Configuration Items</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Incident Information Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Incident Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">ID</p>
                      <p>{ticket.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <Badge 
                        className={
                          ticket.status === 'open' ? "bg-blue-100 text-blue-800" : 
                          ticket.status === 'in-progress' ? "bg-purple-100 text-purple-800" : 
                          ticket.status === 'resolved' ? "bg-green-100 text-green-800" : 
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        {ticket.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Priority</p>
                      <Badge 
                        className={
                          ticket.priority === 'P1' ? "bg-red-100 text-red-800" : 
                          ticket.priority === 'P2' ? "bg-orange-100 text-orange-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {ticket.priority}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Impact</p>
                      <p>{ticket.impactLevel || 'High'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Category</p>
                      <p>{ticket.category}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Urgency</p>
                      <p>{ticket.urgency || 'High'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Source</p>
                      <p>Phone</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reported By</p>
                      <p>{getUserNameById(ticket.createdBy)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
                    <p className="text-sm">{ticket.description}</p>
                  </div>
                  
                  {ticket.affectedServices && ticket.affectedServices.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Affected Services</p>
                      <div className="flex flex-wrap gap-2">
                        {ticket.affectedServices.map((service, index) => (
                          <Badge key={index} variant="outline">{service}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[400px] overflow-y-auto">
                  <div className="space-y-4">
                    {ticket.audit && ticket.audit.map((entry, index) => (
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
                          {index < ticket.audit.length - 1 && <div className="w-0.5 h-full bg-gray-200" />}
                        </div>
                        <div className="pb-4">
                          <div className="flex items-baseline gap-2">
                            <p className="font-medium">{entry.performedBy || entry.userName || 'System'}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(entry.timestamp), 'dd MMM yyyy HH:mm')}
                            </p>
                          </div>
                          <p className="text-sm">{entry.message || entry.action || 'Activity recorded'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Communication Section */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Add Comment</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Type your comment here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px] mb-3"
                  />
                  <Button onClick={handleAddComment}>Add Comment</Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
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
                      <span className="text-sm">{format(responseSLA, 'HH:mm, dd MMM')}</span>
                    </div>
                    <Progress 
                      value={responseSLAProgress} 
                      className="h-2" 
                      indicatorClassName={getSLAIndicatorColor(responseSLAProgress)} 
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {responseSLAProgress}% time remaining
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Resolution SLA</span>
                      <span className="text-sm">{format(resolutionSLA, 'HH:mm, dd MMM')}</span>
                    </div>
                    <Progress 
                      value={resolutionSLAProgress} 
                      className="h-2" 
                      indicatorClassName={getSLAIndicatorColor(resolutionSLAProgress)} 
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {resolutionSLAProgress}% time remaining
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Create from Incident Actions Card - NEW SECTION */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Create from Incident</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center" 
                    onClick={() => window.location.href = `/incidents/${ticket.id}/create-problem`}
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Create Problem
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={() => window.location.href = `/incidents/${ticket.id}/create-bug`}
                  >
                    <Bug className="h-4 w-4 mr-2" />
                    Create Bug
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={() => window.location.href = `/incidents/${ticket.id}/create-task`}
                  >
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={() => window.location.href = `/incidents/${ticket.id}/create-announcement`}
                  >
                    <Megaphone className="h-4 w-4 mr-2" />
                    Create Announcement
                  </Button>
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
                      <h4 className="font-medium">Network Outage Troubleshooting Guide</h4>
                      <p className="text-sm text-muted-foreground">Steps to diagnose and resolve common network issues</p>
                    </div>
                    <div className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                      <h4 className="font-medium">Payment Processing Systems Overview</h4>
                      <p className="text-sm text-muted-foreground">Documentation of payment infrastructure components</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Incidents */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Similar Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                      <h4 className="font-medium">INC001249: Payment gateway connectivity failure</h4>
                      <p className="text-sm text-muted-foreground">Resolved on 12 Feb 2023</p>
                    </div>
                    <div className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                      <h4 className="font-medium">INC001042: Network latency impacting transactions</h4>
                      <p className="text-sm text-muted-foreground">Resolved on 03 Jan 2023</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Placeholder content for other tabs */}
        <TabsContent value="relatedItems">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Related Items</h3>
              <p>This section will display items related to this incident.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="impactAnalysis">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Impact Analysis</h3>
              <p>This section will display impact analysis for this incident.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="configItems">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Configuration Items</h3>
              <p>This section will display configuration items affected by this incident.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Tasks</h3>
              <p>This section will display tasks related to this incident.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IncidentDetailLayout;
