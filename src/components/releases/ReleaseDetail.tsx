
import React from 'react';
import { format } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Button,
  Calendar, 
  Clock, 
  Edit, 
  Package, 
  Tag, 
  Trash, 
  User,
  CheckCircle,
  XCircle,
  PlusCircle,
  FileText
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Release, ReleaseItem } from '@/utils/types';

interface ReleaseDetailProps {
  release: Release;
  onEdit: () => void;
  onAddItem: () => void;
  onRemoveItem: (itemId: string) => void;
  onApprove: () => void;
  onReject: () => void;
  onChangeStatus: (status: string) => void;
  isLoading: boolean;
  canApprove: boolean;
}

const ReleaseDetail: React.FC<ReleaseDetailProps> = ({
  release,
  onEdit,
  onAddItem,
  onRemoveItem,
  onApprove,
  onReject,
  onChangeStatus,
  isLoading,
  canApprove
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'Deployed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'major':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'minor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'patch':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'emergency':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
    }
  };

  const getItemTypeIcon = (type: string) => {
    switch (type) {
      case 'change':
        return <FileText className="h-4 w-4 mr-2" />;
      case 'incident':
        return <XCircle className="h-4 w-4 mr-2" />;
      case 'asset':
        return <Package className="h-4 w-4 mr-2" />;
      default:
        return <FileText className="h-4 w-4 mr-2" />;
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-1/4" />
        <div className="h-24 bg-muted rounded w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Package className="mr-2 h-6 w-6 text-primary" />
            {release.title}
          </h1>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <span>{release.id}</span>
            <span>•</span>
            <Tag className="h-4 w-4" />
            <span>{release.version}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          {release.approvalStatus === 'pending' && canApprove && (
            <>
              <Button variant="outline" size="sm" onClick={onReject}>
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button size="sm" onClick={onApprove}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Badge className={getStatusColor(release.status)}>
                {release.status}
              </Badge>
              <Badge className={getApprovalStatusColor(release.approvalStatus)}>
                Approval: {release.approvalStatus.charAt(0).toUpperCase() + release.approvalStatus.slice(1)}
              </Badge>
              <Badge className={getTypeColor(release.type)}>
                {release.type.charAt(0).toUpperCase() + release.type.slice(1)} Release
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Release Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Planned Date: {format(new Date(release.plannedDate), 'PPP')}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Owner: {release.owner}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Created: {format(new Date(release.createdAt), 'PPP')}</span>
              </div>
              {release.approvedAt && (
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Approved: {format(new Date(release.approvedAt), 'PPP')}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {release.status !== 'Deployed' && release.status !== 'Cancelled' && (
                <>
                  {release.status === 'Planned' && (
                    <Button 
                      variant="outline" 
                      onClick={() => onChangeStatus('In Progress')}
                      className="justify-start"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Start Implementation
                    </Button>
                  )}
                  {release.status === 'In Progress' && (
                    <Button 
                      variant="outline" 
                      onClick={() => onChangeStatus('Deployed')}
                      className="justify-start"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Deployed
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={() => onChangeStatus('Cancelled')}
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{release.description}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="items">
        <TabsList>
          <TabsTrigger value="items">Release Items</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>
        <TabsContent value="items" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Work Items</CardTitle>
                <Button size="sm" onClick={onAddItem}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
              <CardDescription>
                Items included in this release
              </CardDescription>
            </CardHeader>
            <CardContent>
              {release.items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No items added to this release yet.</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={onAddItem}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Your First Item
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {release.items.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex justify-between items-center p-3 rounded-md border"
                    >
                      <div className="flex items-center">
                        {getItemTypeIcon(item.itemType)}
                        <span>
                          {item.itemType.charAt(0).toUpperCase() + item.itemType.slice(1)}: {item.itemId}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>
                Recent activity for this release
              </CardDescription>
            </CardHeader>
            <CardContent>
              {release.audit.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No activity recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {release.audit.map((entry) => (
                    <div key={entry.id} className="border-b pb-3 last:border-0">
                      <div className="flex justify-between">
                        <span className="font-medium">{entry.message}</span>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(entry.timestamp), 'PPp')}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        By: {entry.performedBy}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReleaseDetail;
