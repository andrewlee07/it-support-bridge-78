import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { getUserNameById } from '@/utils/userUtils';
import { format } from 'date-fns';
import { CalendarDays, Check, Clock, Edit, Pencil, ShieldAlert, User, Users } from 'lucide-react';

export interface SecurityCaseDetailProps {
  securityCase: any;
  open?: boolean;
  onClose?: () => void;
  isInline?: boolean;
}

const SecurityCaseDetail: React.FC<SecurityCaseDetailProps> = ({
  securityCase,
  open = false,
  onClose = () => {},
  isInline = false,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'PPP');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Data Breach': return 'bg-red-50 text-red-700 border-red-200';
      case 'SAR': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Compliance': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Threat': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleStatusChange = (newStatus: string) => {
    toast.success(`Status updated to ${newStatus}`, {
      description: "Security case status has been updated"
    });
    onClose();
  };

  const handleEdit = () => {
    toast.info('Edit Security Case', {
      description: "This would open a form to edit the security case"
    });
    onClose();
  };

  // Content to display inside either the dialog or inline
  const content = (
    <>
      <div>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Security Case {securityCase.id}</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <Badge variant="outline" className={getTypeColor(securityCase.type)}>
            {securityCase.type}
          </Badge>
          <Badge className={getStatusColor(securityCase.status)}>
            {securityCase.status}
          </Badge>
          <Badge variant="outline" className={getPriorityColor(securityCase.priority)}>
            {securityCase.priority} Priority
          </Badge>
        </div>
      </div>
      
      <Tabs defaultValue="details" className="pt-2">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="remediation">Remediation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{securityCase.title}</h3>
            <p className="text-muted-foreground mt-1">{securityCase.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Reported By</h4>
                  <p className="text-sm">{getUserNameById(securityCase.reportedBy)}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <CalendarDays className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Reported On</h4>
                  <p className="text-sm">{formatDate(securityCase.reportedAt)}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Impacted Users</h4>
                  <p className="text-sm">{securityCase.impactedUsers || 'Unknown'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Affected Systems</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {securityCase.affectedSystems?.map((system: string) => (
                      <Badge key={system} variant="outline" className="bg-blue-50 text-blue-700">
                        {system}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-4">
          <div className="border-l-2 border-muted pl-4 space-y-6">
            {securityCase.investigationSteps?.map((step: any, index: number) => (
              <div key={index} className="relative">
                <div className="absolute -left-[21px] mt-1.5 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-1 flex items-center">
                  <Clock className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm font-medium">{step.date}</span>
                </div>
                <p className="text-sm">{step.text}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="remediation" className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-medium">Remediation Plan</h3>
            <p className="text-sm">{securityCase.remediationPlan}</p>
            
            <div className="flex items-center gap-2 mt-4">
              <h3 className="font-medium">Status</h3>
              <Badge className={getStatusColor(securityCase.status)}>
                {securityCase.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleStatusChange('Active')}
              >
                <Pencil className="mr-2 h-4 w-4" /> Mark as Active
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleStatusChange('Pending')}
              >
                <Clock className="mr-2 h-4 w-4" /> Mark as Pending
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleStatusChange('Resolved')}
              >
                <Check className="mr-2 h-4 w-4" /> Mark as Resolved
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {!isInline && (
        <DialogFooter>
          <div className="flex w-full justify-between">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" /> Edit Security Case
            </Button>
          </div>
        </DialogFooter>
      )}
    </>
  );

  // If isInline is true, render the content directly
  if (isInline) {
    return content;
  }

  // Otherwise render it inside a dialog
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Security Case {securityCase.id}</DialogTitle>
          <DialogDescription>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="outline" className={getTypeColor(securityCase.type)}>
                {securityCase.type}
              </Badge>
              <Badge className={getStatusColor(securityCase.status)}>
                {securityCase.status}
              </Badge>
              <Badge variant="outline" className={getPriorityColor(securityCase.priority)}>
                {securityCase.priority} Priority
              </Badge>
            </div>
          </DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default SecurityCaseDetail;
