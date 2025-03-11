
import { Task, TaskStatus, TaskPriority, TaskStats } from '@/utils/types/taskTypes';
import { ApiResponse, PaginatedResponse } from '@/utils/types/api';
import { v4 as uuidv4 } from 'uuid';
import { mockTasks } from './tasksMockData';

// In-memory store for tasks
let tasks = [...mockTasks];

// Get all tasks with filtering options
export const fetchTasks = (
  assignee?: string,
  status?: TaskStatus | TaskStatus[],
  priority?: TaskPriority | TaskPriority[],
  searchQuery?: string,
  dueDateFrom?: Date,
  dueDateTo?: Date
): PaginatedResponse<Task> => {
  let filteredTasks = [...tasks];
  
  // Filter by assignee
  if (assignee) {
    filteredTasks = filteredTasks.filter(task => task.assignee === assignee);
  }
  
  // Filter by status
  if (status) {
    if (Array.isArray(status)) {
      filteredTasks = filteredTasks.filter(task => status.includes(task.status));
    } else {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }
  }
  
  // Filter by priority
  if (priority) {
    if (Array.isArray(priority)) {
      filteredTasks = filteredTasks.filter(task => priority.includes(task.priority));
    } else {
      filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }
  }
  
  // Filter by search query (title or description)
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredTasks = filteredTasks.filter(task => 
      task.title.toLowerCase().includes(query) || 
      task.description.toLowerCase().includes(query) || 
      task.id.toLowerCase().includes(query)
    );
  }
  
  // Filter by due date range
  if (dueDateFrom) {
    filteredTasks = filteredTasks.filter(task => 
      task.dueDate && new Date(task.dueDate) >= new Date(dueDateFrom)
    );
  }
  
  if (dueDateTo) {
    filteredTasks = filteredTasks.filter(task => 
      task.dueDate && new Date(task.dueDate) <= new Date(dueDateTo)
    );
  }
  
  return {
    items: filteredTasks,
    data: filteredTasks, // For backward compatibility
    total: filteredTasks.length,
    page: 1,
    limit: filteredTasks.length,
    totalPages: 1,
    pagination: {
      total: filteredTasks.length,
      page: 1,
      pageSize: filteredTasks.length,
      totalPages: 1
    }
  };
};

// Get task by ID
export const fetchTaskById = (id: string): ApiResponse<Task> => {
  const task = tasks.find(task => task.id === id);
  
  if (!task) {
    return {
      success: false,
      error: 'Task not found',
      status: 404,
      statusCode: 404,
      data: null as any
    };
  }
  
  return {
    success: true,
    data: task,
    status: 200,
    statusCode: 200
  };
};

// Create a new task
export const createTask = (
  taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
): ApiResponse<Task> => {
  const newTask: Task = {
    id: `TASK-${1000 + tasks.length + 1}`,
    ...taskData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  tasks.push(newTask);
  
  return {
    success: true,
    data: newTask,
    status: 201,
    statusCode: 201
  };
};

// Update an existing task
export const updateTask = (
  id: string,
  updates: Partial<Task>
): ApiResponse<Task> => {
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return {
      success: false,
      error: 'Task not found',
      status: 404,
      statusCode: 404,
      data: null as any
    };
  }
  
  const updatedTask: Task = {
    ...tasks[taskIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  tasks[taskIndex] = updatedTask;
  
  return {
    success: true,
    data: updatedTask,
    status: 200,
    statusCode: 200
  };
};

// Delete a task
export const deleteTask = (id: string): ApiResponse<boolean> => {
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return {
      success: false,
      error: 'Task not found',
      status: 404,
      statusCode: 404,
      data: false
    };
  }
  
  tasks.splice(taskIndex, 1);
  
  return {
    success: true,
    data: true,
    status: 200,
    statusCode: 200
  };
};

// Add a note to a task
export const addTaskNote = (
  taskId: string,
  content: string,
  author: string
): ApiResponse<Task> => {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return {
      success: false,
      error: 'Task not found',
      status: 404,
      statusCode: 404,
      data: null as any
    };
  }
  
  const updatedTask = { ...tasks[taskIndex] };
  
  const newNote = {
    id: uuidv4(),
    content,
    author,
    createdAt: new Date()
  };
  
  updatedTask.notes = updatedTask.notes ? [...updatedTask.notes, newNote] : [newNote];
  updatedTask.updatedAt = new Date();
  
  tasks[taskIndex] = updatedTask;
  
  return {
    success: true,
    data: updatedTask,
    status: 200,
    statusCode: 200
  };
};

// Get task statistics
export const getTaskStats = (userId?: string): ApiResponse<TaskStats> => {
  let filteredTasks = tasks;
  
  // Filter by user if provided
  if (userId) {
    filteredTasks = tasks.filter(task => task.assignee === userId);
  }
  
  const now = new Date();
  
  const stats: TaskStats = {
    totalTasks: filteredTasks.length,
    newTasks: filteredTasks.filter(task => task.status === 'new').length,
    inProgressTasks: filteredTasks.filter(task => task.status === 'in-progress').length,
    onHoldTasks: filteredTasks.filter(task => task.status === 'on-hold').length,
    completedTasks: filteredTasks.filter(task => task.status === 'completed').length,
    cancelledTasks: filteredTasks.filter(task => task.status === 'cancelled').length,
    overdueCount: filteredTasks.filter(task => 
      task.dueDate && 
      new Date(task.dueDate) < now && 
      task.status !== 'completed' && 
      task.status !== 'cancelled'
    ).length
  };
  
  return {
    success: true,
    data: stats,
    status: 200,
    statusCode: 200
  };
};

// Get tasks due today
export const getTasksDueToday = (userId?: string): ApiResponse<Task[]> => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  
  let filteredTasks = tasks.filter(task => 
    task.dueDate && 
    new Date(task.dueDate) >= startOfDay && 
    new Date(task.dueDate) <= endOfDay &&
    task.status !== 'completed' &&
    task.status !== 'cancelled'
  );
  
  // Filter by user if provided
  if (userId) {
    filteredTasks = filteredTasks.filter(task => task.assignee === userId);
  }
  
  return {
    success: true,
    data: filteredTasks,
    status: 200,
    statusCode: 200
  };
};
