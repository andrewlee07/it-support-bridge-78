
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ServerCogIcon, 
  AlertCircleIcon, 
  MessageSquareIcon,
  PanelRightIcon,
  OctagonAlertIcon,
  BoxIcon,
  AlertTriangleIcon,
  Settings2Icon,
  ShieldIcon,
  DatabaseIcon,
  ListIcon
} from 'lucide-react';

const AdminSettings = () => {
  const navigate = useNavigate();
  
  const configurationModules = [
    // System Settings
    {
      title: 'System Configuration',
      description: 'Manage global system settings',
      icon: ServerCogIcon,
      path: '/admin/system-configuration'
    },
    {
      title: 'Security Settings',
      description: 'Configure security and authentication',
      icon: ShieldIcon,
      path: '/admin/security-settings'
    },
    {
      title: 'Error Logs',
      description: 'View system error logs',
      icon: AlertTriangleIcon,
      path: '/admin/error-logs'
    },
    
    // Process Configurations
    {
      title: 'Incident Configuration',
      description: 'Configure incident management settings',
      icon: AlertCircleIcon,
      path: '/admin/incident-configuration'
    },
    {
      title: 'Service Request Configuration',
      description: 'Configure service request settings',
      icon: MessageSquareIcon,
      path: '/admin/service-request-configuration'
    },
    {
      title: 'Change Configuration',
      description: 'Configure change management settings',
      icon: PanelRightIcon,
      path: '/admin/change-configuration'
    },
    {
      title: 'Problem Configuration',
      description: 'Configure problem management settings',
      icon: OctagonAlertIcon,
      path: '/admin/problem-configuration'
    },
    {
      title: 'Asset Configuration',
      description: 'Configure asset management settings',
      icon: BoxIcon,
      path: '/admin/asset-configuration'
    },
    
    // Dropdown & Field Configurations
    {
      title: 'SLA Settings',
      description: 'Configure service level agreements',
      icon: Settings2Icon,
      path: '/admin/sla-settings'
    }
  ];

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Admin Configuration</h1>
      <p className="text-muted-foreground">
        Configure system settings and module-specific configurations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {configurationModules.map((module, index) => (
          <Card 
            key={index} 
            className="hover:bg-accent/50 cursor-pointer transition-colors"
            onClick={() => navigate(module.path)}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <module.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{module.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{module.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminSettings;
