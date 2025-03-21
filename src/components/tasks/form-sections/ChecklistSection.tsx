
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { TaskFormValues } from '../hooks/useTaskForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChecklistSectionProps {
  form: UseFormReturn<TaskFormValues>;
  addChecklistItem: () => void;
  removeChecklistItem: (id: string) => void;
}

const ChecklistSection: React.FC<ChecklistSectionProps> = ({
  form,
  addChecklistItem,
  removeChecklistItem
}) => {
  const checklist = form.watch('checklist') || [];

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Checklist</CardTitle>
          <Button 
            type="button" 
            size="sm" 
            variant="outline"
            onClick={addChecklistItem}
            className="h-8 gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {checklist.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-4 bg-gray-50 rounded-md">
            No checklist items added. Add items to track task progress.
          </div>
        ) : (
          <ul className="space-y-2">
            {checklist.map((item, index) => (
              <li key={item.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50">
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={(checked) => {
                    const newChecklist = [...checklist];
                    newChecklist[index].completed = checked as boolean;
                    // Also update content and status for compatibility with task types
                    newChecklist[index].content = newChecklist[index].text;
                    newChecklist[index].status = checked ? 'completed' : 'pending';
                    form.setValue('checklist', newChecklist);
                  }}
                  className="h-5 w-5"
                />
                <Input
                  value={item.text}
                  onChange={(e) => {
                    const newChecklist = [...checklist];
                    newChecklist[index].text = e.target.value;
                    // Also update content for compatibility with task types
                    newChecklist[index].content = e.target.value;
                    form.setValue('checklist', newChecklist);
                  }}
                  className="flex-1 h-9"
                  placeholder="Checklist item"
                />
                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost"
                  onClick={() => removeChecklistItem(item.id)}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </li>
            ))}
          </ul>
        )}
        
        {checklist.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>
                {checklist.filter(item => item.completed).length} of {checklist.length} completed
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ 
                  width: `${checklist.length > 0 
                    ? Math.round((checklist.filter(item => item.completed).length / checklist.length) * 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChecklistSection;
