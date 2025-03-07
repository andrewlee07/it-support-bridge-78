
import React from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

interface CustomFormFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  children: React.ReactNode;
  description?: string;
}

const CustomFormField: React.FC<CustomFormFieldProps> = ({
  form,
  name,
  label,
  children,
  description,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {React.isValidElement(children)
              ? React.cloneElement(children, { ...field })
              : children}
          </FormControl>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
