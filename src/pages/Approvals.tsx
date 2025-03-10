
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Approvals = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("changes");

  // Mock data - in a real app, you'd fetch this from an API
  const pendingChangeApprovals = [
    {
      id: 'CHG-2025-0001',
      title: 'Update Windows Server 2022',
      submittedBy: 'Alice Johnson',
      submittedOn: '2025-03-05',
      type: 'change',
    },
    {
      id: 'CHG-2025-0003',
      title: 'Network Configuration Update',
      submittedBy: 'Robert Chen',
      submittedOn: '2025-03-08',
      type: 'change',
    }
  ];

  const pendingReleaseApprovals = [
    {
      id: 'REL-2025-0002',
      title: 'CRM System Update v3.5',
      submittedBy: 'David Wilson',
      submittedOn: '2025-03-07',
      type: 'release',
    }
  ];

  const handleApprove = (id: string, type: 'change' | 'release') => {
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Approved`,
      description: `You have approved ${id}`,
    });
    
    // In a real app, you'd make an API call to approve the item
    // navigate back to the appropriate page after approval
  };

  const handleReject = (id: string, type: 'change' | 'release') => {
    // In a real app, you'd show a dialog to collect rejection reason
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Rejected`,
      description: `You have rejected ${id}`,
      variant: "destructive"
    });
  };

  const handleView = (id: string, type: 'change' | 'release') => {
    if (type === 'change') {
      navigate(`/changes/${id}`);
    } else {
      navigate(`/releases/${id}`);
    }
  };

  const renderApprovalTable = (items: any[]) => {
    if (items.length === 0) {
      return (
        <div className="p-4 text-center text-muted-foreground">
          No pending approvals found.
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Submitted By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.submittedBy}</TableCell>
              <TableCell>{item.submittedOn}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleView(item.id, item.type)}
                  >
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleApprove(item.id, item.type)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => handleReject(item.id, item.type)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Approvals</h1>
          <p className="text-muted-foreground mt-1">
            Manage all your pending approval requests in one place
          </p>
        </div>

        <Tabs defaultValue="changes" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="changes">
              Changes
              <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/20">
                {pendingChangeApprovals.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="releases">
              Releases
              <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/20">
                {pendingReleaseApprovals.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="changes">
            <Card>
              <CardHeader>
                <CardTitle>Pending Change Approvals</CardTitle>
                <CardDescription>
                  Review and approve changes that require your attention.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderApprovalTable(pendingChangeApprovals)}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="releases">
            <Card>
              <CardHeader>
                <CardTitle>Pending Release Approvals</CardTitle>
                <CardDescription>
                  Review and approve releases that require your attention.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderApprovalTable(pendingReleaseApprovals)}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Approvals;
