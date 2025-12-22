
"use client";
import { useState, useMemo, useEffect } from "react";
import { PdfCard } from "@/components/PdfCard";
import type { Pdf } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PdfsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [pdfs, setPdfs] = useState<Pdf[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPdfs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/list-pdfs');
        if (!response.ok) {
          throw new Error('Failed to fetch PDF list');
        }
        const filenames: string[] = await response.json();

        const formattedPdfs = filenames.map((name, index) => ({
          id: `${name}-${index}`,
          title: name.replace(/\.pdf$/i, '').replace(/_/g, ' '),
          author: "UPSC",
          category: "UPSC Materials",
          description: `Downloadable PDF file: ${name}`,
          coverImage: {
            url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
            hint: "study material",
          },
          downloadUrl: `/upsc/${name}`,
        }));
        
        setPdfs(formattedPdfs);

      } catch (error: any) {
        toast.error("Failed to fetch PDFs", { description: error.message });
        setPdfs([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPdfs();
  }, []);


  const filteredPdfs = useMemo(() => {
    if (!pdfs) return [];

    let filtered = pdfs.filter((pdf) => {
      const searchMatch =
        pdf.title.toLowerCase().includes(searchTerm.toLowerCase());
      return searchMatch;
    });

    if (sortBy === 'title-asc') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title-desc') {
        filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else { // 'newest' will be the order from the API
        // The API returns sorted by name, we can just use that order.
    }

    return filtered;
  }, [searchTerm, sortBy, pdfs]);

  return (
    <div className="container-custom">
      <header className="py-12 md:py-16">
        <h1 className="font-heading text-4xl lg:text-5xl font-bold tracking-tight">
          Free PDF Library
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Explore a collection of classic literature and important texts, free to download.
        </p>
      </header>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
           <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 h-12 w-full bg-secondary border-0"
              />
            </div>
            <div className="flex gap-4">
               <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[180px] h-12 bg-secondary border-0">
                      <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="newest">By Name</SelectItem>
                      <SelectItem value="title-asc">Title: A to Z</SelectItem>
                      <SelectItem value="title-desc">Title: Z to A</SelectItem>
                  </SelectContent>
              </Select>
            </div>
        </div>
        {!isLoading && <p className="text-sm text-muted-foreground mt-4">Showing {filteredPdfs.length} PDFs</p>}
      </div>

      <main className="mb-20">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : filteredPdfs.length > 0 ? (
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
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4"/>
            <h2 className="text-2xl font-bold font-heading">No PDFs Found</h2>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
              We couldn't find any PDF files in the `public/upsc` directory. Please make sure you have added your files there.
            </p>
          </div>
        )}
      </main>

       <div className="text-center mb-20">
          <Button variant="outline" className="px-8 h-12 rounded-full">Load More PDFs</Button>
        </div>
    </div>
  );
}
