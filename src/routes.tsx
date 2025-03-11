
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '@/components/shared/Sidebar';
import Navbar from '@/components/shared/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import TaskDashboard from '@/components/tasks/TaskDashboard';
import TaskDetail from '@/components/tasks/TaskDetail';
import TaskForm from '@/components/tasks/TaskForm';
import ReminderDashboard from '@/components/reminders/ReminderDashboard';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1">
            <Routes>
              {/* Default route */}
              <Route path="/" element={<Navigate to="/tasks/dashboard" replace />} />
              
              {/* Task routes */}
              <Route path="/tasks/dashboard" element={<TaskDashboard />} />
              <Route path="/tasks/new" element={<TaskForm />} />
              <Route path="/tasks/:id" element={<TaskDetail />} />
              
              {/* Reminder routes */}
              <Route path="/reminders" element={<ReminderDashboard />} />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        <Toaster />
        <SonnerToaster position="top-right" />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
