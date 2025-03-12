
import React, { useState } from 'react';
import { CheckCircle, BookOpen, HelpCircle, ClipboardCheck, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import PortalCard from '@/components/portal/PortalCard';
import StatusWidget from '@/components/portal/StatusWidget';
import IncidentItem from '@/components/portal/IncidentItem';
import ServiceRequestItem from '@/components/portal/ServiceRequestItem';
import PortalHeader from '@/components/portal/PortalHeader';
import KnowledgeArticlesList from '@/components/portal/KnowledgeArticlesList';
import AISearch from '@/components/portal/AISearch';

const EndUserPortal: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Portal Header */}
      <PortalHeader />

      {/* Hero Search Section */}
      <section className="bg-gradient-to-r from-purple-900/20 to-purple-600/20 p-8 md:p-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">How can we help?</h1>
        <div className="w-full max-w-2xl">
          <AISearch />
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Request Something */}
          <PortalCard 
            title="Request Something" 
            icon={<CheckCircle className="h-10 w-10 text-primary" />}
            description="Browse the catalog for services and items you need"
            to="/portal/service-request"
          />

          {/* Knowledge Base */}
          <PortalCard 
            title="Knowledge Base" 
            icon={<BookOpen className="h-10 w-10 text-primary" />}
            description="Browse and search for articles, offer or submit feedback"
            to="/knowledge"
          />

          {/* Get Help */}
          <PortalCard 
            title="Get Help" 
            icon={<HelpCircle className="h-10 w-10 text-primary" />}
            description="Contact support to make a request, or report a problem"
            to="/portal/incident"
          />

          {/* My Approvals */}
          <PortalCard 
            title="My Approvals" 
            icon={<ClipboardCheck className="h-10 w-10 text-primary" />}
            description="View and manage your pending approval requests"
            to="/portal/my-approvals"
          />
        </div>

        {/* Information Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Current Status */}
          <div className="card p-5 border rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Current Status</h3>
            <StatusWidget 
              status="warning" 
              message="The system is reporting an issue" 
            />
            <a href="/status" className="text-sm text-primary hover:text-primary/80 block mt-4">
              More information...
            </a>
          </div>

          {/* Popular Questions */}
          <div className="card p-5 border rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Popular Questions</h3>
            <div className="text-sm text-muted-foreground">
              No questions have been asked yet
            </div>
            <Button variant="link" className="text-primary p-0 h-auto mt-2">
              Ask a Question
            </Button>
          </div>

          {/* Announcements */}
          <div className="card p-5 border rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Announcements</h3>
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              No information available
            </div>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Knowledge Articles - Using our new component */}
          <KnowledgeArticlesList />

          {/* My Open Incidents */}
          <div className="card p-5 border rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">My Open Incidents</h3>
            <div className="space-y-4">
              <IncidentItem 
                title="Rain is leaking in from the DNS Server"
                date="11/22/2023"
                time="2 days ago"
                id="INC0000123"
              />
              <IncidentItem 
                title="JavaScript error on landing page of corporate website"
                date="11/23/2023"
                time="1 day ago"
                id="INC0000124"
              />
              <IncidentItem 
                title="Can't launch 64-bit Windows 7 virtual machine"
                date="11/23/2023"
                time="1 day ago"
                id="INC0000125"
              />
              <IncidentItem 
                title="Sales forecast spreadsheet is READ ONLY"
                date="11/24/2023"
                time="4 hours ago"
                id="INC0000126"
              />
            </div>
          </div>
        </div>

        {/* My Service Requests Section */}
        <div className="grid grid-cols-1 mt-8">
          <div className="card p-5 border rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">My Requests</h3>
            <div className="space-y-4">
              <ServiceRequestItem 
                title="New laptop request"
                date="11/20/2023"
                time="5 days ago"
                id="SR0000100"
                status="in-progress"
              />
              <ServiceRequestItem 
                title="Access to financial system"
                date="11/15/2023"
                time="1 week ago"
                id="SR0000095"
                status="fulfilled"
              />
              <ServiceRequestItem 
                title="Microsoft Office installation"
                date="11/24/2023"
                time="3 hours ago"
                id="SR0000127"
                status="open"
              />
              <ServiceRequestItem 
                title="New mobile phone request"
                date="11/23/2023"
                time="1 day ago"
                id="SR0000126"
                status="pending"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EndUserPortal;
