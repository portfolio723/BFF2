
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Users,
  BookHeart,
  Heart,
  Target,
  GraduationCap,
  Briefcase,
  Mic,
  Handshake,
  Building,
  Share2,
  ShieldCheck,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const MotionImage = motion(Image);

const AboutPage = () => {
  const aboutHeroImage = PlaceHolderImages.find(
    (img) => img.id === 'about-hero'
  );

  const teamMembers = [
    {
      name: 'Students',
      icon: GraduationCap,
    },
    {
      name: 'Working Professionals',
      icon: Briefcase,
    },
    {
      name: 'Educators',
      icon: Mic,
    },
    {
      name: 'Volunteers',
      icon: Handshake,
    },
    {
      name: 'Institutions',
      icon: Building,
    },
  ];

  return (
    <section className="py-12 lg:py-20">
      <div className="container-custom">
        {/* --- Hero Section --- */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 lg:mb-28">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium mb-4">
                <BookHeart className="w-4 h-4" />
                Our Mission
              </div>
              <h1 className="font-heading text-4xl lg:text-5xl font-semibold">
                About BFF — Books For Foster
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                BFF is a social initiative by PixelKLiQ to improve access to
                education by enabling the shared use of educational books.
              </p>
            </motion.div>
          </div>
          <motion.div
            className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {aboutHeroImage && (
              <MotionImage
                src={aboutHeroImage.imageUrl}
                alt={aboutHeroImage.description}
                data-ai-hint={aboutHeroImage.imageHint}
                fill
                className="object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </motion.div>
        </div>

        {/* --- Core Values Section --- */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 lg:mb-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="font-heading text-xl font-semibold">
              Community Driven
            </h3>
            <p className="text-muted-foreground mt-2">
              Operates as a non-commercial, volunteer-driven community.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="font-heading text-xl font-semibold">
              No Monetary Exchange
            </h3>
            <p className="text-muted-foreground mt-2">
              We do not sell books or accept monetary donations.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="font-heading text-xl font-semibold">Our Vision</h3>
            <p className="text-muted-foreground mt-2">
              To create a world where no student is limited by the cost of
              learning materials.
            </p>
          </motion.div>
        </div>

        {/* --- How It Works Section --- */}
        <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 mb-20 lg:mb-28">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-2xl mx-auto"
            >
                <h2 className="font-heading text-3xl font-semibold">How It Works</h2>
                <p className="mt-3 text-muted-foreground">
                    Our platform is built on simple, sustainable, and responsible sharing models.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-secondary/50 p-6 rounded-xl"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                            <Share2 className="w-5 h-5 text-foreground" />
                        </div>
                        <h3 className="font-heading text-xl font-medium">Free Book Sharing</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                        <li>Donated books are shared without any charges.</li>
                        <li>Borrowers are encouraged to return books after use to continue the cycle.</li>
                    </ul>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                     className="bg-secondary/50 p-6 rounded-xl"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                             <ShieldCheck className="w-5 h-5 text-foreground" />
                        </div>
                        <h3 className="font-heading text-xl font-medium">BFF Plus Lending</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                        <li>High-value reference books available via a shared lending model.</li>
                        <li>A nominal maintenance contribution (e.g., ₹50) may be collected to support handling and sustainability.</li>
                        <li>This is not rent or profit.</li>
                        <li>A refundable security deposit may apply for select books.</li>
                    </ul>
                </motion.div>
            </div>
        </div>

        {/* --- Who Can Join Section --- */}
        <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-heading text-3xl font-semibold">
              Who Can Join Our Community?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Anyone who believes in sharing knowledge responsibly is welcome.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-3">
                  <member.icon className="w-8 h-8 text-foreground" />
                </div>
                <h4 className="font-medium">{member.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
