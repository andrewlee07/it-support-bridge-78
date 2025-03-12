import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Group, ResourcePermission, ResourceType, ActionType } from '@/utils/types/group';
import { UserRole } from '@/utils/types/user';
import { Plus, X, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BulkRoleAssignmentDialog from './BulkRoleAssignmentDialog';
import { 
  logRoleAssignment, 
  logRoleRemoval, 
  logPermissionChange, 
  addPermissionAuditEntry,
  getPermissionAuditLogs
} from '@/utils/permissionAuditUtils';

// Mock groups data
const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'IT Support',
    description: 'Handles all IT support tickets',
    assignedRoles: ['agent', 'it'],
    queueId: 'queue-1',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-05-15'),
    createdBy: 'user-1'
  },
  {
    id: 'group-2',
    name: 'Network Team',
    description: 'Handles network-related issues',
    assignedRoles: ['agent', 'it'],
    queueId: 'queue-2',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-06-20'),
    createdBy: 'user-1'
  },
  {
    id: 'group-3',
    name: 'Change Management',
    description: 'Oversees change requests and approvals',
    assignedRoles: ['change-manager', 'manager'],
    queueId: 'queue-3',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-07-10'),
    createdBy: 'user-1'
  }
];

// Mock roles data
const availableRoles: {id: UserRole, name: string}[] = [
  { id: 'admin', name: 'Administrator' },
  { id: 'manager', name: 'Manager' },
  { id: 'agent', name: 'Support Agent' },
  { id: 'developer', name: 'Developer' },
  { id: 'it', name: 'IT Staff' },
  { id: 'user', name: 'Regular User' },
  { id: 'problem-manager', name: 'Problem Manager' },
  { id: 'change-manager', name: 'Change Manager' },
  { id: 'release-manager', name: 'Release Manager' },
  { id: 'service-catalog-manager', name: 'Service Catalog Manager' },
  { id: 'knowledge-author', name: 'Knowledge Author' },
  { id: 'knowledge-reviewer', name: 'Knowledge Reviewer' }
];

// Available resources that can have permissions
const availableResources: ResourceType[] = [
  'incident', 
  'service-request', 
  'problem', 
  'change', 
  'release', 
  'asset', 
  'knowledge', 
  'task',
  'user',
  'group',
  'queue',
  'report'
];

// Available actions that can be performed on resources
const availableActions: ActionType[] = [
  'view',
  'create',
  'edit',
  'delete',
  'approve',
  'assign',
  'resolve',
  'close',
  'configure',
  'manage'
];

