"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage1 = PlaceHolderImages.find(img => img.id === 'hero-1');
  const heroImage2 = PlaceHolderImages.find(img => img.id === 'hero-2');
  const heroImage3 = PlaceHolderImages.find(img => img.id === 'hero-3');

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center pt-10 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,hsl(var(--secondary))_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(var(--secondary))_0%,transparent_40%)]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
                Empowering readers, one book at a time
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-headline text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] tracking-tighter"
            >
              Discover, Rent & <br />
              <span className="text-muted-foreground">Share</span> Books
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground max-w-lg"
            >
              Join our community of book lovers. Rent books for just delivery charges, 
              buy at affordable prices, or donate to make knowledge accessible to all.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="rounded-full px-8 gap-2 group">
                <Link href="/books">
                  Explore Books
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 gap-2">
                <Link href="/donate">
                  <Gift className="w-4 h-4" />
                  Donate Books
                </Link>
              </Button>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              {[
                { value: "10K+", label: "Books Available" },
                { value: "5K+", label: "Happy Readers" },
                { value: "2K+", label: "Books Donated" },
              ].map((stat, index) => (
                <div key={index}>
                  <p className="font-heading text-2xl lg:text-3xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Floating Books */}
              {heroImage1 && (
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-48 h-64 bg-secondary rounded-lg shadow-hover overflow-hidden z-20"
                >
                  <Image 
                    src={heroImage1.imageUrl} 
                    alt={heroImage1.description}
                    data-ai-hint={heroImage1.imageHint}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              )}
              
              {heroImage2 && (
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-20 right-0 w-44 h-60 bg-secondary rounded-lg shadow-hover overflow-hidden z-30"
                >
                  <Image 
                    src={heroImage2.imageUrl} 
                    alt={heroImage2.description}
                    data-ai-hint={heroImage2.imageHint}
                    fill
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
              
              {heroImage3 && (
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-10 left-10 w-40 h-56 bg-secondary rounded-lg shadow-hover overflow-hidden z-10"
                >
                  <Image 
                    src={heroImage3.imageUrl} 
                    alt={heroImage3.description}
                    data-ai-hint={heroImage3.imageHint}
                    fill
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
              
              {/* Decorative Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full border-2 border-dashed border-border opacity-50" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
