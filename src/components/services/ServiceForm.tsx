
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockServiceCategories } from '@/utils/mockData/services';
import { Service } from '@/utils/types/service';
import { FormField } from '@/components/ui/form';
import { mockUsers, getUserById } from '@/utils/mockData/users';
import { mockTeams, getTeamById } from '@/utils/mockData/services';
import { SERVICE_SUPPORT_HOURS } from '@/utils/types/service';
import ServiceBusinessUnitSelector from './ServiceBusinessUnitSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ServiceFormProps {
  initialData?: Service;
  onSubmit: (data: Service) => void;
  onCancel: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [activeTab, setActiveTab] = useState<string>('basic');
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    description: '',
    categoryId: '',
    status: 'active',
    supportContactId: '',
    supportTeamId: '',
    supportHours: '',
    serviceOwnerId: '',
    documentationUrl: '',
    ...initialData,
  });

  const handleChange = (field: keyof Service, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Service);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {initialData ? 'Edit Service' : 'Add New Service'}
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="support">Support Details</TabsTrigger>
          <TabsTrigger value="business-units">Business Units</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => handleChange('categoryId', value)}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockServiceCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  required
                  className="resize-none h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange('status', value)}
                  required
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="support" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supportContact">Support Contact</Label>
                  <Select
                    value={formData.supportContactId || ''}
                    onValueChange={(value) => handleChange('supportContactId', value)}
                  >
                    <SelectTrigger id="supportContact">
                      <SelectValue placeholder="Select a support contact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {mockUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="supportTeam">Support Team</Label>
                  <Select
                    value={formData.supportTeamId || ''}
                    onValueChange={(value) => handleChange('supportTeamId', value)}
                  >
                    <SelectTrigger id="supportTeam">
                      <SelectValue placeholder="Select a support team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {mockTeams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supportHours">Support Hours</Label>
                  <Select
                    value={formData.supportHours || ''}
                    onValueChange={(value) => handleChange('supportHours', value)}
                  >
                    <SelectTrigger id="supportHours">
                      <SelectValue placeholder="Select support hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None specified</SelectItem>
                      {SERVICE_SUPPORT_HOURS.map((hours) => (
                        <SelectItem key={hours} value={hours}>
                          {hours}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="serviceOwner">Service Owner</Label>
                  <Select
                    value={formData.serviceOwnerId || ''}
                    onValueChange={(value) => handleChange('serviceOwnerId', value)}
                  >
                    <SelectTrigger id="serviceOwner">
                      <SelectValue placeholder="Select a service owner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {mockUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="documentationUrl">Documentation URL</Label>
                <Input
                  id="documentationUrl"
                  value={formData.documentationUrl || ''}
                  onChange={(e) => handleChange('documentationUrl', e.target.value)}
                  placeholder="https://example.com/docs"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="business-units" className="space-y-4 mt-4">
          {formData.id ? (
            <ServiceBusinessUnitSelector serviceId={formData.id} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground p-6">
                  You'll be able to associate business units after saving the service.
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? 'Update' : 'Create'} Service</Button>
      </div>
    </form>
  );
};

export default ServiceForm;
