
import React, { useEffect, useState } from 'react';
import { RouteStatus, testAllDefinedRoutes } from '@/utils/testing/linkTesting';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';
import ActionButton from '@/components/shared/ActionButton';

/**
 * Route validator component for development mode
 * 
 * This component tests all defined routes in the application and displays
 * validation results. It's meant to be used only in development mode.
 */
const RouteValidator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [validationResults, setValidationResults] = useState<RouteStatus[]>([]);
  const [hasInvalidRoutes, setHasInvalidRoutes] = useState(false);

  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') return;
    
    const results = testAllDefinedRoutes();
    setValidationResults(results);
    setHasInvalidRoutes(results.some(r => !r.isValid));
    
    // Show the validator if there are any invalid routes
    if (results.some(r => !r.isValid)) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible || process.env.NODE_ENV !== 'development') return null;

  const validRoutes = validationResults.filter(r => r.isValid);
  const invalidRoutes = validationResults.filter(r => !r.isValid);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-900 shadow-lg rounded-lg border border-slate-200 dark:border-slate-700 w-96 max-h-[80vh] overflow-auto">
      <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center">
          {hasInvalidRoutes ? (
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
          ) : (
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          )}
          <h3 className="font-medium">Route Validation</h3>
        </div>
        <ActionButton 
          variant="ghost" 
          size="sm" 
          action={{ 
            type: 'function', 
            handler: () => setIsVisible(false) 
          }}
          icon={X}
        >
          <span className="sr-only">Close</span>
        </ActionButton>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="text-sm">
            <p>Total routes: <span className="font-medium">{validationResults.length}</span></p>
            <p>Valid routes: <span className="font-medium text-green-500">{validRoutes.length}</span></p>
            <p>Invalid routes: <span className="font-medium text-red-500">{invalidRoutes.length}</span></p>
          </div>
          <ActionButton 
            size="sm" 
            variant="outline" 
            action={{
              type: 'function',
              handler: () => {
                const results = testAllDefinedRoutes();
                setValidationResults(results);
                setHasInvalidRoutes(results.some(r => !r.isValid));
              }
            }}
          >
            Re-validate
          </ActionButton>
        </div>
        
        {invalidRoutes.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2 text-red-500">Invalid Routes</h4>
            <div className="space-y-2 max-h-[300px] overflow-auto">
              {invalidRoutes.map((route, idx) => (
                <div key={idx} className="text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded">
                  <p className="font-medium">{route.path}</p>
                  <p className="text-red-500">{route.errorMessage}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteValidator;
