
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { backlogItemSchema, BacklogItemFormValues } from './forms/backlogItemSchema';
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
  SelectValue 
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBacklogItem, updateBacklogItem } from '@/utils/api/backlogApi';
import { BacklogItem, BacklogItemStatus, BacklogItemPriority, BacklogItemType } from '@/utils/types/backlogTypes';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { getReleases } from '@/utils/api/release/releaseQueries';
import { Release } from '@/utils/api/release/types';

interface BacklogItemFormProps {
  initialData?: BacklogItem;
  onSuccess: (item: BacklogItem) => void;
  onCancel: () => void;
}

const BacklogItemForm: React.FC<BacklogItemFormProps> = ({ 
  initialData, 
  onSuccess,
  onCancel
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [releases, setReleases] = useState<Release[]>([]);

  const form = useForm<BacklogItemFormValues>({
    resolver: zodResolver(backlogItemSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      status: 'open',
      priority: 'medium',
      type: 'feature',
      labels: [],
      storyPoints: 0
    }
  });

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const releasesData = await getReleases();
        setReleases(releasesData);
      } catch (error) {
        console.error('Error fetching releases:', error);
        toast.error('Failed to load releases');
      }
    };

    fetchReleases();
  }, []);

  const onSubmit = async (data: BacklogItemFormValues) => {
    if (!user) return;
    
    setLoading(true);
    try {
      let result;
      
      if (initialData) {
        // Update existing item
        result = await updateBacklogItem(initialData.id, {
          ...data,
          // These fields shouldn't be updateable via the form
          id: initialData.id,
          createdAt: initialData.createdAt,
          updatedAt: new Date().toISOString()
        });
        toast.success('Backlog item updated successfully');
      } else {
        // Create new item
        result = await createBacklogItem({
          ...data,
          creator: user.id,
          labels: data.labels || [],
          type: data.type as BacklogItemType,
        });
        toast.success('Backlog item created successfully');
      }
      
      onSuccess(result);
    } catch (error) {
      console.error('Error saving backlog item:', error);
      toast.error('Failed to save backlog item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter backlog item title" {...field} />
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
                  placeholder="Describe the backlog item" 
                  className="min-h-[120px]"
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
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="deferred">Deferred</SelectItem>
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
                <FormLabel>Priority</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="feature">Feature</SelectItem>
                    <SelectItem value="bug">Bug</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                    <SelectItem value="enhancement">Enhancement</SelectItem>
                    <SelectItem value="technical-debt">Technical Debt</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="storyPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Story Points</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    placeholder="Estimated effort" 
                    {...field}
                    onChange={e => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assignee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assignee</FormLabel>
                <FormControl>
                  <Input placeholder="User assigned to this item" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="releaseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Release</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a release" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {releases.map((release) => (
                      <SelectItem key={release.id} value={release.id}>
                        {release.name}
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
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
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
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : initialData ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BacklogItemForm;
