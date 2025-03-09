
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getUserNameById } from '@/utils/userUtils';

interface InteractiveTableProps {
  data: Record<string, any>[];
  columns: {
    key: string;
    header: string;
    render?: (value: any, record: Record<string, any>) => React.ReactNode;
    formatUserName?: boolean;
    formatSLA?: boolean;
  }[];
  title: string;
  filterKey?: string;
  filterValue?: string | number;
}

const InteractiveTable: React.FC<InteractiveTableProps> = ({
  data,
  columns,
  title,
  filterKey,
  filterValue,
}) => {
  // Filter data if filterKey and filterValue are provided
  const filteredData = filterKey && filterValue !== undefined
    ? data.filter(record => record[filterKey] === filterValue)
    : data;

  // Formatter for SLA status display
  const formatSLAStatus = (slaInfo: any) => {
    if (!slaInfo || slaInfo.status === undefined) {
      return <div>N/A</div>;
    }

    if (slaInfo.completed) {
      return <div className="text-gray-500">Completed</div>;
    }

    switch (slaInfo.status) {
      case 'breached':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-red-600 font-medium">SLA Breached</span>
              <span className="text-red-600 text-sm">{slaInfo.timeLeft}</span>
            </div>
            <Progress value={0} className="h-2" indicatorClassName="bg-red-600" />
          </div>
        );
      case 'warning':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-amber-600 font-medium">SLA Warning</span>
              <span className="text-amber-600 text-sm">{slaInfo.timeLeft}</span>
            </div>
            <Progress value={slaInfo.percentLeft} className="h-2" indicatorClassName="bg-amber-500" />
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-green-600 font-medium">SLA On Track</span>
              <span className="text-green-600 text-sm">{slaInfo.timeLeft}</span>
            </div>
            <Progress value={slaInfo.percentLeft} className="h-2" indicatorClassName="bg-green-500" />
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {title}
          {filterValue && filterKey && (
            <span className="text-sm font-normal ml-2">
              (Filtered by {filterKey}: {filterValue})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {filteredData.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No data to display
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.key}>{column.header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record, i) => (
                  <TableRow key={i}>
                    {columns.map((column) => (
                      <TableCell key={`${i}-${column.key}`}>
                        {column.render
                          ? column.render(record[column.key], record)
                          : column.formatUserName && column.key === 'assignee'
                            ? getUserNameById(record[column.key])
                            : column.formatSLA && column.key === 'sla'
                              ? formatSLAStatus(record[column.key])
                              : record[column.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveTable;
