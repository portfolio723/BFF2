
'use client';

import { motion } from 'framer-motion';
import { BookCopy, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function NcertPage() {
  const classes = [
    { name: "Class 11", href: "/genre/ncert/class-11" },
  ];

  return (
    <section className="py-12 lg:py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <BookCopy className="w-7 h-7" />
            <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
              NCERT Materials
            </h1>
          </div>
          <p className="text-muted-foreground">
            Select a class to view available PDF materials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href}>
                <div className="group flex items-center justify-between p-6 bg-card border border-border rounded-xl hover:bg-secondary transition-colors">
                  <span className="font-semibold text-lg">{item.name}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
