
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter,
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Task } from '@/utils/types/taskTypes';
import { ChevronRight, ArrowRightLeft } from 'lucide-react';

// Mock releases and sprints data
const mockReleases = [
  { id: 'release-1', title: 'Release 1.0', date: '2023-12-31', progress: 70 },
  { id: 'release-2', title: 'Release 1.1', date: '2024-03-15', progress: 40 },
  { id: 'release-3', title: 'Release 2.0', date: '2024-06-30', progress: 10 }
];

const mockSprints = [
  { id: 'sprint-1', title: 'Sprint 1', releaseId: 'release-1', startDate: '2023-09-01', endDate: '2023-09-15', capacity: 40, allocated: 35 },
  { id: 'sprint-2', title: 'Sprint 2', releaseId: 'release-1', startDate: '2023-09-16', endDate: '2023-09-30', capacity: 45, allocated: 45 },
  { id: 'sprint-3', title: 'Sprint 3', releaseId: 'release-1', startDate: '2023-10-01', endDate: '2023-10-15', capacity: 50, allocated: 25 },
  { id: 'sprint-4', title: 'Sprint 4', releaseId: 'release-2', startDate: '2023-10-16', endDate: '2023-10-31', capacity: 50, allocated: 15 },
  { id: 'sprint-5', title: 'Sprint 5', releaseId: 'release-2', startDate: '2023-11-01', endDate: '2023-11-15', capacity: 50, allocated: 10 },
  { id: 'sprint-6', title: 'Sprint 6', releaseId: 'release-3', startDate: '2023-11-16', endDate: '2023-11-30', capacity: 40, allocated: 5 }
];

interface SprintReleaseAlignmentViewProps {
  tasks: Task[];
  onMoveTask: (taskId: string, sprintId: string) => void;
}

const SprintReleaseAlignmentView: React.FC<SprintReleaseAlignmentViewProps> = ({ 
  tasks, 
  onMoveTask 
}) => {
  const [selectedReleaseId, setSelectedReleaseId] = useState<string>(mockReleases[0]?.id || '');
  const [moveTaskDialogOpen, setMoveTaskDialogOpen] = useState(false);
  const [taskToMove, setTaskToMove] = useState<{ taskId: string, currentSprintId: string } | null>(null);
  const [targetSprintId, setTargetSprintId] = useState<string>('');
  
  const selectedRelease = useMemo(() => {
    return mockReleases.find(r => r.id === selectedReleaseId);
  }, [selectedReleaseId]);
  
  const releaseSprints = useMemo(() => {
    return mockSprints.filter(s => s.releaseId === selectedReleaseId);
  }, [selectedReleaseId]);
  
  // Helper function to get tasks for a sprint
  const getTasksForSprint = (sprintId: string) => {
    // In a real app, you'd filter tasks by sprintId
    // For demo purposes, we'll distribute tasks across sprints artificially
    const sprintIndex = mockSprints.findIndex(s => s.id === sprintId);
    return tasks.filter((_, index) => index % mockSprints.length === sprintIndex);
  };
  
  const handleMoveTaskClick = (taskId: string, currentSprintId: string) => {
    setTaskToMove({ taskId, currentSprintId });
    setTargetSprintId('');
    setMoveTaskDialogOpen(true);
  };
  
  const handleMoveTaskConfirm = () => {
    if (taskToMove && targetSprintId) {
      onMoveTask(taskToMove.taskId, targetSprintId);
      setMoveTaskDialogOpen(false);
      setTaskToMove(null);
    }
  };
  
  if (!selectedRelease || releaseSprints.length === 0) {
    return (
      <div className="text-center p-8">
        <p>No release or sprint data available.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sprint-Release Alignment</h2>
        <Select value={selectedReleaseId} onValueChange={setSelectedReleaseId}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select release" />
          </SelectTrigger>
          <SelectContent>
            {mockReleases.map(release => (
              <SelectItem key={release.id} value={release.id}>
                {release.title} ({release.date})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{selectedRelease.title}</CardTitle>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Target Date: {selectedRelease.date}</span>
            <span>•</span>
            <span>Progress: {selectedRelease.progress}%</span>
          </div>
          <Progress value={selectedRelease.progress} className="h-2" />
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {releaseSprints.map(sprint => {
          const sprintTasks = getTasksForSprint(sprint.id);
          const capacityPercentage = (sprint.allocated / sprint.capacity) * 100;
          
          return (
            <Card key={sprint.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>{sprint.title}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {sprint.startDate} to {sprint.endDate}
                  </span>
                </CardTitle>
                <div className="text-sm text-muted-foreground flex justify-between">
                  <span>Capacity: {sprint.allocated}/{sprint.capacity} points</span>
                  <span className={`${capacityPercentage > 95 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {capacityPercentage.toFixed(0)}%
                  </span>
                </div>
                <Progress 
                  value={capacityPercentage} 
                  className={`h-1 ${capacityPercentage > 95 ? 'bg-destructive/20' : ''}`}
                />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium mb-2">Tasks ({sprintTasks.length})</div>
                {sprintTasks.length === 0 ? (
                  <div className="text-sm text-muted-foreground p-2 border border-dashed rounded-md text-center">
                    No tasks in this sprint
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {sprintTasks.map(task => (
                      <div 
                        key={task.id} 
                        className="p-2 border rounded-md text-sm flex justify-between items-center hover:bg-accent"
                      >
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {task.status} • {task.priority}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleMoveTaskClick(task.id, sprint.id)}
                        >
                          <ArrowRightLeft className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Move Task Dialog */}
      <Dialog open={moveTaskDialogOpen} onOpenChange={setMoveTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move Task to Another Sprint</DialogTitle>
            <DialogDescription>
              Select a sprint to move this task to. This will update the task's sprint assignment.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Select value={targetSprintId} onValueChange={setTargetSprintId}>
              <SelectTrigger>
                <SelectValue placeholder="Select target sprint" />
              </SelectTrigger>
              <SelectContent>
                {mockSprints.map(sprint => (
                  <SelectItem 
                    key={sprint.id} 
                    value={sprint.id}
                    disabled={sprint.id === taskToMove?.currentSprintId}
                  >
                    {sprint.title} ({mockReleases.find(r => r.id === sprint.releaseId)?.title})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {taskToMove && (
              <div className="mt-4 p-3 border rounded-md">
                <div className="text-sm font-medium">
                  Task: {tasks.find(t => t.id === taskToMove.taskId)?.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Current Sprint: {mockSprints.find(s => s.id === taskToMove.currentSprintId)?.title}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setMoveTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleMoveTaskConfirm}
              disabled={!targetSprintId}
            >
              Move Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SprintReleaseAlignmentView;
