
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
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
  SERVICE_SUPPORT_HOURS 
} from '@/utils/types/service';
import { getAllUsers } from '@/utils/mockData/users';
import { mockTeams } from '@/utils/mockData/teams';

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
  status: z.enum(['active', 'inactive']),
  supportContactId: z.string().optional(),
  supportTeamId: z.string().optional(),
  supportHours: z.enum([...SERVICE_SUPPORT_HOURS] as [string, ...string[]]).optional(),
  serviceOwnerId: z.string().optional(),
  documentationUrl: z.string().url().optional().or(z.literal('')),
});

const ServiceForm: React.FC<ServiceFormProps> = ({
  initialValues,
  categories,
  onSubmit,
  onCancel,
  isSubmitting
}) => {
  const users = getAllUsers();
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: '',
      description: '',
      categoryId: '',
      status: 'active' as ServiceStatus,
      supportContactId: '',
      supportTeamId: '',
      supportHours: '' as SupportHours,
      serviceOwnerId: '',
      documentationUrl: '',
    },
  });

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
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

