
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2, MessageSquare, TicketIcon, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { getKnowledgeArticles } from '@/utils/api/knowledgeApi';

interface AISearchProps {
  onClose?: () => void;
}

type SearchState = 'idle' | 'searching' | 'results' | 'collecting' | 'submitting';
type TicketType = 'incident' | 'service-request';

const AISearch: React.FC<AISearchProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentTicketType, setCurrentTicketType] = useState<TicketType | null>(null);
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    service: '',
    priority: 'medium',
    impact: 'moderate'
  });
  const [conversationMessages, setConversationMessages] = useState<{role: string, content: string}[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversationMessages]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setSearchState('searching');
    setIsProcessing(true);

    try {
      // First, search for knowledge articles
      const knowledgeResponse = await getKnowledgeArticles(searchQuery);
      
      if (knowledgeResponse.success && knowledgeResponse.data.items.length > 0) {
        setSearchResults(knowledgeResponse.data.items);
        setSearchState('results');
      } else {
        // If no articles found, determine if it's an incident or service request
        analyzeQuery(searchQuery);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "There was an error processing your request",
        variant: "destructive"
      });
      setSearchState('idle');
    } finally {
      setIsProcessing(false);
    }
  };

  const analyzeQuery = (query: string) => {
    // In a real implementation, this would use the AI model to analyze the query
    // For demo purposes, we'll use simple keyword matching
    
    const lowerQuery = query.toLowerCase();
    const isIncidentKeywords = ['broken', 'error', 'not working', 'issue', 'problem', 'failed', 'down', 'unavailable'];
    const isServiceRequestKeywords = ['request', 'need', 'want', 'access', 'new', 'can I have', 'please provide'];
    
    const isIncident = isIncidentKeywords.some(keyword => lowerQuery.includes(keyword));
    const isServiceRequest = isServiceRequestKeywords.some(keyword => lowerQuery.includes(keyword));
    
    if (isIncident) {
      startIncidentCreation(query);
    } else if (isServiceRequest) {
      startServiceRequestCreation(query);
    } else {
      // If we can't determine, default to incident
      startIncidentCreation(query);
    }
  };

  const startIncidentCreation = (query: string) => {
    setCurrentTicketType('incident');
    setSearchState('collecting');
    setTicketData({
      ...ticketData,
      title: query.length > 50 ? query.substring(0, 47) + '...' : query,
      description: query
    });
    
    // Add initial messages to the conversation
    setConversationMessages([
      { role: 'system', content: 'I need to collect information about your issue to create an incident.' },
      { role: 'user', content: query },
      { role: 'assistant', content: 'I understand you\'re having an issue. Could you tell me which service is affected?' }
    ]);
  };

  const startServiceRequestCreation = (query: string) => {
    setCurrentTicketType('service-request');
    setSearchState('collecting');
    setTicketData({
      ...ticketData,
      title: query.length > 50 ? query.substring(0, 47) + '...' : query,
      description: query
    });
    
    // Add initial messages to the conversation
    setConversationMessages([
      { role: 'system', content: 'I need to collect information about your request.' },
      { role: 'user', content: query },
      { role: 'assistant', content: 'I\'d be happy to help with your request. Which service are you requesting?' }
    ]);
  };

  const handleUserMessage = (message: string) => {
    if (!message.trim()) return;
    
    // Add user message to conversation
    setConversationMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsProcessing(true);
    
    // Process the message
    setTimeout(() => {
      // In a real implementation, this would call the AI model
      // For demo purposes, we'll use simple logic based on conversation state
      
      const messagesCount = conversationMessages.filter(m => m.role === 'assistant').length;
      
      if (messagesCount === 1) {
        // This is responding to the service question
        setTicketData(prev => ({ ...prev, service: message }));
        setConversationMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Thank you. How would you rate the ${currentTicketType === 'incident' ? 'impact' : 'urgency'} of this ${currentTicketType}? (Low, Medium, High)` 
        }]);
      } else if (messagesCount === 2) {
        // This is responding to the impact/urgency question
        setTicketData(prev => ({ ...prev, priority: message.toLowerCase() }));
        setConversationMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Thank you for providing that information. Is there anything else you'd like to add before I submit this ${currentTicketType}?` 
        }]);
      } else {
        // Any additional information is added to description
        setTicketData(prev => ({ ...prev, description: prev.description + "\n\nAdditional information: " + message }));
        setConversationMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Thank you for the additional information. I have all the details I need. Would you like me to submit this now?' 
        }]);
      }
      
      setIsProcessing(false);
    }, 1000);
  };

  const submitTicket = () => {
    setSearchState('submitting');
    
    // In a real implementation, this would call the API to create the ticket
    setTimeout(() => {
      const ticketId = `${currentTicketType === 'incident' ? 'INC' : 'SR'}${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`;
      
      toast({
        title: `${currentTicketType === 'incident' ? 'Incident' : 'Service Request'} Created`,
        description: `Your ${currentTicketType} has been submitted successfully. Reference: ${ticketId}`,
      });
      
      // Navigate to the appropriate page
      if (currentTicketType === 'incident') {
        navigate('/portal/my-incidents');
      } else {
        navigate('/portal/my-requests');
      }
      
      // Reset the form
      setSearchState('idle');
      setSearchQuery('');
      setTicketData({
        title: '',
        description: '',
        service: '',
        priority: 'medium',
        impact: 'moderate'
      });
      setConversationMessages([]);
      
      if (onClose) onClose();
    }, 2000);
  };

  const handleArticleSelect = (articleId: string) => {
    navigate(`/knowledge/${articleId}`);
    if (onClose) onClose();
  };

  const reset = () => {
    setSearchState('idle');
    setSearchQuery('');
    setSearchResults([]);
    setCurrentTicketType(null);
    setTicketData({
      title: '',
      description: '',
      service: '',
      priority: 'medium',
      impact: 'moderate'
    });
    setConversationMessages([]);
  };

  return (
    <div className="w-full">
      {searchState === 'idle' && (
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
            <Input
              type="text"
              placeholder="How can we help?"
              className="pr-10 h-12 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10"
              disabled={!searchQuery.trim() || isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
          </div>
        </form>
      )}

      {(searchState === 'searching' || searchState === 'submitting') && (
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium">
              {searchState === 'searching' ? 'Searching...' : 'Submitting your request...'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {searchState === 'searching' 
                ? 'Looking for information that might help you.' 
                : 'Creating your ticket and notifying the support team.'}
            </p>
          </div>
        </Card>
      )}

      {searchState === 'results' && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Search Results</h3>
            <Button variant="ghost" size="sm" onClick={reset}>
              <X className="h-4 w-4 mr-1" /> Close
            </Button>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="space-y-3">
              {searchResults.slice(0, 5).map((article) => (
                <div 
                  key={article.id}
                  className="p-3 border rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => handleArticleSelect(article.id)}
                >
                  <div className="flex items-start">
                    <BookOpen className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium">{article.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {article.summary || article.content.substring(0, 120)}...
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center mt-4 pt-2 border-t">
                <p className="text-sm text-muted-foreground">
                  Didn't find what you were looking for?
                </p>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => analyzeQuery(searchQuery)}
                >
                  Create a Request
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center">
              <p className="text-muted-foreground mb-4">No knowledge articles found</p>
              <Button 
                variant="default" 
                onClick={() => analyzeQuery(searchQuery)}
              >
                Create a Support Request
              </Button>
            </div>
          )}
        </Card>
      )}

      {searchState === 'collecting' && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">
              {currentTicketType === 'incident' ? 'Incident Reporting' : 'Service Request'}
            </h3>
            <Button variant="ghost" size="sm" onClick={reset}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
          </div>
          
          <div className="flex mb-4 items-center">
            {currentTicketType === 'incident' ? (
              <TicketIcon className="h-5 w-5 text-red-500 mr-2" />
            ) : (
              <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
            )}
            <span className="text-sm font-medium">
              {currentTicketType === 'incident' 
                ? 'Creating an incident report' 
                : 'Creating a service request'}
            </span>
          </div>
          
          <div className="border rounded-md p-3 mb-4 max-h-[300px] overflow-y-auto">
            <div className="space-y-4">
              {conversationMessages
                .filter(msg => msg.role !== 'system')
                .map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              }
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="relative mt-4">
            <Input 
              placeholder="Type your response..." 
              disabled={isProcessing}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  handleUserMessage(target.value);
                  target.value = '';
                }
              }}
            />
            {conversationMessages.length >= 6 && (
              <div className="mt-4 flex justify-between">
                <Button variant="outline" onClick={reset}>
                  Cancel
                </Button>
                <Button onClick={submitTicket}>
                  Submit {currentTicketType === 'incident' ? 'Incident' : 'Request'}
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AISearch;
