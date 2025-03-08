
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusSynchronizationConfig from '@/components/admin/StatusSynchronizationConfig';

const StatusSynchronizationSettings: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <PageTransition>
      <div className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/admin/dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin Dashboard
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Status Synchronization Settings</h1>
            <p className="text-muted-foreground">
              Configure how status changes propagate between releases and linked items
            </p>
          </div>
        </div>
        
        <StatusSynchronizationConfig />
      </div>
    </PageTransition>
  );
};

export default StatusSynchronizationSettings;
