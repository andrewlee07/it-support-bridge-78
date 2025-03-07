
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Release, ReleaseStatus, ReleaseType } from '@/utils/types';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

// Form schema
const releaseSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  version: z.string().min(1, { message: "Version is required" }),
  type: z.enum(['major', 'minor', 'patch', 'emergency'] as const),
  description: z.string().min(5, { message: "Description must be at least 5 characters" }),
  plannedDate: z.date().min(new Date(), { message: "Planned date must be in the future" }),
  status: z.enum(['Planned', 'In Progress', 'Deployed', 'Cancelled'] as const),
});

type ReleaseFormValues = z.infer<typeof releaseSchema>;

interface ReleaseFormProps {
  onSubmit: (data: ReleaseFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  initialData?: Partial<Release>;
  isEditing?: boolean;
}

const ReleaseForm: React.FC<ReleaseFormProps> = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
  initialData,
  isEditing = false,
}) => {
  const { user } = useAuth();

  const form = useForm<ReleaseFormValues>({
    resolver: zodResolver(releaseSchema),
    defaultValues: {
      title: initialData?.title || "",
      version: initialData?.version || "",
      type: (initialData?.type as ReleaseType) || "minor",
      description: initialData?.description || "",
      plannedDate: initialData?.plannedDate ? new Date(initialData.plannedDate) : new Date(Date.now() + 86400000), // tomorrow
      status: (initialData?.status as ReleaseStatus) || "Planned",
    }
  });

  const handleSubmit = (values: ReleaseFormValues) => {
    onSubmit(values);
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Release" : "New Release"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter release title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Version</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 1.0.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Release Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select release type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="major">Major</SelectItem>
                        <SelectItem value="minor">Minor</SelectItem>
                        <SelectItem value="patch">Patch</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the release" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="plannedDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Planned Release Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Planned">Planned</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Deployed">Deployed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : isEditing ? 'Update Release' : 'Create Release'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ReleaseForm;
