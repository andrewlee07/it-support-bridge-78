
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';

interface SecurityDetailsSectionProps {
  form: any;
}

const SecurityDetailsSection: React.FC<SecurityDetailsSectionProps> = ({ form }) => {
  const category = form.watch('category');
  
  return (
    <div className="space-y-4 rounded-md border p-4">
      <h3 className="text-lg font-medium">Security Details</h3>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                    <SelectValue placeholder="Select classification" />
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
                The security classification determines handling requirements
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {category === 'data-breach' && (
          <>
            <FormField
              control={form.control}
              name="dataSubjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Data Subjects</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="How many individuals affected" 
                      {...field}
                      onChange={e => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormDescription>
                    Approximate number of individuals whose data was affected
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
                      <SelectItem value="phishing">Phishing</SelectItem>
                      <SelectItem value="malware">Malware</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reportedToAuthorities"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Reported to Authorities</FormLabel>
                    <FormDescription>
                      Has this breach been reported to relevant authorities
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            {form.watch('reportedToAuthorities') && (
              <FormField
                control={form.control}
                name="reportedDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Reported</FormLabel>
                    <DatePicker
                      date={field.value ? new Date(field.value) : undefined}
                      setDate={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </>
        )}
        
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
                        <SelectValue placeholder="Select SAR type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="access">Right of Access</SelectItem>
                      <SelectItem value="rectification">Right to Rectification</SelectItem>
                      <SelectItem value="erasure">Right to Erasure</SelectItem>
                      <SelectItem value="portability">Right to Data Portability</SelectItem>
                      <SelectItem value="objection">Right to Object</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The type of Subject Access Request being made
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dpaRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>DPA Required</FormLabel>
                    <FormDescription>
                      Is a Data Processing Agreement required for this request
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SecurityDetailsSection;
