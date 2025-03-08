
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, XCircle, SettingsIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useReleaseStatusChange } from '@/hooks/useReleaseStatusChange';
import { useAuth } from '@/contexts/AuthContext';

interface ReleaseActionsCardProps {
  status: string;
  releaseId: string;
  onChangeStatus: (status: string) => void;
}

const ReleaseActionsCard: React.FC<ReleaseActionsCardProps> = ({
  status,
  releaseId,
  onChangeStatus
}) => {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<string>('');
  const [syncSettings, setSyncSettings] = useState({
    updateBacklogItems: true,
    updateBugs: true,
    updateDates: true,
    notifyUsers: true,
  });
  
  const { changeStatus, isLoading } = useReleaseStatusChange({
    releaseId,
    userId: user?.id || 'unknown',
    onSuccess: () => {
      setIsDialogOpen(false);
    }
  });
  
  const handleStatusChangeClick = (newStatus: string) => {
    setTargetStatus(newStatus);
    setIsDialogOpen(true);
  };
  
  const confirmStatusChange = () => {
    // In a real implementation, we would pass the sync settings to the API
    // For now, we just call the original onChangeStatus function
    onChangeStatus(targetStatus);
    setIsDialogOpen(false);
  };
  
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {status !== 'Deployed' && status !== 'Cancelled' && (
              <>
                {status === 'Planned' && (
                  <Button 
                    variant="outline" 
                    onClick={() => handleStatusChangeClick('In Progress')}
                    className="justify-start"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Start Implementation
                  </Button>
                )}
                {status === 'In Progress' && (
                  <Button 
                    variant="outline" 
                    onClick={() => handleStatusChangeClick('Deployed')}
                    className="justify-start"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Deployed
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => handleStatusChangeClick('Cancelled')}
                  className="justify-start text-destructive hover:text-destructive"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Release
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Release Status</DialogTitle>
            <DialogDescription>
              Update the release status and configure how this change affects related items.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <div className="font-medium">Status synchronization options:</div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="updateBacklogItems" 
                  checked={syncSettings.updateBacklogItems}
                  onCheckedChange={(checked) => 
                    setSyncSettings({ ...syncSettings, updateBacklogItems: !!checked })
                  }
                />
                <Label htmlFor="updateBacklogItems">Update linked backlog items</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="updateBugs" 
                  checked={syncSettings.updateBugs}
                  onCheckedChange={(checked) => 
                    setSyncSettings({ ...syncSettings, updateBugs: !!checked })
                  }
                />
                <Label htmlFor="updateBugs">Update linked bugs</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="updateDates" 
                  checked={syncSettings.updateDates}
                  onCheckedChange={(checked) => 
                    setSyncSettings({ ...syncSettings, updateDates: !!checked })
                  }
                />
                <Label htmlFor="updateDates">Sync dates with linked items</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="notifyUsers" 
                  checked={syncSettings.notifyUsers}
                  onCheckedChange={(checked) => 
                    setSyncSettings({ ...syncSettings, notifyUsers: !!checked })
                  }
                />
                <Label htmlFor="notifyUsers">Send notifications to affected users</Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmStatusChange} disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Confirm Change'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReleaseActionsCard;
