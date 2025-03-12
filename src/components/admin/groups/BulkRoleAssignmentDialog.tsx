
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Upload } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useToast } from '@/hooks/use-toast';
import { Group } from '@/utils/types/group';
import { UserRole } from '@/utils/types/user';
import { createAuditEntry } from '@/utils/auditUtils';

// Sample data structure for the Excel template
const SAMPLE_DATA = [
  { groupId: 'group-1', groupName: 'IT Support', roleId: 'agent', roleName: 'Support Agent' },
  { groupId: 'group-2', groupName: 'Network Team', roleId: 'it', roleName: 'IT Staff' },
];

// Validation interface for uploaded data
interface BulkRoleAssignment {
  groupId: string;
  roleId: UserRole;
  valid: boolean;
  error?: string;
}

interface BulkRoleAssignmentDialogProps {
  groups: Group[];
  availableRoles: {id: UserRole, name: string}[];
  onAssignRoles: (assignments: {groupId: string, roleId: UserRole}[]) => void;
}

const BulkRoleAssignmentDialog: React.FC<BulkRoleAssignmentDialogProps> = ({ 
  groups, 
  availableRoles,
  onAssignRoles
}) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [assignments, setAssignments] = useState<BulkRoleAssignment[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { toast } = useToast();

  const downloadTemplate = () => {
    const worksheet = XLSX.utils.json_to_sheet(SAMPLE_DATA);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Role Assignments');
    
    // Add a documentation sheet
    const docData = [
      { column: 'groupId', description: 'The ID of the group (required)' },
      { column: 'groupName', description: 'The name of the group (for reference only)' },
      { column: 'roleId', description: 'The ID of the role to assign (required)' },
      { column: 'roleName', description: 'The name of the role (for reference only)' }
    ];
    const docSheet = XLSX.utils.json_to_sheet(docData);
    XLSX.utils.book_append_sheet(workbook, docSheet, 'Documentation');
    
    XLSX.writeFile(workbook, 'role-assignment-template.xlsx');
    
    toast({
      title: "Template Downloaded",
      description: "Fill in the template and upload it to perform bulk role assignments.",
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      parseFile(e.target.files[0]);
    }
  };
  
  const parseFile = async (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        
        validateData(json);
      } catch (error) {
        setValidationError('Failed to parse the Excel file. Please ensure it follows the template format.');
        setAssignments([]);
      }
    };
    
    reader.readAsBinaryString(file);
  };
  
  const validateData = (data: any[]) => {
    if (!Array.isArray(data) || data.length === 0) {
      setValidationError('No valid data found in the file');
      setAssignments([]);
      return;
    }
    
    const validGroupIds = new Set(groups.map(g => g.id));
    const validRoleIds = new Set(availableRoles.map(r => r.id));
    let hasErrors = false;
    
    const validatedAssignments = data.map((row, index) => {
      const assignment: BulkRoleAssignment = {
        groupId: row.groupId,
        roleId: row.roleId as UserRole,
        valid: true
      };
      
      // Check if groupId is valid
      if (!row.groupId || !validGroupIds.has(row.groupId)) {
        assignment.valid = false;
        assignment.error = `Invalid group ID at row ${index + 1}`;
        hasErrors = true;
      }
      
      // Check if roleId is valid
      if (!row.roleId || !validRoleIds.has(row.roleId)) {
        assignment.valid = false;
        assignment.error = assignment.error 
          ? `${assignment.error}, Invalid role ID` 
          : `Invalid role ID at row ${index + 1}`;
        hasErrors = true;
      }
      
      return assignment;
    });
    
    setAssignments(validatedAssignments);
    
    if (hasErrors) {
      setValidationError('Some entries contain errors. Please correct them before proceeding.');
    } else {
      setValidationError(null);
    }
  };
  
  const handleSubmit = () => {
    if (validationError || assignments.some(a => !a.valid)) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    const validAssignments = assignments
      .filter(a => a.valid)
      .map(({ groupId, roleId }) => ({ groupId, roleId }));
    
    // Process the valid assignments
    onAssignRoles(validAssignments);
    
    // Log the audit entries for each assignment
    validAssignments.forEach(({ groupId, roleId }) => {
      const groupName = groups.find(g => g.id === groupId)?.name || 'Unknown Group';
      const roleName = availableRoles.find(r => r.id === roleId)?.name || 'Unknown Role';
      
      // Create audit entry
      createAuditEntry(
        groupId, 
        'group', 
        `Bulk assigned role: ${roleName} to group: ${groupName}`, 
        'system' // This would typically be the current user's ID
      );
    });
    
    toast({
      title: "Roles Assigned",
      description: `Successfully assigned ${validAssignments.length} roles to groups.`,
    });
    
    setOpen(false);
    setFile(null);
    setAssignments([]);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto" onClick={() => setOpen(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Bulk Assign Roles
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Bulk Role Assignment</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="file-upload">Upload Excel File:</Label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadTemplate}
              type="button"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>
          
          <Input
            id="file-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
          />
          
          {validationError && (
            <Alert variant="destructive">
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          )}
          
          {assignments.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">
                {assignments.filter(a => a.valid).length} of {assignments.length} assignments are valid
              </h3>
              <div className="max-h-[200px] overflow-y-auto border rounded-md p-2">
                {assignments.map((assignment, idx) => (
                  <div 
                    key={idx} 
                    className={`py-1 px-2 text-sm ${!assignment.valid ? 'text-red-500' : ''}`}
                  >
                    Group: {groups.find(g => g.id === assignment.groupId)?.name || assignment.groupId} 
                    - Role: {availableRoles.find(r => r.id === assignment.roleId)?.name || assignment.roleId}
                    {!assignment.valid && <span className="block italic"> - {assignment.error}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!assignments.length || Boolean(validationError)}
          >
            Assign Roles
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkRoleAssignmentDialog;
