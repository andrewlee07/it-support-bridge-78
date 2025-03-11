
import React, { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Link, Shield } from 'lucide-react';
import { fetchTasks } from '@/utils/api/taskApi';
import { Task } from '@/utils/types/taskTypes';
import { TaskFormValues } from '../hooks/useTaskForm';

interface DependenciesSectionProps {
  form: UseFormReturn<TaskFormValues>;
  currentTaskId?: string;
}

const DependenciesSection: React.FC<DependenciesSectionProps> = ({
  form,
  currentTaskId
}) => {
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const dependsOn = form.watch('dependsOn') || [];
  const blockedBy = form.watch('blockedBy') || [];

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const response = await fetchTasks();
        // Filter out current task and already selected tasks
        const tasks = response.data.filter(task => 
          task.id !== currentTaskId && 
          !task.isTemplate
        );
        setAvailableTasks(tasks);
      } catch (error) {
        console.error('Error loading tasks for dependencies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [currentTaskId]);

  const addDependency = (taskId: string) => {
    if (!dependsOn.includes(taskId)) {
      form.setValue('dependsOn', [...dependsOn, taskId]);
    }
  };

  const removeDependency = (taskId: string) => {
    form.setValue('dependsOn', dependsOn.filter(id => id !== taskId));
  };

  const addBlocker = (taskId: string) => {
    if (!blockedBy.includes(taskId)) {
      form.setValue('blockedBy', [...blockedBy, taskId]);
    }
  };

  const removeBlocker = (taskId: string) => {
    form.setValue('blockedBy', blockedBy.filter(id => id !== taskId));
  };

  const getTaskById = (taskId: string) => {
    return availableTasks.find(task => task.id === taskId);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Dependencies & Blockers</h3>
      
      {/* Dependencies Section */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="dependsOn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  Dependencies (This task depends on)
                </div>
              </FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {dependsOn.map(taskId => {
                  const task = getTaskById(taskId);
                  return (
                    <Badge key={taskId} variant="secondary" className="gap-1">
                      {task ? task.title : taskId}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0"
                        onClick={() => removeDependency(taskId)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  );
                })}
                {dependsOn.length === 0 && (
                  <p className="text-sm text-muted-foreground">No dependencies added.</p>
                )}
              </div>
              <Select
                disabled={isLoading}
                onValueChange={addDependency}
                value=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Add dependency..." />
                </SelectTrigger>
                <SelectContent>
                  {availableTasks
                    .filter(task => !dependsOn.includes(task.id))
                    .map(task => (
                      <SelectItem key={task.id} value={task.id}>
                        {task.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {/* Blockers Section */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="blockedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Blockers (This task is blocked by)
                </div>
              </FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {blockedBy.map(taskId => {
                  const task = getTaskById(taskId);
                  return (
                    <Badge key={taskId} variant="secondary" className="gap-1">
                      {task ? task.title : taskId}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0"
                        onClick={() => removeBlocker(taskId)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  );
                })}
                {blockedBy.length === 0 && (
                  <p className="text-sm text-muted-foreground">No blockers added.</p>
                )}
              </div>
              <Select
                disabled={isLoading}
                onValueChange={addBlocker}
                value=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Add blocker..." />
                </SelectTrigger>
                <SelectContent>
                  {availableTasks
                    .filter(task => !blockedBy.includes(task.id))
                    .map(task => (
                      <SelectItem key={task.id} value={task.id}>
                        {task.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DependenciesSection;
