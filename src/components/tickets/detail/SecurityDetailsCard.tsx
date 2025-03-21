
import React from 'react';
import { Ticket } from '@/utils/types/ticket';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertCircle, FileText, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface SecurityDetailsCardProps {
  ticket: Ticket;
}

const SecurityDetailsCard: React.FC<SecurityDetailsCardProps> = ({ ticket }) => {
  const getClassificationColor = (classification?: string) => {
    switch (classification) {
      case 'restricted':
        return 'text-red-600';
      case 'confidential':
        return 'text-amber-600';
      case 'internal':
        return 'text-blue-600';
      case 'public':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getClassificationBadgeColor = (classification?: string) => {
    switch (classification) {
      case 'restricted':
        return 'bg-red-100 text-red-800';
      case 'confidential':
        return 'bg-amber-100 text-amber-800';
      case 'internal':
        return 'bg-blue-100 text-blue-800';
      case 'public':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <Shield className="h-4 w-4 mr-2" />
          Security Details
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="space-y-3">
          {/* Security Classification */}
          <div>
            <p className="text-muted-foreground mb-1">Security Classification</p>
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              getClassificationBadgeColor(ticket.securityClassification)
            }`}>
              {ticket.securityClassification || 'Not Classified'}
            </div>
          </div>

          {/* Data Breach specific fields */}
          {ticket.category === 'data-breach' && (
            <>
              <div>
                <p className="text-muted-foreground mb-1">Breach Type</p>
                <p className="font-medium">
                  {ticket.breachType || 'Not Specified'}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground mb-1">Data Subjects</p>
                <p className="font-medium">
                  {ticket.dataSubjects || 'Not Specified'}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground mb-1">Reported to Authorities</p>
                <div className="flex items-center">
                  {ticket.reportedToAuthorities ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span>
                    {ticket.reportedToAuthorities ? 'Yes' : 'No'}
                    {ticket.reportedToAuthorities && ticket.reportedDate && (
                      <span className="text-muted-foreground ml-2">
                        ({format(new Date(ticket.reportedDate), 'MMM d, yyyy')})
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* SAR specific fields */}
          {ticket.category === 'sar' && (
            <>
              <div>
                <p className="text-muted-foreground mb-1">SAR Request Type</p>
                <p className="font-medium">
                  {ticket.sarRequestType ? (
                    <span className="capitalize">
                      {ticket.sarRequestType.replace(/-/g, ' ')}
                    </span>
                  ) : (
                    'Not Specified'
                  )}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground mb-1">DPA Required</p>
                <div className="flex items-center">
                  {ticket.dpaRequired ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span>{ticket.dpaRequired ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityDetailsCard;
