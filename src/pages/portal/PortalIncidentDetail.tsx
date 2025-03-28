
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTicketDetail } from '@/hooks/useTicketDetail';
import { formatDistanceToNow } from 'date-fns';
import { PORTAL, PORTAL_MY_INCIDENTS } from '@/utils/routes/portalRouteConstants';
import PageTransition from '@/components/shared/PageTransition';
import { cn } from '@/lib/utils';

const PortalIncidentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ticket, loading, error } = useTicketDetail(id);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading incident details...</p>
        </div>
      </div>
    );
  }
  
  if (error || !ticket) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Error Loading Incident</h2>
        <p className="text-muted-foreground mb-6">
          The incident you're looking for could not be found or you don't have permission to view it.
        </p>
        <Link to={PORTAL}>
          <Button>Return to Portal</Button>
        </Link>
      </div>
    );
  }
  
  const isResolved = ['closed', 'resolved'].includes(ticket.status);
  
  return (
    <PageTransition>
      <div className="mb-6">
        <Link to={PORTAL_MY_INCIDENTS} className="inline-flex items-center text-sm text-primary hover:text-primary/80">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to My Incidents
        </Link>
      </div>
      
      <Card className="overflow-hidden border-0 shadow-md">
        <CardHeader className={cn(
          "pb-4",
          isResolved ? "bg-green-50 dark:bg-green-900/20" : "bg-amber-50 dark:bg-amber-900/20"
        )}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center mb-2">
                {isResolved ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
                )}
                <Badge variant={isResolved ? "outline" : "secondary"} className="text-xs">
                  {ticket.id}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "ml-2 text-xs capitalize",
                    isResolved ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : 
                    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
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
                <span>Reported {formatDistanceToNow(new Date(ticket.createdAt))} ago</span>
              ) : (
                <span>Recently reported</span>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Description</h3>
              <div className="text-sm text-muted-foreground bg-muted/40 p-4 rounded-md">
                {ticket.description || "No description provided."}
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Details</h3>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="text-muted-foreground">Priority:</dt>
                  <dd>{ticket.priority}</dd>
                  
                  <dt className="text-muted-foreground">Category:</dt>
                  <dd className="capitalize">{ticket.category}</dd>
                  
                  <dt className="text-muted-foreground">Reported by:</dt>
                  <dd>{ticket.customerName || "Anonymous"}</dd>
                </dl>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Status Updates</h3>
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
                {isResolved ? "Contact Support" : "Add Update"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageTransition>
  );
};

export default PortalIncidentDetail;
