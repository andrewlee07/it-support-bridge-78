
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAppNavigation } from '@/utils/routes/navigationUtils';
import { SecurityCaseTab } from '@/utils/types/security';
import { toast } from 'sonner';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useSecurityCaseDetail } from '@/hooks/security/useSecurityCaseDetail';

// Import our components
import SecurityCaseHeader from '@/components/security/components/SecurityCaseHeader';
import SecurityCaseTabs from '@/components/security/components/SecurityCaseTabs';
import SecurityCaseLoadingState from '@/components/security/components/SecurityCaseLoadingState';
import SecurityCaseErrorState from '@/components/security/components/SecurityCaseErrorState';
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
    updateSecurityCase,
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

  const handleUpdateCase = useCallback(async (updatedFields) => {
    return await updateSecurityCase(updatedFields);
  }, [updateSecurityCase]);

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
    return <SecurityCaseLoadingState handleBack={handleBack} />;
  }

  if (error || !securityCase) {
    return <SecurityCaseErrorState handleBack={handleBack} error={error} />;
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
      <SecurityCaseTabs
        securityCase={securityCase}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        getStatusColor={getStatusColor}
        getPriorityColor={getPriorityColor}
        getTypeColor={getTypeColor}
        formatDate={formatDate}
        handleSystemClick={handleSystemClick}
        responseSLA={responseSLA}
        resolutionSLA={resolutionSLA}
        getSLAIndicatorColor={getSLAIndicatorColor}
        openAddNoteDialog={openAddNoteDialog}
        onUpdateSecurityCase={handleUpdateCase}
      />

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
