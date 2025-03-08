
import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Shield, Info } from 'lucide-react';
import { isPasswordValid, DEFAULT_PASSWORD_POLICY } from '@/utils/securityUtils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { login, user, pendingUser } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // If there's a pending user requiring MFA verification, redirect to MFA page
  useEffect(() => {
    if (pendingUser) {
      navigate('/mfa-verification');
    }
  }, [pendingUser, navigate]);

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError(null);
      return;
    }
    
    const result = isPasswordValid(value);
    if (!result.valid) {
      setPasswordError(result.reason || 'Invalid password');
    } else {
      setPasswordError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final password validation before submission
    const passwordValidation = isPasswordValid(password);
    if (!passwordValidation.valid) {
      setPasswordError(passwordValidation.reason || 'Invalid password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success && pendingUser) {
        // If login was successful but requires MFA, we'll be redirected by the useEffect
        // No need to navigate here
      } else if (success) {
        // If login was successful and doesn't require MFA, redirect to dashboard
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#b047c9]/10 to-[#05b2e6]/5 flex flex-col">
      {/* Header with Logo */}
      <header className="w-full py-4 px-6 md:px-12 bg-white shadow-sm">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/9f8e5267-ab6c-409e-99f0-0517f48fc1b8.png" 
              alt="We Are Group" 
              className="h-10 md:h-12"
            />
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1 text-center bg-[#42284e] text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold">IT Support Bridge</CardTitle>
              <CardDescription className="text-white/80">Enter your credentials to access the platform</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-[#b047c9]/20 focus-visible:ring-[#b047c9]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    required
                    className={`border-[#b047c9]/20 focus-visible:ring-[#b047c9] ${passwordError ? 'border-red-500' : ''}`}
                  />
                  {passwordError && (
                    <p className="text-sm text-red-500">{passwordError}</p>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Info className="h-4 w-4 mr-1 text-[#b047c9]" />
                    <span className="text-xs text-muted-foreground">
                      Password requires {DEFAULT_PASSWORD_POLICY.minLength}+ chars, uppercase, lowercase, 
                      numbers, and special characters
                    </span>
                  </div>
                  <Button variant="link" type="button" className="px-0 text-[#b047c9]" asChild>
                    <Link to="/security-recovery">Forgot password?</Link>
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-[#b047c9] hover:bg-[#b047c9]/90 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <div className="w-full flex items-center justify-center text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 mr-1 text-[#b047c9]" />
                  <span>Enhanced security with multi-factor authentication</span>
                </div>
              </CardFooter>
            </form>
            <div className="p-4 text-center text-sm text-muted-foreground border-t">
              <p>Demo credentials:</p>
              <p>Admin: john.doe@example.com (Has MFA enabled)</p>
              <p>IT Staff: jane.smith@example.com (Has MFA enabled)</p>
              <p>End User: mike.johnson@example.com (No MFA)</p>
              <p>Password: Use any text (not validated in demo)</p>
            </div>
          </Card>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? 
              <Button variant="link" type="button" className="text-[#b047c9]">
                Contact support
              </Button>
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>© 2023 We Are Group. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
