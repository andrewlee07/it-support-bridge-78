
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProblemTable from './ProblemTable';
import { Problem } from '@/utils/types/problem';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { AuditEntry } from '@/utils/types/audit';

// Mock data for problem management
const mockProblems: Problem[] = [
  {
    id: 'PB001234',
    title: 'Recurring network outages in Data Center A',
    description: 'Multiple instances of network downtime occurring during peak hours',
    status: 'under-investigation',
    priority: 'P1',
    createdAt: new Date(Date.now() - 600000),
    createdBy: 'user1',
    assignedTo: 'user2',
    relatedIncidents: ['INC001234', 'INC001235', 'INC001236'],
    knownErrorId: null,
    serviceIds: ['SVC001', 'SVC002'],
    audit: [
      {
        id: uuidv4(),
        entityId: 'PB001234',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 600000),
        message: 'Problem created',
        userName: 'John Doe'
      },
      {
        id: uuidv4(),
        entityId: 'PB001234',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 300000),
        message: 'Status updated to Under Investigation',
        userName: 'Jane Smith'
      }
    ]
  },
  {
    id: 'PB001235',
    title: 'Payment gateway intermittent failures',
    description: 'Payment processing fails randomly for about 5% of transactions',
    status: 'root-cause-identified',
    priority: 'P2',
    createdAt: new Date(Date.now() - 86400000),
    createdBy: 'user3',
    assignedTo: 'user4',
    relatedIncidents: ['INC001237', 'INC001238'],
    knownErrorId: null,
    serviceIds: ['SVC003'],
    audit: [
      {
        id: uuidv4(),
        entityId: 'PB001235',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 86400000),
        message: 'Problem created',
        userName: 'Alice Johnson'
      },
      {
        id: uuidv4(),
        entityId: 'PB001235',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 43200000),
        message: 'Root cause identified: Database connection pool exhaustion',
        userName: 'Bob Williams'
      }
    ]
  },
  {
    id: 'PB001236',
    title: 'Email delivery delays',
    description: 'System emails are being delayed by up to 30 minutes',
    status: 'known-error',
    priority: 'P3',
    createdAt: new Date(Date.now() - 172800000),
    createdBy: 'user5',
    assignedTo: 'user2',
    relatedIncidents: ['INC001239'],
    knownErrorId: 'KE00123',
    serviceIds: ['SVC004'],
    audit: [
      {
        id: uuidv4(),
        entityId: 'PB001236',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 172800000),
        message: 'Problem created',
        userName: 'Charlie Brown'
      },
      {
        id: uuidv4(),
        entityId: 'PB001236',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 86400000),
        message: 'Added to Known Error Database',
        userName: 'Diana Prince'
      }
    ]
  },
  {
    id: 'PB001237',
    title: 'Application server memory leaks',
    description: 'Memory usage gradually increases until service restart is required',
    status: 'new',
    priority: 'P2',
    createdAt: new Date(Date.now() - 259200000),
    createdBy: 'user1',
    assignedTo: null,
    relatedIncidents: ['INC001240', 'INC001241', 'INC001242', 'INC001243'],
    knownErrorId: null,
    serviceIds: ['SVC005', 'SVC006'],
    audit: [
      {
        id: uuidv4(),
        entityId: 'PB001237',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 259200000),
        message: 'Problem created',
        userName: 'John Doe'
      }
    ]
  },
  {
    id: 'PB001238',
    title: 'Authentication service timeouts during peak hours',
    description: 'Login attempts time out when system is under heavy load',
    status: 'resolved',
    priority: 'P1',
    createdAt: new Date(Date.now() - 345600000),
    createdBy: 'user3',
    assignedTo: 'user5',
    relatedIncidents: ['INC001244', 'INC001245'],
    knownErrorId: null,
    serviceIds: ['SVC007'],
    audit: [
      {
        id: uuidv4(),
        entityId: 'PB001238',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 345600000),
        message: 'Problem created',
        userName: 'Alice Johnson'
      },
      {
        id: uuidv4(),
        entityId: 'PB001238',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 259200000),
        message: 'Status updated to In Progress',
        userName: 'Charlie Brown'
      },
      {
        id: uuidv4(),
        entityId: 'PB001238',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 86400000),
        message: 'Problem resolved: Increased authentication service capacity',
        userName: 'Charlie Brown'
      }
    ]
  },
  {
    id: 'PB001239',
    title: 'Customer portal showing incorrect order status',
    description: 'Order status not updating correctly after order fulfillment',
    status: 'pending',
    pendingSubStatus: 'third-party',
    priority: 'P3',
    createdAt: new Date(Date.now() - 432000000),
    createdBy: 'user4',
    assignedTo: 'user1',
    relatedIncidents: ['INC001246'],
    knownErrorId: null,
    serviceIds: ['SVC008'],
    audit: [
      {
        id: uuidv4(),
        entityId: 'PB001239',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 432000000),
        message: 'Problem created',
        userName: 'Bob Williams'
      },
      {
        id: uuidv4(),
        entityId: 'PB001239',
        entityType: 'problem',
        timestamp: new Date(Date.now() - 345600000),
        message: 'Status updated to Pending - Waiting for Vendor',
        userName: 'John Doe'
      }
    ]
  }
];

interface ProblemListProps {
  filterStatus?: string | string[];
  filterPriority?: string | string[];
}

const ProblemList: React.FC<ProblemListProps> = ({ 
  filterStatus,
  filterPriority
}) => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState<Problem[]>([]);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filteredProblems = [...mockProblems];
      
      // Apply status filter if provided
      if (filterStatus) {
        const statusFilters = Array.isArray(filterStatus) ? filterStatus : [filterStatus];
        filteredProblems = filteredProblems.filter(problem => 
          statusFilters.includes(problem.status)
        );
      }
      
      // Apply priority filter if provided
      if (filterPriority) {
        const priorityFilters = Array.isArray(filterPriority) ? filterPriority : [filterPriority];
        filteredProblems = filteredProblems.filter(problem => 
          priorityFilters.includes(problem.priority)
        );
      }
      
      setProblems(filteredProblems);
    }, 500);
  }, [filterStatus, filterPriority]);

  const handleProblemClick = (problemId: string) => {
    // In a real app, this would navigate to a problem detail page
    console.log(`Navigate to problem detail: ${problemId}`);
    toast.info(`Viewing problem ${problemId}`);
    // navigate(`/problems/${problemId}`);
  };

  return (
    <div>
      <ProblemTable problems={problems} onProblemClick={handleProblemClick} />
    </div>
  );
};

export default ProblemList;
