
import React from 'react';
import { Problem } from '@/utils/types/problem';
import { TabsContent } from '@/components/ui/tabs';
import ProblemDetails from '../ProblemDetails';
import ProblemActivity from '../ProblemActivity';
import ProblemUpdateForm from '../ProblemUpdateForm';
import ProblemResolveForm from '../ProblemResolveForm';
import ProblemNoteForm from '../ProblemNoteForm';
import KnownErrorForm from '../KnownErrorForm';
import { Database } from 'lucide-react';

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

const ProblemTabContent = ({
  activeTab,
  problem,
  isClosed,
  onUpdateProblem,
  onResolveProblem,
  onAddNote,
  onCreateKnownError,
  setActiveTab
}: ProblemTabContentProps) => {
  return (
    <>
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
    </>
  );
};

export default ProblemTabContent;
