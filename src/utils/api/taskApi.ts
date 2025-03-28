
import { delay, createApiSuccessResponse, createApiErrorResponse } from '../mockData/apiHelpers';
import { ApiResponse } from '../types';
import { Task } from '../types/taskTypes';

export const createTask = async (
  taskData: Partial<Task>
): Promise<ApiResponse<Task>> => {
  try {
    await delay(800);
    
    const newTask: Task = {
      id: `TASK-${Math.floor(Math.random() * 10000)}`,
      title: taskData.title || 'New Task',
      description: taskData.description || '',
      status: 'open',
      priority: taskData.priority || 'medium',
      category: taskData.category || 'general',
      createdBy: taskData.creator || 'user-1',
      assignedTo: taskData.assignedTo || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: taskData.dueDate || null,
      completedAt: null,
      estimatedHours: taskData.estimatedHours || 0,
      actualHours: 0,
      attachments: [],
      relatedItemId: taskData.relatedItemId || null,
      relatedItemType: taskData.relatedItemType || null
    };
    
    return createApiSuccessResponse(newTask);
  } catch (error) {
    return createApiErrorResponse('Failed to create task', 500);
  }
};

export const getTaskById = async (taskId: string): Promise<ApiResponse<Task>> => {
  try {
    await delay(300);
    
    // In a real app, you would fetch this from a database
    const task: Task = {
      id: taskId,
      title: `Task ${taskId}`,
      description: 'This is a sample task description',
      status: 'open',
      priority: 'medium',
      category: 'general',
      createdBy: 'user-1',
      assignedTo: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: null,
      completedAt: null,
      estimatedHours: 2,
      actualHours: 0,
      attachments: [],
      relatedItemId: null,
      relatedItemType: null
    };
    
    return createApiSuccessResponse(task);
  } catch (error) {
    return createApiErrorResponse('Failed to fetch task', 500);
  }
};

export const updateTask = async (taskId: string, updatedData: Partial<Task>): Promise<ApiResponse<Task>> => {
  try {
    await delay(500);
    
    // In a real app, you would update the task in a database
    // Here we'll simulate retrieving and updating a task
    const existingTask = await getTaskById(taskId);
    
    if (!existingTask.success) {
      return createApiErrorResponse('Task not found', 404);
    }
    
    const updatedTask: Task = {
      ...existingTask.data,
      ...updatedData,
      updatedAt: new Date()
    };
    
    return createApiSuccessResponse(updatedTask);
  } catch (error) {
    return createApiErrorResponse('Failed to update task', 500);
  }
};

export const completeTask = async (taskId: string): Promise<ApiResponse<boolean>> => {
  try {
    await delay(300);
    
    // In a real app, you would update the task in a database
    return createApiSuccessResponse(true);
  } catch (error) {
    return createApiErrorResponse('Failed to complete task', 500);
  }
};

export const fetchTaskById = async (taskId: string): Promise<ApiResponse<Task>> => {
  // Alias for getTaskById for consistency with other API functions
  return getTaskById(taskId);
};

export const fetchTasks = async (
  assignee?: string,
  statusFilters?: string[],
  priorityFilters?: string[],
  searchQuery?: string
): Promise<ApiResponse<Task[]>> => {
  try {
    await delay(500);
    
    // In a real app, you would fetch filtered tasks from a database
    // For now, we'll return a simple mock response
    const tasks: Task[] = [
      {
        id: 'TASK-1001',
        title: 'Update server configurations',
        description: 'Apply the latest security patches and update configurations.',
        status: 'open',
        priority: 'high',
        category: 'maintenance',
        createdBy: 'user-1',
        assignedTo: assignee || 'user-2',
        createdAt: new Date(),
        updatedAt: new Date(),
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        completedAt: null,
        estimatedHours: 4,
        actualHours: 0,
        attachments: []
      },
      {
        id: 'TASK-1002',
        title: 'Review logs for anomalies',
        description: 'Check system logs for any unusual activity or errors.',
        status: 'in-progress',
        priority: 'medium',
        category: 'security',
        createdBy: 'user-2',
        assignedTo: assignee || 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        completedAt: null,
        estimatedHours: 2,
        actualHours: 1,
        attachments: []
      }
    ];
    
    return createApiSuccessResponse(tasks);
  } catch (error) {
    return createApiErrorResponse('Failed to fetch tasks', 500);
  }
};

export const getTaskStats = async (userId?: string): Promise<ApiResponse<any>> => {
  try {
    await delay(300);
    
    // Mock stats data
    const stats = {
      totalTasks: 35,
      newTasks: 10,
      inProgressTasks: 15,
      onHoldTasks: 5,
      completedTasks: 3,
      cancelledTasks: 2,
      overdueCount: 7
    };
    
    return createApiSuccessResponse(stats);
  } catch (error) {
    return createApiErrorResponse('Failed to fetch task statistics', 500);
  }
};

export const getTasksDueToday = async (userId?: string): Promise<ApiResponse<Task[]>> => {
  try {
    await delay(300);
    
    // Mock tasks due today
    const tasks: Task[] = [
      {
        id: 'TASK-1003',
        title: 'Follow up with client',
        description: 'Schedule a call to discuss project progress',
        status: 'open',
        priority: 'high',
        category: 'client',
        createdBy: 'user-1',
        assignedTo: userId || 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
        dueDate: new Date(), // Today
        completedAt: null,
        estimatedHours: 1,
        actualHours: 0,
        attachments: []
      }
    ];
    
    return createApiSuccessResponse(tasks);
  } catch (error) {
    return createApiErrorResponse('Failed to fetch tasks due today', 500);
  }
};
