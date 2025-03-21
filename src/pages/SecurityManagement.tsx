
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter, Plus, ShieldAlert, ShieldCheck, UserX, Lock } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const SecurityManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">IT Security Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            Sort
          </Button>
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" /> Create Security Case
          </Button>
        </div>
      </div>

      {/* Metrics Cards - Placed at the top as requested */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Security Cases" 
          value="64" 
          icon={ShieldAlert}
          description="All time security incidents"
        />
        <StatCard 
          title="Active Cases" 
          value="12" 
          icon={ShieldCheck}
          trend={{ value: 5, isPositive: false }}
          description="Currently open cases"
        />
        <StatCard 
          title="Data Breaches" 
          value="3" 
          icon={UserX}
          trend={{ value: 2, isPositive: false }}
          description="In current quarter"
        />
        <StatCard 
          title="Compliance Issues" 
          value="8" 
          icon={Lock}
          trend={{ value: 10, isPositive: true }}
          description="Pending resolution"
        />
      </div>

      {/* Tabs for different security case types */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Cases</TabsTrigger>
          <TabsTrigger value="data-breaches">Data Breaches</TabsTrigger>
          <TabsTrigger value="sar">Subject Access Requests</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Case Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Reported</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">SEC-2023-0112</TableCell>
                    <TableCell className="max-w-sm">
                      <div>
                        <p className="font-medium">Customer Data Exposure</p>
                        <p className="text-sm text-muted-foreground">Inadvertent exposure of customer data through API misconfiguration</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Data Breach</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">2 days ago</TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell className="font-medium">SEC-2023-0111</TableCell>
                    <TableCell className="max-w-sm">
                      <div>
                        <p className="font-medium">GDPR Subject Access Request</p>
                        <p className="text-sm text-muted-foreground">Customer requesting all personal data held by company</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">SAR</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">5 days ago</TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell className="font-medium">SEC-2023-0105</TableCell>
                    <TableCell className="max-w-sm">
                      <div>
                        <p className="font-medium">Password Policy Non-Compliance</p>
                        <p className="text-sm text-muted-foreground">Legacy systems not enforcing new password complexity requirements</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Compliance</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">2 weeks ago</TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell className="font-medium">SEC-2023-0098</TableCell>
                    <TableCell className="max-w-sm">
                      <div>
                        <p className="font-medium">Phishing Attempt</p>
                        <p className="text-sm text-muted-foreground">Targeted phishing campaign against finance department</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Threat</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">3 weeks ago</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-breaches">
          <Card>
            <CardHeader>
              <CardTitle>Data Breach Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Select the "All Cases" tab to view sample data.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sar">
          <Card>
            <CardHeader>
              <CardTitle>Subject Access Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Select the "All Cases" tab to view sample data.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Select the "All Cases" tab to view sample data.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityManagement;
