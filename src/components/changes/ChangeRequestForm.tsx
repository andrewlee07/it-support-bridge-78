import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { DatePicker } from '@/components/ui/date-picker';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChangeCategory, ChangeRequest } from '@/utils/types';
import { addDays } from 'date-fns';

export const categoryOptions = [
  { value: 'hardware', label: 'Hardware' },
  { value: 'software', label: 'Software' },
  { value: 'network', label: 'Network' },
  { value: 'access', label: 'Access Control' },
  { value: 'security', label: 'Security' },
  { value: 'other', label: 'Other' }
];

export const changeRequestSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  category: z.enum(['hardware', 'software', 'network', 'access', 'security', 'other']),
  implementationPlan: z.string().min(10, { message: 'Implementation plan must be at least 10 characters' }),
  rollbackPlan: z.string().min(10, { message: 'Rollback plan must be at least 10 characters' }),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  impact: z.enum(['low', 'medium', 'high']),
  urgency: z.enum(['low', 'medium', 'high']),
  riskLevel: z.enum(['low', 'medium', 'high']).optional(),
});

export type ChangeRequestFormValues = z.infer<typeof changeRequestSchema>;

interface ChangeRequestFormProps {
  onSubmit: (values: ChangeRequestFormValues) => void;
  initialData?: Partial<ChangeRequest>;
  isLoading?: boolean;
}

const ChangeRequestForm: React.FC<ChangeRequestFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const [calculatedRisk, setCalculatedRisk] = useState<'low' | 'medium' | 'high'>('low');

  const form = useForm<ChangeRequestFormValues>({
    resolver: zodResolver(changeRequestSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      category: initialData?.category || 'other',
      implementationPlan: initialData?.implementationPlan || '',
      rollbackPlan: initialData?.rollbackPlan || '',
      startDate: initialData?.startDate ? new Date(initialData.startDate) : undefined,
      endDate: initialData?.endDate ? new Date(initialData.endDate) : undefined,
      impact: initialData?.impact || 'low',
      urgency: initialData?.urgency || 'low',
      riskLevel: initialData?.riskLevel || 'low',
    },
  });

  // Calculate risk level based on impact and urgency
  React.useEffect(() => {
    const impact = form.watch('impact');
    const urgency = form.watch('urgency');
    
    let risk: 'low' | 'medium' | 'high' = 'low';
    
    if (impact === 'high' && urgency === 'high') {
      risk = 'high';
    } else if (impact === 'high' || urgency === 'high') {
      risk = 'medium';
    } else if (impact === 'medium' && urgency === 'medium') {
      risk = 'medium';
    } else {
      risk = 'low';
    }
    
    setCalculatedRisk(risk);
    form.setValue('riskLevel', risk);
  }, [form.watch('impact'), form.watch('urgency')]);

  const handleSubmit = (values: ChangeRequestFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Change Request Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter change request title" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the change request in detail"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <DatePicker
                      date={field.value}
                      setDate={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <DatePicker
                      date={field.value}
                      setDate={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Implementation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="implementationPlan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Implementation Plan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe how the change will be implemented"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rollbackPlan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rollback Plan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe how to roll back the change if needed"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="impact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Impact</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select impact level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How much will this change affect users and systems?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Urgency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How quickly does this change need to be implemented?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="p-4 border rounded-md bg-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Calculated Risk Level</h4>
                  <p className="text-sm text-muted-foreground">
                    Based on impact and urgency
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-white font-medium ${
                  calculatedRisk === 'high' 
                    ? 'bg-destructive' 
                    : calculatedRisk === 'medium' 
                      ? 'bg-amber-500' 
                      : 'bg-green-500'
                }`}>
                  {calculatedRisk.charAt(0).toUpperCase() + calculatedRisk.slice(1)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <CardFooter className="flex justify-between px-0">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Change Request'}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default ChangeRequestForm;
