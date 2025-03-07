
import React from 'react';
import { AlertCircle, Clock, FileText, BarChart3, ArrowUpRight } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatCard from '@/components/dashboard/StatCard';
import IncidentsList from '@/components/dashboard/IncidentsList';
import { getDashboardStats, getTicketsByStatus, getTicketsByType } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import PageTransition from '@/components/shared/PageTransition';

const Dashboard = () => {
  const stats = getDashboardStats();
  const openIncidents = getTicketsByStatus('open').filter(ticket => ticket.type === 'incident');
  const inProgressIncidents = getTicketsByStatus('in-progress').filter(ticket => ticket.type === 'incident');
  const recentTickets = [...getTicketsByType('incident'), ...getTicketsByType('service')]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Data for pie chart
  const pieData = [
    { name: 'Hardware', value: 8 },
    { name: 'Software', value: 12 },
    { name: 'Network', value: 5 },
    { name: 'Access', value: 7 },
    { name: 'Other', value: 3 },
  ];
  
  const COLORS = ['#3b82f6', '#f97316', '#10b981', '#8b5cf6', '#6b7280'];

  // Data for area chart
  const areaData = [
    { name: 'Mon', incidents: 4, requests: 6 },
    { name: 'Tue', incidents: 3, requests: 4 },
    { name: 'Wed', incidents: 5, requests: 8 },
    { name: 'Thu', incidents: 6, requests: 7 },
    { name: 'Fri', incidents: 4, requests: 5 },
    { name: 'Sat', incidents: 2, requests: 3 },
    { name: 'Sun', incidents: 1, requests: 2 },
  ];

  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your IT support metrics
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Open Incidents" 
            value={stats.openIncidents} 
            icon={AlertCircle}
            trend={{ value: 12, isPositive: false }}
            description="Total number of unresolved incidents"
          />
          <StatCard 
            title="Open Service Requests" 
            value={stats.openServiceRequests} 
            icon={FileText}
            trend={{ value: 8, isPositive: true }}
            description="Total number of pending requests"
          />
          <StatCard 
            title="SLA Compliance" 
            value={`${stats.slaCompliance}%`} 
            icon={Clock}
            trend={{ value: 5, isPositive: true }}
            description="Overall compliance with SLAs"
          />
          <StatCard 
            title="Tickets This Week" 
            value="34" 
            icon={BarChart3}
            trend={{ value: 15, isPositive: true }}
            description="Total tickets received this week"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard 
            title="High Priority Incidents" 
            description="Incidents that need immediate attention"
            className="lg:col-span-2"
          >
            <IncidentsList 
              tickets={[...openIncidents, ...inProgressIncidents].filter(t => t.priority === 'high')} 
              compact 
            />
          </DashboardCard>
          
          <DashboardCard title="Ticket Distribution" description="Tickets by category">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <DashboardCard title="Recent Tickets" description="Most recently created tickets">
            <IncidentsList tickets={recentTickets} compact />
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" asChild>
                <Link to="/incidents" className="flex items-center">
                  View all tickets
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Weekly Trend" description="Incidents and service requests this week">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="incidents" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                  <Area type="monotone" dataKey="requests" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
