
import React from 'react';
import { format } from 'date-fns';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, Clock } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { TaskFormValues } from '../hooks/useTaskForm';

interface DueDateSectionProps {
  form: UseFormReturn<TaskFormValues>;
}

const DueDateSection: React.FC<DueDateSectionProps> = ({ form }) => {
  return (
    <div className="space-y-6" role="region" aria-labelledby="due-date-section-heading">
      <h3 className="text-lg font-medium" id="due-date-section-heading">Due Date Information</h3>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                      aria-label="Select due date"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" aria-hidden="true" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                    aria-label="Calendar for selecting due date"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select a due date for this task
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Time (24-hour format)</FormLabel>
              <div className="flex">
                <FormControl>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <Input 
                      type="time" 
                      placeholder="Select time"
                      aria-label="Select due time"
                      {...field}
                    />
                  </div>
                </FormControl>
              </div>
              <FormDescription>
                Optional. Specify a time for the due date if needed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DueDateSection;
