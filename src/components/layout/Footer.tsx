
import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin, Twitter, Instagram, Facebook } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-foreground mb-4">
              <BookOpen className="w-6 h-6" strokeWidth={1.5} />
              <span className="font-heading text-xl font-semibold">Books For Fosters</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Empowering readers through affordable book rentals, purchases, and community-driven donations. Every book finds a home.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["/books", "/books", "/books", "/donate", "/community"].map((href, index) => (
                <li key={index}>
                  <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {["Explore Books", "Rent a Book", "Buy Books", "Donate Books", "Community"][index]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {[
                { name: "Help Center", href: "/help" },
                { name: "FAQs", href: "/faq" },
                { name: "Delivery Info", href: "/delivery" },
                { name: "Return Policy", href: "/returns" },
                { name: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe for new book arrivals and community updates.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="flex-1 bg-background border-border"
              />
              <Button variant="default" size="icon">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>hello@booksforfosters.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Books For Fosters. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
