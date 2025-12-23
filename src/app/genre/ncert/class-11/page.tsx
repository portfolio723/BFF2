
'use client';

import { motion } from 'framer-motion';
import { BookCopy, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ncertClass11Pdfs } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

export default function NcertClass11Page() {
  const { user, isUserLoading } = useAuth();
  const router = useRouter();

  const handleDownload = (pdf: {title: string, downloadUrl: string}) => {
    if (!user) {
      toast.info("Please log in to download materials.");
      router.push('/auth?redirect=/genre/ncert/class-11');
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
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/genre/ncert" className="hover:text-foreground">NCERT</Link>
          <span className="mx-2">/</span>
          <span>Class 11</span>
        </nav>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <BookCopy className="w-7 h-7" />
            <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
              NCERT Class 11
            </h1>
          </div>
          <p className="text-muted-foreground">
            A collection of free PDF materials for Class 11.
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
                        <TableHead>Subject / Book Name</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ncertClass11Pdfs.map((pdf) => (
                        <TableRow key={pdf.id}>
                            <TableCell className="font-medium">{pdf.title}</TableCell>
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
