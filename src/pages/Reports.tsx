
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import ChartBuilder, { ChartConfig } from '@/components/reports/ChartBuilder';
import ReportHeader from '@/components/reports/ReportHeader';
import ReportTabsNavigation from '@/components/reports/ReportTabsNavigation';
import DashboardTab from '@/components/reports/tabs/DashboardTab';
import IncidentsTab from '@/components/reports/tabs/IncidentsTab';
import ServiceRequestTab from '@/components/reports/tabs/ServiceRequestTab';
import ProblemsTab from '@/components/reports/tabs/ProblemsTab';
import ChangesTab from '@/components/reports/tabs/ChangesTab';
import ReleasesTab from '@/components/reports/tabs/ReleasesTab';
import AssetsTab from '@/components/reports/tabs/AssetsTab';
import BacklogTab from '@/components/reports/tabs/BacklogTab';
import TimeTrackingTab from '@/components/reports/tabs/TimeTrackingTab';
import { mockIncidentData } from '@/utils/mockData/reportData';

const ReportsPage: React.FC = () => {
  const [savedCharts, setSavedCharts] = useState<ChartConfig[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  
  const handleSaveChart = (config: ChartConfig) => {
    const exists = savedCharts.findIndex(c => c.id === config.id);
    if (exists >= 0) {
      setSavedCharts(savedCharts.map(c => c.id === config.id ? config : c));
    } else {
      setSavedCharts([...savedCharts, config]);
    }
    setIsCreating(false);
  };
  
  const handleDeleteChart = (id: string) => {
    setSavedCharts(savedCharts.filter(c => c.id !== id));
  };
  
  const handleSegmentClick = (value: string) => {
    setSelectedSegment(value);
  };
  
  return (
    <PageTransition>
      <div className="space-y-6">
        <ReportHeader isCreating={isCreating} setIsCreating={setIsCreating} />
        
        {isCreating ? (
          <ChartBuilder 
            onSaveChart={handleSaveChart} 
            onDeleteChart={handleDeleteChart}
            savedCharts={savedCharts}
          />
        ) : (
          <Tabs defaultValue="dashboard" className="space-y-4">
            <ReportTabsNavigation />
            
            <TabsContent value="dashboard">
              <DashboardTab 
                savedCharts={savedCharts} 
                setIsCreating={setIsCreating} 
                onSegmentClick={handleSegmentClick} 
              />
            </TabsContent>
            
            <TabsContent value="incidents">
              <IncidentsTab 
                selectedSegment={selectedSegment} 
                onSegmentClick={handleSegmentClick} 
              />
            </TabsContent>
            
            <TabsContent value="service">
              <ServiceRequestTab 
                selectedSegment={selectedSegment}
                onSegmentClick={handleSegmentClick} 
              />
            </TabsContent>
            
            <TabsContent value="problems">
              <ProblemsTab 
                selectedSegment={selectedSegment}
                onSegmentClick={handleSegmentClick} 
              />
            </TabsContent>
            
            <TabsContent value="changes">
              <ChangesTab onSegmentClick={handleSegmentClick} />
            </TabsContent>
            
            <TabsContent value="releases">
              <ReleasesTab onSegmentClick={handleSegmentClick} />
            </TabsContent>
            
            <TabsContent value="assets">
              <AssetsTab onSegmentClick={handleSegmentClick} />
            </TabsContent>
            
            <TabsContent value="backlog">
              <BacklogTab onSegmentClick={handleSegmentClick} />
            </TabsContent>
            
            <TabsContent value="time">
              <TimeTrackingTab />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </PageTransition>
  );
};

export default ReportsPage;
