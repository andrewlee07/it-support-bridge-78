
import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ImportUsersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportUsers: (content: string) => boolean;
}

const ImportUsersDialog: React.FC<ImportUsersDialogProps> = ({
  open,
  onOpenChange,
  onImportUsers
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      // Handle Excel files
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          const jsonString = JSON.stringify(jsonData);
          const success = onImportUsers(jsonString);
          if (success) {
            onOpenChange(false);
          }
        } catch (error) {
          console.error("Excel import error:", error);
        }
      };
      reader.readAsBinaryString(file);
    } else if (file.name.endsWith('.json')) {
      // Handle JSON files
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const success = onImportUsers(content);
        if (success) {
          onOpenChange(false);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Users</DialogTitle>
          <DialogDescription>
            Upload an Excel (.xlsx) or JSON file with user data
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div 
              className="border border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto h-6 w-6 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to select a file or drag and drop
              </p>
              <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".xlsx,.xls,.json"
                onChange={handleFileChange}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Expected format:</p>
              <p className="mb-1">For Excel files, ensure your spreadsheet has these columns:</p>
              <pre className="bg-muted p-2 rounded-md overflow-x-auto text-xs">
                name, email, role, department, title, active
              </pre>
              <p className="mt-2 mb-1">For JSON files:</p>
              <pre className="bg-muted p-2 rounded-md overflow-x-auto text-xs">
{`[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "department": "Sales",
    "title": "Sales Representative",
    "active": true
  },
  ...
]`}
              </pre>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
          >
            Select File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportUsersDialog;
