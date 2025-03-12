
import { Task, TaskPriority, TaskStatus, TimeEntry, ChecklistItem } from '@/utils/types/taskTypes';
import { v4 as uuidv4 } from 'uuid';

// Mock data storage
let tasks: Task[] = [
  {
    id: 'TSK00001',
    title: 'Server Maintenance',
    description: 'Schedule downtime and perform server updates',
    status: 'new',
    priority: 'high',
    assignee: 'user-1',
    creator: 'user-1',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    // New fields
    estimatedHours: 4,
    checklist: [
      {
        id: 'checklist-1',
        text: 'Notify users of downtime',
        completed: true,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'checklist-2',
        text: 'Create backup',
        completed: false,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      }
    ]
  },
  {
    id: 'TSK00002',
    title: 'Update Security Certificates',
    description: 'Renew SSL certificates before they expire',
    status: 'in-progress',
    priority: 'critical',
    assignee: 'user-2',
    creator: 'user-1',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago (overdue)
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    dependsOn: ['TSK00003'],
    estimatedHours: 2
  },
  {
    id: 'TSK00003',
    title: 'Review Incident Reports',
    description: 'Analyze recent incident reports and summarize findings',
    status: 'completed',
    priority: 'medium',
    assignee: 'user-3',
    creator: 'user-2',
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'TSK00004',
    title: 'Upgrade Database',
    description: 'Implement database migration to newer version',
    status: 'on-hold',
    priority: 'medium',
    assignee: 'user-1',
    creator: 'user-3',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    blockedBy: ['TSK00005']
  },
  {
    id: 'TSK00005',
    title: 'Implement New Feature',
    description: 'Add requested feature to improve user experience',
    status: 'new',
    priority: 'low',
    creator: 'user-2',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  // Task template example
  {
    id: 'TEMP00001',
    title: 'New Server Setup Template',
    description: 'Standard steps for setting up a new server',
    status: 'new',
    priority: 'medium',
    creator: 'user-1',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    isTemplate: true,
    estimatedHours: 8,
    checklist: [
      {
        id: 'checklist-t1',
        text: 'Install OS',
        completed: false,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'checklist-t2',
        text: 'Configure firewall',
        completed: false,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'checklist-t3',
        text: 'Install required software',
        completed: false,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'checklist-t4',
        text: 'Configure backup',
        completed: false,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    ]
  }
];

// Function to get the next task ID
const getNextTaskIdNumber = (): number => {
  const taskIds = tasks
    .filter(t => !t.isTemplate && t.id.startsWith('TSK'))
    .map(t => {
      const numericPart = t.id.replace('TSK', '');
      return parseInt(numericPart, 10);
    });
  
  const maxId = taskIds.length > 0 ? Math.max(...taskIds) : 0;
  return maxId + 1;
};

// Function to get the next template ID
const getNextTemplateIdNumber = (): number => {
  const templateIds = tasks
    .filter(t => t.isTemplate && t.id.startsWith('TEMP'))
    .map(t => {
      const numericPart = t.id.replace('TEMP', '');
      return parseInt(numericPart, 10);
    });
  
  const maxId = templateIds.length > 0 ? Math.max(...templateIds) : 0;
  return maxId + 1;
};

// Generate a formatted task ID
const generateTaskId = (isTemplate: boolean): string => {
  if (isTemplate) {
    const nextNumber = getNextTemplateIdNumber();
    return `TEMP${nextNumber.toString().padStart(5, '0')}`;
  } else {
    const nextNumber = getNextTaskIdNumber();
    return `TSK${nextNumber.toString().padStart(5, '0')}`;
  }
};

// API functions
export const fetchTasks = async (
  assignee?: string,
  statusFilters?: TaskStatus[],
  priorityFilters?: TaskPriority[],
  searchQuery?: string
): Promise<{ success: boolean; data: Task[] }> => {
  let filteredTasks = [...tasks].filter(t => !t.isTemplate);
  
  // Apply filters
  if (assignee) {
    filteredTasks = filteredTasks.filter(t => t.assignee === assignee);
  }
  
  if (statusFilters && statusFilters.length > 0) {
    filteredTasks = filteredTasks.filter(t => statusFilters.includes(t.status));
  }
  
  if (priorityFilters && priorityFilters.length > 0) {
    filteredTasks = filteredTasks.filter(t => priorityFilters.includes(t.priority));
  }
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredTasks = filteredTasks.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.description.toLowerCase().includes(query)
    );
  }
  
  return { success: true, data: filteredTasks };
};

export const fetchTaskTemplates = async (): Promise<{ success: boolean; data: Task[] }> => {
  const templates = tasks.filter(t => t.isTemplate === true);
  return { success: true, data: templates };
};

