
import React, { useState } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { useToast } from '@/hooks/use-toast';
import BugsTab from '@/components/test-management/BugsTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/card';
import { Card, CardContent } from '@/components/ui/card';

const Bugs = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');

  return (
    <PageTransition>
      <div className="space-y-6">
        <BugsTab />

        {/* Tabs for different bug categories - similar to Incidents page */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Bugs</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Content for All Bugs tab is provided by BugsTab component */}
          </TabsContent>
          
          <TabsContent value="critical" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">This view will show only critical bugs.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="frontend" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">This view will show only frontend bugs.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="backend" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">This view will show only backend bugs.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Bugs;
