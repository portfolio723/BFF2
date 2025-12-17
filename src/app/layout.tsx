
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
          <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={cn("antialiased flex flex-col min-h-screen")}>
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
      </body>
    </html>
  );
}

    