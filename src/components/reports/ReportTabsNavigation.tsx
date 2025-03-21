
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Clock, MessageSquare, FileCheck, FileText, Wrench, Puzzle, PackageOpen, Briefcase } from 'lucide-react';

const ReportTabsNavigation: React.FC = () => {
  return (
    <TabsList className="flex flex-wrap justify-start">
      <TabsTrigger value="dashboard" className="flex items-center gap-1">
        <BarChart className="h-4 w-4" />
        Dashboard
      </TabsTrigger>
      <TabsTrigger value="incidents" className="flex items-center gap-1">
        <MessageSquare className="h-4 w-4" />
        Incidents
      </TabsTrigger>
      <TabsTrigger value="service" className="flex items-center gap-1">
        <MessageSquare className="h-4 w-4" />
        Service Requests
      </TabsTrigger>
      <TabsTrigger value="problems" className="flex items-center gap-1">
        <Puzzle className="h-4 w-4" />
        Problems
      </TabsTrigger>
      <TabsTrigger value="changes" className="flex items-center gap-1">
        <Wrench className="h-4 w-4" />
        Changes
      </TabsTrigger>
      <TabsTrigger value="releases" className="flex items-center gap-1">
        <PackageOpen className="h-4 w-4" />
        Releases
      </TabsTrigger>
      <TabsTrigger value="assets" className="flex items-center gap-1">
        <Briefcase className="h-4 w-4" />
        Assets
      </TabsTrigger>
      <TabsTrigger value="backlog" className="flex items-center gap-1">
        <FileText className="h-4 w-4" />
        Backlog
      </TabsTrigger>
      <TabsTrigger value="time" className="flex items-center gap-1">
        <Clock className="h-4 w-4" />
        Time Tracking
      </TabsTrigger>
    </TabsList>
  );
};

export default ReportTabsNavigation;
