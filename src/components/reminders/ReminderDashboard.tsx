
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Clock, Calendar, Bell, CheckCircle, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReminderDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('upcoming');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const openReminderForm = () => {
    setIsFormOpen(true);
  };

  const closeReminderForm = () => {
    setIsFormOpen(false);
  };

  const handleReminderCreated = () => {
    closeReminderForm();
    // You could add a toast notification here
  };

  const stats = {
    totalReminders: 12,
    activeReminders: 8,
    overdueReminders: 2,
    snoozedReminders: 1,
    completedReminders: 4
  };

  return (
    <div className="container py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reminders</h1>
          <p className="text-muted-foreground">
            Manage your reminders and never miss an important task
          </p>
        </div>
        <Button onClick={openReminderForm}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Reminder
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Reminders</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReminders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeReminders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.overdueReminders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedReminders}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">
            <Clock className="mr-2 h-4 w-4" />
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="today">
            <Calendar className="mr-2 h-4 w-4" />
            Today
          </TabsTrigger>
          <TabsTrigger value="all">
            <Bell className="mr-2 h-4 w-4" />
            All Reminders
          </TabsTrigger>
          <TabsTrigger value="completed">
            <CheckCircle className="mr-2 h-4 w-4" />
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <ReminderList filter="upcoming" />
        </TabsContent>
        
        <TabsContent value="today">
          <ReminderList filter="today" />
        </TabsContent>
        
        <TabsContent value="all">
          <ReminderList filter="all" />
        </TabsContent>
        
        <TabsContent value="completed">
          <ReminderList filter="completed" />
        </TabsContent>
      </Tabs>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Reminder</DialogTitle>
          </DialogHeader>
          <ReminderForm 
            onReminderCreated={handleReminderCreated}
            onCancel={closeReminderForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReminderDashboard;
