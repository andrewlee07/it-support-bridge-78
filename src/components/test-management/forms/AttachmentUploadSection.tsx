
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Trash, Upload } from 'lucide-react';

interface AttachmentUploadSectionProps {
  initialFileUrl: string | null;
  onFileUpload: (url: string) => void;
}

const AttachmentUploadSection: React.FC<AttachmentUploadSectionProps> = ({ 
  initialFileUrl, 
  onFileUpload 
}) => {
  const { toast } = useToast();
  const [fileUrl, setFileUrl] = useState<string | null>(initialFileUrl);

  // Handle file upload (mock for now)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to your server or cloud storage
      // For now, we'll just use a placeholder URL
      const mockUrl = '/lovable-uploads/bf3633e2-5031-4a59-ab35-ffd5b863fbfc.png';
      setFileUrl(mockUrl);
      onFileUpload(mockUrl);
      
      toast({
        title: 'File uploaded',
        description: 'Screenshot has been uploaded successfully.',
      });
    }
  };

  const handleRemoveFile = () => {
    setFileUrl(null);
    onFileUpload('');
  };

  return (
    <div>
      <FormLabel>Attachment (Screenshot)</FormLabel>
      <div className="mt-2 space-y-4">
        {fileUrl ? (
          <div className="rounded-md border p-2">
            <div className="flex items-center gap-2">
              <img 
                src={fileUrl} 
                alt="Bug screenshot" 
                className="h-20 w-auto object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">Screenshot</p>
                <p className="text-xs text-muted-foreground">
                  Click to view full size
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <label
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG or GIF (max. 2MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttachmentUploadSection;
