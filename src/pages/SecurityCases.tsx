
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TicketList from '@/components/tickets/TicketList';
import TicketForm from '@/components/tickets/TicketForm';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Ticket } from '@/utils/types/ticket';
import { toast } from 'sonner';
import PageTransition from '@/components/shared/PageTransition';

const SecurityCases = () => {
  const [showForm, setShowForm] = useState(false);
  
  const handleSubmit = (data: Partial<Ticket>) => {
    // In a real app, this would connect to an API
    console.log('Submitting security case:', data);
    setShowForm(false);
    toast.success('Security case created successfully!');
  };
  
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Security Cases</h1>
            <p className="text-muted-foreground mt-1">
              Manage security incidents, data breaches, and SAR requests
            </p>
          </div>
          <Button className="shrink-0" onClick={() => setShowForm(!showForm)}>
            {showForm ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                New Security Case
              </>
            )}
          </Button>
        </div>
        
        {showForm ? (
          <div className="glass-panel p-6 rounded-lg animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Create New Security Case</h2>
            <TicketForm onSubmit={handleSubmit} type="security" />
          </div>
        ) : (
          <Tabs defaultValue="all" className="animate-fade-in">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Cases</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <TicketList type="security" />
            </TabsContent>
            
            <TabsContent value="open" className="mt-0">
              <TicketList type="security" />
            </TabsContent>
            
            <TabsContent value="in-progress" className="mt-0">
              <TicketList type="security" />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <TicketList type="security" />
            </TabsContent>
            
            <TabsContent value="resolved" className="mt-0">
              <TicketList type="security" />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </PageTransition>
  );
};

export default SecurityCases;
