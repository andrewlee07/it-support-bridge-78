
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { TaskFormValues } from '../hooks/useTaskForm';

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Checklist</h3>
        <Button 
          type="button" 
          size="sm" 
          variant="outline"
          onClick={addChecklistItem}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      {checklist.length === 0 ? (
        <p className="text-sm text-muted-foreground">No checklist items added.</p>
      ) : (
        <ul className="space-y-2">
          {checklist.map((item, index) => (
            <li key={item.id} className="flex items-center gap-2">
              <Checkbox
                checked={item.completed}
                onCheckedChange={(checked) => {
                  const newChecklist = [...checklist];
                  newChecklist[index].completed = checked as boolean;
                  form.setValue('checklist', newChecklist);
                }}
              />
              <Input
                value={item.text}
                onChange={(e) => {
                  const newChecklist = [...checklist];
                  newChecklist[index].text = e.target.value;
                  form.setValue('checklist', newChecklist);
                }}
                className="flex-1"
                placeholder="Checklist item"
              />
              <Button 
                type="button" 
                size="icon" 
                variant="ghost"
                onClick={() => removeChecklistItem(item.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChecklistSection;
