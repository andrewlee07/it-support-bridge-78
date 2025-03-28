
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import ApprovalItem from '@/components/portal/ApprovalItem';
import PageTransition from '@/components/shared/PageTransition';
import { PORTAL } from '@/utils/routes/portalRouteConstants';

const PortalMyApprovals: React.FC = () => {
  const { user } = useAuth();
  
  // This would be replaced with a real API call to fetch user approvals
  const pendingApprovals = [
    {
      id: 'CHG000123',
      title: 'Database Server Upgrade',
      requestType: 'change' as const,
      date: '05/15/2023',
      time: '2 days ago',
      status: 'pending'
    },
    {
      id: 'REL000045',
      title: 'Deploy Finance App v2.3',
      requestType: 'release' as const,
      date: '05/14/2023',
      time: '3 days ago',
      status: 'pending'
    },
    {
      id: 'SR0000152',
      title: 'New Data Center Access Request',
      requestType: 'service-request' as const,
      date: '05/13/2023',
      time: '4 days ago',
      status: 'pending'
    },
    {
      id: 'CHG000119',
      title: 'Network Configuration Change',
      requestType: 'change' as const,
      date: '05/12/2023',
      time: '5 days ago',
      status: 'pending'
    }
  ];

  return (
    <PageTransition>
      <div className="mb-6">
        <Link to={PORTAL} className="inline-flex items-center text-sm text-primary hover:text-primary/80">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Portal
        </Link>
      </div>
      
      <div className="grid gap-6">
        <h1 className="text-2xl font-bold">My Approvals</h1>
        
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Pending Your Approval</h2>
          
          {pendingApprovals.length > 0 ? (
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <ApprovalItem
                  key={`${approval.requestType}-${approval.id}`}
                  id={approval.id}
                  title={approval.title}
                  requestType={approval.requestType}
                  date={approval.date}
                  time={approval.time}
                  status={approval.status}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>You don't have any pending approvals</p>
            </div>
          )}
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Recently Reviewed</h2>
          <div className="text-center py-8 text-muted-foreground">
            <p>No recently reviewed approvals</p>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
};

export default PortalMyApprovals;
