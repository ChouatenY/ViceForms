"use client";

/**
 * Check if the app is running inside an iframe
 */
export function isInIframe(): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    return window.self !== window.top;
  } catch (e) {
    // If we can't access window.top due to cross-origin restrictions,
    // we're definitely in an iframe
    return true;
  }
}

/**
 * Get the parent window if in iframe, otherwise return current window
 */
export function getParentWindow(): Window {
  if (typeof window === "undefined") return window;
  
  try {
    return isInIframe() ? window.parent : window;
  } catch (e) {
    return window;
  }
}

/**
 * Post message to parent window if in iframe
 */
export function postMessageToParent(message: any, targetOrigin: string = "*"): void {
  if (typeof window === "undefined") return;
  
  if (isInIframe()) {
    try {
      window.parent.postMessage(message, targetOrigin);
    } catch (e) {
      console.warn("Could not post message to parent:", e);
    }
  }
}

/**
 * Handle iframe-specific navigation
 */
export function handleIframeNavigation(url: string): void {
  if (isInIframe()) {
    // Post message to parent to handle navigation
    postMessageToParent({
      type: "IFRAME_NAVIGATION",
      url: url,
      timestamp: Date.now()
    });
  } else {
    // Normal navigation
    window.location.href = url;
  }
}

/**
 * Handle iframe-specific form submissions
 */
export function handleIframeFormSubmit(formData: any): void {
  if (isInIframe()) {
    // Post message to parent about form submission
    postMessageToParent({
      type: "IFRAME_FORM_SUBMIT",
      data: formData,
      timestamp: Date.now()
    });
  }
}

/**
 * Focus management for iframes
 */
export function focusIframe(): void {
  if (typeof window === "undefined") return;
  
  if (isInIframe()) {
    try {
      window.focus();
      document.body.focus();
    } catch (e) {
      console.warn("Could not focus iframe:", e);
    }
  }
}
