
"use client";

import { AppProvider } from "@/context/AppProvider";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
          <meta name="description" content="A community-driven initiative in Hyderabad for sharing educational books. Donate pre-loved books, find new reads, and help make knowledge accessible to all." />
          <link rel="icon" href="/favicon.svg" media="(prefers-color-scheme: light)" />
          <link rel="icon" href="/favicon-dark.svg" media="(prefers-color-scheme: dark)" />
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className={cn("antialiased flex flex-col min-h-screen")}>
        <AuthProvider>
          <AppProvider>
            <WishlistProvider>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
                <Toaster richColors />
            </WishlistProvider>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
