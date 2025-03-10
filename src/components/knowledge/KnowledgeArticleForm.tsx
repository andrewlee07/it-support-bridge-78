
import React from 'react';
import { useForm } from 'react-hook-form';
import { KnowledgeArticle } from '@/utils/types/knowledge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createKnowledgeArticle, updateKnowledgeArticle, submitArticleForReview, approveArticle, rejectArticle } from '@/utils/api/knowledgeApi';
import { useQueryClient } from '@tanstack/react-query';
import { Editor } from '@tinymce/tinymce-react';
import { useAuth } from '@/contexts/AuthContext';
import { Textarea } from '@/components/ui/textarea';
import { addMonths } from 'date-fns';
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import TagInput from '@/components/shared/TagInput';

interface KnowledgeArticleFormProps {
  isOpen: boolean;
  onClose: () => void;
  articleToEdit?: KnowledgeArticle;
  mode?: 'edit' | 'review';
}

type FormValues = {
  title: string;
  content: string;
  type: string;
  tags: string[];
  reviewComments?: string;
  expiryDate?: Date;
  serviceId?: string;
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
  articleToEdit,
  mode = 'edit'
}) => {
  const queryClient = useQueryClient();
  const { user, userCanPerformAction } = useAuth();
  
  const isAuthor = userCanPerformAction('knowledge-articles', 'create');
  const isReviewer = userCanPerformAction('knowledge-articles', 'approve');

  // Set default expiry date to 1 year from now if creating a new article
  const defaultExpiryDate = articleToEdit?.expiryDate || addMonths(new Date(), 12);
  
  const form = useForm<FormValues>({
    defaultValues: {
      title: articleToEdit?.title || '',
      content: articleToEdit?.content || '',
      type: articleToEdit?.type || 'Documentation',
      tags: articleToEdit?.tags || [],
      reviewComments: articleToEdit?.reviewComments || '',
      expiryDate: articleToEdit?.expiryDate ? new Date(articleToEdit.expiryDate) : defaultExpiryDate,
      serviceId: articleToEdit?.serviceId || '',
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (mode === 'review' && articleToEdit) {
        // Handle review actions
        if (isReviewer) {
          // This is handled by the review action buttons, not form submission
          return;
        }
      } else {
        // Handle edit/create
        if (articleToEdit) {
          await updateKnowledgeArticle(articleToEdit.id, {
            ...data,
            status: 'draft' // Save as draft when updating
          });
          toast.success('Article updated successfully');
        } else {
          await createKnowledgeArticle({
            ...data,
            authorId: user?.id || 'user-1', // Use actual user ID
            status: 'draft' // New articles start as drafts
          });
          toast.success('Article created successfully');
        }
      }
      
      queryClient.invalidateQueries({ queryKey: ['knowledgeArticles'] });
      onClose();
    } catch (error) {
      toast.error(`Failed to ${articleToEdit ? 'update' : 'create'} article`);
      console.error(error);
    }
  };

  const handleSubmitForReview = async () => {
    if (!articleToEdit) return;

    try {
      const values = form.getValues();
      await updateKnowledgeArticle(articleToEdit.id, {
        ...values, 
        expiryDate: values.expiryDate
      });
      
      await submitArticleForReview(articleToEdit.id);
      toast.success('Article submitted for review');
      queryClient.invalidateQueries({ queryKey: ['knowledgeArticles'] });
      onClose();
    } catch (error) {
      toast.error('Failed to submit article for review');
      console.error(error);
    }
  };

  const handleApprove = async () => {
    if (!articleToEdit) return;

    try {
      const values = form.getValues();
      await approveArticle(articleToEdit.id, values.reviewComments || '');
      toast.success('Article approved');
      queryClient.invalidateQueries({ queryKey: ['knowledgeArticles'] });
      onClose();
    } catch (error) {
      toast.error('Failed to approve article');
      console.error(error);
    }
  };

  const handleReject = async () => {
    if (!articleToEdit) return;

    try {
      const values = form.getValues();
      if (!values.reviewComments) {
        toast.error('Please provide review comments when rejecting an article');
        return;
      }
      
      await rejectArticle(articleToEdit.id, values.reviewComments);
      toast.success('Article rejected');
      queryClient.invalidateQueries({ queryKey: ['knowledgeArticles'] });
      onClose();
    } catch (error) {
      toast.error('Failed to reject article');
      console.error(error);
    }
  };

  const isReviewMode = mode === 'review' && isReviewer;
  const canSubmitForReview = articleToEdit && articleToEdit.status === 'draft' && isAuthor;
  const isPendingReview = articleToEdit && articleToEdit.status === 'pending_review';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isReviewMode 
              ? 'Review Knowledge Article' 
              : articleToEdit 
                ? 'Edit Article' 
                : 'Create New Article'}
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
                    <Input 
                      placeholder="Article title" 
                      {...field} 
                      readOnly={isReviewMode} 
                      className={isReviewMode ? "bg-gray-100" : ""}
                    />
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
                    disabled={isReviewMode}
                  >
                    <FormControl>
                      <SelectTrigger className={isReviewMode ? "bg-gray-100" : ""}>
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
              name="expiryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expiry Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                            isReviewMode && "bg-gray-100"
                          )}
                          disabled={isReviewMode}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Add tags..."
                      disabled={isReviewMode}
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
                    <Editor
                      apiKey="your-tinymce-api-key" // You'll need to get a free API key from TinyMCE
                      value={field.value}
                      onEditorChange={field.onChange}
                      disabled={isReviewMode}
                      init={{
                        height: 400,
                        menubar: false,
                        plugins: [
                          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                          'searchreplace', 'visualblocks', 'code', 'fullscreen',
                          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                          'bold italic forecolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                        content_style: 'body { font-family:Inter,Arial,sans-serif; font-size:14px }',
                        readonly: isReviewMode
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isReviewMode && (
              <FormField
                control={form.control}
                name="reviewComments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide feedback or comments on this article..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>

              {isReviewMode ? (
                <>
                  <Button 
                    type="button" 
                    variant="destructive" 
                    onClick={handleReject}
                  >
                    Reject
                  </Button>
                  <Button 
                    type="button" 
                    variant="default" 
                    onClick={handleApprove}
                  >
                    Approve
                  </Button>
                </>
              ) : (
                <>
                  {canSubmitForReview && (
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={handleSubmitForReview}
                    >
                      Submit for Review
                    </Button>
                  )}
                  {!isPendingReview && (
                    <Button type="submit">
                      {articleToEdit ? 'Save' : 'Create'} Draft
                    </Button>
                  )}
                </>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default KnowledgeArticleForm;
