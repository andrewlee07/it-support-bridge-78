
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Save, Trash, Copy } from 'lucide-react';

// Template types
export type PlanTemplateType = 'implementation' | 'rollback';

export interface PlanTemplate {
  id: string;
  name: string;
  content: string;
  type: PlanTemplateType;
}

interface PlanTemplatesProps {
  type: PlanTemplateType;
  onSelectTemplate: (content: string) => void;
}

const STORAGE_KEY = 'change-request-plan-templates';

const PlanTemplates: React.FC<PlanTemplatesProps> = ({ type, onSelectTemplate }) => {
  const [templates, setTemplates] = useState<PlanTemplate[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<PlanTemplate | null>(null);
  const { toast } = useToast();

  // Load templates from localStorage on component mount
  useEffect(() => {
    const storedTemplates = localStorage.getItem(STORAGE_KEY);
    if (storedTemplates) {
      setTemplates(JSON.parse(storedTemplates));
    }
  }, []);

  // Save templates to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  }, [templates]);

  // Filter templates by type
  const filteredTemplates = templates.filter(template => template.type === type);

  const handleAddTemplate = () => {
    setCurrentTemplate({
      id: crypto.randomUUID(),
      name: '',
      content: '',
      type,
    });
    setIsDialogOpen(true);
  };

  const handleEditTemplate = (template: PlanTemplate) => {
    setCurrentTemplate({ ...template });
    setIsDialogOpen(true);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
    toast({
      title: "Template deleted",
      description: "The template has been removed."
    });
  };

  const handleSaveTemplate = () => {
    if (!currentTemplate || !currentTemplate.name.trim() || !currentTemplate.content.trim()) {
      toast({
        title: "Error",
        description: "Template name and content are required.",
        variant: "destructive"
      });
      return;
    }

    const existingIndex = templates.findIndex(t => t.id === currentTemplate.id);
    
    if (existingIndex >= 0) {
      // Update existing template
      const updatedTemplates = [...templates];
      updatedTemplates[existingIndex] = currentTemplate;
      setTemplates(updatedTemplates);
    } else {
      // Add new template
      setTemplates([...templates, currentTemplate]);
    }

    setIsDialogOpen(false);
    setCurrentTemplate(null);
    
    toast({
      title: "Template saved",
      description: "Your template has been saved successfully."
    });
  };

  const handleSelectTemplate = (content: string) => {
    onSelectTemplate(content);
    toast({
      description: "Template applied"
    });
  };

  return (
    <>
      <div className="mb-2 flex flex-wrap gap-2">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map(template => (
            <div key={template.id} className="flex items-center gap-1 border p-1 rounded">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={() => handleSelectTemplate(template.content)}
              >
                {template.name}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => handleEditTemplate(template)}
              >
                <Save className="h-3.5 w-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => handleDeleteTemplate(template.id)}
              >
                <Trash className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))
        ) : (
          <span className="text-xs text-muted-foreground">No templates available</span>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7"
          onClick={handleAddTemplate}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Template
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentTemplate?.id && templates.some(t => t.id === currentTemplate.id) 
                ? 'Edit Template' 
                : 'Create Template'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="template-name" className="text-sm font-medium">
                Template Name
              </label>
              <Input
                id="template-name"
                value={currentTemplate?.name || ''}
                onChange={(e) => setCurrentTemplate(prev => 
                  prev ? { ...prev, name: e.target.value } : null
                )}
                placeholder="Enter template name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="template-content" className="text-sm font-medium">
                Template Content
              </label>
              <textarea
                id="template-content"
                value={currentTemplate?.content || ''}
                onChange={(e) => setCurrentTemplate(prev => 
                  prev ? { ...prev, content: e.target.value } : null
                )}
                placeholder="Enter template content"
                className="w-full min-h-[150px] p-3 border rounded focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleSaveTemplate}
            >
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlanTemplates;
