
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, PlusCircle, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ServiceRequestItem from '@/components/portal/ServiceRequestItem';
import { PORTAL, PORTAL_NEW_SERVICE_REQUEST } from '@/utils/routes/portalRouteConstants';
import PageTransition from '@/components/shared/PageTransition';
import { useAuth } from '@/contexts/AuthContext';

// This would be replaced with a hook that fetches the current user's service requests
const mockServiceRequests = [
  {
    id: 'SR0000100',
    title: 'New laptop request',
    date: '11/20/2023',
    time: '5 days ago',
    status: 'in-progress'
  },
  {
    id: 'SR0000095',
    title: 'Access to financial system',
    date: '11/15/2023',
    time: '1 week ago',
    status: 'fulfilled'
  },
  {
    id: 'SR0000127',
    title: 'Microsoft Office installation',
    date: '11/24/2023',
    time: '3 hours ago',
    status: 'open'
  },
  {
    id: 'SR0000126',
    title: 'New mobile phone request',
    date: '11/23/2023',
    time: '1 day ago',
    status: 'pending'
  },
  {
    id: 'SR0000123',
    title: 'Access to marketing drive',
    date: '11/20/2023',
    time: '5 days ago',
    status: 'fulfilled'
  }
];

const PortalMyRequests: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState(mockServiceRequests);
  const [filteredRequests, setFilteredRequests] = useState(mockServiceRequests);
  
  // Filter requests based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredRequests(requests);
      return;
    }
    
    const filtered = requests.filter(request => 
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRequests(filtered);
  }, [searchQuery, requests]);
  
  return (
    <PageTransition>
      <div className="mb-6">
        <Link to={PORTAL} className="inline-flex items-center text-sm text-primary hover:text-primary/80">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Portal
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">My Service Requests</h1>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              className="pl-9 w-full md:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button asChild>
            <Link to={PORTAL_NEW_SERVICE_REQUEST}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Request
            </Link>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Active Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredRequests.filter(r => r.status !== 'fulfilled').length > 0 ? (
            <div className="space-y-1">
              {filteredRequests
                .filter(request => request.status !== 'fulfilled')
                .map(request => (
                  <ServiceRequestItem
                    key={request.id}
                    id={request.id}
                    title={request.title}
                    date={request.date}
                    time={request.time}
                    status={request.status}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No active requests found.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Fulfilled Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredRequests.filter(r => r.status === 'fulfilled').length > 0 ? (
            <div className="space-y-1">
              {filteredRequests
                .filter(request => request.status === 'fulfilled')
                .map(request => (
                  <ServiceRequestItem
                    key={request.id}
                    id={request.id}
                    title={request.title}
                    date={request.date}
                    time={request.time}
                    status={request.status}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No fulfilled requests found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </PageTransition>
  );
};

export default PortalMyRequests;
