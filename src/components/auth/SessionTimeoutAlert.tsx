
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Time in milliseconds before session expiry to show the warning (2 minutes)
const WARNING_BEFORE_TIMEOUT = 2 * 60 * 1000;

// How often to check for session timeout (every 30 seconds)
const CHECK_INTERVAL = 30 * 1000;

const SessionTimeoutAlert = () => {
  const { user, refreshSession, logout } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const checkSessionTimeout = useCallback(() => {
    if (!user || !user.sessionTimeout || !user.sessionStartTime) return;
    
    const sessionTimeoutMs = user.sessionTimeout * 60 * 1000;
    const sessionStart = new Date(user.sessionStartTime).getTime();
    const expiryTime = sessionStart + sessionTimeoutMs;
    const now = Date.now();
    const timeLeft = expiryTime - now;
    
    if (timeLeft <= WARNING_BEFORE_TIMEOUT && timeLeft > 0) {
      setShowWarning(true);
      setRemainingTime(Math.floor(timeLeft / 1000));
    } else if (timeLeft <= 0) {
      // Session has expired
      logout();
    } else {
      setShowWarning(false);
    }
  }, [user, logout]);

  // Check for session timeout periodically
  useEffect(() => {
    if (!user) return;
    
    // Check once immediately
    checkSessionTimeout();
    
    // Set up interval for checking
    const interval = setInterval(checkSessionTimeout, CHECK_INTERVAL);
    
    return () => clearInterval(interval);
  }, [user, checkSessionTimeout]);

  // Countdown timer for warning dialog
  useEffect(() => {
    let timer: number;
    
    if (showWarning && remainingTime > 0) {
      timer = window.setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showWarning, remainingTime]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    const success = refreshSession();
    
    if (success) {
      setShowWarning(false);
    }
    
    setIsRefreshing(false);
  };

  if (!user || !showWarning) {
    return null;
  }

  return (
    <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Session About to Expire</AlertDialogTitle>
          <AlertDialogDescription>
            Your session will expire in {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')} minutes. 
            Would you like to continue working?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={logout}>Log Out</AlertDialogCancel>
          <AlertDialogAction onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Extending Session...
              </>
            ) : (
              "Continue Session"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SessionTimeoutAlert;
