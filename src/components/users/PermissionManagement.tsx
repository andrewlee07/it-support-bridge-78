
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Permission } from '@/utils/types/user';
import { mockPermissions } from '@/utils/securityUtils';
import { v4 as uuidv4 } from 'uuid';

const PermissionManagement: React.FC = () => {
  const { toast } = useToast();
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);
  const [formValues, setFormValues] = useState<Partial<Permission>>({
    name: '',
    description: '',
    resource: '',
    action: 'read'
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddPermission = () => {
    setEditingPermission(null);
    setFormValues({
      name: '',
      description: '',
      resource: '',
      action: 'read'
    });
    setDialogOpen(true);
  };

  const handleEditPermission = (permission: Permission) => {
    setEditingPermission(permission);
    setFormValues({
      name: permission.name,
      description: permission.description,
      resource: permission.resource,
      action: permission.action
    });
    setDialogOpen(true);
  };

  const handleDeletePermission = (id: string) => {
    setPermissions(permissions.filter(permission => permission.id !== id));
    toast({
      title: "Permission deleted",
      description: "Permission has been removed",
    });
  };

  const handleSubmit = () => {
    if (!formValues.name || !formValues.resource || !formValues.action) {
      toast({
        title: "Validation Error",
        description: "All fields are required",
        variant: "destructive"
      });
      return;
    }

    if (editingPermission) {
      // Update existing permission
      setPermissions(permissions.map(permission => 
        permission.id === editingPermission.id
          ? {
              ...permission,
              name: formValues.name || permission.name,
              description: formValues.description || permission.description,
              resource: formValues.resource || permission.resource,
              action: formValues.action || permission.action
            }
          : permission
      ));
      toast({
        title: "Permission updated",
        description: "Permission has been updated successfully",
      });
    } else {
      // Create new permission
      const newPermission: Permission = {
        id: `perm-${uuidv4().substring(0, 8)}`,
        name: formValues.name || '',
        description: formValues.description || '',
        resource: formValues.resource || '',
        action: formValues.action as Permission['action'] || 'read'
      };
      setPermissions([...permissions, newPermission]);
      toast({
        title: "Permission created",
        description: "Permission has been created successfully",
      });
    }
    
    setDialogOpen(false);
  };

  const filteredPermissions = permissions.filter(permission => {
    const searchLower = searchTerm.toLowerCase();
    return (
      permission.name.toLowerCase().includes(searchLower) ||
      permission.description.toLowerCase().includes(searchLower) ||
      permission.resource.toLowerCase().includes(searchLower) ||
      permission.action.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Permission Management</h3>
        <Button onClick={handleAddPermission}>
          <Plus className="h-4 w-4 mr-2" />
          Add Permission
        </Button>
      </div>
      
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          placeholder="Search permissions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button variant="ghost" type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <Card className="p-4">
        {filteredPermissions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm 
              ? 'No permissions match your search.' 
              : 'No permissions defined. Click "Add Permission" to create one.'}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPermissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell className="font-medium">{permission.name}</TableCell>
                  <TableCell>{permission.description}</TableCell>
                  <TableCell>{permission.resource}</TableCell>
                  <TableCell>{permission.action}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditPermission(permission)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeletePermission(permission.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingPermission ? 'Edit Permission' : 'Add Permission'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="permissionName">Permission Name</Label>
              <Input 
                id="permissionName"
                value={formValues.name || ''}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                placeholder="Enter permission name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="permissionDescription">Description</Label>
              <Input 
                id="permissionDescription"
                value={formValues.description || ''}
                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                placeholder="Enter permission description"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="resource">Resource</Label>
              <Input 
                id="resource"
                value={formValues.resource || ''}
                onChange={(e) => setFormValues({ ...formValues, resource: e.target.value })}
                placeholder="Enter resource (e.g. tickets, users)"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="action">Action</Label>
              <Select 
                value={formValues.action || 'read'}
                onValueChange={(value) => setFormValues({ 
                  ...formValues, 
                  action: value as Permission['action']
                })}
              >
                <SelectTrigger id="action">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="approve">Approve</SelectItem>
                  <SelectItem value="reject">Reject</SelectItem>
                  <SelectItem value="assign">Assign</SelectItem>
                  <SelectItem value="configure">Configure</SelectItem>
                  <SelectItem value="manage">Manage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingPermission ? 'Update Permission' : 'Add Permission'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermissionManagement;
