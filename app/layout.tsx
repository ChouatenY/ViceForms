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
      </body>
    </html>
  );
}
