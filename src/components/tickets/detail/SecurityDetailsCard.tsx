
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ticket } from '@/utils/types/ticket';
import { format } from 'date-fns';

interface SecurityDetailsCardProps {
  ticket: Ticket;
}

const SecurityDetailsCard: React.FC<SecurityDetailsCardProps> = ({ ticket }) => {
  if (ticket.type !== 'security') {
    return null;
  }

  const getSecurityClassBadge = (classification?: string) => {
    if (!classification) return null;
    
    const classColors: Record<string, string> = {
      'public': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'internal': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'confidential': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'restricted': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    };
    
    return (
      <Badge className={classColors[classification] || 'bg-gray-100 text-gray-800'}>
        {classification?.charAt(0).toUpperCase() + classification?.slice(1)}
      </Badge>
    );
  };
  
  const getBreachTypeBadge = (breachType?: string) => {
    if (!breachType) return null;
    
    const typeColors: Record<string, string> = {
      'data-loss': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'unauthorized-access': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'system-compromise': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'phishing': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'malware': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    };
    
    return (
      <Badge className={typeColors[breachType] || 'bg-gray-100 text-gray-800'}>
        {breachType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Security Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ticket.securityClassification && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Classification</p>
              <div>{getSecurityClassBadge(ticket.securityClassification)}</div>
            </div>
          )}
          
          {ticket.category === 'data-breach' && (
            <>
              {ticket.breachType && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Breach Type</p>
                  <div>{getBreachTypeBadge(ticket.breachType)}</div>
                </div>
              )}
              
              {ticket.dataSubjects !== undefined && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Data Subjects Affected</p>
                  <p className="text-sm">{ticket.dataSubjects.toLocaleString()}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Reported to Authorities</p>
                <Badge className={ticket.reportedToAuthorities ? 
                  "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : 
                  "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"}>
                  {ticket.reportedToAuthorities ? 'Yes' : 'No'}
                </Badge>
              </div>
              
              {ticket.reportedToAuthorities && ticket.reportedDate && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Date Reported</p>
                  <p className="text-sm">{format(new Date(ticket.reportedDate), 'MMM d, yyyy')}</p>
                </div>
              )}
            </>
          )}
          
          {ticket.category === 'sar' && (
            <>
              {ticket.sarRequestType && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">SAR Type</p>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {ticket.sarRequestType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Badge>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">DPA Required</p>
                <Badge className={ticket.dpaRequired ? 
                  "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" : 
                  "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"}>
                  {ticket.dpaRequired ? 'Yes' : 'No'}
                </Badge>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityDetailsCard;
