
"use client";

import { AppProvider } from "@/context/AppProvider";
import { WishlistProvider } from "@/context/WishlistContext";
import { AddressProvider } from "@/context/AddressContext";
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster as LegacyToaster } from "@/components/ui/toaster";
import { Toaster } from "sonner";
import "./globals.css";
import { cn } from "@/lib/utils";
import { FirebaseClientProvider } from "@/firebase";

// This component can't be a server component because of the providers
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
          <title>Books For Fosters</title>
          <meta name="description" content="Your local destination for books in Hyderabad." />
          <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📖</text></svg>" />
          <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'/><path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'/></svg>" media="(prefers-color-scheme: light)" />
          <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'/><path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'/></svg>" media="(prefers-color-scheme: dark)" />
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className={cn("antialiased flex flex-col min-h-screen")}>
        <FirebaseClientProvider>
          <AuthProvider>
            <AppProvider>
              <WishlistProvider>
                <AddressProvider>
                  <Header />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                  <LegacyToaster />
                  <Toaster richColors />
                </AddressProvider>
              </WishlistProvider>
            </AppProvider>
          </AuthProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
