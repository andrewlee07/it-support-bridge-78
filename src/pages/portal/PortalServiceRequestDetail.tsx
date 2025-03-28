
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, ClipboardList, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTicketDetail } from '@/hooks/useTicketDetail';
import { formatDistanceToNow } from 'date-fns';
import { PORTAL, PORTAL_MY_REQUESTS } from '@/utils/routes/portalRouteConstants';
import PageTransition from '@/components/shared/PageTransition';
import { cn } from '@/lib/utils';
import PortalPermissionGuard from '@/components/portal/PortalPermissionGuard';
import StatusTracker from '@/components/portal/StatusTracker';
import UserCommentForm from '@/components/portal/UserCommentForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const PortalServiceRequestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ticket, loading, error } = useTicketDetail(id);
  const [activeTab, setActiveTab] = useState('details');
  const { toast } = useToast();
  
  // This would get the real steps from ticket status history in a real app
  const getRequestSteps = () => {
    if (!ticket) return [];
    
    const isFulfilled = ['closed', 'fulfilled'].includes(ticket.status);
    const isInProgress = ticket.status === 'in-progress';
    const isPending = ticket.status === 'pending';
    
    return [
      { 
        label: 'Requested', 
        status: 'completed' as const,
        date: ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : undefined
      },
      { 
        label: 'In Review', 
        status: (isPending || isInProgress || isFulfilled) ? 'completed' as const : 'upcoming' as const,
        date: isPending || isInProgress || isFulfilled ? '3 days ago' : undefined
      },
      { 
        label: 'In Progress', 
        status: (isInProgress || isFulfilled) ? 'completed' as const : 'upcoming' as const,
        date: isInProgress || isFulfilled ? '2 days ago' : undefined
      },
      { 
        label: 'Fulfilled', 
        status: isFulfilled ? 'completed' as const : 'upcoming' as const,
        date: isFulfilled ? '1 day ago' : undefined
      }
    ];
  };
  
  const handleAddComment = (ticketId: string, comment: string) => {
    // In a real app, this would call an API
    console.log(`Adding comment to service request ${ticketId}: ${comment}`);
    
    // For demo purposes, show a success toast
    toast({
      title: "Comment submitted",
      description: "Your comment has been submitted successfully.",
    });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading service request details...</p>
        </div>
      </div>
    );
  }
  
  if (error || !ticket) {
    return (
      <div className="text-center py-12">
        <ClipboardList className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Error Loading Service Request</h2>
        <p className="text-muted-foreground mb-6">
          The service request you're looking for could not be found or you don't have permission to view it.
        </p>
        <Link to={PORTAL}>
          <Button>Return to Portal</Button>
        </Link>
      </div>
    );
  }
  
  const isFulfilled = ['closed', 'fulfilled'].includes(ticket.status);
  
  return (
    <PortalPermissionGuard>
      <PageTransition>
        <div className="mb-6">
          <Link to={PORTAL_MY_REQUESTS} className="inline-flex items-center text-sm text-primary hover:text-primary/80">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to My Requests
          </Link>
        </div>
        
        <Card className="overflow-hidden border-0 shadow-md">
          <CardHeader className={cn(
            "pb-4",
            isFulfilled ? "bg-green-50 dark:bg-green-900/20" : "bg-blue-50 dark:bg-blue-900/20"
          )}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <div className="flex items-center mb-2">
                  <ClipboardList className="h-5 w-5 text-primary mr-2" />
                  <Badge variant="outline" className="text-xs">
                    {ticket.id}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "ml-2 text-xs capitalize",
                      isFulfilled ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : 
                      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    )}
                  >
                    {ticket.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold">{ticket.title}</CardTitle>
              </div>
              
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {ticket.createdAt ? (
                  <span>Requested {formatDistanceToNow(new Date(ticket.createdAt))} ago</span>
                ) : (
                  <span>Recently requested</span>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Request Details</h3>
                  <div className="text-sm text-muted-foreground bg-muted/40 p-4 rounded-md">
                    {ticket.description || "No description provided."}
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Request Information</h3>
                    <dl className="grid grid-cols-2 gap-2 text-sm">
                      <dt className="text-muted-foreground">Service:</dt>
                      <dd>{ticket.serviceId || "General Request"}</dd>
                      
                      <dt className="text-muted-foreground">Priority:</dt>
                      <dd>{ticket.priority}</dd>
                      
                      <dt className="text-muted-foreground">Request Type:</dt>
                      <dd className="capitalize">{ticket.requestType || "Standard"}</dd>
                      
                      <dt className="text-muted-foreground">Requested by:</dt>
                      <dd>{ticket.customerName || "You"}</dd>
                    </dl>
                  </div>
                  
                  <StatusTracker steps={getRequestSteps()} />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Add a Comment</h3>
                  <UserCommentForm 
                    ticketId={ticket.id} 
                    onAddComment={handleAddComment} 
                    placeholder="Add any additional information about this request..."
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="updates" className="space-y-4">
                <h3 className="text-sm font-medium mb-2">Status Updates</h3>
                {ticket.updates && ticket.updates.length > 0 ? (
                  <div className="space-y-4">
                    {ticket.updates.map((update, index) => (
                      <div key={index} className="bg-muted/40 p-4 rounded-md">
                        <p className="text-sm font-medium">{update.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {update.timestamp ? formatDistanceToNow(new Date(update.timestamp)) + ' ago' : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No updates have been provided for this request yet.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="communication" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">Communication History</h3>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    New Message
                  </Button>
                </div>
                
                {ticket.notes && ticket.notes.length > 0 ? (
                  <div className="space-y-4">
                    {ticket.notes.map((note, index) => (
                      <div key={index} className={cn(
                        "p-3 rounded-md max-w-[85%]", 
                        note.createdBy === 'You' ? 
                          "bg-primary/10 ml-auto" : 
                          "bg-muted"
                      )}>
                        <p className="text-sm">{note.text}</p>
                        <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                          <span>{note.createdBy}</span>
                          {note.createdAt && (
                            <span>{formatDistanceToNow(new Date(note.createdAt))} ago</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No communication history yet.</p>
                  </div>
                )}
                
                <div className="mt-6 pt-4 border-t">
                  <UserCommentForm 
                    ticketId={ticket.id} 
                    onAddComment={handleAddComment} 
                    placeholder="Type your message here..."
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </PageTransition>
    </PortalPermissionGuard>
  );
};

export default PortalServiceRequestDetail;
