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
              // Iframe communication setup
              if (window.self !== window.top) {
                // We're in an iframe
                window.addEventListener('message', function(event) {
                  if (event.data.type === 'IFRAME_FOCUS') {
                    window.focus();
                    document.body.focus();
                  }
                });

                // Notify parent that iframe is ready
                window.parent.postMessage({
                  type: 'IFRAME_READY',
                  timestamp: Date.now()
                }, '*');
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
