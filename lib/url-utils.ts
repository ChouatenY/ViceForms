/**
 * Get the base URL for the application
 * Works both on server and client side with proper fallbacks
 */
export function getBaseUrl(): string {
  // Browser should use relative URL
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  
  // SSR should use NEXT_PUBLIC_APP_URL if available
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  // Fallback for Vercel deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Local development fallback
  return "http://localhost:3000";
}

/**
 * Generate a shareable form URL
 */
export function getFormShareUrl(formId: string): string {
  return `${getBaseUrl()}/public/submit-form/${formId}`;
}

/**
 * Generate a form preview URL
 */
export function getFormPreviewUrl(formId: string): string {
  return `${getBaseUrl()}/public/submit-form/${formId}`;
}
