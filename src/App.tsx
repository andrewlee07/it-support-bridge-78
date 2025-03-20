
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes';  // Changed from named import to default import
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './components/ui/theme-provider';
import RouteValidator from './components/dev/RouteValidator';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <BrowserRouter>
        <AppRoutes />
        <Toaster />
        {/* RouteValidator will only render in development mode */}
        <RouteValidator />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
