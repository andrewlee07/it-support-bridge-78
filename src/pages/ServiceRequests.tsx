
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTicketsByType } from '@/utils/mockData';
import TicketList from '@/components/tickets/TicketList';
import TicketForm from '@/components/tickets/TicketForm';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Ticket } from '@/utils/types';
import { toast } from 'sonner';
import PageTransition from '@/components/shared/PageTransition';

const ServiceRequests = () => {
  const [showForm, setShowForm] = useState(false);
  const tickets = getTicketsByType('service');
  
  const handleSubmit = (data: Partial<Ticket>) => {
    // In a real app, this would connect to an API
    console.log('Submitting service request:', data);
    setShowForm(false);
    toast.success('Service request created successfully!');
  };
  
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Service Requests</h1>
            <p className="text-muted-foreground mt-1">
              Submit and track service requests
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
                New Request
              </>
            )}
          </Button>
        </div>
        
        {showForm ? (
          <div className="glass-panel p-6 rounded-lg animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Create New Service Request</h2>
            <TicketForm onSubmit={handleSubmit} type="service" />
          </div>
        ) : (
          <Tabs defaultValue="all" className="animate-fade-in">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="fulfilled">Fulfilled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <TicketList tickets={tickets} type="service" />
            </TabsContent>
            
            <TabsContent value="open" className="mt-0">
              <TicketList 
                tickets={tickets.filter(ticket => ticket.status === 'open')} 
                type="service" 
              />
            </TabsContent>
            
            <TabsContent value="in-progress" className="mt-0">
              <TicketList 
                tickets={tickets.filter(ticket => ticket.status === 'in-progress')} 
                type="service" 
              />
            </TabsContent>
            
            <TabsContent value="fulfilled" className="mt-0">
              <TicketList 
                tickets={tickets.filter(ticket => 
                  ticket.status === 'resolved' || ticket.status === 'closed'
                )} 
                type="service" 
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </PageTransition>
  );
};

export default ServiceRequests;
