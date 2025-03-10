import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface PlanTemplatesProps {
  type: 'implementation' | 'rollback';
  onSelectTemplate: (content: string) => void;
}

const PlanTemplates: React.FC<PlanTemplatesProps> = ({ type, onSelectTemplate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewTemplateDialogOpen, setIsNewTemplateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');

  // Mock templates - in a real app, these would come from the backend
  const templates = type === 'implementation' 
    ? [
        { 
          id: 'impl-1', 
          name: 'Standard Software Deployment', 
          content: `1. Notify stakeholders of upcoming change
2. Create backup of current configuration
3. Deploy software to test environment
4. Perform verification testing
5. Schedule production deployment window
6. Deploy to production
7. Verify functionality
8. Send completion notification to stakeholders` 
        },
        { 
          id: 'impl-2', 
          name: 'Hardware Installation', 
          content: `1. Verify hardware compatibility
2. Schedule installation window
3. Shut down affected systems
4. Install new hardware
5. Update firmware/drivers if necessary
6. Power on systems
7. Perform post-installation testing
8. Document new configuration` 
        },
        { 
          id: 'impl-3', 
          name: 'Network Configuration Change', 
          content: `1. Create backup of current configuration
2. Notify stakeholders about network disruption window
3. Implement changes on test environment
4. Validate functionality in test environment
5. Schedule production implementation window
6. Apply changes to production network devices
7. Verify connectivity and proper operation
8. Update network documentation` 
        },
      ]
    : [
        { 
          id: 'roll-1', 
          name: 'Software Rollback Plan', 
          content: `1. Identify failure criteria that would trigger rollback
2. Restore previous version from backup
3. Restart services
4. Verify application functionality
5. Notify stakeholders of the rollback
6. Document the issues that led to rollback` 
        },
        { 
          id: 'roll-2', 
          name: 'Hardware Rollback Plan', 
          content: `1. Remove newly installed hardware
2. Reinstall original hardware
3. Restore original firmware/drivers
4. Test system functionality
5. Document the rollback process and reasons` 
        },
        { 
          id: 'roll-3', 
          name: 'Network Configuration Rollback', 
          content: `1. Restore previous network configuration from backup
2. Verify network connectivity
3. Test critical systems' network operations
4. Notify stakeholders of completed rollback
5. Document the issues encountered and resolution path` 
        },
      ];

  const handleSaveNewTemplate = () => {
    // In a real app, this would save to the backend
    // For now, just close the dialog
    setIsNewTemplateDialogOpen(false);
    setNewTemplateName('');
    setNewTemplateContent('');
  };

  // Filter templates based on search
  const filteredTemplates = searchQuery
    ? templates.filter(template => 
        template.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : templates;

  const handleSelectTemplate = (content: string) => {
    onSelectTemplate(content);
    setIsDialogOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <div className="flex gap-2 mb-2">
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => setIsDialogOpen(true)}
        >
          Browse Templates
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsNewTemplateDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Save as Template
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Select {type === 'implementation' ? 'Implementation' : 'Rollback'} Template
            </DialogTitle>
          </DialogHeader>
          
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="h-[240px] overflow-auto border rounded-md">
            {filteredTemplates.length > 0 ? (
              <div className="divide-y">
                {filteredTemplates.map(template => (
                  <div 
                    key={template.id}
                    className="p-3 hover:bg-muted cursor-pointer"
                    onClick={() => handleSelectTemplate(template.content)}
                  >
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {template.content.slice(0, 60)}...
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-muted-foreground">No templates found</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewTemplateDialogOpen} onOpenChange={setIsNewTemplateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save as Template</DialogTitle>
            <DialogDescription>
              Create a new template for future use
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="templateName">Template Name</Label>
              <Input
                id="templateName"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                placeholder="Enter template name"
              />
            </div>
            
            <div>
              <Label htmlFor="templateContent">Template Content</Label>
              <Textarea
                id="templateContent"
                value={newTemplateContent}
                onChange={(e) => setNewTemplateContent(e.target.value)}
                placeholder="Enter template content"
                className="min-h-[200px]"
              />
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsNewTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewTemplate}>
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlanTemplates;