export const fetchTaskDependencies = async (taskId: string): Promise<{ success: boolean; data: { dependencies: Task[], blockers: Task[] } }> => {
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return { 
      success: false, 
      data: { dependencies: [], blockers: [] } 
    };
  }
  
  const dependencies = task.dependsOn ? 
    tasks.filter(t => task.dependsOn?.includes(t.id)) : 
    [];
    
  const blockers = task.blockedBy ? 
    tasks.filter(t => task.blockedBy?.includes(t.id)) : 
    [];
    
  return { 
    success: true, 
    data: { dependencies, blockers } 
  };
};

export const fetchTaskById = async (id: string): Promise<{ success: boolean; data: Task | null }> => {
  const task = tasks.find(t => t.id === id);
  return { success: !!task, data: task || null };
};

// Define what's required for task creation
type CreateTaskInput = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  creator: string;
  dueDate?: Date;
  relatedItemId?: string;
  relatedItemType?: 'incident' | 'service-request' | 'task';
  // New fields
  dependsOn?: string[];
  blockedBy?: string[];
  checklist?: ChecklistItem[];
  estimatedHours?: number;
  timeTracking?: { entries: TimeEntry[]; totalTimeSpent?: number };
  attachments?: any[];
  isTemplate?: boolean;
  templateId?: string;
};

export const createTask = async (taskData: CreateTaskInput): Promise<{ success: boolean; data: Task }> => {
  const newTask: Task = {
    id: generateTaskId(taskData.isTemplate || false),
    ...taskData,
    timeTracking: taskData.timeTracking ? {
      totalTimeSpent: taskData.timeTracking.totalTimeSpent || 0,
      entries: taskData.timeTracking.entries || []
    } : undefined,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  tasks.push(newTask);
  return { success: true, data: newTask };
};

export const updateTask = async (id: string, taskData: Partial<Task>): Promise<{ success: boolean; data: Task | null }> => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return { success: false, data: null };
  }
  
  const updatedTask = {
    ...tasks[index],
    ...taskData,
    updatedAt: new Date()
  };
  
  tasks[index] = updatedTask;
  return { success: true, data: updatedTask };
};

export const deleteTask = async (id: string): Promise<{ success: boolean }> => {
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  return { success: tasks.length < initialLength };
};

export const addTaskNote = async (taskId: string, noteContent: string, authorId: string): Promise<{ success: boolean; data: Task | null }> => {
  const index = tasks.findIndex(t => t.id === taskId);
  if (index === -1) {
    return { success: false, data: null };
  }
  
  const task = tasks[index];
  const newNote = {
    id: `note-${uuidv4().slice(0, 8)}`,
    content: noteContent,
    author: authorId,
    createdAt: new Date()
  };
  
  const updatedTask = {
    ...task,
    notes: task.notes ? [...task.notes, newNote] : [newNote],
    updatedAt: new Date()
  };
  
  tasks[index] = updatedTask;
  return { success: true, data: updatedTask };
};

export const getTaskStats = async (userId?: string): Promise<{ success: boolean; data: any }> => {
  let filteredTasks = userId ? tasks.filter(t => t.assignee === userId && !t.isTemplate) : tasks.filter(t => !t.isTemplate);
  
  const stats = {
    totalTasks: filteredTasks.length,
    newTasks: filteredTasks.filter(t => t.status === 'new').length,
    inProgressTasks: filteredTasks.filter(t => t.status === 'in-progress').length,
    onHoldTasks: filteredTasks.filter(t => t.status === 'on-hold').length,
    completedTasks: filteredTasks.filter(t => t.status === 'completed').length,
    cancelledTasks: filteredTasks.filter(t => t.status === 'cancelled').length,
    overdueCount: filteredTasks.filter(t => 
      t.dueDate && 
      new Date(t.dueDate) < new Date() && 
      t.status !== 'completed' && 
      t.status !== 'cancelled'
    ).length
  };
  
  return { success: true, data: stats };
};

export const getTasksDueToday = async (userId?: string): Promise<{ success: boolean; data: Task[] }> => {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
  
  let filteredTasks = tasks.filter(t => !t.isTemplate);
  
  if (userId) {
    filteredTasks = filteredTasks.filter(t => t.assignee === userId);
  }
  
  const tasksDueToday = filteredTasks.filter(t => 
    t.dueDate && 
    new Date(t.dueDate) >= todayStart && 
    new Date(t.dueDate) <= todayEnd &&
    t.status !== 'completed' &&
    t.status !== 'cancelled'
  );
  
  return { success: true, data: tasksDueToday };
};
