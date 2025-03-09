
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

interface InteractiveTableProps {
  data: Record<string, any>[];
  columns: {
    key: string;
    header: string;
    render?: (value: any, record: Record<string, any>) => React.ReactNode;
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
