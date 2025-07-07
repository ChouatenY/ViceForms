import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { LocalUserProvider } from "@/hooks/use-local-user";
import "./globals.css";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ViceForms - Form Builder",
  description: "Create beautiful forms with ViceForms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-white ${dm_sans.className} antialiased`}>
        <LocalUserProvider>
          {children}
          <Toaster />
        </LocalUserProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Enhanced iframe communication setup
              (function() {
                const isInIframe = window.self !== window.top;

                if (isInIframe) {
                  console.log('ViceForms: Running in iframe mode');

                  // Enhanced message handling
                  window.addEventListener('message', function(event) {
                    console.log('ViceForms: Received message:', event.data);

                    switch(event.data.type) {
                      case 'IFRAME_FOCUS':
                        window.focus();
                        document.body.focus();
                        break;
                      case 'IFRAME_REFRESH':
                        window.location.reload();
                        break;
                    }
                  });

                  // Enhanced error handling
                  window.addEventListener('error', function(event) {
                    window.parent.postMessage({
                      type: 'IFRAME_ERROR',
                      error: event.error?.message || 'Unknown error',
                      timestamp: Date.now()
                    }, '*');
                  });

                  // Notify parent that iframe is ready
                  window.parent.postMessage({
                    type: 'IFRAME_READY',
                    url: window.location.href,
                    timestamp: Date.now()
                  }, '*');

                  // Override form submissions to notify parent
                  const originalFetch = window.fetch;
                  window.fetch = function(...args) {
                    return originalFetch.apply(this, args).then(response => {
                      if (response.ok && args[0]?.includes('/api/')) {
                        window.parent.postMessage({
                          type: 'IFRAME_API_SUCCESS',
                          url: args[0],
                          timestamp: Date.now()
                        }, '*');
                      }
                      return response;
                    }).catch(error => {
                      window.parent.postMessage({
                        type: 'IFRAME_API_ERROR',
                        url: args[0],
                        error: error.message,
                        timestamp: Date.now()
                      }, '*');
                      throw error;
                    });
                  };
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
