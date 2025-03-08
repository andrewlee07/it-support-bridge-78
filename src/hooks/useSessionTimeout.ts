
import { useCallback, useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useSessionTimeout = () => {
  const { logout } = useAuth();

  const initializeSessionTimeout = useCallback(() => {
    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        logout();
      }, 30 * 60 * 1000); // 30 minutes
    };

    // Set up event listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimeout);
    });

    // Initialize the timeout
    resetTimeout();

    // Clean up
    return () => {
      clearTimeout(timeout);
      events.forEach(event => {
        document.removeEventListener(event, resetTimeout);
      });
    };
  }, [logout]);

  return { initializeSessionTimeout };
};
