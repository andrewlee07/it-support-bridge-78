
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Save, Plus, X, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { dropdownConfigurationApi } from '@/utils/api/dropdownConfigurationApi';
import { ConfigurableEntityType, DropdownOption, DropdownConfigFormProps } from '@/utils/types';
import OptionsList from './OptionsList';

// Schema for the form
const configFormSchema = z.object({
  displayName: z.string().min(3, { message: "Display name is required and must be at least 3 characters" }),
  fieldName: z.string().min(2, { message: "Field name is required and must be at least 2 characters" })
    .regex(/^[a-zA-Z][a-zA-Z0-9]*$/, { message: "Field name must start with a letter and contain only letters and numbers" }),
  isRequired: z.boolean().default(true),
});

type ConfigFormValues = z.infer<typeof configFormSchema>;

const DropdownConfigForm: React.FC<DropdownConfigFormProps> = ({
  entityType,
  configId,
  onClose,
  isNew,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [newOptionLabel, setNewOptionLabel] = useState('');
  const [newOptionValue, setNewOptionValue] = useState('');

  // Form setup
  const form = useForm<ConfigFormValues>({
    resolver: zodResolver(configFormSchema),
    defaultValues: {
      displayName: '',
      fieldName: '',
      isRequired: true,
    },
  });

  // Fetch configuration if editing
  const { data: configData, isLoading: isLoadingConfig } = useQuery({
    queryKey: ['dropdownConfiguration', configId],
    queryFn: () => dropdownConfigurationApi.getDropdownConfigurationById(configId!),
    enabled: !!configId && !isNew,
  });

  // Load configuration data into form when available
  useEffect(() => {
    if (configData?.success && configData.data) {
      form.reset({
        displayName: configData.data.displayName,
        fieldName: configData.data.fieldName,
        isRequired: configData.data.isRequired,
      });
      setOptions(configData.data.options);
    }
  }, [configData, form]);

  // Create configuration mutation
  const createMutation = useMutation({
    mutationFn: (data: ConfigFormValues & { options: { label: string; value: string }[] }) => 
      dropdownConfigurationApi.createDropdownConfiguration({
        entityType,
        fieldName: data.fieldName,
        displayName: data.displayName,
        isRequired: data.isRequired,
        options: data.options,
      }),
    onSuccess: (response) => {
      if (response.success) {
        toast({
          title: "Success",
          description: "Dropdown configuration created successfully",
        });
        queryClient.invalidateQueries({ queryKey: ['dropdownConfigurations'] });
        onClose();
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to create dropdown configuration",
          variant: "destructive",
        });
      }
    },
  });

  // Update configuration mutation
  const updateMutation = useMutation({
    mutationFn: (data: Partial<ConfigFormValues>) => 
      dropdownConfigurationApi.updateDropdownConfiguration(configId!, data),
    onSuccess: (response) => {
      if (response.success) {
        toast({
          title: "Success",
          description: "Dropdown configuration updated successfully",
        });
        queryClient.invalidateQueries({ queryKey: ['dropdownConfigurations'] });
        queryClient.invalidateQueries({ queryKey: ['dropdownConfiguration', configId] });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to update dropdown configuration",
          variant: "destructive",
        });
      }
    },
  });

  // Add option mutation
  const addOptionMutation = useMutation({
    mutationFn: (data: { label: string; value: string }) => 
      dropdownConfigurationApi.addDropdownOption(configId!, data),
    onSuccess: (response) => {
      if (response.success) {
        toast({
          title: "Success",
          description: "Option added successfully",
        });
        queryClient.invalidateQueries({ queryKey: ['dropdownConfiguration', configId] });
        setNewOptionLabel('');
        setNewOptionValue('');
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to add option",
          variant: "destructive",
        });
      }
    },
  });

  // Update option mutation
  const updateOptionMutation = useMutation({
    mutationFn: (data: { optionId: string; updates: Partial<Omit<DropdownOption, 'id'>> }) => 
      dropdownConfigurationApi.updateDropdownOption(configId!, data.optionId, data.updates),
    onSuccess: (response) => {
      if (response.success) {
        toast({
          title: "Success",
          description: "Option updated successfully",
        });
        queryClient.invalidateQueries({ queryKey: ['dropdownConfiguration', configId] });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to update option",
          variant: "destructive",
        });
      }
    },
  });

  // Delete option mutation
  const deleteOptionMutation = useMutation({
    mutationFn: (optionId: string) => 
      dropdownConfigurationApi.deleteDropdownOption(configId!, optionId),
    onSuccess: (response) => {
      if (response.success) {
        toast({
          title: "Success",
          description: "Option deleted successfully",
        });
        queryClient.invalidateQueries({ queryKey: ['dropdownConfiguration', configId] });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to delete option",
          variant: "destructive",
        });
      }
    },
  });

  // Reorder options mutation
  const reorderOptionsMutation = useMutation({
    mutationFn: (optionIds: string[]) => 
      dropdownConfigurationApi.reorderDropdownOptions(configId!, optionIds),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['dropdownConfiguration', configId] });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to reorder options",
          variant: "destructive",
        });
      }
    },
  });

  // Handle form submission
  const onSubmit = (values: ConfigFormValues) => {
    if (isNew) {
      // For new configuration, include options
      createMutation.mutate({
        ...values,
        options: options.map(o => ({ label: o.label, value: o.value })),
      });
    } else {
      // For existing configuration, just update the form values
      updateMutation.mutate(values);
    }
  };

  // Add a new option
  const handleAddOption = () => {
    if (!newOptionLabel.trim() || !newOptionValue.trim()) {
      toast({
        title: "Invalid input",
        description: "Both label and value are required",
        variant: "destructive",
      });
      return;
    }

    if (isNew) {
      // For new configuration, add to local state
      setOptions([
        ...options,
        {
          id: `temp-${Date.now()}`,
          label: newOptionLabel,
          value: newOptionValue,
          isActive: true,
          sortOrder: options.length + 1,
        },
      ]);
      setNewOptionLabel('');
      setNewOptionValue('');
    } else {
      // For existing configuration, use API
      addOptionMutation.mutate({
        label: newOptionLabel,
        value: newOptionValue,
      });
    }
  };

  // Toggle option active state
  const handleToggleOptionActive = (optionId: string, isActive: boolean) => {
    if (isNew) {
      setOptions(
        options.map(o => (o.id === optionId ? { ...o, isActive: !isActive } : o))
      );
    } else {
      updateOptionMutation.mutate({
        optionId,
        updates: { isActive: !isActive },
      });
    }
  };

  // Delete option
  const handleDeleteOption = (optionId: string) => {
    if (isNew) {
      setOptions(options.filter(o => o.id !== optionId));
    } else {
      deleteOptionMutation.mutate(optionId);
    }
  };

  // Move option up
  const handleMoveOptionUp = (index: number) => {
    if (index <= 0) return;
    
    if (isNew) {
      const newOptions = [...options];
      [newOptions[index - 1], newOptions[index]] = [newOptions[index], newOptions[index - 1]];
      // Update sort orders
      newOptions.forEach((option, idx) => {
        option.sortOrder = idx + 1;
      });
      setOptions(newOptions);
    } else {
      const activeOptions = options.filter(o => o.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
      const optionIndex = activeOptions.findIndex(o => o.id === options[index].id);
      if (optionIndex <= 0) return;
      
      const newOrder = [...activeOptions];
      [newOrder[optionIndex - 1], newOrder[optionIndex]] = [newOrder[optionIndex], newOrder[optionIndex - 1]];
      
      reorderOptionsMutation.mutate(newOrder.map(o => o.id));
    }
  };

  // Move option down
  const handleMoveOptionDown = (index: number) => {
    if (isNew) {
      if (index >= options.length - 1) return;
      const newOptions = [...options];
      [newOptions[index], newOptions[index + 1]] = [newOptions[index + 1], newOptions[index]];
      // Update sort orders
      newOptions.forEach((option, idx) => {
        option.sortOrder = idx + 1;
      });
      setOptions(newOptions);
    } else {
      const activeOptions = options.filter(o => o.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
      const optionIndex = activeOptions.findIndex(o => o.id === options[index].id);
      if (optionIndex >= activeOptions.length - 1) return;
      
      const newOrder = [...activeOptions];
      [newOrder[optionIndex], newOrder[optionIndex + 1]] = [newOrder[optionIndex + 1], newOrder[optionIndex]];
      
      reorderOptionsMutation.mutate(newOrder.map(o => o.id));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isNew ? 'Create New Dropdown' : 'Edit Dropdown'}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Basic configuration fields */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Incident Category" {...field} />
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
                      <Input 
                        placeholder="e.g. category" 
                        {...field} 
                        disabled={!isNew}
                      />
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
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Required Field</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Users must select a value for this field
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            {/* Options section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Options</h3>
              
              {/* Add new option */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Option Label"
                  value={newOptionLabel}
                  onChange={(e) => setNewOptionLabel(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Option Value"
                  value={newOptionValue}
                  onChange={(e) => setNewOptionValue(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAddOption}
                  disabled={addOptionMutation.isPending}
                >
                  {addOptionMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {/* Options list */}
              <div className="border rounded-md">
                {isLoadingConfig ? (
                  <div className="p-4 text-center">Loading options...</div>
                ) : options.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No options added yet
                  </div>
                ) : (
                  <OptionsList
                    options={options}
                    onToggleActive={handleToggleOptionActive}
                    onDelete={handleDeleteOption}
                    onMoveUp={handleMoveOptionUp}
                    onMoveDown={handleMoveOptionDown}
                  />
                )}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                createMutation.isPending || 
                updateMutation.isPending || 
                (isNew && options.length === 0)
              }
            >
              {(createMutation.isPending || updateMutation.isPending) ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isNew ? 'Create' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default DropdownConfigForm;
