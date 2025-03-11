
import { 
  fetchTasks, 
  fetchTaskById, 
  createTask, 
  updateTask, 
  deleteTask,
  addTaskNote,
  getTaskStats,
  getTasksDueToday
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
  getTasksDueToday
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
