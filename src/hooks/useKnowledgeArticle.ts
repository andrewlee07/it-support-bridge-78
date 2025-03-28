
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  rating?: number;
  ratingCount?: number;
  keywords?: string[];
  relatedArticles?: {
    id: string;
    title: string;
  }[];
}

// Mock data for demonstration
const mockArticles: Record<string, KnowledgeArticle> = {
  '1': {
    id: '1',
    title: 'How to Reset Your Password',
    content: '<p>This article guides you through the steps to reset your password.</p><h2>Steps to reset your password:</h2><ol><li>Go to the login page</li><li>Click "Forgot Password"</li><li>Enter your email address</li><li>Check your email for a reset link</li><li>Click the link and enter a new password</li><li>Submit the form to save your new password</li></ol>',
    category: 'Account Management',
    author: 'System Administrator',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-06-10'),
    rating: 4.5,
    ratingCount: 23,
    keywords: ['password', 'reset', 'login', 'credentials'],
    relatedArticles: [
      { id: '2', title: 'Account Security Best Practices' },
      { id: '3', title: 'How to Change Your Email Address' }
    ]
  },
  '2': {
    id: '2',
    title: 'Account Security Best Practices',
    content: '<p>Learn how to keep your account secure with these best practices.</p><h2>Security Tips:</h2><ul><li>Use a strong, unique password</li><li>Enable two-factor authentication</li><li>Don\'t share your credentials</li><li>Update your password regularly</li><li>Be cautious of phishing attempts</li></ul>',
    category: 'Security',
    author: 'Security Team',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-07-05'),
    rating: 4.8,
    ratingCount: 17,
    keywords: ['security', 'password', 'two-factor', '2FA', 'protection'],
    relatedArticles: [
      { id: '1', title: 'How to Reset Your Password' },
      { id: '4', title: 'What to Do If Your Account Is Compromised' }
    ]
  },
  '3': {
    id: '3',
    title: 'How to Change Your Email Address',
    content: '<p>This guide explains how to update the email address associated with your account.</p><h2>Steps to change your email:</h2><ol><li>Log in to your account</li><li>Go to Account Settings</li><li>Find the "Email Address" section</li><li>Click "Edit" or "Change"</li><li>Enter your new email address</li><li>Verify the new email by clicking the link sent to it</li><li>Your email address is now updated</li></ol>',
    category: 'Account Management',
    author: 'Support Team',
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-05-15'),
    rating: 4.2,
    ratingCount: 12,
    keywords: ['email', 'update', 'change', 'account settings'],
    relatedArticles: [
      { id: '1', title: 'How to Reset Your Password' },
      { id: '5', title: 'Managing Your Profile Information' }
    ]
  }
};

export const useKnowledgeArticle = (id: string) => {
  const [article, setArticle] = useState<KnowledgeArticle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundArticle = mockArticles[id];
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          throw new Error('Article not found');
        }
      } catch (err) {
        console.error('Error fetching knowledge article:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        toast.error('Failed to load knowledge article');
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [id]);
  
  return { article, loading, error };
};
