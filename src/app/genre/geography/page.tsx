'use client';

import { motion } from 'framer-motion';
import { Download, Loader2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { geographyPdfs } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function GeographyPage() {
  const { user, isUserLoading } = useAuth();
  const router = useRouter();

  const handleDownload = (pdf: {title: string, downloadUrl: string}) => {
    if (!user) {
      toast.info("Please log in to download materials.");
      router.push('/auth?redirect=/genre/geography');
      return;
    }

    if(pdf.downloadUrl === '#') {
        toast.warning("Download link not available.", {
            description: "The download link for this PDF has not been configured yet."
        });
        return;
    }

    // This creates a temporary link and simulates a click to start the download.
    const link = document.createElement('a');
    link.href = pdf.downloadUrl;
    link.setAttribute('download', pdf.title);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloading ${pdf.title}...`);
  };

  return (
    <section className="py-12 lg:py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-7 h-7" />
            <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
              Geography
            </h1>
          </div>
          <p className="text-muted-foreground">
            A collection of PDFs for exploring our world.
          </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
        >
          {/* Mobile View */}
          <div className="lg:hidden bg-card border border-border rounded-xl p-4 space-y-4">
            {geographyPdfs.map((pdf) => (
              <div key={pdf.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{pdf.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{pdf.author}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDownload(pdf)} disabled={isUserLoading}>
                  {isUserLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block bg-card border border-border rounded-xl">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {geographyPdfs.map((pdf) => (
                        <TableRow key={pdf.id}>
                            <TableCell className="font-medium">{pdf.title}</TableCell>
                            <TableCell>{pdf.author}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm" onClick={() => handleDownload(pdf)} disabled={isUserLoading}>
                                  {isUserLoading ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  ) : (
                                    <Download className="w-4 h-4 mr-2" />
                                  )}
                                  Download
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
