
import React, { useState, useEffect } from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription,
  FormMessage 
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { TaskFormValues } from '../hooks/useTaskForm';
import { getAllUsers } from '@/utils/mockData/users';

interface AssignmentSectionProps {
  form: UseFormReturn<TaskFormValues>;
}

const AssignmentSection: React.FC<AssignmentSectionProps> = ({ form }) => {
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    // Get all users for the dropdown
    const usersList = getAllUsers().map(user => ({
      id: user.id,
      name: user.name
    }));
    setUsers(usersList);
  }, []);

  return (
    <FormField
      control={form.control}
      name="assignee"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Assignee</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an assignee" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="">Unassigned</SelectItem>
              {users.map(user => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Select a user to assign this task to
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AssignmentSection;
