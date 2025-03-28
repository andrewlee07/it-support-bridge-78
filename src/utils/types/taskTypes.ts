
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  category: string;
  createdBy: string;
  assignedTo: string | null;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date | null;
  completedAt: Date | null;
  estimatedHours: number;
  actualHours: number;
  attachments: any[];
  relatedItemId: string | null;
  relatedItemType: string | null;
}
