
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ServiceCatalogueConfiguration = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Service Catalogue Configuration</h1>
            <p className="text-muted-foreground mt-1">
              Configure service categories, fields, and visibility settings
            </p>
          </div>

          <Tabs defaultValue="categories" className="space-y-4">
            <TabsList>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="fields">Fields</TabsTrigger>
              <TabsTrigger value="visibility">Visibility</TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Service Categories</CardTitle>
                  <CardDescription>Manage service categories in the catalogue</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Category management functionality will be implemented soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fields" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Fields</CardTitle>
                  <CardDescription>Configure custom fields for service items</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Custom fields configuration will be implemented soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visibility" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Visibility Settings</CardTitle>
                  <CardDescription>Configure which services are visible to specific user groups</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Visibility settings will be implemented soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default ServiceCatalogueConfiguration;
