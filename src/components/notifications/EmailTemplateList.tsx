
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { emailNotificationApi } from '@/utils/api/emailNotificationApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, PlayCircle } from 'lucide-react';
import { EmailTemplate } from '@/utils/types/email';
import { toast } from 'sonner';

interface EmailTemplateListProps {
  onEditTemplate: (template: EmailTemplate) => void;
}

const EmailTemplateList: React.FC<EmailTemplateListProps> = ({ onEditTemplate }) => {
  const queryClient = useQueryClient();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['emailTemplates'],
    queryFn: async () => {
      const response = await emailNotificationApi.getEmailTemplates();
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to fetch email templates');
    }
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: (templateId: string) => emailNotificationApi.deleteEmailTemplate(templateId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] });
      toast.success('Email template deleted successfully');
      setTemplateToDelete(null);
      setIsDeleteConfirmOpen(false);
    },
    onError: (error) => {
      toast.error('Failed to delete email template');
      console.error(error);
    },
  });

  const handleDeleteTemplate = (templateId: string) => {
    deleteTemplateMutation.mutate(templateId);
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading email templates...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Failed to load email templates</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Templates</CardTitle>
      </CardHeader>
      <CardContent>
        {!data || data.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No email templates found. Create one to get started.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>{template.subject}</TableCell>
                  <TableCell>{template.triggerOn}</TableCell>
                  <TableCell>
                    <Badge variant={template.isActive ? "success" : "secondary"}>
                      {template.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditTemplate(template)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-100"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailTemplateList;
