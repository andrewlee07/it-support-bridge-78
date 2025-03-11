
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Attachment } from '@/utils/types/backlogTypes';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface AttachmentUploadProps {
  onUpload: (attachment: Attachment) => void;
}

const AttachmentUpload: React.FC<AttachmentUploadProps> = ({ onUpload }) => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    setIsUploading(true);
    
    // Simulate file upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Mock successful upload with file details
      const fileUrl = URL.createObjectURL(file);
      const attachment: Attachment = {
        id: uuidv4(),
        filename: file.name,
        fileUrl: fileUrl, // In a real app, this would be a server URL
        fileType: file.type,
        fileSize: file.size,
        uploadedBy: user.id,
        uploadedAt: new Date(),
        // Add backward compatibility fields
        fileName: file.name,
        name: file.name,
        url: fileUrl
      };
      
      onUpload(attachment);
      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setIsUploading(false);
      // Reset the input
      e.target.value = '';
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <Input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <Button
        variant="outline"
        size="sm"
        disabled={isUploading}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Paperclip className="h-4 w-4 mr-2" />
            Attach File
          </>
        )}
      </Button>
    </div>
  );
};

export default AttachmentUpload;
