
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  AlertCircle, 
  Calendar, 
  Clock, 
  Edit, 
  Eye, 
  Info, 
  Link, 
  MoreHorizontal, 
  Trash2,
  AlertTriangle,
  Megaphone
} from 'lucide-react';
import { Announcement, AnnouncementStatus } from '@/utils/types';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { format } from 'date-fns';

interface AnnouncementsListProps {
  announcements: Announcement[];
  totalAnnouncements: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({
  announcements,
  totalAnnouncements,
  currentPage,
  onPageChange,
  onView,
  onEdit,
  onDelete,
  loading = false
}) => {
  const navigate = useNavigate();
  const [announcementToDelete, setAnnouncementToDelete] = useState<Announcement | null>(null);
  const [viewingAnnouncement, setViewingAnnouncement] = useState<Announcement | null>(null);
  
  const handleDelete = (announcement: Announcement) => {
    setAnnouncementToDelete(announcement);
  };
  
  const confirmDelete = () => {
    if (announcementToDelete) {
      onDelete(announcementToDelete.id);
      setAnnouncementToDelete(null);
    }
  };
  
  const handleView = (announcement: Announcement) => {
    setViewingAnnouncement(announcement);
  };
  
  const getStatusBadge = (status: AnnouncementStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Draft</Badge>;
      case 'expired':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Expired</Badge>;
      default:
        return null;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-red-500">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-blue-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return null;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'outage':
        return <AlertCircle className="text-red-500" />;
      case 'maintenance':
        return <Clock className="text-yellow-500" />;
      case 'information':
        return <Info className="text-blue-500" />;
      default:
        return <AlertTriangle className="text-gray-500" />;
    }
  };
  
  const totalPages = Math.ceil(totalAnnouncements / 10);
  
  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : announcements.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <Megaphone className="h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle className="text-xl">No Announcements Found</CardTitle>
          <CardDescription className="mt-2 mb-4">
            There are no announcements that match your criteria. Try changing your filters or create a new announcement.
          </CardDescription>
          <Button onClick={() => navigate('/announcements/create')}>
            Create Announcement
          </Button>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 flex flex-row justify-between items-start space-y-0">
                  <div className="flex items-start space-x-2">
                    {getTypeIcon(announcement.type)}
                    <div>
                      <CardTitle className="text-lg line-clamp-1" title={announcement.title}>
                        {announcement.title}
                      </CardTitle>
                      <CardDescription className="flex flex-wrap items-center gap-1 mt-1">
                        <span>{format(new Date(announcement.createdAt), 'MMM d, yyyy')}</span>
                        {announcement.relatedIncidentId && (
                          <span className="flex items-center text-xs">
                            <Link className="h-3 w-3 ml-1 mr-0.5" />
                            Incident
                          </span>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(announcement)}>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(announcement.id)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDelete(announcement)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="pb-2">
                  <div 
                    className="text-sm line-clamp-3 h-[60px] overflow-hidden" 
                    dangerouslySetInnerHTML={{ 
                      __html: announcement.content 
                    }}
                  />
                </CardContent>
                <CardFooter className="pt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(announcement.status)}
                    {getPriorityBadge(announcement.priority)}
                  </div>
                  {announcement.expiresAt && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      Expires: {format(new Date(announcement.expiresAt), 'MMM d, yyyy')}
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="mx-4 flex items-center text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </Pagination>
            </div>
          )}
        </>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!announcementToDelete} onOpenChange={(open) => !open && setAnnouncementToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the announcement "{announcementToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAnnouncementToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Announcement Dialog */}
      <Dialog open={!!viewingAnnouncement} onOpenChange={(open) => !open && setViewingAnnouncement(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2">
              {viewingAnnouncement && getTypeIcon(viewingAnnouncement.type)}
              <DialogTitle>{viewingAnnouncement?.title}</DialogTitle>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {viewingAnnouncement && getStatusBadge(viewingAnnouncement.status)}
              {viewingAnnouncement && getPriorityBadge(viewingAnnouncement.priority)}
              {viewingAnnouncement?.relatedIncidentId && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Link className="h-3 w-3" />
                  Incident: {viewingAnnouncement.relatedIncidentId}
                </Badge>
              )}
            </div>
          </DialogHeader>
          <div className="mt-4">
            <div 
              className="prose prose-sm max-w-none" 
              dangerouslySetInnerHTML={{ __html: viewingAnnouncement?.content || '' }}
            />
          </div>
          <div className="text-sm text-muted-foreground mt-4 space-y-1">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Created: {viewingAnnouncement && format(new Date(viewingAnnouncement.createdAt), 'PPP p')}</span>
            </div>
            {viewingAnnouncement?.expiresAt && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Expires: {format(new Date(viewingAnnouncement.expiresAt), 'PPP p')}</span>
              </div>
            )}
            {viewingAnnouncement?.creatorName && (
              <div>Created by: {viewingAnnouncement.creatorName}</div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingAnnouncement(null)}>
              Close
            </Button>
            <Button onClick={() => {
              if (viewingAnnouncement) {
                onEdit(viewingAnnouncement.id);
                setViewingAnnouncement(null);
              }
            }}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnnouncementsList;
