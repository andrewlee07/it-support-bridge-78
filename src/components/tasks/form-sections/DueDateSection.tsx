
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
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Due Date Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
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
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="md:col-span-1">
          <FormField
            control={form.control}
            name="dueTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Time (24-hour format)</FormLabel>
                <div className="flex">
                  <FormControl>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="time" 
                        placeholder="Select time"
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
    </div>
  );
};

export default DueDateSection;
