
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const features = [
    'Simple incident management',
    'Service request tracking',
    'IT change requests',
    'Asset management',
    'User management',
    'Email notifications',
    'Audit trails'
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col">
        <div className="container max-w-screen-xl mx-auto px-4 md:px-8 py-16 md:py-24 min-h-[80vh] flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                Introducing IT Support Bridge
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Streamlined IT Service Management
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A lightweight ITSM system that simplifies incident management, service requests, and change control.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-base" asChild>
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base" asChild>
                <Link to="/incidents">
                  View Incidents
                </Link>
              </Button>
            </div>
            
            <div className="glass-panel p-6 md:p-8 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-left">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-muted/50 py-16"
        >
          <div className="container max-w-screen-xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to simplify your IT support?</h2>
            <p className="text-muted-foreground mb-8">
              Start managing your IT services efficiently today.
            </p>
            <Button size="lg" className="text-base" asChild>
              <Link to="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
