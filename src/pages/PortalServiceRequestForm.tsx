
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Ticket, TicketType, TicketPriority, TicketCategory } from '@/utils/types';
import PortalHeader from '@/components/portal/PortalHeader';
import PageTransition from '@/components/shared/PageTransition';
import { getMandatoryFieldsConfig } from '@/api/statusSynchronization';
import { ConfigurableEntityType } from '@/utils/types/configuration';
import { useAuth } from '@/contexts/AuthContext';

type ServiceRequestFormValues = {
  title: string;
  description: string;
  serviceId: string;
  requestType: string;
  customerId?: string;
  customerName?: string;
};

// Mock user data for demonstration - in a real app this would come from an API
const mockUsers = [
  { id: 'user-1', name: 'John Doe' },
  { id: 'user-2', name: 'Jane Smith' },
  { id: 'user-3', name: 'Bob Johnson' },
  { id: 'user-4', name: 'Alice Williams' },
];

const PortalServiceRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mandatoryFields, setMandatoryFields] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  const form = useForm<ServiceRequestFormValues>({
    defaultValues: {
      title: '',
      description: '',
      serviceId: '',
      requestType: '',
      customerId: user?.id,
      customerName: user?.name
    }
  });

  // Check if user has admin role
  useEffect(() => {
    if (user?.role === 'admin' || user?.role === 'agent') {
      setIsAdminMode(true);
    }
  }, [user]);

  // Mock service options for demo purposes
  const serviceOptions = [
    { id: 'email', name: 'Email Service' },
    { id: 'laptop', name: 'Laptop Request' },
    { id: 'software', name: 'Software Installation' },
    { id: 'access', name: 'System Access' },
    { id: 'other', name: 'Other Request' }
  ];

  // Fetch mandatory fields for service requests
  useEffect(() => {
    const fetchMandatoryFields = async () => {
      setIsLoading(true);
      try {
        const entityType: ConfigurableEntityType = 'service-request';
        const fields = await getMandatoryFieldsConfig(entityType);
        
        // Extract required field names
        const requiredFields = fields
          .filter(field => field.isRequired)
          .map(field => field.fieldName);
        
        setMandatoryFields(requiredFields);
      } catch (error) {
        console.error('Failed to fetch mandatory fields:', error);
        toast.error('Could not load configuration. Some fields may be missing.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMandatoryFields();
  }, []);

  // Helper function to check if a field is required
  const isFieldRequired = (fieldName: string) => mandatoryFields.includes(fieldName);

  const onSubmit = async (data: ServiceRequestFormValues) => {
    try {
      // Check for mandatory fields
      const missingFields = mandatoryFields.filter(field => !data[field as keyof ServiceRequestFormValues]);
      
      if (missingFields.length > 0) {
        // Format field names for display
        const formattedFields = missingFields
          .map(field => field.charAt(0).toUpperCase() + field.slice(1))
          .join(', ');
        
        toast.error(`Please complete all required fields: ${formattedFields}`);
        return;
      }
      
      // Create the ticket with the necessary properties
      const ticket: Partial<Ticket> = {
        title: data.title,
        description: data.description,
        serviceId: data.serviceId,
        requestType: data.requestType,
        type: 'service',
        priority: 'P3',
        category: 'other',
        // If in admin mode, use the selected user, otherwise use the current user
        customerId: data.customerId || user?.id,
        customerName: data.customerName || user?.name,
        createdBy: user?.id || 'anonymous'
      };
      
      // Simulate API call - in a real app this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Your service request has been submitted successfully');
      form.reset();
      
      // Navigate back to the portal
      navigate('/portal');
    } catch (error) {
      console.error('Error submitting service request:', error);
      toast.error('There was a problem submitting your request. Please try again.');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
        <PortalHeader />
        
        <div className="container max-w-2xl mx-auto px-4 py-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6"
            onClick={() => navigate('/portal')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Portal
          </Button>
          
          <Card className="shadow-md border-0 overflow-hidden">
            <CardHeader className="bg-primary-50 border-b pb-4">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-6 w-6 text-primary mr-3" />
                <CardTitle className="text-2xl font-bold">Request a Service</CardTitle>
              </div>
              <CardDescription>
                Fill out the form below to submit a new service request
              </CardDescription>
            </CardHeader>
            
            {isLoading ? (
              <CardContent className="p-6">
                <div className="flex justify-center items-center h-64">
                  <div className="text-center">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading form configuration...</p>
                  </div>
                </div>
              </CardContent>
            ) : (
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Admin-only user selection field */}
                    {isAdminMode && (
                      <FormField
                        control={form.control}
                        name="customerId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              On Behalf of User
                              {isFieldRequired('customerId') && <span className="text-red-500 ml-1">*</span>}
                            </FormLabel>
                            <Select 
                              onValueChange={(value) => {
                                field.onChange(value);
                                // Find the selected user and update the customer name
                                const selectedUser = mockUsers.find(u => u.id === value);
                                if (selectedUser) {
                                  form.setValue('customerName', selectedUser.name);
                                }
                              }} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-10">
                                  <SelectValue placeholder="Select a user" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {mockUsers.map(user => (
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
                    )}
                    
                    {(mandatoryFields.length === 0 || mandatoryFields.includes('serviceId')) && (
                      <FormField
                        control={form.control}
                        name="serviceId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Service
                              {isFieldRequired('serviceId') && <span className="text-red-500 ml-1">*</span>}
                            </FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-10">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {serviceOptions.map(service => (
                                  <SelectItem key={service.id} value={service.id}>
                                    {service.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Request Title
                            {isFieldRequired('title') && <span className="text-red-500 ml-1">*</span>}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Briefly describe what you need" 
                              {...field} 
                              required={isFieldRequired('title')}
                              className="h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Details
                            {isFieldRequired('description') && <span className="text-red-500 ml-1">*</span>}
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide any additional details about your request" 
                              className="min-h-32 resize-y"
                              {...field} 
                              required={isFieldRequired('description')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {(mandatoryFields.length === 0 || mandatoryFields.includes('requestType')) && (
                      <FormField
                        control={form.control}
                        name="requestType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Request Type
                              {isFieldRequired('requestType') && <span className="text-red-500 ml-1">*</span>}
                            </FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-10">
                                  <SelectValue placeholder="Select type of request" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="new">New Request</SelectItem>
                                <SelectItem value="change">Change Existing</SelectItem>
                                <SelectItem value="information">Information Only</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <div className="pt-4 flex justify-end border-t mt-8">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="mr-3 h-10"
                        onClick={() => navigate('/portal')}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="h-10">Submit Request</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default PortalServiceRequestForm;
