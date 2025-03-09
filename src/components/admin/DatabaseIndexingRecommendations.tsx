
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Database, Check } from "lucide-react";
import { 
  recommendedIndexes, 
  IndexRecommendation, 
  commonIndexableEntities,
  generateIndexingSQL 
} from "@/utils/database/indexingUtils";
import { useToast } from "@/hooks/use-toast";

const DatabaseIndexingRecommendations = () => {
  const [selectedTable, setSelectedTable] = useState<string>('all');
  const [databaseType, setDatabaseType] = useState<'postgres' | 'mysql' | 'mssql'>('postgres');
  const { toast } = useToast();
  
  // Filter recommendations based on selected table
  const filteredRecommendations = selectedTable === 'all' 
    ? recommendedIndexes
    : recommendedIndexes.filter(rec => rec.tableName === selectedTable);
  
  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'HIGH': return 'bg-red-100 text-red-800 border-red-300';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  // Copy SQL to clipboard
  const copySQLToClipboard = () => {
    const sql = generateIndexingSQL(databaseType).join('\n');
    navigator.clipboard.writeText(sql);
    
    toast({
      title: "SQL Copied",
      description: "The SQL statements have been copied to your clipboard",
      variant: "default",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Database className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Database Indexing Recommendations</CardTitle>
        </div>
        <CardDescription>
          Optimize database performance with these recommended indexes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="w-full sm:w-1/2">
              <label className="text-sm font-medium mb-1 block">Table</label>
              <Select value={selectedTable} onValueChange={setSelectedTable}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a table" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tables</SelectItem>
                  {commonIndexableEntities.map(table => (
                    <SelectItem key={table} value={table}>{table}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-1/2">
              <label className="text-sm font-medium mb-1 block">Database Type</label>
              <Select 
                value={databaseType} 
                onValueChange={(value) => setDatabaseType(value as 'postgres' | 'mysql' | 'mssql')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select database type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="postgres">PostgreSQL</SelectItem>
                  <SelectItem value="mysql">MySQL</SelectItem>
                  <SelectItem value="mssql">MS SQL Server</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border border-amber-200 bg-amber-50 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">Best Practices</h3>
                <div className="mt-1 text-sm text-amber-700">
                  <p>
                    These index recommendations are based on common query patterns in ITSM systems. 
                    Apply them selectively based on your actual query patterns and database size.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Table</TableHead>
                <TableHead>Column</TableHead>
                <TableHead>Index Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecommendations.length > 0 ? (
                filteredRecommendations.map((rec: IndexRecommendation, index) => (
                  <TableRow key={`${rec.tableName}-${rec.columnName}-${index}`}>
                    <TableCell className="font-medium">{rec.tableName}</TableCell>
                    <TableCell>{rec.columnName}</TableCell>
                    <TableCell>{rec.indexType}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md">{rec.reason}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No recommendations for this table
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={copySQLToClipboard}
              className="flex items-center space-x-2"
            >
              <Check className="h-4 w-4 mr-2" />
              Copy SQL Statements
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseIndexingRecommendations;
