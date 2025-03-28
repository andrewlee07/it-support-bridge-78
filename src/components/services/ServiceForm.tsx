
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Service, 
  ServiceCategory, 
  ServiceStatus, 
  SupportHours, 
  SERVICE_SUPPORT_HOURS,
  ServiceType
} from '@/utils/types/service';
import { getAllUsers } from '@/utils/mockData/users';
import { mockTeams } from '@/utils/mockData/teams';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getServiceById, getTechnicalServices, getBusinessServices } from '@/utils/mockData/services/servicesData';

export interface ServiceFormProps {
  initialValues?: Service;
  categories: ServiceCategory[];
  onSubmit: (values: any) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const formSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(5).max(500),
  categoryId: z.string().min(1),
  status: z.enum(['active', 'inactive', 'maintenance', 'deprecated']),
  serviceType: z.enum(['technical', 'business']),
  supportContactId: z.string().optional(),
  supportTeamId: z.string().optional(),
  supportHours: z.enum([...SERVICE_SUPPORT_HOURS] as [string, ...string[]]).optional(),
  serviceOwnerId: z.string().optional(),
  documentationUrl: z.string().url().optional().or(z.literal('')),
  parentServiceId: z.string().optional(),
  technicalServiceIds: z.array(z.string()).optional(),
  businessServiceIds: z.array(z.string()).optional(),
});

const ServiceForm: React.FC<ServiceFormProps> = ({
  initialValues,
  categories,
  onSubmit,
  onCancel,
  isSubmitting
}) => {
  const users = getAllUsers();
  const technicalServices = getTechnicalServices();
  const businessServices = getBusinessServices();
  const [selectedParentService, setSelectedParentService] = useState<Service | null>(null);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ? {
      ...initialValues,
      technicalServiceIds: initialValues.technicalServiceIds || [],
      businessServiceIds: initialValues.businessServiceIds || []
    } : {
      name: '',
      description: '',
      categoryId: '',
      status: 'active' as ServiceStatus,
      serviceType: 'technical' as ServiceType,
      supportContactId: '',
      supportTeamId: '',
      supportHours: '' as SupportHours,
      serviceOwnerId: '',
      documentationUrl: '',
      parentServiceId: '',
      technicalServiceIds: [],
      businessServiceIds: []
    },
  });

  const selectedServiceType = form.watch('serviceType');
  const parentServiceId = form.watch('parentServiceId');
  
  // When parent service ID changes, fetch and set the parent service
  useEffect(() => {
    if (parentServiceId) {
      const parent = getServiceById(parentServiceId);
      setSelectedParentService(parent || null);
    } else {
      setSelectedParentService(null);
    }
  }, [parentServiceId]);
  
  // Get potential parent services based on service type
  const getPotentialParentServices = () => {
    if (!selectedServiceType) return [];
    
    // Get services of the same type
    const services = selectedServiceType === 'technical' ? 
      technicalServices : businessServices;
    
    // Filter out the current service and any services that are already children
    return services.filter(service => 
      service.id !== initialValues?.id && 
      !service.parentServiceId
    );
  };

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="relationships">Relationships</TabsTrigger>
            <TabsTrigger value="support">Support Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter service name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="technical">Technical Service</SelectItem>
                        <SelectItem value="business">Business Service</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Technical services support business services.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="deprecated">Deprecated</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter service description"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="relationships" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="parentServiceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Service</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select parent service (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">None (Top-level service)</SelectItem>
                        {getPotentialParentServices().map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {selectedParentService ? (
                        <>This will be a child service of {selectedParentService.name}</>
                      ) : (
                        <>Select a parent service if this is a sub-component</>
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {selectedServiceType === 'business' && (
                <div className="md:col-span-2">
                  <FormLabel>Supporting Technical Services</FormLabel>
                  <FormDescription className="mb-2">
                    Select the technical services that support this business service
                  </FormDescription>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {technicalServices.map(service => (
                      <FormField
                        key={service.id}
                        control={form.control}
                        name="technicalServiceIds"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value?.includes(service.id)}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    const currentValue = field.value || [];
                                    if (checked) {
                                      field.onChange([...currentValue, service.id]);
                                    } else {
                                      field.onChange(
                                        currentValue.filter(value => value !== service.id)
                                      );
                                    }
                                  }}
                                  className="h-4 w-4 rounded border-gray-300"
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {service.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {selectedServiceType === 'technical' && (
                <div className="md:col-span-2">
                  <FormLabel>Supported Business Services</FormLabel>
                  <FormDescription className="mb-2">
                    Select the business services that this technical service supports
                  </FormDescription>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {businessServices.map(service => (
                      <FormField
                        key={service.id}
                        control={form.control}
                        name="businessServiceIds"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value?.includes(service.id)}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    const currentValue = field.value || [];
                                    if (checked) {
                                      field.onChange([...currentValue, service.id]);
                                    } else {
                                      field.onChange(
                                        currentValue.filter(value => value !== service.id)
                                      );
                                    }
                                  }}
                                  className="h-4 w-4 rounded border-gray-300"
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {service.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="support" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="supportHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Support Hours</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select support hours" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SERVICE_SUPPORT_HOURS.map((hours) => (
                          <SelectItem key={hours} value={hours}>
                            {hours}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="supportContactId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Support Contact</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select support contact" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="supportTeamId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Support Team</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select support team" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {mockTeams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="serviceOwnerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Owner</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service owner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="documentationUrl"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Documentation URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter documentation URL"
                        type="url"
                      />
                    </FormControl>
                    <FormDescription>
                      Link to detailed documentation for this service
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : initialValues ? 'Update Service' : 'Create Service'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ServiceForm;
