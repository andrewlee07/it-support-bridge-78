
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import FormSectionHeader from './FormSectionHeader';
import CustomFormField from './CustomFormField';

interface DateSelectionSectionProps {
  form: UseFormReturn<any>;
}

const DateSelectionSection: React.FC<DateSelectionSectionProps> = ({ form }) => {
  // Custom Date Picker component to use with the form field
  const DatePicker = React.forwardRef<
    HTMLButtonElement, 
    { value?: Date; onChange?: (date: Date | undefined) => void }
  >(({ value, onChange }, ref) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  });
  
  DatePicker.displayName = "DatePicker";

  return (
    <div className="space-y-4">
      <FormSectionHeader 
        title="Scheduling" 
        description="When do you plan to implement the change?" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomFormField
          form={form}
          name="startDate"
          label="Start Date"
        >
          <DatePicker />
        </CustomFormField>
        
        <CustomFormField
          form={form}
          name="endDate"
          label="End Date"
        >
          <DatePicker />
        </CustomFormField>
      </div>
    </div>
  );
};

export default DateSelectionSection;
