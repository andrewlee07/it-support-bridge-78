
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

// This would be replaced with a hook that fetches the current user's incidents
const mockIncidents = [
  {
    id: 'INC0000123',
    title: 'Rain is leaking in from the DNS Server',
    date: '11/22/2023',
    time: '2 days ago',
    status: 'open'
  },
  {
    id: 'INC0000124',
    title: 'JavaScript error on landing page of corporate website',
    date: '11/23/2023',
    time: '1 day ago',
    status: 'open'
  },
  {
    id: 'INC0000125',
    title: 'Can't launch 64-bit Windows 7 virtual machine',
    date: '11/23/2023',
    time: '1 day ago',
    status: 'in-progress'
  },
  {
    id: 'INC0000126',
    title: 'Sales forecast spreadsheet is READ ONLY',
    date: '11/24/2023',
    time: '4 hours ago',
    status: 'open'
  },
  {
    id: 'INC0000120',
    title: 'Unable to connect to corporate VPN from home',
    date: '11/20/2023',
    time: '1 week ago',
    status: 'resolved'
  }
];

const PortalMyIncidents: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [incidents, setIncidents] = useState(mockIncidents);
  const [filteredIncidents, setFilteredIncidents] = useState(mockIncidents);
  
  // Filter incidents based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredIncidents(incidents);
      return;
    }
    
    const filtered = incidents.filter(incident => 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredIncidents(filtered);
  }, [searchQuery, incidents]);
  
  return (
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
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Active Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredIncidents.filter(i => i.status !== 'resolved').length > 0 ? (
            <div className="space-y-1">
              {filteredIncidents
                .filter(incident => incident.status !== 'resolved')
                .map(incident => (
                  <IncidentItem
                    key={incident.id}
                    id={incident.id}
                    title={incident.title}
                    date={incident.date}
                    time={incident.time}
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
          {filteredIncidents.filter(i => i.status === 'resolved').length > 0 ? (
            <div className="space-y-1">
              {filteredIncidents
                .filter(incident => incident.status === 'resolved')
                .map(incident => (
                  <IncidentItem
                    key={incident.id}
                    id={incident.id}
                    title={incident.title}
                    date={incident.date}
                    time={incident.time}
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
    </PageTransition>
  );
};

export default PortalMyIncidents;
