'use client';

import { motion } from 'framer-motion';
import { Download, Loader2, Feather } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { poetryPdfs } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function PoetryPage() {
  const { user, isUserLoading } = useAuth();
  const router = useRouter();

  const handleDownload = (pdf: {title: string, downloadUrl: string}) => {
    if (!user) {
      toast.info("Please log in to download materials.");
      router.push('/auth?redirect=/genre/poetry');
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
            <Feather className="w-7 h-7" />
            <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
              Poetry
            </h1>
          </div>
          <p className="text-muted-foreground">
            A collection of classic and contemporary poetry.
          </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl"
        >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {poetryPdfs.map((pdf) => (
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
        </motion.div>
      </div>
    </section>
  );
}
