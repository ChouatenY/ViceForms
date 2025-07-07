"use client";

import { useCallback, useEffect } from "react";
import { isInIframe, postMessageToParent, focusIframe } from "@/lib/iframe-utils";
import { toast } from "@/hooks/use-toast";

export function useIframeForm() {
  useEffect(() => {
    // Focus the iframe when component mounts
    focusIframe();
    
    // Listen for messages from parent
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "IFRAME_FOCUS") {
        focusIframe();
      }
    };

    if (isInIframe()) {
      window.addEventListener("message", handleMessage);
      
      // Notify parent that iframe is ready
      postMessageToParent({
        type: "IFRAME_READY",
        timestamp: Date.now()
      });
    }

    return () => {
      if (isInIframe()) {
        window.removeEventListener("message", handleMessage);
      }
    };
  }, []);

  const handleFormSubmit = useCallback(async (submitFunction: () => Promise<any>) => {
    try {
      // Ensure iframe has focus
      focusIframe();

      // Log for debugging
      if (isInIframe()) {
        console.log("ViceForms: Executing form submission in iframe");
        postMessageToParent({
          type: "IFRAME_FORM_START",
          timestamp: Date.now()
        });
      }

      // Execute the form submission
      const result = await submitFunction();

      // If in iframe, notify parent of success
      if (isInIframe()) {
        console.log("ViceForms: Form submission successful", result);
        postMessageToParent({
          type: "IFRAME_FORM_SUCCESS",
          data: result,
          timestamp: Date.now()
        });
      }

      return result;
    } catch (error) {
      console.error("ViceForms: Form submission error:", error);

      // If in iframe, notify parent of error
      if (isInIframe()) {
        postMessageToParent({
          type: "IFRAME_FORM_ERROR",
          error: error instanceof Error ? error.message : "Unknown error",
          timestamp: Date.now()
        });
      }

      // Show toast error
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });

      throw error;
    }
  }, []);

  const handleNavigation = useCallback((url: string) => {
    if (isInIframe()) {
      postMessageToParent({
        type: "IFRAME_NAVIGATE",
        url: url,
        timestamp: Date.now()
      });
    } else {
      window.location.href = url;
    }
  }, []);

  return {
    isInIframe: isInIframe(),
    handleFormSubmit,
    handleNavigation,
    focusIframe,
  };
}
