
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppRoutes } from '@/routes';
import { Toaster } from "@/components/ui/toaster";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <Toaster />
      </Router>
    </AuthProvider>
  );
};

export default App;
