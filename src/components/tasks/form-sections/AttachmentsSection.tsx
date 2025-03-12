
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Paperclip, X, File, Image, FileText, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { TaskAttachment } from '@/utils/types/taskTypes';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

interface AttachmentsSectionProps {
  attachments: TaskAttachment[];
  onAddAttachment: (attachment: TaskAttachment) => void;
  onRemoveAttachment: (id: string) => void;
}

const AttachmentsSection: React.FC<AttachmentsSectionProps> = ({
  attachments,
  onAddAttachment,
  onRemoveAttachment
}) => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    setIsUploading(true);
    
    try {
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would upload the file to a server
      // and get back a URL. For now, we'll just use a blob URL.
      const newAttachment: TaskAttachment = {
        id: uuidv4(),
        name: file.name, // Use the correct property name
        fileName: file.name, // Also set fileName for backward compatibility
        url: URL.createObjectURL(file), // Use the correct property name
        fileUrl: URL.createObjectURL(file), // Also set fileUrl for backward compatibility
        type: file.type, // Use the correct property name
        fileType: file.type, // Also set fileType for backward compatibility
        size: file.size,
        uploadedAt: new Date().toISOString(), // Convert Date to string to match Task interface
        uploadedBy: user.id
      };
      
      onAddAttachment(newAttachment);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
      // Reset the input
      e.target.value = '';
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-4 w-4" />;
    } else if (fileType.includes('pdf')) {
      return <FileText className="h-4 w-4" />;
    } else {
      return <File className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Paperclip className="h-5 w-5" />
        Attachments
      </h3>
      
      <div>
        <Input
          type="file"
          id="task-attachment"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('task-attachment')?.click()}
          disabled={isUploading}
        >
          <Paperclip className="h-4 w-4 mr-2" />
          {isUploading ? 'Uploading...' : 'Add Attachment'}
        </Button>
      </div>
      
      {attachments.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {attachments.map(attachment => (
            <li key={attachment.id} className="flex items-center gap-3 p-2 border rounded-md">
              <div className="p-1 bg-muted rounded">
                {getFileIcon(attachment.type || attachment.fileType || '')}
              </div>
              <span className="flex-1 truncate">{attachment.name || attachment.fileName}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <a href={attachment.url || attachment.fileUrl} download={attachment.name || attachment.fileName}>
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveAttachment(attachment.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">No attachments added.</p>
      )}
    </div>
  );
};

export default AttachmentsSection;
