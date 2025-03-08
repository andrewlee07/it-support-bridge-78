
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, ArrowLeft, LockKeyhole } from 'lucide-react';
import { getUserByEmail } from '@/utils/mockData/users';
import { useToast } from '@/hooks/use-toast';

const SecurityQuestionRecovery = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFindAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = getUserByEmail(email);
      
      if (foundUser && foundUser.securityQuestions && foundUser.securityQuestions.length > 0) {
        setUser(foundUser);
        setAnswers(new Array(foundUser.securityQuestions.length).fill(''));
        setStep(2);
      } else {
        toast({
          title: "Account not found",
          description: "We couldn't find an account with that email or it doesn't have security questions configured.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyAnswers = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd verify these with the server
      const allCorrect = user.securityQuestions.every((q: any, index: number) => 
        q.answer.toLowerCase() === answers[index].toLowerCase()
      );
      
      if (allCorrect) {
        setStep(3);
      } else {
        toast({
          title: "Incorrect answers",
          description: "One or more security question answers are incorrect.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Basic validation
      if (newPassword.length < 8) {
        toast({
          title: "Password too short",
          description: "Password must be at least 8 characters.",
          variant: "destructive",
        });
        return;
      }
      
      if (newPassword !== confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match.",
          variant: "destructive",
        });
        return;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password reset successful",
        description: "Your password has been reset. You can now login with your new password.",
      });
      
      // Redirect to login
      navigate('/login');
    } finally {
      setIsSubmitting(false);
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
              <CardTitle className="text-2xl font-bold">Account Recovery</CardTitle>
              <CardDescription className="text-white/80">
                {step === 1 && "Enter your email to find your account"}
                {step === 2 && "Answer your security questions"}
                {step === 3 && "Set a new password"}
              </CardDescription>
            </CardHeader>
            
            {step === 1 && (
              <form onSubmit={handleFindAccount}>
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
                </CardContent>
                <CardFooter className="flex-col space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#b047c9] hover:bg-[#b047c9]/90 text-white" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        Find Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/login')}
                    className="text-[#b047c9]"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </CardFooter>
              </form>
            )}
            
            {step === 2 && user && (
              <form onSubmit={handleVerifyAnswers}>
                <CardContent className="space-y-4 pt-6">
                  <div className="text-center mb-4">
                    <p className="font-medium">Hello, {user.name}</p>
                    <p className="text-sm text-muted-foreground">Please answer your security questions</p>
                  </div>
                  
                  {user.securityQuestions.map((question: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`question-${index}`}>{question.question}</Label>
                      <Input
                        id={`question-${index}`}
                        type="text"
                        value={answers[index]}
                        onChange={(e) => {
                          const newAnswers = [...answers];
                          newAnswers[index] = e.target.value;
                          setAnswers(newAnswers);
                        }}
                        required
                        className="border-[#b047c9]/20 focus-visible:ring-[#b047c9]"
                      />
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex-col space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#b047c9] hover:bg-[#b047c9]/90 text-white" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify Answers
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="text-[#b047c9]"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                </CardFooter>
              </form>
            )}
            
            {step === 3 && (
              <form onSubmit={handleResetPassword}>
                <CardContent className="space-y-4 pt-6">
                  <div className="text-center mb-4">
                    <LockKeyhole className="h-12 w-12 mx-auto text-[#b047c9] mb-2" />
                    <p className="font-medium">Create a new password</p>
                    <p className="text-sm text-muted-foreground">Your password should be at least 8 characters</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="border-[#b047c9]/20 focus-visible:ring-[#b047c9]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="border-[#b047c9]/20 focus-visible:ring-[#b047c9]"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#b047c9] hover:bg-[#b047c9]/90 text-white" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting...
                      </>
                    ) : (
                      <>
                        Reset Password
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="text-[#b047c9]"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                </CardFooter>
              </form>
            )}
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

export default SecurityQuestionRecovery;
