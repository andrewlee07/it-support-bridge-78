
import { useState, useEffect, useRef } from 'react';
import { SecurityCase } from '@/utils/types/security';
import { toast } from 'sonner';

// Mock security case data - in a real app, this would be fetched from an API
const mockSecurityCase: SecurityCase = {
  id: 'SEC00001',
  title: 'Customer Data Exposure',
  description: 'Inadvertent exposure of customer data through API misconfiguration',
  type: 'Data Breach',
  status: 'Active',
  priority: 'High',
  reportedBy: 'user-1',
  reportedAt: '2023-12-15T14:30:00',
  affectedSystems: ['Customer Portal', 'API Gateway', 'Identity Service'],
  investigationSteps: [
    { date: '2023-12-15T14:30:00', text: 'Initial discovery and containment' },
    { date: '2023-12-16T10:15:00', text: 'Impact assessment conducted' },
    { date: '2023-12-17T09:30:00', text: 'Forensic analysis initiated' }
  ],
  impactedUsers: 120,
  remediationPlan: 'Update API gateway security configurations and implement additional access controls',
  firstResponseAt: '2023-12-15T15:45:00',
  assignedTo: 'user-2',
  createdBy: 'user-1',
  lastUpdatedAt: '2023-12-17T14:20:00',
  audit: [
    { 
      timestamp: '2023-12-15T14:30:00', 
      performedBy: 'user-1', 
      action: 'created', 
      message: 'Security case created' 
    },
    { 
      timestamp: '2023-12-15T15:45:00', 
      performedBy: 'user-2', 
      action: 'updated', 
      message: 'Initial response provided' 
    },
    { 
      timestamp: '2023-12-16T10:15:00', 
      performedBy: 'user-2', 
      action: 'updated', 
      message: 'Impact assessment completed' 
    },
    { 
      timestamp: '2023-12-17T09:30:00', 
      performedBy: 'user-3', 
      action: 'updated', 
      message: 'Forensic analysis initiated' 
    }
  ],
  notes: [
    {
      id: 'note-1',
      text: 'Initial investigation shows this was caused by a misconfiguration in the API gateway.',
      createdBy: 'user-2',
      createdAt: '2023-12-15T16:30:00'
    },
    {
      id: 'note-2',
      text: 'Customer data exposed includes email addresses and hashed passwords. No financial information was exposed.',
      createdBy: 'user-3',
      createdAt: '2023-12-16T11:20:00'
    }
  ],
  relatedAssets: ['ASSET-001', 'ASSET-002'],
  relatedTickets: ['INC00123', 'CHG00045']
};

