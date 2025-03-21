
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  ShieldAlert, 
  ShieldCheck, 
  UserX, 
  Lock, 
  ChevronDown,
  ArrowUpDown,
  Search,
  CalendarClock,
  X
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { getUserNameById } from '@/utils/userUtils';
import { cn } from '@/lib/utils';

const SecurityManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [cardFilters, setCardFilters] = useState<{
    activeCases: boolean;
    dataBreaches: boolean;
    complianceIssues: boolean;
  }>({
    activeCases: false,
    dataBreaches: false,
    complianceIssues: false
  });

  // Mock data for security cases
  const securityCases = [
    {
      id: 'SEC00001',
      title: 'Customer Data Exposure',
      description: 'Inadvertent exposure of customer data through API misconfiguration',
      type: 'Data Breach',
      status: 'Active',
      priority: 'High',
      reportedBy: 'user-1',
      reportedAt: '2 days ago'
    },
    {
      id: 'SEC00002',
      title: 'GDPR Subject Access Request',
      description: 'Customer requesting all personal data held by company',
      type: 'SAR',
      status: 'Pending',
      priority: 'Medium',
      reportedBy: 'user-2',
      reportedAt: '5 days ago'
    },
    {
      id: 'SEC00003',
      title: 'Password Policy Non-Compliance',
      description: 'Legacy systems not enforcing new password complexity requirements',
      type: 'Compliance',
      status: 'Active',
      priority: 'Medium',
      reportedBy: 'user-3',
      reportedAt: '2 weeks ago'
    },
    {
      id: 'SEC00004',
      title: 'Phishing Attempt',
      description: 'Targeted phishing campaign against finance department',
      type: 'Threat',
      status: 'Resolved',
      priority: 'Low',
      reportedBy: 'user-1',
      reportedAt: '3 weeks ago'
    }
  ];

  // Handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Handle card filter toggle
  const toggleCardFilter = (filterName: keyof typeof cardFilters) => {
    setCardFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  // Get filtered and sorted cases
  const getFilteredCases = () => {
    let filtered = [...securityCases];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        case_ => 
          case_.id.toLowerCase().includes(query) ||
          case_.title.toLowerCase().includes(query) ||
          case_.description.toLowerCase().includes(query)
      );
    }
    
    // Apply priority filter
    if (priorityFilter) {
      filtered = filtered.filter(case_ => case_.priority === priorityFilter);
    }
    
    // Apply type filter
    if (typeFilter) {
      filtered = filtered.filter(case_ => case_.type === typeFilter);
    }
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(case_ => case_.status === statusFilter);
    }
    
    // Apply card filters
    if (cardFilters.activeCases) {
      filtered = filtered.filter(case_ => case_.status === 'Active');
    }
    
    if (cardFilters.dataBreaches) {
      filtered = filtered.filter(case_ => case_.type === 'Data Breach');
    }
    
    if (cardFilters.complianceIssues) {
      filtered = filtered.filter(case_ => case_.type === 'Compliance');
    }
    
    // Apply sorting
    if (sortColumn) {
      filtered.sort((a: any, b: any) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        
        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return filtered;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Data Breach': return 'bg-red-50 text-red-700 border-red-200';
      case 'SAR': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Compliance': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Threat': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'Resolved': return 'bg-green-100 text-green-800 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Filter options
  const typeOptions = ['Data Breach', 'SAR', 'Compliance', 'Threat'];
  const priorityOptions = ['High', 'Medium', 'Low'];
  const statusOptions = ['Active', 'Pending', 'Resolved'];

  // Count for metric cards
  const activeCasesCount = securityCases.filter(c => c.status === 'Active').length;
  const dataBreachesCount = securityCases.filter(c => c.type === 'Data Breach').length;
  const complianceIssuesCount = securityCases.filter(c => c.type === 'Compliance').length;

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setPriorityFilter(null);
    setTypeFilter(null);
    setStatusFilter(null);
    setSortColumn(null);
    setCardFilters({
      activeCases: false,
      dataBreaches: false,
      complianceIssues: false
    });
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return searchQuery !== '' || 
           priorityFilter !== null || 
           typeFilter !== null || 
           statusFilter !== null ||
           cardFilters.activeCases ||
           cardFilters.dataBreaches ||
           cardFilters.complianceIssues;
  };

  // Get the sorted and filtered cases
  const filteredCases = getFilteredCases();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">IT Security Management</h1>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Create Security Case
        </Button>
      </div>

      {/* Metrics Cards - Interactive Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Security Cases" 
          value={securityCases.length.toString()} 
          icon={ShieldAlert}
          description="All time security incidents"
          className="cursor-default"
        />
        <StatCard 
          title="Active Cases" 
          value={activeCasesCount.toString()} 
          icon={ShieldCheck}
          trend={{ value: 5, isPositive: false }}
          description="Currently open cases"
          className={cn(
            "cursor-pointer transition-all border-2", 
            cardFilters.activeCases ? "border-primary bg-primary/5" : "border-transparent"
          )}
          onClick={() => toggleCardFilter('activeCases')}
        />
        <StatCard 
          title="Data Breaches" 
          value={dataBreachesCount.toString()} 
          icon={UserX}
          trend={{ value: 2, isPositive: false }}
          description="In current quarter"
          className={cn(
            "cursor-pointer transition-all border-2", 
            cardFilters.dataBreaches ? "border-primary bg-primary/5" : "border-transparent"
          )}
          onClick={() => toggleCardFilter('dataBreaches')}
        />
        <StatCard 
          title="Compliance Issues" 
          value={complianceIssuesCount.toString()} 
          icon={Lock}
          trend={{ value: 10, isPositive: true }}
          description="Pending resolution"
          className={cn(
            "cursor-pointer transition-all border-2", 
            cardFilters.complianceIssues ? "border-primary bg-primary/5" : "border-transparent"
          )}
          onClick={() => toggleCardFilter('complianceIssues')}
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
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Security Cases</CardTitle>
                <div className="flex items-center gap-2">
                  {hasActiveFilters() && (
                    <Button variant="outline" size="sm" onClick={resetFilters} className="h-8 flex items-center gap-1">
                      <X className="h-4 w-4" /> Clear Filters
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search cases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-9"
                  />
                </div>
              </div>
              
              {/* Active filter indicators */}
              {hasActiveFilters() && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {cardFilters.activeCases && (
                    <Badge variant="outline" className="bg-blue-50 flex items-center gap-1">
                      Active Cases
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => toggleCardFilter('activeCases')}
                      />
                    </Badge>
                  )}
                  {cardFilters.dataBreaches && (
                    <Badge variant="outline" className="bg-red-50 flex items-center gap-1">
                      Data Breaches
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => toggleCardFilter('dataBreaches')}
                      />
                    </Badge>
                  )}
                  {cardFilters.complianceIssues && (
                    <Badge variant="outline" className="bg-blue-50 flex items-center gap-1">
                      Compliance Issues
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => toggleCardFilter('complianceIssues')}
                      />
                    </Badge>
                  )}
                  {priorityFilter && (
                    <Badge variant="outline" className={`flex items-center gap-1 ${getPriorityColor(priorityFilter)}`}>
                      Priority: {priorityFilter}
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => setPriorityFilter(null)}
                      />
                    </Badge>
                  )}
                  {typeFilter && (
                    <Badge variant="outline" className={`flex items-center gap-1 ${getTypeColor(typeFilter)}`}>
                      Type: {typeFilter}
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => setTypeFilter(null)}
                      />
                    </Badge>
                  )}
                  {statusFilter && (
                    <Badge className={`flex items-center gap-1 ${getStatusColor(statusFilter)}`}>
                      Status: {statusFilter}
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => setStatusFilter(null)}
                      />
                    </Badge>
                  )}
                  {searchQuery && (
                    <Badge variant="outline" className="bg-gray-50 flex items-center gap-1">
                      Search: {searchQuery}
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => setSearchQuery('')}
                      />
                    </Badge>
                  )}
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('id')}
                    >
                      <div className="flex items-center">
                        ID
                        {sortColumn === 'id' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('title')}
                    >
                      <div className="flex items-center">
                        Case Description
                        {sortColumn === 'title' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                          </span>
                        )}
                        <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Type
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {typeOptions.map(type => (
                              <DropdownMenuItem 
                                key={type}
                                onClick={() => setTypeFilter(type === typeFilter ? null : type)}
                                className={typeFilter === type ? "bg-muted" : ""}
                              >
                                {type}
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setTypeFilter(null)}>
                              Show All
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Status
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {statusOptions.map(status => (
                              <DropdownMenuItem 
                                key={status}
                                onClick={() => setStatusFilter(status === statusFilter ? null : status)}
                                className={statusFilter === status ? "bg-muted" : ""}
                              >
                                {status}
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                              Show All
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Priority
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {priorityOptions.map(priority => (
                              <DropdownMenuItem 
                                key={priority}
                                onClick={() => setPriorityFilter(priority === priorityFilter ? null : priority)}
                                className={priorityFilter === priority ? "bg-muted" : ""}
                              >
                                {priority}
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setPriorityFilter(null)}>
                              Show All
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                    <TableHead>
                      Reported By
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('reportedAt')}
                    >
                      <div className="flex items-center">
                        <CalendarClock className="mr-1 h-4 w-4 opacity-70" />
                        Reported
                        {sortColumn === 'reportedAt' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No security cases found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCases.map((case_) => (
                      <TableRow key={case_.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{case_.id}</TableCell>
                        <TableCell className="max-w-sm">
                          <div>
                            <p className="font-medium">{case_.title}</p>
                            <p className="text-sm text-muted-foreground">{case_.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getTypeColor(case_.type)}>
                            {case_.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(case_.status)}>
                            {case_.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getPriorityColor(case_.priority)}>
                            {case_.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {getUserNameById(case_.reportedBy)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {case_.reportedAt}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
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
