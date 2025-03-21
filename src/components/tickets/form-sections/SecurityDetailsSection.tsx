
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket } from '@/utils/types/ticket';
import { Switch } from '@/components/ui/switch';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SecurityDetailsSectionProps {
  form: UseFormReturn<any>;
}

const SecurityDetailsSection: React.FC<SecurityDetailsSectionProps> = ({ form }) => {
  const category = form.watch('category');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="securityClassification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Security Classification</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select classification level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="confidential">Confidential</SelectItem>
                  <SelectItem value="restricted">Restricted</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the appropriate security classification for this case
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Data breach specific fields */}
        {category === 'data-breach' && (
          <>
            <FormField
              control={form.control}
              name="dataSubjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Data Subjects Affected</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="e.g., 100" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                    />
                  </FormControl>
                  <FormDescription>
                    Approximate number of individuals whose data was compromised
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="breachType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breach Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select breach type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="data-loss">Data Loss</SelectItem>
                      <SelectItem value="unauthorized-access">Unauthorized Access</SelectItem>
                      <SelectItem value="system-compromise">System Compromise</SelectItem>
                      <SelectItem value="phishing">Phishing Attack</SelectItem>
                      <SelectItem value="malware">Malware/Ransomware</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the type of security breach that occurred
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reportedToAuthorities"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Reported to Authorities</FormLabel>
                    <FormDescription>
                      Has this breach been reported to relevant authorities?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {form.watch('reportedToAuthorities') && (
              <FormField
                control={form.control}
                name="reportedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Reported</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value ? new Date(field.value) : undefined}
                        setDate={(date) => field.onChange(date)}
                        placeholder="Select date reported"
                      />
                    </FormControl>
                    <FormDescription>
                      Date when the breach was reported to authorities
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </>
        )}
        
        {/* SAR specific fields */}
        {category === 'sar' && (
          <>
            <FormField
              control={form.control}
              name="sarRequestType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SAR Request Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select request type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="access">Access Request</SelectItem>
                      <SelectItem value="rectification">Rectification Request</SelectItem>
                      <SelectItem value="erasure">Erasure Request (Right to be Forgotten)</SelectItem>
                      <SelectItem value="portability">Data Portability Request</SelectItem>
                      <SelectItem value="objection">Objection to Processing</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Type of Subject Access Request being made
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dpaRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">DPA Verification Required</FormLabel>
                    <FormDescription>
                      Does this request require Data Processing Agreement verification?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityDetailsSection;
