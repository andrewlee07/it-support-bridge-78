
import { 
  fetchTasks, 
  fetchTaskById, 
  createTask, 
  updateTask, 
  deleteTask,
  addTaskNote,
  getTaskStats,
  getTasksDueToday,
  fetchTaskTemplates,
  fetchTaskDependencies
} from '@/utils/mockData/tasks/taskOperations';

// Just re-export the functions from taskOperations
export { 
  fetchTasks, 
  fetchTaskById, 
  createTask, 
  updateTask, 
  deleteTask,
  addTaskNote,
  getTaskStats,
  getTasksDueToday,
  fetchTaskTemplates,
  fetchTaskDependencies
};

// Add new API functions for reminders
export const createReminder = async (reminder) => {
  // For now, we'll mock this functionality
  console.log("Creating reminder:", reminder);
  return {
    success: true,
    data: {
      id: `reminder-${Date.now()}`,
      ...reminder,
      createdAt: new Date(),
    }
  };
};

export const updateReminder = async (id, reminderData) => {
  // For now, we'll mock this functionality
  console.log("Updating reminder:", id, reminderData);
  return {
    success: true,
    data: {
      id,
      ...reminderData,
      updatedAt: new Date(),
    }
  };
};

export const fetchReminders = async (userId) => {
  // Mock data for now
  return {
    success: true,
    data: []
  };
};

export const deleteReminder = async (id) => {
  // Mock data for now
  console.log("Deleting reminder:", id);
  return {
    success: true
  };
};

export const snoozeReminder = async (id, duration) => {
  // Mock data for now
  console.log("Snoozing reminder:", id, "for", duration);
  return {
    success: true,
    data: {
      id,
      snoozedUntil: new Date(Date.now() + duration),
    }
  };
};

// Time tracking functions
export const startTimeTracking = async (taskId, userId) => {
  console.log("Starting time tracking:", taskId, userId);
  return {
    success: true,
    data: {
      id: `time-entry-${Date.now()}`,
      taskId,
      userId,
      startTime: new Date(),
    }
  };
};

export const stopTimeTracking = async (timeEntryId, description) => {
  console.log("Stopping time tracking:", timeEntryId, description);
  const endTime = new Date();
  return {
    success: true,
    data: {
      id: timeEntryId,
      endTime,
      description
    }
  };
};

export const addChecklistItem = async (taskId, itemText) => {
  console.log("Adding checklist item:", taskId, itemText);
  return {
    success: true,
    data: {
      id: `checklist-${Date.now()}`,
      text: itemText,
      completed: false,
      createdAt: new Date()
    }
  };
};

export const updateChecklistItem = async (taskId, itemId, updates) => {
  console.log("Updating checklist item:", taskId, itemId, updates);
  return {
    success: true,
    data: {
      id: itemId,
      ...updates,
      updatedAt: new Date()
    }
  };
};

export const deleteChecklistItem = async (taskId, itemId) => {
  console.log("Deleting checklist item:", taskId, itemId);
  return {
    success: true
  };
};

// Task duplication
export const duplicateTask = async (taskId, options = {}) => {
  console.log("Duplicating task:", taskId, options);
  return {
    success: true,
    data: {
      id: `task-${Date.now()}`,
      // Original task data would be duplicated here
      createdAt: new Date()
    }
  };
};
