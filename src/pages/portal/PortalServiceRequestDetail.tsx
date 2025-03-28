
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, ClipboardList } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTicketDetail } from '@/hooks/useTicketDetail';
import { formatDistanceToNow } from 'date-fns';
import { PORTAL, PORTAL_MY_REQUESTS } from '@/utils/routes/portalRouteConstants';
import PageTransition from '@/components/shared/PageTransition';
import { cn } from '@/lib/utils';

const PortalServiceRequestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ticket, loading, error } = useTicketDetail(id);
  
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
          <div className="space-y-6">
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
                  <dd>{ticket.customerName || "Anonymous"}</dd>
                </dl>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Progress</h3>
                {ticket.updates && ticket.updates.length > 0 ? (
                  <div className="space-y-3">
                    {ticket.updates.map((update, index) => (
                      <div key={index} className="text-sm border-l-2 border-primary pl-3">
                        <p className="font-medium">{update.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {update.timestamp ? formatDistanceToNow(new Date(update.timestamp)) + ' ago' : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No updates yet.</p>
                )}
              </div>
            </div>
            
            {ticket.notes && ticket.notes.length > 0 && (
              <>
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Communication History</h3>
                  <div className="space-y-4">
                    {ticket.notes.map((note, index) => (
                      <div key={index} className="bg-muted/40 p-3 rounded-md">
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
                </div>
              </>
            )}
            
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="w-full max-w-xs">
                {isFulfilled ? "Submit Feedback" : "Add Comment"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageTransition>
  );
};

export default PortalServiceRequestDetail;
