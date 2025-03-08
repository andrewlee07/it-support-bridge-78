
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { TestCase, BugSeverity, BugPriority } from '@/utils/types/test';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bugCreationSchema, BugCreationFormValues } from '../schemas/bugCreationSchema';

interface BugCreationFormProps {
  testCase: TestCase;
  onSubmit: (description: string, severity: string, priority: string, createBacklogItem: boolean) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const BugCreationForm: React.FC<BugCreationFormProps> = ({
  testCase,
  onSubmit,
  onCancel,
  isSubmitting
}) => {
  const form = useForm<BugCreationFormValues>({
    resolver: zodResolver(bugCreationSchema),
    defaultValues: {
      description: '',
      severity: 'medium' as BugSeverity,
      priority: 'medium' as BugPriority,
      createBacklogItem: true
    }
  });

  const handleSubmit = (data: BugCreationFormValues) => {
    onSubmit(
      data.description,
      data.severity,
      data.priority,
      data.createBacklogItem
    );
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="testCase">Test Case</Label>
          <div className="p-3 border rounded-md bg-muted/30">
            <div className="font-medium">{testCase.title}</div>
            <div className="text-sm text-muted-foreground mt-1">{testCase.id}</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Bug Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the bug..."
            className="min-h-[100px]"
            {...form.register('description')}
          />
          {form.formState.errors.description && (
            <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="severity">Severity</Label>
            <Select
              onValueChange={(value) => form.setValue('severity', value as BugSeverity)}
              defaultValue={form.getValues('severity')}
            >
              <SelectTrigger id="severity">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              onValueChange={(value) => form.setValue('priority', value as BugPriority)}
              defaultValue={form.getValues('priority')}
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="createBacklogItem"
            checked={form.getValues('createBacklogItem')}
            onCheckedChange={(checked) => form.setValue('createBacklogItem', !!checked)}
          />
          <Label htmlFor="createBacklogItem" className="cursor-pointer">
            Automatically create backlog item from this bug
          </Label>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting} type="button">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Bug"}
        </Button>
      </div>
    </form>
  );
};

export default BugCreationForm;
