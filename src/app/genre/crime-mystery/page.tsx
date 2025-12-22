
'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Construction } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GenrePage() {
  const params = useParams();
  const slug = params.slug as string;
  const genreName = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Genre';

  return (
    <section className="py-20 lg:py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 rounded-full bg-secondary mx-auto flex items-center justify-center mb-8">
            <Construction className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
            {genreName} Books - Coming Soon!
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Our librarians are busy curating a fantastic collection of {genreName.toLowerCase()} books for you. This section is under construction, but we promise it will be worth the wait!
          </p>
          <div className="mt-8">
            <Link href="/books">
              <Button className="rounded-full px-8 gap-2">
                <BookOpen className="w-4 h-4" />
                Explore Other Books
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
