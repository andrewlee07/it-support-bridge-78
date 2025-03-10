
import React from 'react';
import { useForm } from 'react-hook-form';
import { KnowledgeArticle } from '@/utils/types/knowledge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { createKnowledgeArticle, updateKnowledgeArticle } from '@/utils/api/knowledgeApi';
import { useQueryClient } from '@tanstack/react-query';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagInput } from '@/components/shared/TagInput';

interface KnowledgeArticleFormProps {
  isOpen: boolean;
  onClose: () => void;
  articleToEdit?: KnowledgeArticle;
}

type FormValues = {
  title: string;
  content: string;
  type: string;
  tags: string[];
};

const ARTICLE_TYPES = [
  "Documentation",
  "Known Issue",
  "FAQ", 
  "Guide",
  "Procedure",
  "Tutorial"
];

const KnowledgeArticleForm: React.FC<KnowledgeArticleFormProps> = ({
  isOpen,
  onClose,
  articleToEdit
}) => {
  const queryClient = useQueryClient();
  const form = useForm<FormValues>({
    defaultValues: {
      title: articleToEdit?.title || '',
      content: articleToEdit?.content || '',
      type: articleToEdit?.type || 'Documentation',
      tags: articleToEdit?.tags || [],
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (articleToEdit) {
        await updateKnowledgeArticle(articleToEdit.id, data);
        toast.success('Article updated successfully');
      } else {
        await createKnowledgeArticle({
          ...data,
          authorId: 'user-1', // Mock user ID
        });
        toast.success('Article created successfully');
      }
      queryClient.invalidateQueries({ queryKey: ['knowledgeArticles'] });
      onClose();
    } catch (error) {
      toast.error(`Failed to ${articleToEdit ? 'update' : 'create'} article`);
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {articleToEdit ? 'Edit Article' : 'Create New Article'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Article title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              rules={{ required: 'Type is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select article type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ARTICLE_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagInput
                      placeholder="Add tags..."
                      tags={field.value}
                      setTags={(newTags) => field.onChange(newTags)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              rules={{ required: 'Content is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Article content..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {articleToEdit ? 'Update' : 'Create'} Article
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default KnowledgeArticleForm;
