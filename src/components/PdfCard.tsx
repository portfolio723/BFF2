
"use client";

import Image from "next/image";
import type { Pdf } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Download, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PdfCardProps {
  pdf: Pdf;
}

export function PdfCard({ pdf }: PdfCardProps) {
  const { id, title, author, coverImage, category, downloadUrl } = pdf;
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="cursor-pointer bg-card rounded-xl border border-border overflow-hidden transition-shadow hover:shadow-lg group h-full flex flex-col"
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
      
      <div className="p-3 flex flex-col flex-grow">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {category}
        </span>
        <h3 className="font-heading text-base font-medium mt-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          by {author}
        </p>
        <div className="mt-auto pt-3">
          {user ? (
            <Button
              asChild
              className="w-full rounded-full h-9"
              size="sm"
            >
              <a href={downloadUrl} download>
                <Download className="w-4 h-4 mr-2"/>
                Download PDF
              </a>
            </Button>
          ) : (
             <Button
              asChild
              className="w-full rounded-full h-9"
              variant="secondary"
              size="sm"
            >
              <Link href={`/auth?redirect=${pathname}`}>
                <LogIn className="w-4 h-4 mr-2"/>
                Sign in to Download
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
