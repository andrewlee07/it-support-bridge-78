
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
import { usePortalData } from '@/hooks/portal/usePortalData';
import PortalPermissionGuard from '@/components/portal/PortalPermissionGuard';

const PortalMyRequests: React.FC = () => {
  const { user } = useAuth();
  const { userRequests, loading } = usePortalData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRequests, setFilteredRequests] = useState(userRequests);
  
  // Filter requests based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredRequests(userRequests);
      return;
    }
    
    const filtered = userRequests.filter(request => 
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRequests(filtered);
  }, [searchQuery, userRequests]);
  
  // Map the Ticket type to the component prop structure
  const mapRequestsToProps = (requests) => {
    return requests.map(request => ({
      id: request.id,
      title: request.title,
      date: request.createdAt ? new Date(request.createdAt).toLocaleDateString() : '',
      time: request.createdAt ? new Date(request.createdAt).toLocaleTimeString() : '',
      status: request.status
    }));
  };
  
  return (
    <PortalPermissionGuard>
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
        
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your service requests...</p>
            </div>
          </div>
        ) : (
          <>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Active Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredRequests.filter(r => 
                  r.status !== 'fulfilled' && r.status !== 'closed'
                ).length > 0 ? (
                  <div className="space-y-1">
                    {mapRequestsToProps(
                      filteredRequests.filter(request =>
                        request.status !== 'fulfilled' && request.status !== 'closed'
                      )
                    ).map(request => (
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
                {filteredRequests.filter(r => 
                  r.status === 'fulfilled' || r.status === 'closed'
                ).length > 0 ? (
                  <div className="space-y-1">
                    {mapRequestsToProps(
                      filteredRequests.filter(request =>
                        request.status === 'fulfilled' || request.status === 'closed'
                      )
                    ).map(request => (
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
          </>
        )}
      </PageTransition>
    </PortalPermissionGuard>
  );
};

export default PortalMyRequests;
