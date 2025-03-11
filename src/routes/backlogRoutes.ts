
import React from 'react';
import Backlog from '@/pages/Backlog';
import BacklogKanban from '@/pages/BacklogKanban';
import BacklogList from '@/pages/BacklogList';
import BacklogTimeline from '@/pages/BacklogTimeline';
import BacklogCalendar from '@/pages/BacklogCalendar';
import BacklogReporting from '@/pages/BacklogReporting';

export const backlogRoutes = [
  {
    path: '/backlog',
    element: React.createElement(Backlog)
  },
  {
    path: '/backlog/kanban',
    element: React.createElement(BacklogKanban)
  },
  {
    path: '/backlog/list',
    element: React.createElement(BacklogList)
  },
  {
    path: '/backlog/timeline',
    element: React.createElement(BacklogTimeline)
  },
  {
    path: '/backlog/calendar',
    element: React.createElement(BacklogCalendar)
  },
  {
    path: '/backlog/reporting',
    element: React.createElement(BacklogReporting)
  }
];
