
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Gift, Users, Package, CheckCircle, Truck, CreditCard, Shield, Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const HeroSection = () => {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-2');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,hsl(var(--secondary))_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(var(--secondary))_0%,transparent_40%)]" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="lg:order-1 text-center lg:text-left">
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
              className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0"
            >
              Join our community of book lovers. Rent books for just delivery charges, 
              buy at affordable prices, or donate to make knowledge accessible to all.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="rounded-full px-8 gap-2 group">
                <Link href="/community">
                  Join Community
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 gap-2">
                <Link href="/donate">
                  Donate
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
                { value: "1000+", label: "Books Available" },
                { value: "100+", label: "Happy Readers" },
                { value: "200+", label: "Books Donated" },
              ].map((stat, index) => (
                <div key={index}>
                  <p className="font-heading text-2xl lg:text-3xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Hero Image */}
          <div className="lg:order-2 mt-12 lg:mt-0">
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative aspect-[4/5] max-w-md mx-auto"
              >
              {heroImage && (
                  <div className="w-full h-full bg-secondary rounded-2xl shadow-lg overflow-hidden">
                    <Image 
                      src={heroImage.imageUrl} 
                      alt={heroImage.description}
                      data-ai-hint={heroImage.imageHint}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CategoriesSection = () => {
  const categories = [
    { name: "UPSC", imageId: "new-genre-upsc", href: "/genre/upsc" },
    { name: "Space & Astronomy", imageId: "new-genre-space", href: "/genre/space-and-astronomy" },
    { name: "Self Development", imageId: "new-genre-self-dev", href: "/genre/self-development" },
    { name: "Psychology", imageId: "new-genre-psychology", href: "/genre/psychology" },
    { name: "Geography", imageId: "new-genre-geography", href: "/genre/geography"},
    { name: "NCERT", imageId: "new-genre-ncert", href: "/genre/ncert" },
    { name: "History", imageId: "new-genre-history", href: "/genre/history" },
    { name: "Competitve Exams", imageId: "new-genre-exams", href: "/genre/competitve-exams" },
    { name: "Biography & Auto Biograpghy", imageId: "new-genre-biography", href: "/genre/biography-autobiography" },
    { name: "Bible", imageId: "new-genre-bible", href: "/genre/bible" },
    { name: "Anthropology", imageId: "new-genre-anthropology", href: "/genre/anthropology" },
    { name: "Adventure", imageId: "new-genre-adventure" },
    { name: "Career Guide", imageId: "new-genre-career" },
    { name: "Business Management", imageId: "new-genre-business", href: "/genre/business-management" },
    { name: "Computer Science", imageId: "new-genre-cs", href: "/genre/computer-science" },
    { name: "Cultural", imageId: "new-genre-cultural", href: "/genre/cultural" },
    { name: "Crime & Mystery", imageId: "book-cover-6", href: "/genre/crime-mystery" },
    { name: "Economics", imageId: "new-genre-economics" },
    { name: "Engineering", imageId: "new-genre-engineering" },
    { name: "Fantasy", imageId: "new-book-2", href: "/genre/fantasy" },
    { name: "Environment", imageId: "new-genre-environment" },
  ];

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const image = PlaceHolderImages.find(img => img.id === category.imageId);
            if (!image) return null;
            
            const slug = category.name.toLowerCase().replace(/ & | /g, '-').replace(/[^a-z0-9-]/g, '');
            const href = category.href || `/genre/${slug}`;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  href={href}
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


const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Vast Collection",
      description: "Access thousands of books across all genres, from bestsellers to rare finds.",
    },
    {
      icon: Truck,
      title: "Pay Only Delivery",
      description: "Rent books for free – just pay minimal delivery charges to your doorstep.",
    },
    {
      icon: Gift,
      title: "Donate & Share",
      description: "Give your books a new home. Donate easily and spread the joy of reading.",
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Connect with fellow readers, discuss books, and make new friends.",
    },
    {
      icon: CreditCard,
      title: "Flexible Options",
      description: "Rent for a period or buy outright. Choose what works best for you.",
    },
    {
      icon: Shield,
      title: "Verified Users",
      description: "KYC verified members ensure safe transactions and trusted exchanges.",
    },
  ];

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
            Why Choose Us
          </span>
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold mt-3">
            Reading Made Accessible
          </h2>
          <p className="mt-4 text-muted-foreground">
            We believe everyone deserves access to books. Our platform makes it easy to 
            read, share, and connect through literature.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 lg:p-8 bg-card rounded-xl border border-border hover:border-foreground/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-foreground group-hover:text-background transition-colors">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl font-medium">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Avid Reader",
      avatarId: "user-avatar-1",
      content: "Books For Fosters has transformed my reading habit. I rent 5-6 books monthly for just delivery charges. Absolute game changer!",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      role: "Book Donor",
      avatarId: "user-avatar-2",
      content: "Donated over 200 books from my collection. The pickup service is seamless and knowing my books find new readers is heartwarming.",
      rating: 5,
    },
    {
      name: "Anjali Patel",
      role: "Student",
      avatarId: "user-avatar-3",
      content: "As a student, buying textbooks was expensive. Now I rent academic books at a fraction of the cost. Highly recommend!",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold mt-3">
            What Our Community Says
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => {
             const avatar = PlaceHolderImages.find(img => img.id === testimonial.avatarId);
             if (!avatar) return null;

            return (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 lg:p-8 border border-border relative"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-muted-foreground/20" />
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <Image 
                    src={avatar.imageUrl}
                    alt={testimonial.name}
                    data-ai-hint={avatar.imageHint}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

    
