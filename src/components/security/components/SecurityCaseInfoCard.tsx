
import React, { useState } from 'react';
import { SecurityCase } from '@/utils/types/security';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { getUserNameById } from '@/utils/userUtils';
import { Button } from '@/components/ui/button';
import { Edit, Save, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface SecurityCaseInfoCardProps {
  securityCase: SecurityCase;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  getTypeColor: (type: string) => string;
  formatDate: (dateString: string) => string;
  handleSystemClick: (system: string) => void;
  updateSecurityCase?: (updates: Partial<SecurityCase>) => Promise<boolean>;
}

const SecurityCaseInfoCard: React.FC<SecurityCaseInfoCardProps> = ({
  securityCase,
  getStatusColor,
  getPriorityColor,
  getTypeColor,
  formatDate,
  handleSystemClick,
  updateSecurityCase
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCase, setEditedCase] = useState<Partial<SecurityCase>>({
    title: securityCase.title,
    description: securityCase.description,
    status: securityCase.status,
    priority: securityCase.priority,
    type: securityCase.type,
    remediationPlan: securityCase.remediationPlan,
    impactedUsers: securityCase.impactedUsers
  });

  const handleChange = (field: keyof SecurityCase, value: any) => {
    setEditedCase(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (updateSecurityCase) {
      const success = await updateSecurityCase(editedCase);
      if (success) {
        setIsEditing(false);
      }
    }
  };

  const handleCancel = () => {
    setEditedCase({
      title: securityCase.title,
      description: securityCase.description,
      status: securityCase.status,
      priority: securityCase.priority,
      type: securityCase.type,
      remediationPlan: securityCase.remediationPlan,
      impactedUsers: securityCase.impactedUsers
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle>Security Case Information</CardTitle>
        {updateSecurityCase && (
          <div>
            {isEditing ? (
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ID</p>
                <p className="font-mono">
                  <Link to={`/security/case/${securityCase.id}`} className="hover:underline text-blue-600">
                    {securityCase.id}
                  </Link>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge className={getStatusColor(securityCase.status)}>
                  {securityCase.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Priority</p>
                <Badge className={getPriorityColor(securityCase.priority)}>
                  {securityCase.priority}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <Badge variant="outline" className={getTypeColor(securityCase.type)}>
                  {securityCase.type}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reported By</p>
                <p>{getUserNameById(securityCase.reportedBy)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reported On</p>
                <p>{formatDate(securityCase.reportedAt)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Impacted Users</p>
                <p>{securityCase.impactedUsers}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                <p>{securityCase.assignedTo ? getUserNameById(securityCase.assignedTo) : "Unassigned"}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
              <p className="text-sm">{securityCase.description}</p>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground mb-1">Remediation Plan</p>
              <p className="text-sm">{securityCase.remediationPlan}</p>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ID</p>
                <p className="font-mono text-muted">
                  {securityCase.id}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Select 
                  value={editedCase.status} 
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Priority</p>
                <Select 
                  value={editedCase.priority} 
                  onValueChange={(value) => handleChange('priority', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <Select 
                  value={editedCase.type} 
                  onValueChange={(value) => handleChange('type', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Data Breach">Data Breach</SelectItem>
                    <SelectItem value="SAR">SAR</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                    <SelectItem value="Threat">Threat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reported By</p>
                <p className="text-muted">{getUserNameById(securityCase.reportedBy)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reported On</p>
                <p className="text-muted">{formatDate(securityCase.reportedAt)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Impacted Users</p>
                <Input 
                  type="number" 
                  value={editedCase.impactedUsers} 
                  onChange={(e) => handleChange('impactedUsers', parseInt(e.target.value) || 0)} 
                />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                <p className="text-muted">{securityCase.assignedTo ? getUserNameById(securityCase.assignedTo) : "Unassigned"}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground mb-1">Title</p>
              <Input 
                value={editedCase.title} 
                onChange={(e) => handleChange('title', e.target.value)} 
                className="mb-3"
              />
              
              <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
              <Textarea 
                value={editedCase.description} 
                onChange={(e) => handleChange('description', e.target.value)} 
                className="mb-3 min-h-[100px]"
              />
              
              <p className="text-sm font-medium text-muted-foreground mb-1">Remediation Plan</p>
              <Textarea 
                value={editedCase.remediationPlan} 
                onChange={(e) => handleChange('remediationPlan', e.target.value)} 
                className="mb-3 min-h-[100px]"
              />
            </div>
          </>
        )}
        
        {securityCase.affectedSystems && securityCase.affectedSystems.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Affected Services</p>
            <div className="flex flex-wrap gap-2">
              {securityCase.affectedSystems.map((system, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-blue-50 text-blue-700 cursor-pointer hover:bg-blue-100"
                  onClick={() => handleSystemClick(system)}
                >
                  {system}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityCaseInfoCard;
