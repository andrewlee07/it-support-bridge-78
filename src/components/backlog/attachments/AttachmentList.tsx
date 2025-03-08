
import React from 'react';
import { Attachment } from '@/utils/types/backlogTypes';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { File, Image, FileText, Download, Trash2 } from 'lucide-react';
import { getUserById } from '@/utils/mockData';

interface AttachmentListProps {
  attachments: Attachment[];
  onDelete?: (id: string) => void;
}

const AttachmentList: React.FC<AttachmentListProps> = ({ 
  attachments,
  onDelete
}) => {
  const getAttachmentIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-4 w-4 text-blue-500" />;
    } else if (fileType.includes('pdf')) {
      return <FileText className="h-4 w-4 text-red-500" />;
    } else {
      return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (!attachments || attachments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No attachments added yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 mt-2">
      {attachments.map((attachment) => {
        const uploader = getUserById(attachment.uploadedBy);
        
        return (
          <div 
            key={attachment.id}
            className="p-3 border rounded-md flex items-center gap-3 hover:bg-muted/30 transition-colors"
          >
            <div className="p-2 bg-muted rounded">
              {getAttachmentIcon(attachment.fileType)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">{attachment.fileName}</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatFileSize(attachment.fileSize)}</span>
                <span>•</span>
                <span>Added {formatDistanceToNow(new Date(attachment.uploadedAt), { addSuffix: true })}</span>
                {uploader && (
                  <>
                    <span>•</span>
                    <span>by {uploader.name}</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" asChild>
                <a href={attachment.fileUrl} download={attachment.fileName}>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
              
              {onDelete && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onDelete(attachment.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttachmentList;
