
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Ticket, TicketType, TicketPriority, TicketCategory } from '@/utils/types';
import PortalHeader from '@/components/portal/PortalHeader';
import PageTransition from '@/components/shared/PageTransition';
import { getMandatoryFieldsConfig } from '@/api/statusSynchronization';
import { ConfigurableEntityType } from '@/utils/types/configuration';

type ServiceRequestFormValues = {
  title: string;
  description: string;
  serviceId: string;
  requestType: string;
};

const PortalServiceRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const [mandatoryFields, setMandatoryFields] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const form = useForm<ServiceRequestFormValues>({
    defaultValues: {
      title: '',
      description: '',
      serviceId: '',
      requestType: ''
    }
  });

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
      const missingFields = mandatoryFields.filter(field => !data[field]);
      
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
        category: 'other'
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
          
          <div className="flex items-center mb-6">
            <CheckCircle className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-2xl font-bold">Request a Service</h1>
          </div>
          
          {isLoading ? (
            <Card className="p-6">
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading form configuration...</p>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {(mandatoryFields.length === 0 || mandatoryFields.includes('serviceId')) && (
                    <FormField
                      control={form.control}
                      name="serviceId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Service
                            {isFieldRequired('serviceId') && <span className="text-red-500 ml-1">*</span>}
                          </FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
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
                        <FormLabel>
                          Request Title
                          {isFieldRequired('title') && <span className="text-red-500 ml-1">*</span>}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Briefly describe what you need" 
                            {...field} 
                            required={isFieldRequired('title')}
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
                        <FormLabel>
                          Details
                          {isFieldRequired('description') && <span className="text-red-500 ml-1">*</span>}
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide any additional details about your request" 
                            className="min-h-32"
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
                          <FormLabel>
                            Request Type
                            {isFieldRequired('requestType') && <span className="text-red-500 ml-1">*</span>}
                          </FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
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
                  
                  <div className="pt-4 flex justify-end">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mr-2"
                      onClick={() => navigate('/portal')}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Submit Request</Button>
                  </div>
                </form>
              </Form>
            </Card>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default PortalServiceRequestForm;
