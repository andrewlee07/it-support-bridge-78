
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

export const completeTask = async (taskId: string): Promise<ApiResponse<boolean>> => {
  try {
    await delay(300);
    
    // In a real app, you would update the task in a database
    return createApiSuccessResponse(true);
  } catch (error) {
    return createApiErrorResponse('Failed to complete task', 500);
  }
};
