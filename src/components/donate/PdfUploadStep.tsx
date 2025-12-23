'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, FileCheck } from 'lucide-react';
import type { FormData } from '@/app/donate/page';

interface PdfUploadStepProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  nextStep: () => void;
}

export function PdfUploadStep({ formData, onUpdate, nextStep }: PdfUploadStepProps) {
  const [file, setFile] = useState<File | null>(formData.pdfFile);
  const [title, setTitle] = useState(formData.pdfTitle);
  const [author, setAuthor] = useState(formData.pdfAuthor);
  const [genre, setGenre] = useState(formData.pdfGenre);
  const [error, setError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a valid PDF file.');
        setFile(null);
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size cannot exceed 5MB.');
        setFile(null);
        return;
      }
      setError('');
      setFile(selectedFile);
      // Auto-fill title from filename
      if (!title) {
        setTitle(selectedFile.name.replace(/\.pdf$/i, ''));
      }
    }
  };

  const handleNext = () => {
    if (!file || !title || !author) {
      setError("Please upload a file and provide its title and author.");
      return;
    }
    onUpdate({ pdfFile: file, pdfTitle: title, pdfAuthor: author, pdfGenre: genre });
    nextStep();
  };

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold mb-2 text-center">Upload PDF</h2>
      <p className="text-muted-foreground mb-6 text-center">
        Share your digital books with the community.
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="pdf-upload">PDF File (Max 5MB)</Label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10">
            <div className="text-center">
              {file ? (
                <>
                  <FileCheck className="mx-auto h-12 w-12 text-green-500" />
                  <p className="mt-2 font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                </>
              ) : (
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
              )}
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="pdf-upload"
                  className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                >
                  <span>{file ? 'Change file' : 'Upload a file'}</span>
                  <Input id="pdf-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf" />
                </label>
                {!file && <p className="pl-1">or drag and drop</p>}
              </div>
            </div>
          </div>
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </div>

        <div>
          <Label htmlFor="pdf-title">Book Title</Label>
          <Input
            id="pdf-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Meditations"
          />
        </div>
        <div>
          <Label htmlFor="pdf-author">Author</Label>
          <Input
            id="pdf-author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g., Marcus Aurelius"
          />
        </div>
        <div>
          <Label htmlFor="pdf-genre">Genre (Optional)</Label>
          <Input
            id="pdf-genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="e.g., Philosophy"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
