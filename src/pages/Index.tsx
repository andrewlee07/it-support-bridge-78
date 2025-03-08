
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, ShieldCheck, ArrowRight, Settings, FileText, Lock } from 'lucide-react';

const Index = () => {
  const { user, hasPermission } = useAuth();

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
              <div className="flex items-center space-x-4">
                <Button variant="ghost" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="default" onClick={() => null}>
                  Logged in as {user.name}
                </Button>
              </div>
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
      
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">IT Support Bridge</h1>
            <p className="text-xl text-muted-foreground">
              Secure enterprise platform for IT support and service management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <div className="mb-4">
                <ShieldCheck className="h-8 w-8 text-[#b047c9]" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Enhanced Security</h2>
              <p className="text-muted-foreground mb-4">
                Enterprise-grade security features including MFA, session management, 
                and comprehensive access controls.
              </p>
              {user ? (
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/dashboard">
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">
                    Sign In <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
            
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <div className="mb-4">
                <FileText className="h-8 w-8 text-[#b047c9]" />
              </div>
              <h2 className="text-xl font-semibold mb-2">IT Service Management</h2>
              <p className="text-muted-foreground mb-4">
                Streamline your IT operations with our comprehensive ticketing 
                and service management tools.
              </p>
              {user ? (
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/dashboard">
                    Access Services <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">
                    Sign In <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          
          {/* Admin features section - only visible to admins */}
          {user && hasPermission(['admin']) && (
            <div className="bg-[#b047c9]/10 border border-[#b047c9]/20 rounded-lg p-6 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Lock className="h-5 w-5 mr-2 text-[#b047c9]" />
                Administrator Controls
              </h2>
              <p className="text-muted-foreground mb-6">
                Access system-wide configuration and security controls for the platform.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button asChild variant="outline" className="border-[#b047c9]/30 hover:bg-[#b047c9]/5">
                  <Link to="/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    System Security Settings
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-[#b047c9]/30 hover:bg-[#b047c9]/5">
                  <Link to="/security-audit-log">
                    <FileText className="mr-2 h-4 w-4" />
                    Security Audit Logs
                  </Link>
                </Button>
              </div>
            </div>
          )}
          
          {/* Regular security features section - visible to all */}
          <div className="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Security Features</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
                Multi-factor authentication (MFA)
              </li>
              <li className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
                Session timeout protection
              </li>
              <li className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
                Advanced password policies
              </li>
              <li className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
                Security event logging
              </li>
              <li className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
                Role-based access control
              </li>
            </ul>
          </div>
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
