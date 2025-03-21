
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Ticket } from '@/utils/types/ticket';

interface RelatedItemsTabProps {
  ticket: Ticket;
}

const RelatedItemsTab: React.FC<RelatedItemsTabProps> = ({ ticket }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Related Items</h2>
        {ticket.relatedItems && ticket.relatedItems.length > 0 ? (
          <div className="space-y-4">
            {ticket.relatedItems.map((item, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex space-x-2 mt-1">
                      <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {item.type}
                      </span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No related items found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RelatedItemsTab;
