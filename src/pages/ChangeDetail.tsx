
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import { getChangeRequestById } from '@/utils/api/change/operations/getChangeRequestById';
import { ChangeRequest } from '@/utils/types/change';
import ChangeRequestDetail from '@/components/changes/ChangeRequestDetail';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ChangeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [change, setChange] = useState<ChangeRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChangeRequest = async () => {
      try {
        setLoading(true);
        const response = await getChangeRequestById(id || '');
        if (response.success && response.data) {
          setChange(response.data);
          setError(null);
        } else {
          setError(response.message || 'Failed to load change request');
          setChange(null);
        }
      } catch (err) {
        setError('An unexpected error occurred');
        setChange(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchChangeRequest();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !change) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-semibold mb-2">Change Request Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The change request you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <Button 
          variant="default"
          onClick={() => navigate('/changes')}
        >
          Return to Changes
        </Button>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/changes')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Changes
          </Button>
          <h1 className="text-2xl font-bold">Change Request: {change.id}</h1>
        </div>
        
        <ChangeRequestDetail change={change} />
      </div>
    </PageTransition>
  );
};

export default ChangeDetail;
