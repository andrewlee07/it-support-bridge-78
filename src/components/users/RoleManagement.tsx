
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { mockPermissions } from '@/utils/securityUtils';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystem: boolean;
}

const RoleManagement: React.FC = () => {
  const { toast } = useToast();
  const [roles, setRoles] = useState<Role[]>([
    { 
      id: 'admin', 
      name: 'Administrator', 
      description: 'Full system access', 
      permissions: mockPermissions.map(p => p.id),
      isSystem: true 
    },
    { 
      id: 'manager', 
      name: 'Manager', 
      description: 'Manage teams and approve changes', 
      permissions: ['perm-1', 'perm-2', 'perm-3', 'perm-5', 'perm-6', 'perm-8', 'perm-9', 'perm-10'],
      isSystem: true 
    },
    { 
      id: 'agent', 
      name: 'Support Agent', 
      description: 'Handle tickets and support requests', 
      permissions: ['perm-1', 'perm-2', 'perm-3', 'perm-15'],
      isSystem: true 
    },
    { 
      id: 'user', 
      name: 'Regular User', 
      description: 'Submit tickets and service requests', 
      permissions: ['perm-1', 'perm-2'],
      isSystem: true 
    }
  ]);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formValues, setFormValues] = useState<Partial<Role>>({
    name: '',
    description: '',
    permissions: []
  });
  
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handleAddRole = () => {
    setEditingRole(null);
    setFormValues({
      name: '',
      description: '',
      permissions: []
    });
    setDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setFormValues({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions]
    });
    setDialogOpen(true);
  };

  const handleDeleteRole = (id: string) => {
    const roleToDelete = roles.find(role => role.id === id);
    
    if (roleToDelete?.isSystem) {
      toast({
        title: "Cannot Delete",
        description: "System roles cannot be deleted",
        variant: "destructive"
      });
      return;
    }
    
    setRoles(roles.filter(role => role.id !== id));
    toast({
      title: "Role deleted",
      description: "Role has been removed",
    });
  };

  const handleSubmit = () => {
    if (!formValues.name) {
      toast({
        title: "Validation Error",
        description: "Role name is required",
        variant: "destructive"
      });
      return;
    }

    if (editingRole) {
      // Prevent editing system roles except for permissions
      if (editingRole.isSystem) {
        // Only update permissions for system roles
        setRoles(roles.map(role => 
          role.id === editingRole.id
            ? { ...role, permissions: formValues.permissions || role.permissions }
            : role
        ));
      } else {
        // Update all fields for non-system roles
        setRoles(roles.map(role => 
          role.id === editingRole.id
            ? {
                ...role,
                name: formValues.name || role.name,
                description: formValues.description || role.description,
                permissions: formValues.permissions || role.permissions
              }
            : role
        ));
      }
      
      toast({
        title: "Role updated",
        description: "Role has been updated successfully",
      });
    } else {
      // Create new role
      const newRole: Role = {
        id: uuidv4(),
        name: formValues.name || '',
        description: formValues.description || '',
        permissions: formValues.permissions || [],
        isSystem: false
      };
      setRoles([...roles, newRole]);
      toast({
        title: "Role created",
        description: "Role has been created successfully",
      });
    }
    
    setDialogOpen(false);
  };

  const openPermissionsDialog = () => {
    setSelectedPermissions(formValues.permissions || []);
    setPermissionsDialogOpen(true);
  };

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const applyPermissions = () => {
    setFormValues(prev => ({ ...prev, permissions: selectedPermissions }));
    setPermissionsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Role Management</h3>
        <Button onClick={handleAddRole}>
          <Plus className="h-4 w-4 mr-2" />
          Add Role
        </Button>
      </div>
      
      <Card className="p-4">
        {roles.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No roles defined. Click "Add Role" to create one.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>{role.permissions.length} permissions</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${role.isSystem ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {role.isSystem ? 'System' : 'Custom'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditRole(role)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteRole(role.id)}
                        disabled={role.isSystem}
                      >
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

      {/* Add/Edit Role Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingRole ? 'Edit Role' : 'Add Role'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">Role Name</Label>
              <Input 
                id="roleName"
                value={formValues.name || ''}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                placeholder="Enter role name"
                disabled={editingRole?.isSystem}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="roleDescription">Description</Label>
              <Textarea 
                id="roleDescription"
                value={formValues.description || ''}
                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                placeholder="Enter role description"
                disabled={editingRole?.isSystem}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Permissions</Label>
                <Button variant="outline" size="sm" onClick={openPermissionsDialog}>
                  Configure Permissions
                </Button>
              </div>
              <div className="p-2 border rounded-md bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  {formValues.permissions?.length 
                    ? `${formValues.permissions.length} permissions assigned` 
                    : 'No permissions assigned'}
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingRole ? 'Update Role' : 'Add Role'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Permissions Dialog */}
      <Dialog open={permissionsDialogOpen} onOpenChange={setPermissionsDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configure Permissions</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              {mockPermissions.map(permission => (
                <div key={permission.id} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-md">
                  <Switch
                    id={`perm-${permission.id}`}
                    checked={selectedPermissions.includes(permission.id)}
                    onCheckedChange={() => handlePermissionToggle(permission.id)}
                  />
                  <div>
                    <Label htmlFor={`perm-${permission.id}`} className="font-medium">
                      {permission.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {permission.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPermissionsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={applyPermissions}>
              Apply Permissions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
