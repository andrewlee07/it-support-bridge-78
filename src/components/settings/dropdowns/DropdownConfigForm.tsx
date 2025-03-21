import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { DropdownConfigFormProps, ConfigurableDropdown } from '@/utils/types/configuration';
import { toast } from 'sonner';

const dropdownConfigSchema = z.object({
  displayName: z.string().min(2, { message: 'Display name must be at least 2 characters' }),
  fieldName: z.string().min(2, { message: 'Field name must be at least 2 characters' }),
  isRequired: z.boolean().optional(),
  isActive: z.boolean().optional()
});

type DropdownConfigFormValues = z.infer<typeof dropdownConfigSchema>;

const DropdownConfigForm: React.FC<DropdownConfigFormProps> = (props) => {
  // Destructure props
  const {
    entityType,
    configId,
    onClose,
    isNew,
    onSave,
    onCancel,
  } = props;

  const form = useForm<DropdownConfigFormValues>({
    resolver: zodResolver(dropdownConfigSchema),
    defaultValues: {
      displayName: '',
      fieldName: '',
      isRequired: false,
      isActive: true
    }
  });

  const handleSubmit = (values: DropdownConfigFormValues) => {
    // Simulate saving the configuration
    const newConfig: Partial<ConfigurableDropdown> = {
      ...values,
      entityType: entityType,
    };

    // Call the onSave prop to handle the actual saving logic
    onSave(newConfig);

    // Display a success message
    toast.success('Dropdown configuration saved successfully!');

    // Close the form
    onClose?.();
  };

  return (
    <Dialog open={!!configId || isNew} onOpenChange={() => onClose?.()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Create New Dropdown' : 'Edit Dropdown'}</DialogTitle>
          <DialogDescription>
            {isNew
              ? 'Create a new dropdown configuration for the selected entity.'
              : 'Edit the dropdown configuration for the selected entity.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter display name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fieldName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter field name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Required</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Make this field mandatory for the entity
                    </p>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Active</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable this dropdown configuration
                    </p>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="button" variant="outline" onClick={() => onClose?.()}>
                Cancel
              </Button>
              <Button type="submit" className="ml-2">
                {isNew ? 'Create' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DropdownConfigForm;
