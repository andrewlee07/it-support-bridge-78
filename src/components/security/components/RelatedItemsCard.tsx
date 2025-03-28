
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SecurityCase } from '@/utils/types/security';
import CreateRelatedItemsCard from '@/components/tickets/detail/CreateRelatedItemsCard';

interface RelatedItemsCardProps {
  securityCase: SecurityCase;
}

const RelatedItemsCard: React.FC<RelatedItemsCardProps> = ({ securityCase }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'incident': return 'bg-red-100 text-red-800 border-red-200';
      case 'problem': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'bug': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'task': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'change': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeUrl = (type: string, id: string) => {
    switch (type) {
      case 'incident': return `/incidents/${id}`;
      case 'problem': return `/problems/${id}`;
      case 'bug': return `/bugs/${id}`;
      case 'task': return `/tasks/${id}`;
      case 'change': return `/changes/${id}`;
      default: return '#';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed':
      case 'closed':
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Related Items</CardTitle>
        </CardHeader>
        <CardContent>
          {securityCase.relatedItems && securityCase.relatedItems.length > 0 ? (
            <div className="space-y-3">
              {securityCase.relatedItems.map((item) => (
                <div key={`${item.type}-${item.id}`} className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <Badge className={`mb-2 ${getTypeColor(item.type)}`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </Badge>
                    <div className="space-y-1">
                      <Link to={getTypeUrl(item.type, item.id)} className="font-medium hover:underline">
                        {item.title}
                      </Link>
                      <div className="text-xs text-muted-foreground">{item.id}</div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>No related items found</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <CreateRelatedItemsCard 
        sourceId={securityCase.id}
        sourceType="security-case"
      />
    </>
  );
};

export default RelatedItemsCard;
