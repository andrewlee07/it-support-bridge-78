
import React, { useState } from 'react';
import { KnowledgeArticle } from '@/utils/types/knowledge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Edit, Eye, Trash, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { deleteKnowledgeArticle } from '@/utils/api/knowledgeApi';
import { useQueryClient } from '@tanstack/react-query';
import KnowledgeArticleForm from './KnowledgeArticleForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface KnowledgeArticleDetailProps {
  article: KnowledgeArticle;
  onBack: () => void;
  onTagSelect: (tag: string) => void;
}

const KnowledgeArticleDetail: React.FC<KnowledgeArticleDetailProps> = ({
  article,
  onBack,
  onTagSelect
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await deleteKnowledgeArticle(article.id);
      queryClient.invalidateQueries({ queryKey: ['knowledgeArticles'] });
      toast.success('Article deleted successfully');
      onBack();
    } catch (error) {
      toast.error('Failed to delete article');
      console.error(error);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <Badge>{article.type}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="h-3.5 w-3.5 mr-1" />
                <span>{article.viewCount} views</span>
              </div>
            </div>
            <CardTitle className="text-2xl mt-2">{article.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              {article.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-secondary"
                  onClick={() => onTagSelect(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="prose max-w-none">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center border-t pt-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="h-3.5 w-3.5 mr-1" />
              <span>Author ID: {article.authorId}</span>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>Created: {format(new Date(article.createdAt), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>Updated: {format(new Date(article.updatedAt), 'MMM d, yyyy')}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      {isEditing && (
        <KnowledgeArticleForm
          isOpen={isEditing}
          onClose={handleCloseEdit}
          articleToEdit={article}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the article
              "{article.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default KnowledgeArticleDetail;
