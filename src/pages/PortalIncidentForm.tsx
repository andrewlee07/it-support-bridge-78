
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { HelpCircle, ArrowLeft } from 'lucide-react';
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

type IncidentFormValues = {
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
};

const PortalIncidentForm: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<IncidentFormValues>({
    defaultValues: {
      title: '',
      description: '',
      category: 'hardware',
      priority: 'P3'
    }
  });

  const onSubmit = async (data: IncidentFormValues) => {
    try {
      // Create the ticket with the necessary properties
      const ticket: Partial<Ticket> = {
        ...data,
        type: 'incident'
      };
      
      // Simulate API call - in a real app this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Your incident has been submitted successfully');
      form.reset();
      
      // Navigate back to the portal
      navigate('/portal');
    } catch (error) {
      console.error('Error submitting incident:', error);
      toast.error('There was a problem submitting your incident. Please try again.');
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
            <HelpCircle className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-2xl font-bold">Report an Issue</h1>
          </div>
          
          <Card className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What's the issue? <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Briefly describe the problem" 
                          {...field} 
                          required
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
                      <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please provide more details about the issue" 
                          className="min-h-32"
                          {...field} 
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hardware">Hardware</SelectItem>
                            <SelectItem value="software">Software</SelectItem>
                            <SelectItem value="network">Network</SelectItem>
                            <SelectItem value="access">Access</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Impact</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select impact" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="P1">High - Work stopped</SelectItem>
                            <SelectItem value="P2">Medium - Work hindered</SelectItem>
                            <SelectItem value="P3">Low - Minor issue</SelectItem>
                            <SelectItem value="P4">Very Low - Question</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="mr-2"
                    onClick={() => navigate('/portal')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit Incident</Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default PortalIncidentForm;
