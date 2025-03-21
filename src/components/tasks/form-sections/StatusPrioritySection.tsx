
import React from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
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
import { AlertCircle, Clock, CheckCircle, PauseCircle, XCircle, AlertTriangle, AlertOctagon, ArrowDown, ArrowRight } from 'lucide-react';

interface StatusPrioritySectionProps {
  form: UseFormReturn<TaskFormValues>;
}

const StatusPrioritySection: React.FC<StatusPrioritySectionProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value || "new"}>
              <FormControl>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="new" className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <span>New</span>
                  </div>
                </SelectItem>
                <SelectItem value="in-progress">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span>In Progress</span>
                  </div>
                </SelectItem>
                <SelectItem value="on-hold">
                  <div className="flex items-center gap-2">
                    <PauseCircle className="h-4 w-4 text-yellow-600" />
                    <span>On Hold</span>
                  </div>
                </SelectItem>
                <SelectItem value="completed">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Completed</span>
                  </div>
                </SelectItem>
                <SelectItem value="cancelled">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span>Cancelled</span>
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
        name="priority"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Priority</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value || "medium"}>
              <FormControl>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="critical">
                  <div className="flex items-center gap-2">
                    <AlertOctagon className="h-4 w-4 text-red-600" />
                    <span>Critical</span>
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <span>High</span>
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-yellow-600" />
                    <span>Medium</span>
                  </div>
                </SelectItem>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <ArrowDown className="h-4 w-4 text-green-600" />
                    <span>Low</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StatusPrioritySection;
