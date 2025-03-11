import { Task, TaskPriority, TaskStatus } from '@/utils/types/taskTypes';
import { v4 as uuidv4 } from 'uuid';

// Mock data storage
let tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Server Maintenance',
    description: 'Schedule downtime and perform server updates',
    status: 'new',
    priority: 'high',
    assignee: 'user-1',
    creator: 'user-1',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'task-2',
    title: 'Update Security Certificates',
    description: 'Renew SSL certificates before they expire',
    status: 'in-progress',
    priority: 'critical',
    assignee: 'user-2',
    creator: 'user-1',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago (overdue)
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'task-3',
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
    id: 'task-4',
    title: 'Upgrade Database',
    description: 'Implement database migration to newer version',
    status: 'on-hold',
    priority: 'medium',
    assignee: 'user-1',
    creator: 'user-3',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'task-5',
    title: 'Implement New Feature',
    description: 'Add requested feature to improve user experience',
    status: 'new',
    priority: 'low',
    creator: 'user-2',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  }
];

// API functions
export const fetchTasks = async (
  assignee?: string,
  statusFilters?: TaskStatus[],
  priorityFilters?: TaskPriority[],
  searchQuery?: string
): Promise<{ success: boolean; data: Task[] }> => {
  let filteredTasks = [...tasks];
  
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
};

export const createTask = async (taskData: CreateTaskInput): Promise<{ success: boolean; data: Task }> => {
  const newTask: Task = {
    id: `task-${uuidv4().slice(0, 8)}`,
    ...taskData,
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
  let filteredTasks = userId ? tasks.filter(t => t.assignee === userId) : tasks;
  
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
  
  let filteredTasks = tasks;
  
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
