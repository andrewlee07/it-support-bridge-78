
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Laptop, Server, Smartphone, Plus, Search, Tag, Calendar } from 'lucide-react';

const Assets = () => {
  // Sample asset data
  const assets = [
    {
      id: 'AST-001',
      name: 'Dell XPS 15',
      type: 'laptop',
      status: 'in-use',
      assignedTo: 'John Doe',
      purchaseDate: '2022-05-15',
      warranty: '2025-05-15',
      location: 'Main Office'
    },
    {
      id: 'AST-002',
      name: 'iPhone 14 Pro',
      type: 'mobile',
      status: 'in-use',
      assignedTo: 'Jane Smith',
      purchaseDate: '2023-01-10',
      warranty: '2025-01-10',
      location: 'Remote'
    },
    {
      id: 'AST-003',
      name: 'Dell PowerEdge R740',
      type: 'server',
      status: 'active',
      assignedTo: 'IT Department',
      purchaseDate: '2021-11-20',
      warranty: '2026-11-20',
      location: 'Server Room'
    },
    {
      id: 'AST-004',
      name: 'HP EliteDisplay E243',
      type: 'monitor',
      status: 'in-use',
      assignedTo: 'Mark Johnson',
      purchaseDate: '2022-08-05',
      warranty: '2025-08-05',
      location: 'Main Office'
    },
    {
      id: 'AST-005',
      name: 'Cisco Catalyst 9300',
      type: 'network',
      status: 'active',
      assignedTo: 'IT Department',
      purchaseDate: '2021-06-30',
      warranty: '2026-06-30',
      location: 'Server Room'
    },
    {
      id: 'AST-006',
      name: 'Microsoft Surface Pro 9',
      type: 'laptop',
      status: 'in-repair',
      assignedTo: 'Sarah Williams',
      purchaseDate: '2023-03-15',
      warranty: '2026-03-15',
      location: 'IT Department'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-use':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'available':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'in-repair':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'retired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'laptop':
        return <Laptop className="h-8 w-8" />;
      case 'mobile':
        return <Smartphone className="h-8 w-8" />;
      case 'server':
        return <Server className="h-8 w-8" />;
      case 'monitor':
        return <Monitor className="h-8 w-8" />;
      case 'network':
        return <Server className="h-8 w-8" />;
      default:
        return <Monitor className="h-8 w-8" />;
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Asset Management</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage hardware and software assets
            </p>
          </div>
          <Button className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets..."
              className="pl-8"
            />
          </div>
          
          <Button variant="outline" className="shrink-0">
            Filter
          </Button>
        </div>

        <Tabs defaultValue="all" className="animate-fade-in">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Assets</TabsTrigger>
            <TabsTrigger value="hardware">Hardware</TabsTrigger>
            <TabsTrigger value="software">Software</TabsTrigger>
            <TabsTrigger value="licenses">Licenses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assets.map((asset) => (
                <Card key={asset.id} className="shadow-sm overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">{asset.name}</CardTitle>
                      <Badge className={getStatusColor(asset.status)}>
                        {asset.status.replace('-', ' ').charAt(0).toUpperCase() + asset.status.replace('-', ' ').slice(1)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{asset.id}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start">
                      <div className="mr-4 p-2 bg-background rounded-md border">
                        {getAssetIcon(asset.type)}
                      </div>
                      <div className="flex flex-col text-sm">
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                          <span className="text-muted-foreground">Assigned to:</span>
                          <span>{asset.assignedTo}</span>
                          
                          <span className="text-muted-foreground">Location:</span>
                          <span>{asset.location}</span>
                          
                          <span className="text-muted-foreground">Purchased:</span>
                          <span>{asset.purchaseDate}</span>
                          
                          <span className="text-muted-foreground">Warranty:</span>
                          <span>{asset.warranty}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hardware" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assets.filter(a => ['laptop', 'mobile', 'server', 'monitor', 'network'].includes(a.type)).map((asset) => (
                <Card key={asset.id} className="shadow-sm overflow-hidden">
                  {/* Same card structure as above */}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">{asset.name}</CardTitle>
                      <Badge className={getStatusColor(asset.status)}>
                        {asset.status.replace('-', ' ').charAt(0).toUpperCase() + asset.status.replace('-', ' ').slice(1)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{asset.id}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start">
                      <div className="mr-4 p-2 bg-background rounded-md border">
                        {getAssetIcon(asset.type)}
                      </div>
                      <div className="flex flex-col text-sm">
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                          <span className="text-muted-foreground">Assigned to:</span>
                          <span>{asset.assignedTo}</span>
                          
                          <span className="text-muted-foreground">Location:</span>
                          <span>{asset.location}</span>
                          
                          <span className="text-muted-foreground">Purchased:</span>
                          <span>{asset.purchaseDate}</span>
                          
                          <span className="text-muted-foreground">Warranty:</span>
                          <span>{asset.warranty}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="software" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Tag className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Software Assets</h3>
              <p className="text-muted-foreground mt-1">Software asset tracking will be available in a future update.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="licenses" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">License Management</h3>
              <p className="text-muted-foreground mt-1">License management will be available in a future update.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Assets;
