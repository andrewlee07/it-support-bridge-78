
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoginForm } from '@/hooks/useLoginForm';
import { AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const { email, setEmail, password, setPassword, isLoading, handleSubmit } = useLoginForm();

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#b047c9]">Test Management System</h1>
        <p className="text-[#42284e] mt-2">Log in to access your account</p>
      </div>
      
      <Card className="w-full max-w-md shadow-lg border-[#b047c9]/20">
        <CardHeader className="space-y-1 bg-[#42284e]/5 rounded-t-lg border-b border-[#b047c9]/10">
          <CardTitle className="text-2xl text-center text-[#42284e]">Login</CardTitle>
          <CardDescription className="text-center text-[#42284e]/80">
            Enter any email to login (password is optional)
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 bg-white rounded-b-lg">
          <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              <strong>Demo App:</strong> Type any email address and click Sign In. 
              No password is required for this demo.
            </p>
          </div>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#42284e]">Email</Label>
              <Input 
                id="email" 
                type="text" 
                placeholder="Enter any email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="bg-[#f6f6f7] border-[#b047c9]/20 focus-visible:ring-[#b047c9]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#42284e]">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Password (optional)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="bg-[#f6f6f7] border-[#b047c9]/20 focus-visible:ring-[#b047c9]"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#b047c9] hover:bg-[#42284e] text-white transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-[#42284e]/60">Test Application</p>
            <p className="mt-2 text-[#b047c9]/70 font-semibold">
              <small>Just type any email and click Sign In</small>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