export function useSecurityCaseDetail(securityCaseId: string) {
  const [securityCase, setSecurityCase] = useState<SecurityCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  // Fetch the security case only once when the component mounts or securityCaseId changes
  useEffect(() => {
    // Skip if we've already fetched with this ID
    if (hasFetched.current && securityCase?.id === securityCaseId) {
      return;
    }

    const fetchSecurityCase = async () => {
      try {
        setLoading(true);
        
        // Simulate API call with a short timeout to minimize flickering
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (securityCaseId) {
          console.log(`Fetching security case with ID: ${securityCaseId}`);
          // In a real app, this would be an API call
          setSecurityCase(mockSecurityCase);
          setError(null);
          hasFetched.current = true;
        } else {
          setError('No security case ID provided');
        }
      } catch (err) {
        console.error('Error fetching security case:', err);
        setError('Failed to load security case');
      } finally {
        setLoading(false);
      }
    };

    fetchSecurityCase();
  }, [securityCaseId]);

  // Update security case
  const updateSecurityCase = async (updates: Partial<SecurityCase>) => {
    try {
      // Don't set loading state here to prevent UI flickering
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update local state
      setSecurityCase(prev => {
        if (!prev) return null;
        
        // Add audit entry for the update
        const updatedAudit = [...(prev.audit || []), {
          timestamp: new Date().toISOString(),
          performedBy: 'current-user', // This would be the current user ID in a real app
          action: 'updated',
          message: 'Case details updated'
        }];
        
        return {
          ...prev,
          ...updates,
          lastUpdatedAt: new Date().toISOString(),
          audit: updatedAudit
        };
      });
      
      toast.success('Security case updated successfully');
      return true;
    } catch (err) {
      console.error('Error updating security case:', err);
      toast.error('Failed to update security case');
      return false;
    }
  };

  // Add a note to the security case
  const addNote = async (noteText: string) => {
    try {
      // Don't set loading state here to prevent UI flickering
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update local state
      setSecurityCase(prev => {
        if (!prev) return null;
        
        const newNote = {
          id: `note-${Date.now()}`,
          text: noteText,
          createdBy: 'current-user', // This would be the current user ID in a real app
          createdAt: new Date().toISOString()
        };
        
        // Add audit entry for the note
        const updatedAudit = [...(prev.audit || []), {
          timestamp: new Date().toISOString(),
          performedBy: 'current-user', // This would be the current user ID in a real app
          action: 'note-added',
          message: 'Note added to case'
        }];
        
        return {
          ...prev,
          notes: [...(prev.notes || []), newNote],
          lastUpdatedAt: new Date().toISOString(),
          audit: updatedAudit
        };
      });
      
      return true;
    } catch (err) {
      console.error('Error adding note:', err);
      toast.error('Failed to add note');
      return false;
    }
  };

  // Add investigation step
  const addInvestigationStep = async (stepText: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update local state
      setSecurityCase(prev => {
        if (!prev) return null;
        
        const newStep = {
          date: new Date().toISOString(),
          text: stepText
        };
        
        // Add audit entry for the step
        const updatedAudit = [...(prev.audit || []), {
          timestamp: new Date().toISOString(),
          performedBy: 'current-user', // This would be the current user ID in a real app
          action: 'updated',
          message: 'Investigation step added'
        }];
        
        return {
          ...prev,
          investigationSteps: [...(prev.investigationSteps || []), newStep],
          lastUpdatedAt: new Date().toISOString(),
          audit: updatedAudit
        };
      });
      
      return true;
    } catch (err) {
      console.error('Error adding investigation step:', err);
      toast.error('Failed to add investigation step');
      return false;
    }
  };

  // Resolve the security case
  const resolveSecurityCase = async (resolutionNotes: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update local state
      setSecurityCase(prev => {
        if (!prev) return null;
        
        // Add resolution note
        const newNote = {
          id: `note-${Date.now()}`,
          text: `Case resolved: ${resolutionNotes}`,
          createdBy: 'current-user', // This would be the current user ID in a real app
          createdAt: new Date().toISOString()
        };
        
        // Add audit entry for the resolution
        const updatedAudit = [...(prev.audit || []), {
          timestamp: new Date().toISOString(),
          performedBy: 'current-user', // This would be the current user ID in a real app
          action: 'resolved',
          message: 'Case resolved'
        }];
        
        return {
          ...prev,
          status: 'Resolved',
          resolvedAt: new Date().toISOString(),
          lastUpdatedAt: new Date().toISOString(),
          notes: [...(prev.notes || []), newNote],
          audit: updatedAudit
        };
      });
      
      toast.success('Security case resolved successfully');
      return true;
    } catch (err) {
      console.error('Error resolving security case:', err);
      toast.error('Failed to resolve security case');
      return false;
    }
  };

  // Reopen the security case
  const reopenSecurityCase = async (reopenReason: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update local state
      setSecurityCase(prev => {
        if (!prev) return null;
        
        // Add reopen note
        const newNote = {
          id: `note-${Date.now()}`,
          text: `Case reopened: ${reopenReason}`,
          createdBy: 'current-user', // This would be the current user ID in a real app
          createdAt: new Date().toISOString()
        };
        
        // Add audit entry for reopening
        const updatedAudit = [...(prev.audit || []), {
          timestamp: new Date().toISOString(),
          performedBy: 'current-user', // This would be the current user ID in a real app
          action: 'reopened',
          message: 'Case reopened'
        }];
        
        return {
          ...prev,
          status: 'Active',
          resolvedAt: undefined,
          lastUpdatedAt: new Date().toISOString(),
          notes: [...(prev.notes || []), newNote],
          audit: updatedAudit
        };
      });
      
      toast.success('Security case reopened successfully');
      return true;
    } catch (err) {
      console.error('Error reopening security case:', err);
      toast.error('Failed to reopen security case');
      return false;
    }
  };

  // Assign the security case
  const assignSecurityCase = async (userId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update local state
      setSecurityCase(prev => {
        if (!prev) return null;
        
        // Add audit entry for assignment
        const updatedAudit = [...(prev.audit || []), {
          timestamp: new Date().toISOString(),
          performedBy: 'current-user', // This would be the current user ID in a real app
          action: 'assigned',
          message: `Case assigned to ${userId}`
        }];
        
        return {
          ...prev,
          assignedTo: userId,
          lastUpdatedAt: new Date().toISOString(),
          audit: updatedAudit
        };
      });
      
      toast.success('Security case assigned successfully');
      return true;
    } catch (err) {
      console.error('Error assigning security case:', err);
      toast.error('Failed to assign security case');
      return false;
    }
  };

  // Calculate SLA status for the security case
  const calculateSLAStatus = (caseData: SecurityCase, slaType: 'response' | 'resolution' = 'resolution') => {
    // For resolved cases
    if (caseData.status === 'Resolved') {
      return {
        percentLeft: 100,
        timeLeft: 'Completed',
        isBreached: false,
        breachTime: 0,
        targetHours: 0
      };
    }
    
    // Get SLA target times based on priority
    const getSLATargetHours = (priority: string, type: 'response' | 'resolution'): number => {
      const targets = {
        response: {
          High: 1,
          Medium: 4,
          Low: 8
        },
        resolution: {
          High: 24,
          Medium: 48,
          Low: 72
        }
      };
      
      return targets[type][priority as keyof typeof targets[typeof type]] || 
             (type === 'response' ? 4 : 48); // Default fallback
    };
    
    const reportedAt = new Date(caseData.reportedAt);
    const targetHours = getSLATargetHours(caseData.priority, slaType);
    const slaTarget = new Date(reportedAt.getTime() + targetHours * 60 * 60 * 1000);
    
    // For response SLA, check if first response exists
    if (slaType === 'response' && caseData.firstResponseAt) {
      const responseAt = new Date(caseData.firstResponseAt);
      const isBreached = responseAt > slaTarget;
      
      return {
        percentLeft: 100,
        timeLeft: 'Completed',
        isBreached,
        breachTime: isBreached ? responseAt.getTime() - slaTarget.getTime() : 0,
        targetHours
      };
    }
    
    // Calculate time remaining
    const now = new Date();
    const isBreached = now > slaTarget;
    
    // Calculate percentage of time left
    const totalDuration = slaTarget.getTime() - reportedAt.getTime();
    const elapsedDuration = now.getTime() - reportedAt.getTime();
    const percentUsed = Math.min(100, Math.max(0, (elapsedDuration / totalDuration) * 100));
    const percentLeft = Math.max(0, 100 - percentUsed);
    
    return {
      percentLeft,
      timeLeft: isBreached ? 'Breached' : 'On Track',
      isBreached,
      breachTime: isBreached ? now.getTime() - slaTarget.getTime() : 0,
      targetHours
    };
  };

  return {
    securityCase,
    loading,
    error,
    updateSecurityCase,
    addNote,
    addInvestigationStep,
    resolveSecurityCase,
    reopenSecurityCase,
    assignSecurityCase,
    calculateSLAStatus
  };
}
