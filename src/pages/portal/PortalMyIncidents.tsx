
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, PlusCircle, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import IncidentItem from '@/components/portal/IncidentItem';
import { PORTAL, PORTAL_NEW_INCIDENT } from '@/utils/routes/portalRouteConstants';
import PageTransition from '@/components/shared/PageTransition';
import { useAuth } from '@/contexts/AuthContext';
import { usePortalData } from '@/hooks/portal/usePortalData';
import PortalPermissionGuard from '@/components/portal/PortalPermissionGuard';

const PortalMyIncidents: React.FC = () => {
  const { user } = useAuth();
  const { userIncidents, loading } = usePortalData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIncidents, setFilteredIncidents] = useState(userIncidents);
  
  // Filter incidents based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredIncidents(userIncidents);
      return;
    }
    
    const filtered = userIncidents.filter(incident => 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredIncidents(filtered);
  }, [searchQuery, userIncidents]);
  
  // Map the Ticket type to the component prop structure
  const mapIncidentsToProps = (incidents) => {
    return incidents.map(incident => ({
      id: incident.id,
      title: incident.title,
      date: incident.createdAt ? new Date(incident.createdAt).toLocaleDateString() : '',
      time: incident.createdAt ? new Date(incident.createdAt).toLocaleTimeString() : '',
      status: incident.status
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
          <h1 className="text-2xl font-bold">My Incidents</h1>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search incidents..."
                className="pl-9 w-full md:w-auto"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button asChild>
              <Link to={PORTAL_NEW_INCIDENT}>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Incident
              </Link>
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your incidents...</p>
            </div>
          </div>
        ) : (
          <>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Active Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredIncidents.filter(i => 
                  i.status !== 'resolved' && i.status !== 'closed'
                ).length > 0 ? (
                  <div className="space-y-1">
                    {mapIncidentsToProps(
                      filteredIncidents.filter(incident => 
                        incident.status !== 'resolved' && incident.status !== 'closed'
                      )
                    ).map(incident => (
                      <IncidentItem
                        key={incident.id}
                        id={incident.id}
                        title={incident.title}
                        date={incident.date}
                        time={incident.time}
                        status={incident.status}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No active incidents found.</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Resolved Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredIncidents.filter(i => 
                  i.status === 'resolved' || i.status === 'closed'
                ).length > 0 ? (
                  <div className="space-y-1">
                    {mapIncidentsToProps(
                      filteredIncidents.filter(incident => 
                        incident.status === 'resolved' || incident.status === 'closed'
                      )
                    ).map(incident => (
                      <IncidentItem
                        key={incident.id}
                        id={incident.id}
                        title={incident.title}
                        date={incident.date}
                        time={incident.time}
                        status={incident.status}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No resolved incidents found.</p>
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

export default PortalMyIncidents;
