
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppNavigation } from '@/utils/routes/navigationUtils';
import { SecurityCaseTab } from '@/utils/types/security';
import { toast } from 'sonner';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useSecurityCaseDetail } from '@/hooks/security/useSecurityCaseDetail';

// Import our components
import SecurityCaseHeader from '@/components/security/components/SecurityCaseHeader';
import SecurityCaseInfoCard from '@/components/security/components/SecurityCaseInfoCard';
import ActivityTimeline from '@/components/security/components/ActivityTimeline';
import SecurityCaseNotes from '@/components/security/components/SecurityCaseNotes';
import AffectedServicesCard from '@/components/security/components/AffectedServicesCard';
import RelatedItemsCard from '@/components/security/components/RelatedItemsCard';
import SLAInformation from '@/components/security/components/SLAInformation';
import AssignmentCard from '@/components/security/components/AssignmentCard';
import RelatedKnowledgeCard from '@/components/security/components/RelatedKnowledgeCard';
import SimilarCasesCard from '@/components/security/components/SimilarCasesCard';
import AddNoteDialog from '@/components/security/components/AddNoteDialog';

const SecurityCaseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const appNavigation = useAppNavigation();
  const [activeTab, setActiveTab] = useState<SecurityCaseTab>('overview');
  const { isOpen: addNoteDialogOpen, onOpen: openAddNoteDialog, onClose: closeAddNoteDialog } = useDisclosure();
  const [noteText, setNoteText] = useState('');
  
  // Use the security case detail hook
  const { 
    securityCase, 
    loading, 
    error, 
    addNote,
    calculateSLAStatus 
  } = useSecurityCaseDetail(id || '');

  // Log the id parameter and loading state on initial mount only
  useEffect(() => {
    console.log(`SecurityCaseDetailPage mounted with id: ${id}`);
    
    // Return a no-op cleanup function to prevent unnecessary re-renders
    return () => {};
  }, [id]);

  const handleBack = useCallback(() => {
    appNavigation.goToSecurity();
  }, [appNavigation]);

  const handleAddNote = useCallback(async () => {
    if (!noteText.trim()) {
      toast.error('Please enter a note');
      return;
    }
    
    if (await addNote(noteText)) {
      setNoteText('');
      closeAddNoteDialog();
      toast.success('Note added successfully');
    }
  }, [addNote, closeAddNoteDialog, noteText]);

  const handleSystemClick = useCallback((system: string) => {
    toast.info(`Viewing details for ${system}`);
    // In a real app, this would navigate to the system details page
  }, []);

  // Get status color for badges
  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'Resolved': return 'bg-green-100 text-green-800 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  }, []);

  // Get priority color for badges
  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case 'Critical': 
      case 'High': return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'Medium': return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
      case 'Low': return 'bg-green-100 text-green-800 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  }, []);

  // Get type color for badges
  const getTypeColor = useCallback((type: string) => {
    switch (type) {
      case 'Data Breach': return 'bg-red-50 text-red-700 border-red-200';
      case 'SAR': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Compliance': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Threat': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  }, []);

  const formatDate = useCallback((dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (error) {
      return dateString;
    }
  }, []);

  // Calculate SLA status
  const responseSLA = securityCase ? calculateSLAStatus(securityCase, 'response') : null;
  const resolutionSLA = securityCase ? calculateSLAStatus(securityCase, 'resolution') : null;

  // Function to determine color for SLA indicator
  const getSLAIndicatorColor = (progress: number) => {
    if (progress <= 20) return "bg-red-500";
    if (progress <= 50) return "bg-amber-500";
    return "bg-green-500";
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="space-y-2 text-center">
            <div className="h-6 w-24 bg-muted animate-pulse rounded mx-auto"></div>
            <div className="h-4 w-48 bg-muted animate-pulse rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !securityCase) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Security Case Not Found</h3>
            <p className="text-muted-foreground mt-1">
              {error || "The security case you're looking for doesn't exist or has been removed."}
            </p>
            <Button className="mt-6" onClick={handleBack}>
              Return to Security Cases
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 w-full max-w-full">
      {/* Header section with title and actions */}
      <SecurityCaseHeader 
        securityCase={securityCase}
        handleBack={handleBack}
        getPriorityColor={getPriorityColor}
        formatDate={formatDate}
      />

      {/* Main Tabs Navigation */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={(value) => setActiveTab(value as SecurityCaseTab)}>
        <TabsList className="mb-6 border-b w-full justify-start rounded-none h-auto p-0">
          <TabsTrigger 
            value="overview" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-4"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="notes" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-4"
          >
            Notes
          </TabsTrigger>
          <TabsTrigger 
            value="affected-systems" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-4"
          >
            Affected Services
          </TabsTrigger>
          <TabsTrigger 
            value="related-items" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-2 px-4"
          >
            Related Items
          </TabsTrigger>
        </TabsList>

        {/* Main Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content column - approximately 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab content panels */}
            <TabsContent value="overview" className="mt-0 space-y-6">
              <SecurityCaseInfoCard 
                securityCase={securityCase}
                getStatusColor={getStatusColor}
                getPriorityColor={getPriorityColor}
                getTypeColor={getTypeColor}
                formatDate={formatDate}
                handleSystemClick={handleSystemClick}
              />
              
              <ActivityTimeline 
                securityCase={securityCase}
                formatDate={formatDate}
              />
            </TabsContent>

            <TabsContent value="notes" className="mt-0 space-y-6">
              <SecurityCaseNotes 
                securityCase={securityCase}
                formatDate={formatDate}
                openAddNoteDialog={openAddNoteDialog}
              />
            </TabsContent>

            <TabsContent value="affected-systems" className="mt-0 space-y-6">
              <AffectedServicesCard 
                securityCase={securityCase}
                handleSystemClick={handleSystemClick}
              />
            </TabsContent>

            <TabsContent value="related-items" className="mt-0 space-y-6">
              <RelatedItemsCard 
                securityCase={securityCase}
              />
            </TabsContent>
          </div>

          {/* Side panel column - approximately 1/3 width */}
          <div className="space-y-6">
            {/* SLA Status Card */}
            <SLAInformation 
              responseSLA={responseSLA}
              resolutionSLA={resolutionSLA}
              getSLAIndicatorColor={getSLAIndicatorColor}
            />

            {/* Assignee Card */}
            <AssignmentCard 
              securityCase={securityCase}
            />

            {/* Related Knowledge */}
            <RelatedKnowledgeCard />

            {/* Similar Security Cases */}
            <SimilarCasesCard />
          </div>
        </div>
      </Tabs>

      {/* Add Note Dialog */}
      <AddNoteDialog 
        open={addNoteDialogOpen}
        onOpenChange={closeAddNoteDialog}
        noteText={noteText}
        setNoteText={setNoteText}
        handleAddNote={handleAddNote}
      />
    </div>
  );
};

export default SecurityCaseDetailPage;
