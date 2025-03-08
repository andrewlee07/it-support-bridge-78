import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useToast } from '@/hooks/use-toast';

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with email:", email);
    
    // Simple form validation
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Clean input and attempt login
      const cleanedEmail = email.trim();
      console.log("Attempting login with cleaned email:", cleanedEmail);
      
      // Login should now always succeed
      const success = await login(cleanedEmail, password || "demo-password");
      console.log("Login result:", success ? "Success" : "Failed");
      
      if (success) {
        toast({
          title: "Success",
          description: "You have successfully logged in"
        });
        navigate('/');
      } else {
        // This should never happen now, but keeping as fallback
        toast({
          title: "Login Failed",
          description: "Please try again with any email",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleSubmit
  };
};
