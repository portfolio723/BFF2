
"use client";
import { useMemo } from "react";
import { PdfCard } from "@/components/PdfCard";
import { christianPdfs } from "@/lib/data";
import { Sparkles } from "lucide-react";
import type { Pdf } from "@/lib/types";

export default function ChristianPage() {

  const filteredPdfs: Pdf[] = useMemo(() => {
    return christianPdfs;
  }, []);

  return (
    <div className="container-custom">
      <header className="py-12 md:py-16">
        <h1 className="font-heading text-4xl lg:text-5xl font-bold tracking-tight">
          Christian Literature
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Explore a collection of books on Christian faith, history, and motivation.
        </p>
      </header>

      <main className="mb-20">
        {filteredPdfs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredPdfs.map((pdf) => (
              <PdfCard 
                key={pdf.id} 
                pdf={pdf}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 lg:py-32 bg-card rounded-2xl border border-dashed">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4"/>
            <h2 className="text-2xl font-bold font-heading">No PDFs Found</h2>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
              There are no Christian PDF resources available at this time.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
