
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Clock, Mail } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const ReportingControls: React.FC = () => {
  const [reportFormat, setReportFormat] = useState('pdf');
  const [reportTemplate, setReportTemplate] = useState('comprehensive');

  const handleExport = () => {
    toast.success('Report generation started', {
      description: 'Your report will be available for download shortly.'
    });
  };

  const handleSchedule = () => {
    toast.success('Report scheduled', {
      description: 'The report will be generated according to your schedule.'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <span>Reporting & Export</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Report Template</label>
            <Select value={reportTemplate} onValueChange={setReportTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comprehensive">Comprehensive</SelectItem>
                <SelectItem value="release-focused">Release Focused</SelectItem>
                <SelectItem value="test-centric">Test Metrics</SelectItem>
                <SelectItem value="executive">Executive Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Export Format</label>
            <Select value={reportFormat} onValueChange={setReportFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                <SelectItem value="csv">CSV File</SelectItem>
                <SelectItem value="json">JSON Data</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button className="w-full" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export Now
            </Button>
          </div>
          
          <div className="flex items-end">
            <Button variant="outline" className="w-full" onClick={handleSchedule}>
              <Clock className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-muted/20 rounded-md">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Report Distribution
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Configure automated report distribution to stakeholders via email
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportingControls;
