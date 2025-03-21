
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllKnownErrors } from '@/utils/mockData/problems';
import { formatDistanceToNow } from 'date-fns';
import { Search, Database, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KnownErrorDatabase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Get known errors from mock data
  const knownErrors = getAllKnownErrors();
  
  // Filter known errors based on search query
  const filteredErrors = knownErrors.filter((error) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      error.title.toLowerCase().includes(searchLower) ||
      error.id.toLowerCase().includes(searchLower) ||
      error.description.toLowerCase().includes(searchLower) ||
      error.symptoms.toLowerCase().includes(searchLower) ||
      (error.affectedServices && error.affectedServices.some(service => 
        service.toLowerCase().includes(searchLower)
      ))
    );
  });
  
  // Navigate to problem page when clicking on a known error
  const handleErrorClick = (problemId: string) => {
    navigate(`/problems/${problemId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center bg-amber-50 p-4 rounded-md border border-amber-200">
        <Database className="h-8 w-8 text-amber-500 mr-3" />
        <div>
          <h2 className="text-lg font-medium">Known Error Database (KEDB)</h2>
          <p className="text-muted-foreground">
            Search for known errors to find documented workarounds for recurring issues.
          </p>
        </div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search known errors by keyword, ID, or affected service..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {filteredErrors.length === 0 ? (
        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <AlertTriangle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <h3 className="text-lg font-medium">No known errors found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your search terms or browse all known errors.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredErrors.map((error) => (
            <Card key={error.id} className="cursor-pointer hover:bg-accent/20 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span>{error.title}</span>
                    <span className="text-sm bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      {error.id}
                    </span>
                  </CardTitle>
                  <div className="flex items-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      error.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {error.status === 'active' ? (
                        <div className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </div>
                      ) : (
                        'Inactive'
                      )}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">{error.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Symptoms</h4>
                    <p className="text-sm text-muted-foreground">{error.symptoms}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium">Workaround</h4>
                    <p className="text-sm text-muted-foreground">{error.workaround}</p>
                  </div>
                  
                  {error.affectedServices && error.affectedServices.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium">Affected Services</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {error.affectedServices.map((service, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-muted px-2 py-0.5 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-2 border-t text-xs text-muted-foreground">
                  <span>Created {formatDistanceToNow(new Date(error.createdAt), { addSuffix: true })}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleErrorClick(error.problemId)}
                  >
                    View Related Problem
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default KnownErrorDatabase;
