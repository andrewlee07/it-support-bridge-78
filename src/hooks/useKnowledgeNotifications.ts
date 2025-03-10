
import { useEffect, useState } from 'react';
import { KnowledgeArticle } from '@/utils/types/knowledge';
import { getExpiringArticles } from '@/utils/api/knowledgeApi';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { addDays, isAfter } from 'date-fns';

export const useKnowledgeNotifications = () => {
  const [expiringArticles, setExpiringArticles] = useState<KnowledgeArticle[]>([]);
  const { user, userCanPerformAction } = useAuth();
  
  const isAuthor = userCanPerformAction('knowledge-articles', 'create');
  
  useEffect(() => {
    // Skip if not a knowledge author
    if (!isAuthor) return;
    
    const checkExpiringSoon = async () => {
      try {
        const response = await getExpiringArticles();
        if (response.success) {
          // Filter articles authored by the current user
          const myExpiringArticles = response.data.filter(
            article => article.authorId === user?.id
          );
          
          setExpiringArticles(myExpiringArticles);
          
          // Show toast notifications for articles that need review
          myExpiringArticles.forEach(article => {
            // Only notify once every 7 days
            if (!article.lastReviewNotificationDate || 
                isAfter(new Date(), addDays(new Date(article.lastReviewNotificationDate), 7))) {
              toast.warning(
                `The article "${article.title}" is expiring soon. Please review and resubmit.`,
                {
                  duration: 10000,
                  action: {
                    label: "View",
                    onClick: () => {
                      window.location.href = '/knowledge';
                    }
                  }
                }
              );
            }
          });
        }
      } catch (error) {
        console.error('Failed to check for expiring knowledge articles:', error);
      }
    };
    
    // Check on mount and every hour
    checkExpiringSoon();
    const interval = setInterval(checkExpiringSoon, 60 * 60 * 1000); // every hour
    
    return () => clearInterval(interval);
  }, [isAuthor, user?.id]);
  
  return {
    expiringArticles
  };
};
