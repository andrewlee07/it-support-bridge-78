
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, AlertCircle, InfoIcon, Wrench, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import RichTextEditor from './RichTextEditor';
import { announcementSchema, AnnouncementFormValues } from './announcementSchema';
import { Announcement } from '@/utils/types';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface AnnouncementFormProps {
  initialData?: Partial<Announcement>;
  onSubmit: (data: AnnouncementFormValues) => void;
  isSubmitting?: boolean;
  incidentId?: string;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting = false,
  incidentId
}) => {
  const [previewEnabled, setPreviewEnabled] = useState(false);

  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      status: initialData?.status || 'draft',
      priority: initialData?.priority || 'medium',
      type: initialData?.type || 'information',
      expiresAt: initialData?.expiresAt || '',
      relatedIncidentId: initialData?.relatedIncidentId || incidentId || '',
      audienceGroups: initialData?.audienceGroups || ['all-users'],
    }
  });

  const watchContent = form.watch('content');
  const watchType = form.watch('type');

  useEffect(() => {
    // When incidentId is provided, set default values for incident-related announcement
    if (incidentId && !initialData) {
      form.setValue('relatedIncidentId', incidentId);
      form.setValue('type', 'outage');
      form.setValue('priority', 'high');
    }
  }, [incidentId, initialData, form]);

  const handleSubmit = (data: AnnouncementFormValues) => {
    onSubmit(data);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'outage':
        return <AlertCircle className="h-4 w-4" />;
      case 'maintenance':
        return <Wrench className="h-4 w-4" />;
      case 'information':
        return <InfoIcon className="h-4 w-4" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Announcement title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
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
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type">
                          {field.value && (
                            <div className="flex items-center">
                              {getTypeIcon(field.value)}
                              <span className="ml-2">{field.value.charAt(0).toUpperCase() + field.value.slice(1)}</span>
                            </div>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="outage">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                          Outage
                        </div>
                      </SelectItem>
                      <SelectItem value="maintenance">
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 mr-2 text-yellow-500" />
                          Maintenance
                        </div>
                      </SelectItem>
                      <SelectItem value="information">
                        <div className="flex items-center">
                          <InfoIcon className="h-4 w-4 mr-2 text-blue-500" />
                          Information
                        </div>
                      </SelectItem>
                      <SelectItem value="other">
                        <div className="flex items-center">
                          <HelpCircle className="h-4 w-4 mr-2 text-gray-500" />
                          Other
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expiration Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isSubmitting}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
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
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date ? date.toISOString() : '')}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {incidentId && (
              <FormField
                control={form.control}
                name="relatedIncidentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Related Incident</FormLabel>
                    <FormControl>
                      <Input value={field.value} readOnly disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel>Content</FormLabel>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setPreviewEnabled(!previewEnabled)}
              >
                {previewEnabled ? 'Edit' : 'Preview'}
              </Button>
            </div>
            
            {previewEnabled ? (
              <Card className="min-h-[300px] p-4 overflow-auto">
                <CardContent className="p-0">
                  <div 
                    className="prose prose-sm max-w-none" 
                    dangerouslySetInnerHTML={{ __html: watchContent }}
                  />
                </CardContent>
              </Card>
            ) : (
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        height={300}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isSubmitting}
          >
            Reset
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {initialData ? 'Update Announcement' : 'Create Announcement'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AnnouncementForm;
