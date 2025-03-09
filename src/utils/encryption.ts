
/**
 * Note: This is a simplified encryption implementation for demonstration.
 * In a production environment, use a proper encryption library and secure key management.
 */

// Encryption key would be stored securely in a real application
const ENCRYPTION_KEY = 'your-secure-encryption-key';

/**
 * Encrypt sensitive data
 * In a real implementation, this would use the Web Crypto API or a library like CryptoJS
 */
export const encryptData = (data: string): string => {
  // Simple XOR encryption for demonstration
  // DO NOT use this in production - use proper encryption libraries
  const encrypted = Array.from(data)
    .map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length))
    )
    .join('');
  
  // Convert to Base64 for safe storage
  return btoa(encrypted);
};

/**
 * Decrypt encrypted data
 */
export const decryptData = (encryptedData: string): string => {
  try {
    // Decode from Base64
    const encrypted = atob(encryptedData);
    
    // Reverse the XOR encryption
    return Array.from(encrypted)
      .map((char, i) => 
        String.fromCharCode(char.charCodeAt(0) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length))
      )
      .join('');
  } catch (error) {
    console.error('Failed to decrypt data:', error);
    return '';
  }
};

/**
 * Encrypt an object by encrypting all string values
 * This is useful for encrypting sensitive data before storage
 */
export const encryptObject = <T extends Record<string, any>>(obj: T): Record<string, any> => {
  const result = { ...obj } as Record<string, any>;
  
  Object.keys(result).forEach(key => {
    if (typeof result[key] === 'string' && shouldEncryptField(key)) {
      result[key] = encryptData(result[key]);
    }
  });
  
  return result;
};

/**
 * Decrypt an object by decrypting all encrypted string values
 */
export const decryptObject = <T extends Record<string, any>>(obj: T): Record<string, any> => {
  const result = { ...obj } as Record<string, any>;
  
  Object.keys(result).forEach(key => {
    if (typeof result[key] === 'string' && shouldEncryptField(key)) {
      try {
        result[key] = decryptData(result[key]);
      } catch (e) {
        // If decryption fails, it might not be encrypted
        console.warn(`Could not decrypt field: ${key}`);
      }
    }
  });
  
  return result;
};

/**
 * Determine if a field should be encrypted based on its name
 * This is a simple implementation - in a real app, you'd have a more sophisticated approach
 */
const shouldEncryptField = (fieldName: string): boolean => {
  const sensitiveFields = [
    'password', 'secret', 'token', 'key', 'credit', 'card', 
    'ssn', 'social', 'address', 'phone', 'email'
  ];
  
  return sensitiveFields.some(field => fieldName.toLowerCase().includes(field));
};
