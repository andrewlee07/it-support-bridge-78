
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface MicrosoftSSOButtonProps {
  onSuccess?: (token: string, userData: any) => void;
  onError?: (error: Error) => void;
  className?: string;
}

/**
 * Microsoft 365 SSO login button
 * 
 * This component provides SSO login with Microsoft 365 as an alternative
 * to regular username/password authentication.
 */
const MicrosoftSSOButton: React.FC<MicrosoftSSOButtonProps> = ({
  onSuccess,
  onError,
  className
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  // Mock implementation for demo purposes
  // In a real implementation, this would use MSAL.js
  const handleMicrosoftLogin = async () => {
    setIsLoading(true);
    
    try {
      toast({
        title: "Microsoft 365 SSO",
        description: "This is a demo of the Microsoft 365 SSO login. In a real implementation, this would redirect to Microsoft for authentication.",
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtaWNyb3NvZnQtc3NvLXVzZXIiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ";
      const mockUserData = {
        id: 'ms-user-1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        department: 'IT',
        active: true,
        mfaEnabled: true,
        mfaMethod: 'totp',
      };
      
      if (onSuccess) {
        onSuccess(mockToken, mockUserData);
      }
      
      toast({
        title: "Login successful",
        description: "You've been logged in via Microsoft 365 SSO (demo)",
      });
    } catch (error) {
      console.error('Microsoft SSO login error:', error);
      toast({
        title: "Login failed",
        description: "Failed to login with Microsoft 365",
        variant: "destructive",
      });
      
      if (onError && error instanceof Error) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className={`w-full flex items-center justify-center ${className}`}
      onClick={handleMicrosoftLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Signing in...
        </span>
      ) : (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M11.5 3.5H3.5V11.5H11.5V3.5Z" fill="#f25022"/>
            <path d="M11.5 12.5H3.5V20.5H11.5V12.5Z" fill="#00a4ef"/>
            <path d="M20.5 3.5H12.5V11.5H20.5V3.5Z" fill="#7fba00"/>
            <path d="M20.5 12.5H12.5V20.5H20.5V12.5Z" fill="#ffb900"/>
          </svg>
          Sign in with Microsoft 365
        </>
      )}
    </Button>
  );
};

export default MicrosoftSSOButton;
