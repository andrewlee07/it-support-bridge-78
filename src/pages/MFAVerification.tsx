
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const MFAVerification: React.FC = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { pendingUser, verifyMFA, resendMFACode, cancelMFA } = useAuth();
  const { toast } = useToast();

  // If there's no pending user, redirect to login
  if (!pendingUser) {
    navigate('/auth/login');
    return null;
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code) {
      toast({
        title: "Error",
        description: "Please enter your MFA code",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await verifyMFA(code);
      
      if (success) {
        toast({
          title: "Success",
          description: "You have successfully verified your identity"
        });
        
        // Redirect to dashboard or stored path
        const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath);
      } else {
        toast({
          title: "Error",
          description: "Invalid verification code. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendMFACode();
      toast({
        title: "Success",
        description: "A new verification code has been sent."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend verification code. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    cancelMFA();
    navigate('/auth/login');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Two-Factor Authentication</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4">
          A verification code has been sent to your email or phone.
          Please enter it below to continue.
        </p>
        
        <form className="space-y-4" onSubmit={handleVerify}>
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input 
              id="code" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
            
            <div className="flex justify-between mt-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleResend}
                disabled={isLoading}
              >
                Resend Code
              </Button>
              
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MFAVerification;
