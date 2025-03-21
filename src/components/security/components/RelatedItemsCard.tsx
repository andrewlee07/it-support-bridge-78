
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Server } from 'lucide-react';
import { SecurityCase } from '@/utils/types/security';
import { Link } from 'react-router-dom';

interface RelatedItemsCardProps {
  securityCase: SecurityCase;
}

const RelatedItemsCard: React.FC<RelatedItemsCardProps> = ({
  securityCase
}) => {
  return (
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
  );
};

export default RelatedItemsCard;
