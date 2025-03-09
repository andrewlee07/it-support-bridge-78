
import React, { useState } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Download, Upload, Settings, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { serviceCategories } from '@/utils/mockData/services/categories';
import { getAllServices } from '@/utils/mockData/services/servicesData';
import { useUserManagement } from '@/hooks/useUserManagement';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const ServiceCatalogueConfiguration = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { users, handleUserRoleChange } = useUserManagement();
  const { toast } = useToast();
  const { userHasPermission } = useAuth();
  
  // Check if user has permission to manage service catalog config
  const hasConfigPermission = userHasPermission('Manage Service Catalog Config');
  
  const services = getAllServices();
  
  // Filter services based on search query, category, and status
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.categoryId === categoryFilter;
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Get users with service-catalog-manager role
  const serviceCatalogManagers = users.filter(user => 
    user.role === 'service-catalog-manager' || 
    (user.roles && user.roles.includes('service-catalog-manager'))
  );
  
  // Function to toggle service catalog manager role
  const toggleServiceCatalogManagerRole = (userId: string, checked: boolean) => {
    handleUserRoleChange(userId, 'service-catalog-manager', checked);
    
    toast({
      title: checked ? "Role Assigned" : "Role Removed",
      description: `Service Catalog Manager role ${checked ? 'assigned to' : 'removed from'} user.`,
    });
  };
  
  // Mock functions for CRUD operations
  const handleAddService = () => {
    toast({
      title: "Not Implemented",
      description: "Add service functionality will be implemented in a future update.",
    });
  };
  
  const handleImportServices = () => {
    toast({
      title: "Not Implemented",
      description: "Import services functionality will be implemented in a future update.",
    });
  };
  
  const handleExportServices = () => {
    toast({
      title: "Not Implemented",
      description: "Export services functionality will be implemented in a future update.",
    });
  };
  
  const handleEditService = (serviceId: string) => {
    toast({
      title: "Edit Service",
      description: `Editing service ID: ${serviceId}`,
    });
  };
  
  const handleDeleteService = (serviceId: string) => {
    toast({
      title: "Not Implemented",
      description: "Delete service functionality will be implemented in a future update.",
    });
  };
  
  if (!hasConfigPermission) {
    return (
      <PageTransition>
        <div className="container mx-auto py-6">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You do not have permission to access Service Catalog Configuration.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Service Catalog Configuration</h1>
            <p className="text-muted-foreground mt-1">
              Configure service categories, fields, and visibility settings
            </p>
          </div>

          <Tabs defaultValue="services" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="access">Access Management</TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Services</CardTitle>
                    <CardDescription>Manage services in the catalog</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={handleAddService}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Service
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleImportServices}>
                      <Upload className="mr-2 h-4 w-4" />
                      Import
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleExportServices}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <Input
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-sm"
                    />
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {serviceCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[150px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredServices.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-6">
                              {searchQuery || categoryFilter !== 'all' || statusFilter !== 'all'
                                ? "No services match your search criteria"
                                : "No services found. Add your first service to get started."}
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredServices.map((service) => (
                            <TableRow key={service.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{service.name}</p>
                                  <p className="text-sm text-muted-foreground truncate max-w-xs">
                                    {service.description}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>{service.category.name}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant={service.status === 'active' ? 'default' : 'secondary'}
                                  className="capitalize"
                                >
                                  <span 
                                    className={`mr-1.5 inline-block h-2 w-2 rounded-full ${
                                      service.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                                    }`} 
                                  />
                                  {service.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleEditService(service.id)}
                                  >
                                    Edit
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleDeleteService(service.id)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Service Categories</CardTitle>
                    <CardDescription>Manage categories in the service catalog</CardDescription>
                  </div>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Category
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Services</TableHead>
                          <TableHead className="w-[150px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {serviceCategories.map((category) => (
                          <TableRow key={category.id}>
                            <TableCell>
                              <p className="font-medium">{category.name}</p>
                            </TableCell>
                            <TableCell>{category.description}</TableCell>
                            <TableCell>
                              {services.filter(s => s.categoryId === category.id).length}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">Edit</Button>
                                <Button variant="ghost" size="sm">Delete</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Global Settings</CardTitle>
                  <CardDescription>Configure service catalog display settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">Default View</h3>
                        <Select defaultValue="grid">
                          <SelectTrigger>
                            <SelectValue placeholder="Select view" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grid">Grid</SelectItem>
                            <SelectItem value="list">List</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Default Sort</h3>
                        <Select defaultValue="name">
                          <SelectTrigger>
                            <SelectValue placeholder="Select sort" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="category">Category</SelectItem>
                            <SelectItem value="recent">Recently Updated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Required Fields</h3>
                      <div className="border rounded-md p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="name" checked disabled className="form-checkbox" />
                            <label htmlFor="name">Name (Required)</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="description" checked className="form-checkbox" />
                            <label htmlFor="description">Description</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="category" checked disabled className="form-checkbox" />
                            <label htmlFor="category">Category (Required)</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="supportContact" className="form-checkbox" />
                            <label htmlFor="supportContact">Support Contact</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="supportHours" className="form-checkbox" />
                            <label htmlFor="supportHours">Support Hours</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="serviceOwner" className="form-checkbox" />
                            <label htmlFor="serviceOwner">Service Owner</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="approvalRequired" className="form-checkbox" />
                            <label htmlFor="approvalRequired">Approval Required</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>
                        <Settings className="mr-2 h-4 w-4" />
                        Save Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="access" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Access Management</CardTitle>
                  <CardDescription>
                    Manage users who can edit service catalog content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Service Catalog Managers</h3>
                      <p className="text-sm text-muted-foreground">
                        {serviceCatalogManagers.length} {serviceCatalogManagers.length === 1 ? 'user' : 'users'} with this role
                      </p>
                    </div>
                    
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead className="w-[150px]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((user) => {
                            const hasRole = user.role === 'service-catalog-manager' || 
                                          (user.roles && user.roles.includes('service-catalog-manager'));
                            
                            return (
                              <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.department}</TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <input 
                                      type="checkbox" 
                                      checked={hasRole}
                                      onChange={(e) => toggleServiceCatalogManagerRole(user.id, e.target.checked)}
                                      className="form-checkbox"
                                    />
                                    <label>Catalog Manager</label>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default ServiceCatalogueConfiguration;
