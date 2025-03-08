
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppRoutes } from '@/routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
