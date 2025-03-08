import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { setupGlobalErrorHandler } from './utils/logging/errorLogger';

createRoot(document.getElementById("root")!).render(<App />);

setupGlobalErrorHandler();
