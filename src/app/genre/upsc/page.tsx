
'use client';

import { motion } from 'framer-motion';
import { BookCopy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { upscPdfs } from '@/lib/data';

export default function UpscGenrePage() {

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
              UPSC Materials
            </h1>
          </div>
          <p className="text-muted-foreground">
            A collection of free PDF materials to aid your UPSC preparation.
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
                        <TableHead>PDF Name</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {upscPdfs.map((pdf) => (
                        <TableRow key={pdf.id}>
                            <TableCell className="font-medium">{pdf.title}</TableCell>
                            <TableCell className="text-right">
                                <Button asChild variant="outline" size="sm">
                                    <a href={pdf.downloadUrl} download>
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </a>
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