const GroupRoleManagement: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<Map<ResourceType, Set<ActionType>>>(new Map());

  const [auditDialogOpen, setAuditDialogOpen] = useState(false);
  const [auditLogs, setAuditLogs] = useState<ReturnType<typeof getPermissionAuditLogs>>([]);
  
  const { toast } = useToast();
  
  // Fetch audit logs when the audit dialog opens
  useEffect(() => {
    if (auditDialogOpen) {
      setAuditLogs(getPermissionAuditLogs());
    }
  }, [auditDialogOpen]);
  
  const handleGroupChange = (value: string) => {
    setSelectedGroupId(value);
  };
  
  const handleRoleChange = (value: UserRole) => {
    setSelectedRole(value);
  };
  
  const handleAddRoleToGroup = () => {
    if (!selectedGroupId || !selectedRole) {
      toast({
        title: "Error",
        description: "Please select both a group and a role",
        variant: "destructive",
      });
      return;
    }
    
    const selectedGroup = groups.find(group => group.id === selectedGroupId);
    
    if (selectedGroup && !selectedGroup.assignedRoles.includes(selectedRole)) {
      const updatedGroups = groups.map(group => 
        group.id === selectedGroupId 
          ? { 
              ...group, 
              assignedRoles: [...group.assignedRoles, selectedRole],
              updatedAt: new Date()
            }
          : group
      );
      
      setGroups(updatedGroups);
      
      // Create and add audit entry
      const auditEntry = logRoleAssignment(
        selectedGroupId,
        selectedGroup.name,
        selectedRole,
        getRoleName(selectedRole),
        'user-1' // In a real app, this would be the current user's ID
      );
      addPermissionAuditEntry(auditEntry);
      
      toast({
        title: "Success",
        description: `Role ${getRoleName(selectedRole)} added to ${selectedGroup.name}`,
      });
    } else if (selectedGroup && selectedGroup.assignedRoles.includes(selectedRole)) {
      toast({
        title: "Info",
        description: `Role ${getRoleName(selectedRole)} is already assigned to ${selectedGroup.name}`,
      });
    }
    
    setSelectedRole('');
    setIsDialogOpen(false);
  };
  
  const handleRemoveRoleFromGroup = (groupId: string, role: UserRole) => {
    const groupToUpdate = groups.find(g => g.id === groupId);
    if (!groupToUpdate) return;
    
    const updatedGroups = groups.map(group => 
      group.id === groupId 
        ? { 
            ...group, 
            assignedRoles: group.assignedRoles.filter(r => r !== role),
            updatedAt: new Date()
          }
        : group
    );
    
    setGroups(updatedGroups);
    
    // Create and add audit entry
    const auditEntry = logRoleRemoval(
      groupId,
      groupToUpdate.name,
      role,
      getRoleName(role),
      'user-1' // In a real app, this would be the current user's ID
    );
    addPermissionAuditEntry(auditEntry);
    
    const groupName = groups.find(g => g.id === groupId)?.name || "the group";
    
    toast({
      title: "Success",
      description: `Role ${getRoleName(role)} removed from ${groupName}`,
    });
  };
  
  const getRoleName = (roleId: UserRole): string => {
    const role = availableRoles.find(r => r.id === roleId);
    return role ? role.name : roleId;
  };
  
  const openPermissionsDialog = (role: UserRole) => {
    // In a real implementation, this would fetch the current permissions for this role
    // For now, we'll use an empty set as placeholder
    const initialPermissions = new Map<ResourceType, Set<ActionType>>();
    
    // Simulate some sample permissions for roles
    if (role === 'admin') {
      availableResources.forEach(resource => {
        initialPermissions.set(resource, new Set(availableActions));
      });
    } else if (role === 'manager') {
      initialPermissions.set('incident', new Set(['view', 'create', 'edit', 'approve', 'assign']));
      initialPermissions.set('service-request', new Set(['view', 'approve', 'assign']));
      initialPermissions.set('change', new Set(['view', 'approve']));
    } else if (role === 'agent') {
      initialPermissions.set('incident', new Set(['view', 'create', 'edit', 'resolve']));
      initialPermissions.set('service-request', new Set(['view', 'create', 'edit', 'resolve']));
    }
    
    setSelectedPermissions(initialPermissions);
    setSelectedRole(role);
    setPermissionsDialogOpen(true);
  };
  
  const handlePermissionChange = (resource: ResourceType, action: ActionType, checked: boolean) => {
    const updatedPermissions = new Map(selectedPermissions);
    
    if (!updatedPermissions.has(resource)) {
      updatedPermissions.set(resource, new Set());
    }
    
    const resourcePermissions = updatedPermissions.get(resource)!;
    const previouslyHadPermission = resourcePermissions.has(action);
    
    if (checked) {
      resourcePermissions.add(action);
      
      // Only log if this is a new permission
      if (!previouslyHadPermission) {
        const auditEntry = logPermissionChange(
          selectedRole as UserRole,
          getRoleName(selectedRole as UserRole),
          resource,
          action,
          true,
          'user-1' // In a real app, this would be the current user's ID
        );
        addPermissionAuditEntry(auditEntry);
      }
    } else {
      resourcePermissions.delete(action);
      
      // Only log if we're removing an existing permission
      if (previouslyHadPermission) {
        const auditEntry = logPermissionChange(
          selectedRole as UserRole,
          getRoleName(selectedRole as UserRole),
          resource,
          action,
          false,
          'user-1' // In a real app, this would be the current user's ID
        );
        addPermissionAuditEntry(auditEntry);
      }
    }
    
    // If no permissions are left for this resource, remove the resource entry
    if (resourcePermissions.size === 0) {
      updatedPermissions.delete(resource);
    }
    
    setSelectedPermissions(updatedPermissions);
  };
  
  const savePermissions = () => {
    // In a real implementation, this would save the permissions to a backend
    toast({
      title: "Success",
      description: `Permissions updated for role ${getRoleName(selectedRole as UserRole)}`,
    });
    
    setPermissionsDialogOpen(false);
  };
  
  const isPermissionChecked = (resource: ResourceType, action: ActionType): boolean => {
    if (!selectedPermissions.has(resource)) return false;
    return selectedPermissions.get(resource)!.has(action);
  };
  
  const handleBulkAssignRoles = (assignments: {groupId: string, roleId: UserRole}[]) => {
    // Apply the assignments to the groups
    const updatedGroups = [...groups];
    
    assignments.forEach(({ groupId, roleId }) => {
      const groupIndex = updatedGroups.findIndex(g => g.id === groupId);
      if (groupIndex >= 0) {
        const group = updatedGroups[groupIndex];
        if (!group.assignedRoles.includes(roleId)) {
          updatedGroups[groupIndex] = {
            ...group,
            assignedRoles: [...group.assignedRoles, roleId],
            updatedAt: new Date()
          };
        }
      }
    });
    
    setGroups(updatedGroups);
    
    // Refresh the audit logs
    setAuditLogs(getPermissionAuditLogs());
  };
  
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Role to Group Assignment</CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setAuditDialogOpen(true)}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Audit Log
            </Button>
            <BulkRoleAssignmentDialog 
              groups={groups}
              availableRoles={availableRoles}
              onAssignRoles={handleBulkAssignRoles}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1">
              <label htmlFor="groupSelect" className="text-sm font-medium block mb-2">Select Group</label>
              <Select value={selectedGroupId} onValueChange={handleGroupChange}>
                <SelectTrigger id="groupSelect">
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="pt-6">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" disabled={!selectedGroupId} className="h-10">
                    <Plus className="h-4 w-4 mr-2" />
                    Assign Role
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Assign Role to Group</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="roleSelect" className="text-sm font-medium">Select Role</label>
                      <Select value={selectedRole} onValueChange={handleRoleChange}>
                        <SelectTrigger id="roleSelect">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableRoles.map((role) => (
                            <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddRoleToGroup} className="w-full">Add Role to Group</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {selectedGroupId && (
            <div>
              <h3 className="text-lg font-medium mb-4">
                Roles for {groups.find(g => g.id === selectedGroupId)?.name}
              </h3>
              {groups.find(g => g.id === selectedGroupId)?.assignedRoles.length === 0 ? (
                <div className="text-muted-foreground italic">No roles assigned to this group yet</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {groups.find(g => g.id === selectedGroupId)?.assignedRoles.map((role) => (
                    <div key={role} className="flex items-center">
                      <Badge className="mr-1 px-3 py-1">
                        {getRoleName(role)}
                        <button 
                          onClick={() => handleRemoveRoleFromGroup(selectedGroupId, role)}
                          className="ml-2 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs underline ml-1 h-6"
                        onClick={() => openPermissionsDialog(role)}
                      >
                        Edit Permissions
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Permissions Management Dialog */}
      <Dialog open={permissionsDialogOpen} onOpenChange={setPermissionsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Edit Permissions for {getRoleName(selectedRole as UserRole)}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resource</TableHead>
                  {availableActions.map(action => (
                    <TableHead key={action} className="text-center">
                      {action.charAt(0).toUpperCase() + action.slice(1)}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableResources.map(resource => (
                  <TableRow key={resource}>
                    <TableCell className="font-medium capitalize">
                      {resource.replace('-', ' ')}
                    </TableCell>
                    {availableActions.map(action => (
                      <TableCell key={`${resource}-${action}`} className="text-center">
                        <Checkbox 
                          checked={isPermissionChecked(resource, action)}
                          onCheckedChange={(checked) => 
                            handlePermissionChange(resource, action, checked === true)
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setPermissionsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={savePermissions}>
              Save Permissions
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Audit Log Dialog */}
      <Dialog open={auditDialogOpen} onOpenChange={setAuditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Permission Changes Audit Log</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto mt-4">
            {auditLogs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No permission changes have been logged yet.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Performed By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map(log => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">
                        {formatDate(log.timestamp)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          log.action?.includes('Granted') || log.action?.includes('Assignment') 
                            ? 'default' 
                            : 'destructive'
                        }>
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.message}</TableCell>
                      <TableCell>
                        {log.performedBy === 'system' ? 'System (Bulk Operation)' : 'Administrator'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setAuditDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupRoleManagement;
