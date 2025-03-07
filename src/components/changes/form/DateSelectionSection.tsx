
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { UseFormReturn } from 'react-hook-form';
import FormSectionHeader from './FormSectionHeader';
import CustomFormField from './CustomFormField';

interface DateSelectionSectionProps {
  form: UseFormReturn<any>;
}

const DateSelectionSection: React.FC<DateSelectionSectionProps> = ({ form }) => {
  const DatePickerField = ({ field }: any) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "pl-3 text-left font-normal w-full",
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
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) => date < new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="space-y-4">
      <FormSectionHeader title="Schedule" description="Select start and end dates for the change" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomFormField
          form={form}
          name="startDate"
          label="Start Date"
        >
          <DatePickerField />
        </CustomFormField>
        
        <CustomFormField
          form={form}
          name="endDate"
          label="End Date"
        >
          {({ field }: any) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal w-full",
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
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => 
                    date < new Date() || 
                    (form.getValues().startDate && date < form.getValues().startDate)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        </CustomFormField>
      </div>
    </div>
  );
};

export default DateSelectionSection;
