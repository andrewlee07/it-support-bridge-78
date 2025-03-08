
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  AlertCircle, Headphones, PanelRightIcon, OctagonAlert, 
  BoxesIcon, Bug, GitPullRequest, FlaskConical, ShieldAlert 
} from 'lucide-react';

const AdminSettings = () => {
  const configurationTiles = [
    {
      title: 'Incident Configuration',
      description: 'Configure incident management settings, SLAs, fields, and workflows',
      icon: <AlertCircle className="h-8 w-8 text-primary/80" />,
      path: '/admin/incident-configuration'
    },
    {
      title: 'Service Request Configuration',
      description: 'Configure service request settings, SLAs, fields, and workflows',
      icon: <Headphones className="h-8 w-8 text-primary/80" />,
      path: '/admin/service-request-configuration'
    },
    {
      title: 'Change Configuration',
      description: 'Configure change management settings, risk assessments, and approval workflows',
      icon: <PanelRightIcon className="h-8 w-8 text-primary/80" />,
      path: '/admin/change-configuration'
    },
    {
      title: 'Problem Configuration',
      description: 'Configure problem management settings, workflows, and fields',
      icon: <OctagonAlert className="h-8 w-8 text-primary/80" />,
      path: '/admin/problem-configuration'
    },
    {
      title: 'Asset Configuration',
      description: 'Configure asset management settings, lifecycle stages, and fields',
      icon: <BoxesIcon className="h-8 w-8 text-primary/80" />,
      path: '/admin/asset-configuration'
    },
    {
      title: 'Bug Configuration',
      description: 'Configure bug severity levels, workflows, and fields',
      icon: <Bug className="h-8 w-8 text-primary/80" />,
      path: '/admin/bug-configuration'
    },
    {
      title: 'Release Configuration',
      description: 'Configure release management workflows and settings',
      icon: <GitPullRequest className="h-8 w-8 text-primary/80" />,
      path: '/admin/release-configuration'
    },
    {
      title: 'Test Configuration',
      description: 'Configure test management settings and workflows',
      icon: <FlaskConical className="h-8 w-8 text-primary/80" />,
      path: '/admin/test-configuration'
    },
    {
      title: 'Security Settings',
      description: 'Configure security policies, MFA, and audit logs',
      icon: <ShieldAlert className="h-8 w-8 text-primary/80" />,
      path: '/admin/security-settings'
    }
  ];

  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage system-wide settings and configurations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {configurationTiles.map((tile, index) => (
              <Link key={index} to={tile.path} className="block">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle>{tile.title}</CardTitle>
                        <CardDescription>{tile.description}</CardDescription>
                      </div>
                      <div>{tile.icon}</div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminSettings;
