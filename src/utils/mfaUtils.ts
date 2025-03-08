
import { User, MFAMethod } from './types/user';
import { logSecurityEvent, isSessionExpired, isIPAllowed, generateJWTToken } from './securityUtils';

// Mock function to generate TOTP code (in a real app would use a library like otplib)
export const generateTOTPCode = (): string => {
  // Generate a random 6-digit code
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Mock function to send verification code via email
export const sendEmailVerificationCode = (email: string, code: string): Promise<boolean> => {
  console.log(`[MFA] Sending email verification code "${code}" to ${email}`);
  // In a real app, this would call an API to send an email
  return Promise.resolve(true);
};

// Mock function to send verification code via SMS
export const sendSMSVerificationCode = (phoneNumber: string, code: string): Promise<boolean> => {
  console.log(`[MFA] Sending SMS verification code "${code}" to ${phoneNumber}`);
  // In a real app, this would call an API to send an SMS
  return Promise.resolve(true);
};

// Function to send verification code based on user's MFA method
export const sendVerificationCode = async (user: User): Promise<string> => {
  const code = generateTOTPCode();
  
  switch (user.mfaMethod) {
    case 'email':
      await sendEmailVerificationCode(user.email, code);
      break;
    case 'sms':
      // In a real app, we'd have the user's phone number
      await sendSMSVerificationCode('+1234567890', code);
      break;
    case 'totp':
      // For TOTP, the code would be generated by the user's authenticator app
      // Here we're just simulating it
      console.log(`[MFA] User should use authenticator app code`);
      break;
    default:
      throw new Error('Unsupported MFA method');
  }
  
  return code;
};

// Store temporary verification codes - in a real app this would be in a secure database
const temporaryVerificationCodes: Record<string, { code: string, expires: Date }> = {};

// Store verification code for a user
export const storeVerificationCode = (userId: string, code: string): void => {
  // Code expires in 5 minutes
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 5);
  
  temporaryVerificationCodes[userId] = { code, expires };
};

// Verify the code provided by a user
export const verifyCode = (userId: string, providedCode: string): boolean => {
  const storedInfo = temporaryVerificationCodes[userId];
  
  if (!storedInfo) {
    return false;
  }
  
  const now = new Date();
  if (now > storedInfo.expires) {
    // Code has expired
    delete temporaryVerificationCodes[userId];
    return false;
  }
  
  const isValid = storedInfo.code === providedCode;
  
  if (isValid) {
    // Code has been used, remove it
    delete temporaryVerificationCodes[userId];
  }
  
  return isValid;
};

// Mock function to check if an account should be locked due to too many failed attempts
export const shouldLockAccount = (user: User): boolean => {
  const MAX_ATTEMPTS = 5;
  return (user.loginAttempts || 0) >= MAX_ATTEMPTS;
};

// Mock function to reset login attempts after successful login
export const resetLoginAttempts = (user: User): User => {
  return {
    ...user,
    loginAttempts: 0,
    lockedUntil: undefined
  };
};

// Mock function to increment login attempts after failed login
export const incrementLoginAttempts = (user: User): User => {
  const newAttempts = (user.loginAttempts || 0) + 1;
  
  // If max attempts reached, lock account for 30 minutes
  const lockedUntil = newAttempts >= 5 ? new Date(Date.now() + 30 * 60 * 1000) : user.lockedUntil;
  
  return {
    ...user,
    loginAttempts: newAttempts,
    lockedUntil
  };
};

// Check if account is locked
export const isAccountLocked = (user: User): boolean => {
  if (!user.lockedUntil) return false;
  
  return new Date() < user.lockedUntil;
};

// Get client IP address (mock function)
export const getClientIPAddress = (): string => {
  // In a real app, this would come from the request headers
  return '192.168.1.1';
};

// Initialize a user session
export const initializeUserSession = (user: User): User => {
  const ipAddress = getClientIPAddress();
  const { token, refreshToken, expiry } = generateJWTToken(user);
  
  // Log session start
  logSecurityEvent({
    userId: user.id,
    eventType: 'login',
    ipAddress,
    userAgent: navigator.userAgent,
    details: 'User session initialized',
    severity: 'info'
  });
  
  return {
    ...user,
    sessionStartTime: new Date(),
    lastIPAddress: ipAddress,
    jwtToken: token,
    refreshToken,
    tokenExpiry: expiry
  };
};

// Check if a user session is valid
export const isSessionValid = (user: User): boolean => {
  if (!user) return false;
  
  // Check session timeout
  if (isSessionExpired(user)) {
    logSecurityEvent({
      userId: user.id,
      eventType: 'logout',
      ipAddress: getClientIPAddress(),
      userAgent: navigator.userAgent,
      details: 'Session expired',
      severity: 'info'
    });
    return false;
  }
  
  // Check IP address
  if (!isIPAllowed(user, getClientIPAddress())) {
    logSecurityEvent({
      userId: user.id,
      eventType: 'failed_login',
      ipAddress: getClientIPAddress(),
      userAgent: navigator.userAgent,
      details: 'Login attempt from unauthorized IP address',
      severity: 'warning'
    });
    return false;
  }
  
  // Check JWT token expiry
  if (user.tokenExpiry && new Date() > user.tokenExpiry) {
    // Token has expired
    return false;
  }
  
  return true;
};
