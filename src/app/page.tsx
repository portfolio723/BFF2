"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Gift, Users } from "lucide-react";
import { motion } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const HeroSection = () => {
  const heroImage1 = PlaceHolderImages.find(img => img.id === 'hero-1');
  const heroImage2 = PlaceHolderImages.find(img => img.id === 'hero-2');
  const heroImage3 = PlaceHolderImages.find(img => img.id === 'hero-3');

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,hsl(var(--secondary))_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(var(--secondary))_0%,transparent_40%)]" />
      
      <div className="container-custom relative z-10">
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
              className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] tracking-tight"
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
};


const CTASection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-foreground" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--muted))_0%,transparent_50%)] opacity-10" />
          
          {/* Content */}
          <div className="relative px-6 py-16 lg:px-16 lg:py-24 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl lg:text-4xl xl:text-5xl font-semibold text-background leading-tight"
            >
              Ready to Start Your<br />Reading Journey?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-background/70 max-w-lg mx-auto"
            >
              Join thousands of book lovers who have discovered the joy of 
              affordable reading with Books For Fosters.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Button asChild size="lg" className="rounded-full px-8 gap-2 group bg-background text-foreground hover:bg-background/90">
                <Link href="/auth">
                  Create Free Account
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-background/30 text-background hover:bg-background/10 hover:text-background">
                <Link href="/books">
                  Browse as Guest
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const categories = [
  { name: "Fiction", count: 2340, imageId: "fiction-category" },
  { name: "Non-Fiction", count: 1890, imageId: "non-fiction-category" },
  { name: "Science", count: 1250, imageId: "science-category" },
  { name: "Self-Help", count: 980, imageId: "self-help-category" },
  { name: "Children", count: 1560, imageId: "children-category" },
  { name: "Academic", count: 2100, imageId: "academic-category" },
];

const CategoriesSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Browse by Category
          </span>
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold mt-3">
            Explore Genres
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const image = PlaceHolderImages.find(img => img.id === category.imageId);
            if (!image) return null;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  href={`/books?category=${category.name.toLowerCase()}`}
                  className="group block relative aspect-[4/5] rounded-xl overflow-hidden"
                >
                  <Image 
                    src={image.imageUrl} 
                    alt={category.name}
                    data-ai-hint={image.imageHint}
                    fill
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-heading text-lg font-medium text-background">
                      {category.name}
                    </h3>
                    <p className="text-sm text-background/70 mt-0.5">
                      {category.count.toLocaleString()} books
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-background" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <CTASection />
    </>
  );
}