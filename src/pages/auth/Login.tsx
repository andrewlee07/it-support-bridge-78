
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoginForm } from '@/hooks/useLoginForm';

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
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 bg-white rounded-b-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#42284e]">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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
            <p className="text-[#42284e]/60">Internal Application</p>
            <p className="mt-2 text-[#b047c9]/70">
              <small>Use any email/password combination to log in</small>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
