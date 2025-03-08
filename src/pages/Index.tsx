
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#b047c9]/10 to-[#05b2e6]/5 flex flex-col">
      {/* Header with Logo */}
      <header className="w-full py-4 px-6 md:px-12 bg-white shadow-sm">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between">
            <img 
              src="/lovable-uploads/9f8e5267-ab6c-409e-99f0-0517f48fc1b8.png" 
              alt="We Are Group" 
              className="h-10 md:h-12"
            />
            
            {user ? (
              <Button variant="default" asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-6 py-12 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">IT Support Bridge</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Secure enterprise platform for IT support and service management
          </p>
          
          {user ? (
            <Button size="lg" asChild>
              <Link to="/dashboard">Access Dashboard</Link>
            </Button>
          ) : (
            <Button size="lg" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>© 2023 We Are Group. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
