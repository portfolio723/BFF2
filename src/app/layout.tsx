import type { Metadata } from "next";
import { AppProvider } from "@/context/AppProvider";
import { WishlistProvider } from "@/context/WishlistContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Hyderabad Reads",
  description: "Your local destination for books in Hyderabad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
      </head>
      <body className={cn("antialiased flex flex-col min-h-screen")}>
        <AppProvider>
          <WishlistProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </WishlistProvider>
        </AppProvider>
      </body>
    </html>
  );
}
