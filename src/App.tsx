
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes';  // Import the router from routes.ts
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './components/ui/theme-provider';
import RouteValidator from './components/dev/RouteValidator';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <RouterProvider router={router} />
      <Toaster />
      {/* RouteValidator will only render in development mode */}
      <RouteValidator />
    </ThemeProvider>
  );
}

export default App;
