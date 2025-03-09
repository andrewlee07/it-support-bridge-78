
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface WorkflowStage {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
}

interface WorkflowStagesTableProps {
  stages: WorkflowStage[];
  onToggleStage: (stageId: string) => void;
}

const WorkflowStagesTable: React.FC<WorkflowStagesTableProps> = ({
  stages,
  onToggleStage,
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Workflow Stages</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Stage Name</TableHead>
              <TableHead className="text-right">Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stages.map(stage => (
              <TableRow key={stage.id}>
                <TableCell>{stage.order}</TableCell>
                <TableCell>{stage.name}</TableCell>
                <TableCell className="text-right">
                  <Switch 
                    checked={stage.isActive} 
                    onCheckedChange={() => onToggleStage(stage.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </>
  );
};

export default WorkflowStagesTable;
