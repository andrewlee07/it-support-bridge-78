
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Problem } from '@/utils/types/problem';
import ProblemDetails from './ProblemDetails';
import ProblemActivity from './ProblemActivity';
import ProblemUpdateForm from './ProblemUpdateForm';
import ProblemResolveForm from './ProblemResolveForm';
import ProblemNoteForm from './ProblemNoteForm';
import KnownErrorForm from './KnownErrorForm';
import { Button } from '@/components/ui/button';
import {
  Badge,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { formatDistanceToNow } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Database, AlertTriangle } from 'lucide-react';

interface ProblemDetailViewProps {
  problem: Problem;
  onUpdateProblem: (data: any) => void;
  onResolveProblem: (data: any) => void;
  onAddNote: (note: string) => void;
  onCreateKnownError: (data: any) => void;
  onCloseProblem: (notes: string) => void;
  onReopenProblem: (reason: string) => void;
}

const ProblemDetailView: React.FC<ProblemDetailViewProps> = ({
  problem,
  onUpdateProblem,
  onResolveProblem,
  onAddNote,
  onCreateKnownError,
  onCloseProblem,
  onReopenProblem
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isClosingDialogOpen, setIsClosingDialogOpen] = useState(false);
  const [isReopenDialogOpen, setIsReopenDialogOpen] = useState(false);
  const [closureNotes, setClosureNotes] = useState('');
  const [reopenReason, setReopenReason] = useState('');

  const isClosed = problem.status === 'closed';
  const canClose = problem.status === 'resolved' || problem.status === 'known-error';
  const canReopen = problem.status === 'closed';
  
  const getStatusBadge = (status: string) => {
    let color = '';
    switch (status) {
      case 'new':
        color = 'bg-blue-500';
        break;
      case 'under-investigation':
        color = 'bg-purple-500';
        break;
      case 'root-cause-identified':
        color = 'bg-yellow-500';
        break;
      case 'known-error':
        color = 'bg-orange-500';
        break;
      case 'resolved':
        color = 'bg-green-500';
        break;
      case 'closed':
        color = 'bg-gray-500';
        break;
      default:
        color = 'bg-gray-500';
    }
    return (
      <Badge 
        variant="secondary"
        className={`${color} text-white hover:${color}`}
      >
        {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </Badge>
    );
  };

  const handleCloseProblemClick = () => {
    onCloseProblem(closureNotes);
    setIsClosingDialogOpen(false);
    setClosureNotes('');
  };

  const handleReopenProblemClick = () => {
    onReopenProblem(reopenReason);
    setIsReopenDialogOpen(false);
    setReopenReason('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{problem.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-muted-foreground">{problem.id}</span>
              {getStatusBadge(problem.status)}
              <Badge variant="outline">{problem.category}</Badge>
              <Badge variant="outline" className="bg-amber-100">Priority: {problem.priority}</Badge>
            </div>
          </div>
          <div className="space-x-2">
            {canClose && !isClosed && (
              <Dialog open={isClosingDialogOpen} onOpenChange={setIsClosingDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Close Problem</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Close Problem</DialogTitle>
                    <DialogDescription>
                      Add any final notes before closing this problem record.
                    </DialogDescription>
                  </DialogHeader>
                  <Textarea
                    value={closureNotes}
                    onChange={(e) => setClosureNotes(e.target.value)}
                    placeholder="Add any final notes..."
                    className="min-h-[100px]"
                  />
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsClosingDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCloseProblemClick}>
                      Close Problem
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            
            {canReopen && (
              <Dialog open={isReopenDialogOpen} onOpenChange={setIsReopenDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Reopen Problem</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reopen Problem</DialogTitle>
                    <DialogDescription>
                      Provide a reason for reopening this problem record.
                    </DialogDescription>
                  </DialogHeader>
                  <Textarea
                    value={reopenReason}
                    onChange={(e) => setReopenReason(e.target.value)}
                    placeholder="Reason for reopening..."
                    className="min-h-[100px]"
                  />
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsReopenDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleReopenProblemClick}>
                      Reopen Problem
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground">
          Created {formatDistanceToNow(new Date(problem.createdAt), { addSuffix: true })} 
          {problem.assignedTo && ` • Assigned to ${problem.assignedTo}`}
        </p>
        
        {problem.knownErrorId && (
          <div className="flex items-center mt-2 p-2 bg-amber-50 border border-amber-200 rounded-md">
            <Database className="text-amber-500 mr-2 h-5 w-5" />
            <div>
              <span className="font-medium">Known Error: </span>
              <span>{problem.knownErrorId}</span>
              <p className="text-sm text-muted-foreground mt-1">
                A workaround has been identified for this problem.
              </p>
            </div>
          </div>
        )}
        
        {canClose && !isClosed && (
          <div className="flex items-center mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
            <AlertCircle className="text-blue-500 mr-2 h-5 w-5" />
            <div>
              <span className="font-medium">This problem is ready to be closed</span>
              <p className="text-sm text-muted-foreground mt-1">
                The problem has been {problem.status === 'known-error' ? 'documented as a known error' : 'resolved'} and can now be closed.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          {!isClosed && (
            <>
              <TabsTrigger value="update">Update</TabsTrigger>
              <TabsTrigger value="resolve">Resolve</TabsTrigger>
              <TabsTrigger value="note">Add Note</TabsTrigger>
              <TabsTrigger value="kedb">
                <Database className="h-4 w-4 mr-1" /> Create Known Error
              </TabsTrigger>
            </>
          )}
        </TabsList>
        
        <TabsContent value="details" className="pt-6">
          <ProblemDetails problem={problem} />
        </TabsContent>
        
        <TabsContent value="activity" className="pt-6">
          <ProblemActivity auditEntries={problem.audit} />
        </TabsContent>
        
        {!isClosed && (
          <>
            <TabsContent value="update" className="pt-6">
              <ProblemUpdateForm 
                problem={problem} 
                onSubmit={onUpdateProblem} 
                onCancel={() => setActiveTab('details')}
              />
            </TabsContent>
            
            <TabsContent value="resolve" className="pt-6">
              <ProblemResolveForm 
                problem={problem} 
                onSubmit={onResolveProblem} 
                onCancel={() => setActiveTab('details')}
              />
            </TabsContent>
            
            <TabsContent value="note" className="pt-6">
              <ProblemNoteForm 
                onSubmit={(note) => {
                  onAddNote(note);
                  setActiveTab('details');
                }} 
                onCancel={() => setActiveTab('details')}
              />
            </TabsContent>
            
            <TabsContent value="kedb" className="pt-6">
              <KnownErrorForm 
                problem={problem} 
                onSubmit={(data) => {
                  onCreateKnownError(data);
                  setActiveTab('details');
                }} 
                onCancel={() => setActiveTab('details')}
              />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default ProblemDetailView;
