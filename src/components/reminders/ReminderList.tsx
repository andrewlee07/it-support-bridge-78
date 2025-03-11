
import React, { useState } from 'react';
import { Reminder, isReminderDue, ReminderStatus } from '@/utils/types/reminderTypes';
import ReminderCard from './ReminderCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ReminderForm from './ReminderForm';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle } from 'lucide-react';

// Mock reminder data
const mockReminders: Reminder[] = [
  {
    id: 'reminder-1',
    title: 'Review server logs',
    description: 'Check server logs for any anomalies or errors',
    triggerType: 'time-based',
    triggerTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    frequency: 'one-time',
    deliveryMethods: ['in-app', 'email'],
    status: 'active',
    userId: 'user-1',
    creatorId: 'user-1',
    relatedItemId: 'task-123',
    relatedItemType: 'task',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: 'reminder-2',
    title: 'Update security certificates',
    description: 'SSL certificates need to be renewed before expiration',
    triggerType: 'time-based',
    triggerTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago (overdue)
    frequency: 'one-time',
    deliveryMethods: ['in-app', 'email', 'push'],
    status: 'active',
    userId: 'user-1',
    creatorId: 'user-2',
    relatedItemId: 'task-456',
    relatedItemType: 'task',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'reminder-3',
    title: 'Weekly team meeting',
    description: 'Discuss project progress and upcoming tasks',
    triggerType: 'time-based',
    triggerTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
    frequency: 'weekly',
    deliveryMethods: ['in-app'],
    status: 'active',
    userId: 'user-1',
    creatorId: 'user-1',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'reminder-4',
    title: 'Back up database',
    description: 'Perform scheduled database backup',
    triggerType: 'time-based',
    triggerTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    frequency: 'monthly',
    deliveryMethods: ['in-app', 'email'],
    status: 'snoozed',
    userId: 'user-1',
    creatorId: 'user-3',
    snoozedUntil: new Date(Date.now() + 24 * 60 * 60 * 1000), // Snoozed for 1 day
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'reminder-5',
    title: 'Update documentation',
    description: 'Add new features to the user documentation',
    triggerType: 'time-based',
    triggerTime: new Date(),
    frequency: 'one-time',
    deliveryMethods: ['in-app'],
    status: 'completed',
    userId: 'user-1',
    creatorId: 'user-1',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  }
];

interface ReminderListProps {
  filter?: 'all' | 'today' | 'upcoming' | 'completed' | 'snoozed';
}

const ReminderList: React.FC<ReminderListProps> = ({ filter = 'all' }) => {
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  // Filter reminders based on the selected filter
  const filteredReminders = reminders.filter(reminder => {
    if (filter === 'all') return true;
    if (filter === 'today') return reminder.triggerTime && isToday(new Date(reminder.triggerTime));
    if (filter === 'upcoming') return reminder.status === 'active' && !isReminderDue(reminder);
    if (filter === 'completed') return reminder.status === 'completed';
    if (filter === 'snoozed') return reminder.status === 'snoozed';
    return true;
  });

  // Helper function to check if a date is today
  function isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  const handleCompleteReminder = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id ? { ...reminder, status: 'completed' as ReminderStatus } : reminder
      )
    );
    toast({
      title: "Reminder completed",
      description: "Reminder has been marked as completed",
    });
  };

  const handleCancelReminder = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id ? { ...reminder, status: 'cancelled' as ReminderStatus } : reminder
      )
    );
    toast({
      title: "Reminder cancelled",
      description: "Reminder has been cancelled",
    });
  };

  const handleEditReminder = (reminder: Reminder) => {
    setSelectedReminder(reminder);
    setIsEditDialogOpen(true);
  };

  const handleSnoozeReminder = (id: string, duration: number) => {
    const snoozedUntil = new Date(Date.now() + duration);
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id ? { 
          ...reminder, 
          status: 'snoozed' as ReminderStatus,
          snoozedUntil
        } : reminder
      )
    );
    toast({
      title: "Reminder snoozed",
      description: `Reminder snoozed until ${snoozedUntil.toLocaleString()}`,
    });
  };

  const handleReminderUpdated = (updatedReminder: Reminder) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === updatedReminder.id ? updatedReminder : reminder
      )
    );
    setIsEditDialogOpen(false);
    toast({
      title: "Reminder updated",
      description: "Your reminder has been updated successfully",
    });
  };

  if (filteredReminders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No reminders found</h3>
        <p className="text-muted-foreground mt-1">
          {filter === 'today' ? "You don't have any reminders scheduled for today." :
           filter === 'upcoming' ? "You don't have any upcoming reminders." :
           filter === 'completed' ? "You don't have any completed reminders." :
           filter === 'snoozed' ? "You don't have any snoozed reminders." :
           "You don't have any reminders."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {filteredReminders.map(reminder => (
          <ReminderCard
            key={reminder.id}
            reminder={reminder}
            onCompleteReminder={handleCompleteReminder}
            onCancelReminder={handleCancelReminder}
            onEditReminder={handleEditReminder}
            onSnoozeReminder={handleSnoozeReminder}
            onClick={() => handleEditReminder(reminder)}
          />
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Reminder</DialogTitle>
          </DialogHeader>
          {selectedReminder && (
            <ReminderForm
              initialData={selectedReminder}
              onReminderUpdated={handleReminderUpdated}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReminderList;
