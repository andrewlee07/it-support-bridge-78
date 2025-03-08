
import { User, UserRole } from '@/utils/types/user';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

export const useUserImportExport = (users: User[], setUsers: (users: User[]) => void) => {
  const { toast } = useToast();

  const handleImportUsers = (content: string) => {
    try {
      const importedUsers = JSON.parse(content);
      
      // Basic validation
      if (Array.isArray(importedUsers) && importedUsers.length > 0) {
        // Map imported data to our User type
        const validUsers = importedUsers.filter(u => u.name && u.email).map((u, index) => ({
          id: `imported-${Date.now()}-${index}`,
          name: u.name,
          email: u.email.toLowerCase(),
          role: (u.role as UserRole) || 'user',
          department: u.department || 'General',
          title: u.title || '',
          active: u.active !== false,
          createdAt: new Date(),
          lastActive: new Date(),
          mfaEnabled: false,
          securityQuestions: [],
          loginAttempts: 0,
          passwordLastChanged: new Date(),
          sessionTimeout: 30
        }));
        
        if (validUsers.length > 0) {
          setUsers([...users, ...validUsers]);
          toast({
            title: "Users imported",
            description: `Successfully imported ${validUsers.length} users.`
          });
          return true;
        } else {
          toast({
            title: "Import failed",
            description: "No valid users found in the import file.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Import failed",
          description: "Invalid format. Please upload a valid file.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Import error:", error);
      toast({
        title: "Import failed",
        description: "Could not parse the file. Please ensure it's valid.",
        variant: "destructive"
      });
    }
    return false;
  };

  const handleExportUsers = () => {
    try {
      // Create worksheet from the users data
      const worksheet = XLSX.utils.json_to_sheet(users.map(user => ({
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        title: user.title || '',
        active: user.active
      })));
      
      // Create workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
      
      // Generate Excel file
      XLSX.writeFile(workbook, 'users-export.xlsx');
      
      toast({
        title: "Users exported",
        description: "User data has been exported successfully."
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export failed",
        description: "There was an error exporting the users.",
        variant: "destructive"
      });
    }
  };

  return {
    handleImportUsers,
    handleExportUsers
  };
};
