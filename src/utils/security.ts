// src/utils/security.ts

// Basic sanitization to strip HTML tags and escape special characters
export function sanitizeInput(input: string): string {
  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>?/gm, '');
  // Escape special characters
  sanitized = sanitized.replace(/[&<>"'`=\/]/g, (s) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;',
    '=': '&#61;',
    '/': '&#47;',
  }[s] || s));
  return sanitized;
}

// Safe error logging
export function safeErrorLog(message: string, error: any) {
  if (process.env.NODE_ENV === 'development') {
    // Log full error details in development
    // eslint-disable-next-line no-console
    console.error(message, error);
  } else {
    // Log only generic message in production
    // eslint-disable-next-line no-console
    console.error(message);
  }
}
