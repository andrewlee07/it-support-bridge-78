
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Problem } from '@/utils/types/problem';
import ProblemDetails from '../ProblemDetails';
import ProblemUpdateForm from '../ProblemUpdateForm';
import ProblemResolveForm from '../ProblemResolveForm';
import ProblemNoteForm from '../ProblemNoteForm';
import RelatedItemsCard from '@/components/shared/RelatedItemsCard';

interface ProblemTabContentProps {
  activeTab: string;
  problem: Problem;
  isClosed: boolean;
  onUpdateProblem: (data: any) => void;
  onResolveProblem: (data: any) => void;
  onAddNote: (note: string) => void;
  onCreateKnownError: (data: any) => void;
  setActiveTab: (tab: string) => void;
}

const ProblemTabContent: React.FC<ProblemTabContentProps> = ({
  activeTab,
  problem,
  isClosed,
  onUpdateProblem,
  onResolveProblem,
  onAddNote,
  onCreateKnownError,
  setActiveTab
}) => {
  // Create mock relatedItems for demo purposes - in a real app this would come from the problem
  const relatedItems = [
    ...(problem.relatedIncidents || []).map(incidentId => ({
      id: incidentId,
      title: `Incident ${incidentId}`,
      type: 'incident' as const,
      status: 'resolved',
      url: `/incidents/${incidentId}`
    }))
  ];
  
  if (problem.knownErrorId) {
    relatedItems.push({
      id: problem.knownErrorId,
      title: `Known Error: ${problem.title}`,
      type: 'knownError' as const,
      status: 'active',
      url: `/problems/known-errors/${problem.knownErrorId}`
    });
  }
  
  return (
    <>
      {/* Details Tab */}
      <TabsContent value="details" className="mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProblemDetails problem={problem} />
          </div>
          <div>
            <RelatedItemsCard 
              items={relatedItems}
              title="Related Items"
              description="Items associated with this problem"
            />
          </div>
        </div>
      </TabsContent>
      
      {/* Update Tab */}
      {!isClosed && (
        <TabsContent value="update" className="mt-4">
          <div className="border p-4 rounded-md bg-muted/30">
            <ProblemUpdateForm 
              problem={problem} 
              onSubmit={(data) => {
                onUpdateProblem(data);
                setActiveTab('details');
              }}
              onCancel={() => setActiveTab('details')}
            />
          </div>
        </TabsContent>
      )}
      
      {/* Resolve Tab */}
      {!isClosed && problem.status !== 'resolved' && problem.status !== 'known-error' && (
        <TabsContent value="resolve" className="mt-4">
          <ProblemResolveForm 
            problem={problem}
            onSubmit={(data) => {
              onResolveProblem(data);
              setActiveTab('details');
            }}
            onCancel={() => setActiveTab('details')}
          />
        </TabsContent>
      )}
      
      {/* Add Note Tab */}
      {!isClosed && (
        <TabsContent value="note" className="mt-4">
          <div className="border p-4 rounded-md bg-muted/30">
            <ProblemNoteForm 
              onSubmit={(note) => {
                onAddNote(note);
                setActiveTab('details');
              }}
              onCancel={() => setActiveTab('details')}
            />
          </div>
        </TabsContent>
      )}
      
      {/* Create Known Error Tab */}
      {!isClosed && problem.status !== 'known-error' && (
        <TabsContent value="known-error" className="mt-4">
          <div className="border p-4 rounded-md bg-muted/30">
            <h2 className="text-xl font-semibold mb-4">Create Known Error</h2>
            <p className="text-muted-foreground mb-4">
              Create a known error record from this problem. This will document the issue and any available workarounds.
            </p>
            {/* The form would be here, but we're using a dialog approach instead */}
            <div className="flex justify-end">
              <Button onClick={() => setActiveTab('details')}>Cancel</Button>
            </div>
          </div>
        </TabsContent>
      )}
    </>
  );
};

export default ProblemTabContent;
