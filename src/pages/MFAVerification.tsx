
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, ArrowLeft, RefreshCw, Shield } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const MFAVerification = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { pendingUser, verifyMFA, resendMFACode, cancelMFA } = useAuth();
  const navigate = useNavigate();

  // If no pending user, redirect to login
  useEffect(() => {
    if (!pendingUser) {
      navigate('/login');
    }
  }, [pendingUser, navigate]);

  if (!pendingUser) {
    return null; // Will redirect in the useEffect
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await verifyMFA(verificationCode);
      if (success) {
        navigate('/dashboard');
      } else {
        // Reset form on failure
        setVerificationCode('');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    await resendMFACode();
    setIsResending(false);
  };

  const handleCancel = () => {
    cancelMFA();
    navigate('/login');
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
              <CardTitle className="text-2xl font-bold">Two-Factor Authentication</CardTitle>
              <CardDescription className="text-white/80">
                Enter the verification code sent to your {pendingUser.mfaMethod}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  <div className="flex flex-col items-center">
                    <InputOTP
                      maxLength={6}
                      value={verificationCode}
                      onChange={setVerificationCode}
                      render={({ slots }) => (
                        <InputOTPGroup className="gap-2">
                          {slots.map((slot, index) => (
                            <InputOTPSlot
                              key={index}
                              {...slot}
                              className="w-10 h-12 text-xl font-medium border-[#b047c9]/20 focus:border-[#b047c9] focus:ring-[#b047c9]"
                              index={index}
                            />
                          ))}
                        </InputOTPGroup>
                      )}
                    />
                  </div>
                  <div className="text-sm text-center text-muted-foreground">
                    <p>A verification code has been sent to:</p>
                    <p className="font-medium mt-1">{pendingUser.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <Shield className="h-4 w-4 mr-2 text-[#b047c9]" />
                  <span className="text-sm text-muted-foreground">Enhanced security with multi-factor authentication</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-[#b047c9] hover:bg-[#b047c9]/90 text-white" 
                  disabled={isSubmitting || verificationCode.length < 6}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <div className="flex justify-between w-full">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleCancel}
                    className="text-[#b047c9]"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleResendCode}
                    disabled={isResending}
                    className="text-[#b047c9]"
                  >
                    {isResending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    Resend Code
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>© 2023 We Are Group. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MFAVerification;
