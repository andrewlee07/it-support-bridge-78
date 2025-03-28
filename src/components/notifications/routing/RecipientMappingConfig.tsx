
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Trash2, Edit2, UserPlus, Mail, Megaphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

// Types for recipient and recipient group
interface RecipientChannel {
  id: string;
  type: 'email' | 'slack' | 'teams' | 'sms' | 'inApp';
  value: string;
  isPrimary: boolean;
}

interface Recipient {
  id: string;
  name: string;
  role: string;
  department?: string;
  channels: RecipientChannel[];
  preferences?: {
    quietHours?: { start: string; end: string; timezone: string };
    disabledChannels?: string[];
    priorityThreshold?: 'all' | 'medium' | 'high' | 'critical';
  };
}

interface RecipientGroup {
  id: string;
  name: string;
  description: string;
  members: string[]; // IDs of recipients
  isBuiltIn: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock data
const mockRecipients: Recipient[] = [
  {
    id: "user-1",
    name: "John Smith",
    role: "System Administrator",
    department: "IT Operations",
    channels: [
      { id: "channel-1", type: "email", value: "john.smith@example.com", isPrimary: true },
      { id: "channel-2", type: "slack", value: "U123456", isPrimary: false }
    ],
    preferences: {
      quietHours: { start: "22:00", end: "07:00", timezone: "America/New_York" },
      priorityThreshold: "medium"
    }
  },
  {
    id: "user-2",
    name: "Jane Doe",
    role: "IT Manager",
    department: "IT Management",
    channels: [
      { id: "channel-3", type: "email", value: "jane.doe@example.com", isPrimary: true },
      { id: "channel-4", type: "sms", value: "+1234567890", isPrimary: false }
    ]
  },
  {
    id: "user-3",
    name: "Mike Johnson",
    role: "Network Engineer",
    department: "Infrastructure",
    channels: [
      { id: "channel-5", type: "email", value: "mike.johnson@example.com", isPrimary: true },
      { id: "channel-6", type: "teams", value: "mike.johnson", isPrimary: false }
    ]
  }
];

const mockRecipientGroups: RecipientGroup[] = [
  {
    id: "group-1",
    name: "IT Support Team",
    description: "All members of the IT support team",
    members: ["user-1", "user-3"],
    isBuiltIn: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "group-2",
    name: "Management",
    description: "Management team for approvals and critical notifications",
    members: ["user-2"],
    isBuiltIn: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const RecipientMappingConfig = () => {
  const { toast } = useToast();
  const [recipients, setRecipients] = useState<Recipient[]>(mockRecipients);
  const [recipientGroups, setRecipientGroups] = useState<RecipientGroup[]>(mockRecipientGroups);
  
  const [isRecipientDialogOpen, setIsRecipientDialogOpen] = useState(false);
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
  const [isChannelDialogOpen, setIsChannelDialogOpen] = useState(false);
  
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<RecipientGroup | null>(null);
  const [selectedRecipientForChannel, setSelectedRecipientForChannel] = useState<Recipient | null>(null);
  
  const [recipientFormValues, setRecipientFormValues] = useState<Partial<Recipient>>({
    name: '',
    role: '',
    department: '',
    channels: []
  });
  
  const [groupFormValues, setGroupFormValues] = useState<Partial<RecipientGroup>>({
    name: '',
    description: '',
    members: []
  });
  
  const [channelFormValues, setChannelFormValues] = useState<Partial<RecipientChannel>>({
    type: 'email',
    value: '',
    isPrimary: false
  });

  // Handler functions
  const handleAddRecipient = () => {
    setSelectedRecipient(null);
    setRecipientFormValues({
      name: '',
      role: '',
      department: '',
      channels: []
    });
    setIsRecipientDialogOpen(true);
  };

  const handleEditRecipient = (recipient: Recipient) => {
    setSelectedRecipient(recipient);
    setRecipientFormValues({
      name: recipient.name,
      role: recipient.role,
      department: recipient.department,
      channels: [...recipient.channels],
      preferences: { ...recipient.preferences }
    });
    setIsRecipientDialogOpen(true);
  };

  const handleDeleteRecipient = (id: string) => {
    // Check if recipient is in any groups
    const groupsWithRecipient = recipientGroups.filter(group => 
      group.members.includes(id)
    );
    
    if (groupsWithRecipient.length > 0) {
      // Warn and potentially update groups
      const groupNames = groupsWithRecipient.map(g => g.name).join(", ");
      
      if (confirm(`This recipient is part of the following groups: ${groupNames}. Deleting will remove them from these groups. Continue?`)) {
        // Remove from groups
        const updatedGroups = recipientGroups.map(group => ({
          ...group,
          members: group.members.filter(memberId => memberId !== id),
          updatedAt: new Date().toISOString()
        }));
        
        setRecipientGroups(updatedGroups);
        setRecipients(recipients.filter(r => r.id !== id));
        
        toast({
          title: "Recipient deleted",
          description: "Recipient has been removed from the system and all groups"
        });
      }
    } else {
      // Just delete the recipient
      setRecipients(recipients.filter(r => r.id !== id));
      
      toast({
        title: "Recipient deleted",
        description: "Recipient has been removed"
      });
    }
  };

  const handleAddGroup = () => {
    setSelectedGroup(null);
    setGroupFormValues({
      name: '',
      description: '',
      members: []
    });
    setIsGroupDialogOpen(true);
  };

  const handleEditGroup = (group: RecipientGroup) => {
    setSelectedGroup(group);
    setGroupFormValues({
      name: group.name,
      description: group.description,
      members: [...group.members]
    });
    setIsGroupDialogOpen(true);
  };

  const handleDeleteGroup = (id: string) => {
    setRecipientGroups(recipientGroups.filter(g => g.id !== id));
    
    toast({
      title: "Group deleted",
      description: "Recipient group has been removed"
    });
  };

  const handleAddChannel = (recipient: Recipient) => {
    setSelectedRecipientForChannel(recipient);
    setChannelFormValues({
      type: 'email',
      value: '',
      isPrimary: recipient.channels.length === 0 // Make primary if it's the first channel
    });
    setIsChannelDialogOpen(true);
  };

  const handleSubmitRecipient = () => {
    if (!recipientFormValues.name || !recipientFormValues.role) {
      toast({
        title: "Validation Error",
        description: "Name and role are required",
        variant: "destructive"
      });
      return;
    }

    if (selectedRecipient) {
      // Update existing recipient
      setRecipients(recipients.map(recipient => 
        recipient.id === selectedRecipient.id
          ? {
              ...recipient,
              name: recipientFormValues.name || recipient.name,
              role: recipientFormValues.role || recipient.role,
              department: recipientFormValues.department,
              channels: recipientFormValues.channels || recipient.channels,
              preferences: recipientFormValues.preferences
            }
          : recipient
      ));
      toast({
        title: "Recipient updated",
        description: "Recipient has been updated successfully"
      });
    } else {
      // Create new recipient
      const newRecipient: Recipient = {
        id: uuidv4(),
        name: recipientFormValues.name || '',
        role: recipientFormValues.role || '',
        department: recipientFormValues.department,
        channels: recipientFormValues.channels || [],
        preferences: recipientFormValues.preferences
      };
      setRecipients([...recipients, newRecipient]);
      toast({
        title: "Recipient created",
        description: "Recipient has been created successfully"
      });
    }
    
    setIsRecipientDialogOpen(false);
  };

  const handleSubmitGroup = () => {
    if (!groupFormValues.name) {
      toast({
        title: "Validation Error",
        description: "Group name is required",
        variant: "destructive"
      });
      return;
    }

    if (selectedGroup) {
      // Update existing group
      setRecipientGroups(recipientGroups.map(group => 
        group.id === selectedGroup.id
          ? {
              ...group,
              name: groupFormValues.name || group.name,
              description: groupFormValues.description || group.description,
              members: groupFormValues.members || group.members,
              updatedAt: new Date().toISOString()
            }
          : group
      ));
      toast({
        title: "Group updated",
        description: "Recipient group has been updated successfully"
      });
    } else {
      // Create new group
      const newGroup: RecipientGroup = {
        id: uuidv4(),
        name: groupFormValues.name || '',
        description: groupFormValues.description || '',
        members: groupFormValues.members || [],
        isBuiltIn: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setRecipientGroups([...recipientGroups, newGroup]);
      toast({
        title: "Group created",
        description: "Recipient group has been created successfully"
      });
    }
    
    setIsGroupDialogOpen(false);
  };

  const handleSubmitChannel = () => {
    if (!selectedRecipientForChannel) return;
    
    if (!channelFormValues.value) {
      toast({
        title: "Validation Error",
        description: "Channel value is required",
        variant: "destructive"
      });
      return;
    }

    const newChannel: RecipientChannel = {
      id: uuidv4(),
      type: channelFormValues.type as 'email' | 'slack' | 'teams' | 'sms' | 'inApp',
      value: channelFormValues.value || '',
      isPrimary: channelFormValues.isPrimary || false
    };
    
    // If this is marked as primary, update other channels to not be primary
    const updatedChannels = selectedRecipientForChannel.channels.map(channel => ({
      ...channel,
      isPrimary: newChannel.isPrimary ? false : channel.isPrimary
    }));
    
    // Add the new channel
    updatedChannels.push(newChannel);
    
    // Update the recipient
    setRecipients(recipients.map(recipient => 
      recipient.id === selectedRecipientForChannel.id
        ? {
            ...recipient,
            channels: updatedChannels
          }
        : recipient
    ));
    
    toast({
      title: "Channel added",
      description: "Notification channel has been added to the recipient"
    });
    
    setIsChannelDialogOpen(false);
  };

  const deleteChannel = (recipientId: string, channelId: string) => {
    const recipient = recipients.find(r => r.id === recipientId);
    
    if (!recipient) return;
    
    // Check if we're deleting the primary channel
    const isPrimaryChannel = recipient.channels.find(c => c.id === channelId)?.isPrimary;
    
    // Filter out the channel
    const updatedChannels = recipient.channels.filter(c => c.id !== channelId);
    
    // If we deleted the primary channel and there are other channels, make the first one primary
    if (isPrimaryChannel && updatedChannels.length > 0) {
      updatedChannels[0].isPrimary = true;
    }
    
    // Update the recipient
    setRecipients(recipients.map(r => 
      r.id === recipientId
        ? { ...r, channels: updatedChannels }
        : r
    ));
    
    toast({
      title: "Channel removed",
      description: "Notification channel has been removed from the recipient"
    });
  };

  // Helper functions for rendering
  const getRecipientById = (id: string) => {
    return recipients.find(r => r.id === id);
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'slack':
        return <Megaphone className="h-4 w-4" />;
      case 'teams':
        return <Users className="h-4 w-4" />;
      case 'sms':
        return <Mail className="h-4 w-4" />;
      case 'inApp':
        return <Bell className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  return (
    <Tabs defaultValue="recipients" className="space-y-4">
      <TabsList>
        <TabsTrigger value="recipients" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Recipients</span>
        </TabsTrigger>
        <TabsTrigger value="groups" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Recipient Groups</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="recipients">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Recipients</CardTitle>
              <CardDescription>
                Configure recipients and their notification channels
              </CardDescription>
            </div>
            <Button onClick={handleAddRecipient}>
              <Plus className="h-4 w-4 mr-2" />
              Add Recipient
            </Button>
          </CardHeader>
          <CardContent>
            {recipients.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No recipients configured. Add a recipient to get started.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Channels</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recipients.map((recipient) => (
                    <TableRow key={recipient.id}>
                      <TableCell className="font-medium">{recipient.name}</TableCell>
                      <TableCell>{recipient.role}</TableCell>
                      <TableCell>{recipient.department || "-"}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {recipient.channels.map(channel => (
                            <div 
                              key={channel.id} 
                              className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-xs"
                            >
                              {getChannelIcon(channel.type)}
                              <span>{channel.value}</span>
                              {channel.isPrimary && (
                                <Badge variant="secondary" className="ml-1 text-[10px] px-1">
                                  Primary
                                </Badge>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-1 hover:bg-destructive/10"
                                onClick={() => deleteChannel(recipient.id, channel.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 px-2 rounded-md text-xs"
                            onClick={() => handleAddChannel(recipient)}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Channel
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditRecipient(recipient)}
                          >
                            <Edit2 className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteRecipient(recipient.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="groups">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Recipient Groups</CardTitle>
              <CardDescription>
                Define groups of recipients for easier notification targeting
              </CardDescription>
            </div>
            <Button onClick={handleAddGroup}>
              <Plus className="h-4 w-4 mr-2" />
              Add Group
            </Button>
          </CardHeader>
          <CardContent>
            {recipientGroups.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No recipient groups configured. Add a group to get started.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recipientGroups.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">{group.name}</TableCell>
                      <TableCell>{group.description}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {group.members.map(memberId => {
                            const member = getRecipientById(memberId);
                            return member ? (
                              <Badge key={memberId} variant="outline">
                                {member.name}
                              </Badge>
                            ) : null;
                          })}
                          {group.members.length === 0 && (
                            <span className="text-muted-foreground text-xs">No members</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={group.isBuiltIn ? "secondary" : "default"}>
                          {group.isBuiltIn ? 'Built-in' : 'Custom'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditGroup(group)}
                          >
                            <Edit2 className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          {!group.isBuiltIn && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteGroup(group.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Recipient Dialog */}
      <Dialog open={isRecipientDialogOpen} onOpenChange={setIsRecipientDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedRecipient ? 'Edit Recipient' : 'Add Recipient'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recipientName">Name</Label>
              <Input
                id="recipientName"
                value={recipientFormValues.name || ''}
                onChange={(e) => setRecipientFormValues({ ...recipientFormValues, name: e.target.value })}
                placeholder="Enter recipient name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipientRole">Role</Label>
              <Input
                id="recipientRole"
                value={recipientFormValues.role || ''}
                onChange={(e) => setRecipientFormValues({ ...recipientFormValues, role: e.target.value })}
                placeholder="Enter recipient role"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipientDepartment">Department (Optional)</Label>
              <Input
                id="recipientDepartment"
                value={recipientFormValues.department || ''}
                onChange={(e) => setRecipientFormValues({ ...recipientFormValues, department: e.target.value })}
                placeholder="Enter recipient department"
              />
            </div>
            
            {selectedRecipient && (
              <div className="space-y-2">
                <Label>Notification Channels</Label>
                <p className="text-xs text-muted-foreground">
                  Channels can be managed after creating the recipient
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRecipientDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitRecipient}>
              {selectedRecipient ? 'Update Recipient' : 'Add Recipient'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Group Dialog */}
      <Dialog open={isGroupDialogOpen} onOpenChange={setIsGroupDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedGroup ? 'Edit Group' : 'Add Group'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                value={groupFormValues.name || ''}
                onChange={(e) => setGroupFormValues({ ...groupFormValues, name: e.target.value })}
                placeholder="Enter group name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="groupDescription">Description</Label>
              <Input
                id="groupDescription"
                value={groupFormValues.description || ''}
                onChange={(e) => setGroupFormValues({ ...groupFormValues, description: e.target.value })}
                placeholder="Enter group description"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="groupMembers">Members</Label>
              <div className="border rounded-md p-2 min-h-24 max-h-48 overflow-y-auto space-y-2">
                {recipients.map(recipient => (
                  <div key={recipient.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`member-${recipient.id}`}
                      checked={(groupFormValues.members || []).includes(recipient.id)}
                      onChange={(e) => {
                        const updatedMembers = e.target.checked
                          ? [...(groupFormValues.members || []), recipient.id]
                          : (groupFormValues.members || []).filter(id => id !== recipient.id);
                        
                        setGroupFormValues({ ...groupFormValues, members: updatedMembers });
                      }}
                      className="rounded"
                    />
                    <Label htmlFor={`member-${recipient.id}`} className="text-sm">
                      {recipient.name} ({recipient.role})
                    </Label>
                  </div>
                ))}
                
                {recipients.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No recipients available. Create recipients first.
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGroupDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitGroup}>
              {selectedGroup ? 'Update Group' : 'Add Group'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Channel Dialog */}
      <Dialog open={isChannelDialogOpen} onOpenChange={setIsChannelDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Notification Channel</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="channelType">Channel Type</Label>
              <Select
                value={channelFormValues.type || 'email'}
                onValueChange={(value) => setChannelFormValues({ 
                  ...channelFormValues, 
                  type: value as 'email' | 'slack' | 'teams' | 'sms' | 'inApp' 
                })}
              >
                <SelectTrigger id="channelType">
                  <SelectValue placeholder="Select channel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="slack">Slack</SelectItem>
                  <SelectItem value="teams">Microsoft Teams</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="inApp">In-App Notification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="channelValue">
                {channelFormValues.type === 'email' ? 'Email Address' : 
                 channelFormValues.type === 'slack' ? 'Slack User ID' :
                 channelFormValues.type === 'teams' ? 'Teams Username' :
                 channelFormValues.type === 'sms' ? 'Phone Number' : 'Username'}
              </Label>
              <Input
                id="channelValue"
                value={channelFormValues.value || ''}
                onChange={(e) => setChannelFormValues({ ...channelFormValues, value: e.target.value })}
                placeholder={`Enter ${channelFormValues.type} address or ID`}
              />
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Switch 
                id="isPrimary" 
                checked={channelFormValues.isPrimary} 
                onCheckedChange={(checked) => setChannelFormValues({ ...channelFormValues, isPrimary: checked })}
              />
              <Label htmlFor="isPrimary">Set as primary channel</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsChannelDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitChannel}>
              Add Channel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
};

export default RecipientMappingConfig;
