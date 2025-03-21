
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SecurityCase, SecurityCaseTab } from '@/utils/types/security';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, Server } from 'lucide-react';
import ActivityTimeline from './ActivityTimeline';
import SecurityCaseNotes from './SecurityCaseNotes';
import SecurityCaseUpdateForm from './SecurityCaseUpdateForm';
import SecurityCaseDetailsForm from './SecurityCaseDetailsForm';

interface SecurityCaseTabsProps {
  securityCase: SecurityCase;
  activeTab: SecurityCaseTab;
  setActiveTab: (tab: SecurityCaseTab) => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  getTypeColor: (type: string) => string;
  formatDate: (dateString: string) => string;
  handleSystemClick: (system: string) => void;
  responseSLA: any;
  resolutionSLA: any;
  getSLAIndicatorColor: (progress: number) => string;
  openAddNoteDialog: () => void;
  onUpdateSecurityCase: (updatedFields: Partial<SecurityCase>) => Promise<boolean>;
}

const SecurityCaseTabs: React.FC<SecurityCaseTabsProps> = ({
  securityCase,
  activeTab,
  setActiveTab,
  getStatusColor,
  getPriorityColor,
  getTypeColor,
  formatDate,
  handleSystemClick,
  responseSLA,
  resolutionSLA,
  getSLAIndicatorColor,
  openAddNoteDialog,
  onUpdateSecurityCase
}) => {
  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as SecurityCaseTab)} className="mt-6">
      <TabsList className="grid grid-cols-5 w-full max-w-3xl">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="investigation">Investigation</TabsTrigger>
        <TabsTrigger value="affected-systems">Affected Systems</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="related-items">Related Items</TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview" className="mt-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Case Details */}
          <SecurityCaseDetailsForm 
            securityCase={securityCase} 
            onUpdate={onUpdateSecurityCase} 
          />

          {/* Case Status & Priority */}
          <div className="md:col-span-2">
            <SecurityCaseUpdateForm 
              securityCase={securityCase} 
              onUpdate={onUpdateSecurityCase} 
            />
          </div>

          {/* SLA Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                SLA Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Response SLA */}
              {responseSLA && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Response SLA</span>
                    <span>{responseSLA.timeLeft}</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div 
                      className={`${getSLAIndicatorColor(responseSLA.percentLeft)} h-2 rounded-full`}
                      style={{ width: `${responseSLA.percentLeft}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {responseSLA.isBreached 
                      ? `SLA Breached: Target was ${responseSLA.targetHours} hours`
                      : `Target: ${responseSLA.targetHours} hours`}
                  </p>
                </div>
              )}
              
              {/* Resolution SLA */}
              {resolutionSLA && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Resolution SLA</span>
                    <span>{resolutionSLA.timeLeft}</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div 
                      className={`${getSLAIndicatorColor(resolutionSLA.percentLeft)} h-2 rounded-full`}
                      style={{ width: `${resolutionSLA.percentLeft}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {resolutionSLA.isBreached 
                      ? `SLA Breached: Target was ${resolutionSLA.targetHours} hours`
                      : `Target: ${resolutionSLA.targetHours} hours`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <ActivityTimeline securityCase={securityCase} formatDate={formatDate} />
      </TabsContent>

      {/* Investigation Tab */}
      <TabsContent value="investigation" className="mt-4 space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Investigation Steps</CardTitle>
          </CardHeader>
          <CardContent>
            {securityCase.investigationSteps && securityCase.investigationSteps.length > 0 ? (
              <div className="space-y-4">
                {securityCase.investigationSteps.map((step, index) => (
                  <div key={index} className="border-l-2 border-gray-300 pl-4 pb-2">
                    <div className="text-sm text-muted-foreground mb-1">{formatDate(step.date)}</div>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No investigation steps recorded yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add more investigation-related cards here */}
      </TabsContent>

      {/* Affected Systems Tab */}
      <TabsContent value="affected-systems" className="mt-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Server className="mr-2 h-4 w-4" />
              Affected Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            {securityCase.affectedSystems && securityCase.affectedSystems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {securityCase.affectedSystems.map((system, index) => (
                  <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleSystemClick(system)}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{system}</p>
                        <p className="text-sm text-muted-foreground">System ID: SYS-{index + 1000}</p>
                      </div>
                      <Badge className={getStatusColor('Active')}>Active</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No affected systems recorded</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Notes Tab */}
      <TabsContent value="notes" className="mt-4">
        <SecurityCaseNotes 
          securityCase={securityCase} 
          formatDate={formatDate} 
          openAddNoteDialog={openAddNoteDialog} 
        />
      </TabsContent>

      {/* Related Items Tab */}
      <TabsContent value="related-items" className="mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Related Tickets */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Related Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              {securityCase.relatedTickets && securityCase.relatedTickets.length > 0 ? (
                <div className="space-y-2">
                  {securityCase.relatedTickets.map((ticket, index) => (
                    <div key={index} className="p-2 border rounded hover:bg-muted/50 cursor-pointer flex justify-between items-center">
                      <span>{ticket}</span>
                      <Badge>Active</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No related tickets</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Related Assets */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Related Assets</CardTitle>
            </CardHeader>
            <CardContent>
              {securityCase.relatedAssets && securityCase.relatedAssets.length > 0 ? (
                <div className="space-y-2">
                  {securityCase.relatedAssets.map((asset, index) => (
                    <div key={index} className="p-2 border rounded hover:bg-muted/50 cursor-pointer flex justify-between items-center">
                      <span>{asset}</span>
                      <Badge variant="outline">Asset</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No related assets</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SecurityCaseTabs;
