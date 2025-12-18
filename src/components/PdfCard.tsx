"use client";

import Image from "next/image";
import Link from "next/link";
import type { Pdf } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

interface PdfCardProps {
  pdf: Pdf;
}

export function PdfCard({ pdf }: PdfCardProps) {
  const { id, title, author, coverImage, category, downloadUrl } = pdf;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="cursor-pointer bg-card rounded-xl border border-border overflow-hidden transition-shadow hover:shadow-lg group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <Image
          src={coverImage.url}
          alt={title}
          data-ai-hint={coverImage.hint}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {category}
        </span>
        <h3 className="font-heading text-base font-medium mt-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          by {author}
        </p>
        <div className="mt-4">
          <Button
            asChild
            className="w-full rounded-full"
          >
            <a href={downloadUrl} download>
              <Download className="w-4 h-4 mr-2"/>
              Download PDF
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
