
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Logo */}
      <header className="w-full py-4 px-6 md:px-12 border-b bg-white shadow-sm">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/9f8e5267-ab6c-409e-99f0-0517f48fc1b8.png" 
              alt="We Are Group" 
              className="h-12 md:h-16"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-r from-[#b047c9] to-[#42284e] text-white">
          <div className="container max-w-screen-xl mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 mb-8 md:mb-0"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                IT Service Management System
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base bg-[#42284e] hover:bg-[#42284e]/90 text-white" asChild>
                   <Link to="/login">
                     Login
                    <ArrowRight className="ml-2 h-5 w-5" />
                   </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:w-1/2 flex justify-center"
            >
              <div className="bg-white p-1 rounded-lg shadow-lg">
                <img 
                  src="/lovable-uploads/6bbdc108-9f2f-4b80-89a7-dcd446b23914.png" 
                  alt="IT Support Services" 
                  className="rounded w-full max-w-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white py-16">
          <div className="container max-w-screen-xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#42284e]">IT Support Bridge</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A lightweight ITSM system that simplifies incident management, service requests, and change control.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Incident Management",
                  color: "#f08586",
                  description: "Simple incident tracking and resolution workflow"
                },
                {
                  title: "Service Requests",
                  color: "#f7be12",
                  description: "Track and manage service requests efficiently"
                },
                {
                  title: "Asset Management",
                  color: "#accb46",
                  description: "Keep track of your IT assets and their lifecycle"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-white p-6 rounded-lg shadow-md border-t-4"
                  style={{ borderColor: service.color }}
                >
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#05b2e6]/10 py-16">
          <div className="container max-w-screen-xl mx-auto px-4 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#42284e]">Ready to simplify your IT support?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Start managing your IT services efficiently today.
              </p>
              <Button size="lg" className="text-base bg-[#b047c9] hover:bg-[#b047c9]/90" asChild>
                <Link to="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#42284e] text-white py-8">
        <div className="container max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="bg-white inline-block p-2 rounded shadow">
                <img 
                  src="/lovable-uploads/9f8e5267-ab6c-409e-99f0-0517f48fc1b8.png" 
                  alt="We Are Group" 
                  className="h-12 mb-1"
                />
              </div>
              <p className="text-sm text-white/80 mt-3">
                We Are Group is a trading name of We Are Group Holdings Ltd.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-lg mb-4">Contact Us</h4>
              <p className="text-sm mb-2">info@wearegroup.com</p>
              <p className="text-sm mb-2">01333 444 019</p>
              <p className="text-sm">Monday to Friday, 09:00 - 17:00</p>
            </div>
            <div>
              <h4 className="font-medium text-lg mb-4">Address</h4>
              <p className="text-sm mb-1">Friars House</p>
              <p className="text-sm mb-1">Manor House Drive</p>
              <p className="text-sm mb-1">Coventry</p>
              <p className="text-sm">CV1 2TE</p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-sm text-white/60 text-center">
            <p>© 2023 We Are Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
