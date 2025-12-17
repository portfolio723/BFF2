"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  Heart,
  Search,
  BookOpen,
  Users,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/context/AppProvider";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Explore", href: "/books" },
  { name: "Donate", href: "/donate" },
  { name: "Community", href: "/community" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, wishlistCount } = useStore();
  
  // Mock user state since Firebase is removed
  const [user, setUser] = useState<{displayName: string} | null>(null);

  const handleSignIn = () => {
    // In a real app, this would be your auth logic
    setUser({ displayName: "Book Lover" });
    router.push('/');
  }

  const handleSignOut = () => {
    setUser(null);
    router.push("/");
  };


  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity"
          >
            <BookOpen className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={1.5} />
            <span className="font-headline text-lg lg:text-xl font-semibold tracking-tight">
              Books For Fosters
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "link-underline text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <Input
                    placeholder="Search books..."
                    className="h-9 bg-secondary border-0"
                    autoFocus
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-muted-foreground"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Button>
            
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] font-medium rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground relative"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] font-medium rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {user ? (
               <Button onClick={handleSignOut} variant="secondary" size="sm" className="rounded-full px-5">
                  Sign Out
                </Button>
            ) : (
                <Button onClick={handleSignIn} variant="default" size="sm" className="rounded-full px-5">
                  Sign In
                </Button>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground relative"
                 aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] font-medium rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <div className="py-4 space-y-1">
                 {user && (
                  <div className="px-4 pb-4 mb-2 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center text-lg font-semibold">
                        {user.displayName?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-medium">{user.displayName}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="px-2 pb-4">
                  <Input
                    placeholder="Search books..."
                    className="h-10 bg-secondary border-0"
                  />
                </div>

                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded-lg font-medium transition-colors",
                        pathname === link.href
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-4 px-2 flex flex-col gap-2">
                 {user && (
                    <Link href="/profile" onClick={() => setIsOpen(false)}>
                      <Button variant="secondary" className="w-full justify-start gap-3">
                        <User className="w-4 h-4" />
                        My Profile
                      </Button>
                    </Link>
                  )}
                  <Link href="/wishlist" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="secondary"
                      className="w-full justify-start gap-3"
                    >
                      <Heart className="w-4 h-4" />
                      Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                    </Button>
                  </Link>

                  {user ? (
                     <Button 
                      variant="destructive" 
                      className="w-full justify-start gap-3"
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  ) : (
                      <Button variant="default" className="w-full justify-start gap-3" onClick={() => { handleSignIn(); setIsOpen(false); }}>
                        <Users className="w-4 h-4" />
                        Sign In
                      </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
