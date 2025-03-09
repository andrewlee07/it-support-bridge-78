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
import { SLAInfo } from '@/utils/sla/slaCalculations';

interface InteractiveTableProps {
  data: Record<string, any>[];
  columns: {
    key: string;
    header: string;
    render?: (value: any, record: Record<string, any>) => React.ReactNode | SLAInfo;
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

  // Formatter for SLA status display with gradient color
  const formatSLAStatus = (slaInfo: any) => {
    if (!slaInfo || slaInfo.status === undefined) {
      return <div>N/A</div>;
    }

    if (slaInfo.completed) {
      return <div className="text-gray-500">Completed</div>;
    }

    // Get gradient color based on percentage left
    const getGradientColor = (percentLeft: number) => {
      if (percentLeft <= 0) return 'bg-red-600';
      if (percentLeft <= 30) return 'bg-gradient-to-r from-red-500 to-amber-500';
      if (percentLeft <= 60) return 'bg-gradient-to-r from-amber-500 to-green-500';
      return 'bg-green-500';
    };

    const barColor = getGradientColor(slaInfo.percentLeft || 0);
    const slaType = "Resolution"; // Default to Resolution SLA

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{slaType} SLA</span>
          <span className="text-sm">{slaInfo.timeLeft}</span>
        </div>
        <Progress 
          value={slaInfo.percentLeft} 
          className="h-2" 
          indicatorClassName={barColor} 
        />
      </div>
    );
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
                          ? (() => {
                              const rendered = column.render(record[column.key], record);
                              // Check if rendered is SLAInfo object
                              if (rendered && typeof rendered === 'object' && 'status' in rendered) {
                                return formatSLAStatus(rendered);
                              }
                              return rendered;
                            })()
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
