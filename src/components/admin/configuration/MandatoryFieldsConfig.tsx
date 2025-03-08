
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { MandatoryFieldConfig, ConfigurableEntityType } from '@/utils/types/configuration';
import { AlertTriangle, Save, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface MandatoryFieldsConfigProps {
  entityType: ConfigurableEntityType;
  fields: MandatoryFieldConfig[];
  onSave: (fields: MandatoryFieldConfig[]) => void;
  isLoading?: boolean;
}

const MandatoryFieldsConfig: React.FC<MandatoryFieldsConfigProps> = ({
  entityType,
  fields,
  onSave,
  isLoading = false,
}) => {
  const [mandatoryFields, setMandatoryFields] = useState<MandatoryFieldConfig[]>(fields);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const handleToggle = (fieldName: string) => {
    const updatedFields = mandatoryFields.map(field => 
      field.fieldName === fieldName 
        ? { ...field, isRequired: !field.isRequired } 
        : field
    );
    setMandatoryFields(updatedFields);
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(mandatoryFields);
    setHasChanges(false);
    toast({
      title: "Mandatory fields updated",
      description: "Your changes have been saved successfully."
    });
  };

  const handleReset = () => {
    setMandatoryFields(fields);
    setHasChanges(false);
  };

  // Count how many resolution fields are required
  const requiredResolutionFieldsCount = mandatoryFields.filter(
    field => field.isResolutionField && field.isRequired
  ).length;
  
  // Count total resolution fields
  const totalResolutionFieldsCount = mandatoryFields.filter(
    field => field.isResolutionField
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mandatory Fields Configuration</CardTitle>
        <CardDescription>
          Configure which fields are required when creating or editing items
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Making fields mandatory will affect all users creating or editing items. 
            Users will not be able to submit forms without completing required fields.
          </AlertDescription>
        </Alert>

        {totalResolutionFieldsCount > 0 && (
          <Alert className="bg-blue-50 border-blue-200">
            <CheckCircle2 className="h-4 w-4 text-blue-500" />
            <AlertDescription className="flex items-center">
              <span>Resolution fields: {requiredResolutionFieldsCount} of {totalResolutionFieldsCount} required</span>
              <span className="ml-2 text-xs text-muted-foreground">
                (These fields are needed for proper case resolution)
              </span>
            </AlertDescription>
          </Alert>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Field</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[120px] text-center">Required</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mandatoryFields.map((field) => (
              <TableRow key={field.fieldName} className={field.isResolutionField ? "bg-blue-50" : ""}>
                <TableCell className="font-medium">
                  {field.displayName}
                  {field.isResolutionField && (
                    <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
                      Resolution
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">{field.description || 'No description'}</TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={field.isRequired}
                    onCheckedChange={() => handleToggle(field.fieldName)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end gap-2 pt-4">
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={!hasChanges || isLoading}>
            Reset
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!hasChanges || isLoading}
            className="flex items-center gap-1">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MandatoryFieldsConfig;
