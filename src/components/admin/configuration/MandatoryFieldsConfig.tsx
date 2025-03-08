
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { MandatoryFieldConfig, ConfigurableEntityType } from '@/utils/types/configuration';
import { AlertTriangle, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
              <TableRow key={field.fieldName}>
                <TableCell className="font-medium">{field.displayName}</TableCell>
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
