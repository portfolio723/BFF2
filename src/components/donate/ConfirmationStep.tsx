'use client';

import { Button } from '@/components/ui/button';
import type { FormData } from '@/app/donate/page';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface ConfirmationStepProps {
  formData: FormData;
  isSubmitting?: boolean;
  handleSubmit?: () => void;
  error?: string | null;
  isSuccess?: boolean;
  donationId?: string | null;
}

export function ConfirmationStep({ formData, isSubmitting, handleSubmit, error, isSuccess, donationId }: ConfirmationStepProps) {

  if (isSuccess) {
    return (
        <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="font-heading text-xl font-semibold mb-2">
                Donation Submitted!
            </h2>
            <p className="text-muted-foreground mb-6">
                Thank you for your generosity. We have received your donation details.
            </p>
            {formData.donationType === 'book' && (
                <p className="text-sm text-muted-foreground mb-6">Our team will contact you within 7 days to schedule a pickup.</p>
            )}
             <p className="text-sm text-muted-foreground mb-8">
                Your donation ID is: <span className="font-mono bg-secondary px-2 py-1 rounded">{donationId}</span>
            </p>
            <Button asChild>
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
    )
  }
  
  const { donationType, books, pdfFile, pdfTitle, donorName, donorEmail, address, city, state, pincode, phone } = formData;

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold mb-6 text-center">
        Confirm Your Donation
      </h2>
      
      <div className="space-y-6 text-sm">
        <div className="p-4 bg-secondary/50 rounded-lg">
            <h3 className="font-semibold mb-2">Your Details</h3>
            <p><span className="text-muted-foreground">Name:</span> {donorName}</p>
            <p><span className="text-muted-foreground">Email:</span> {donorEmail}</p>
             {donationType === 'book' && <p><span className="text-muted-foreground">Phone:</span> {phone}</p>}
        </div>
        
        {donationType === 'book' && (
            <div className="p-4 bg-secondary/50 rounded-lg">
                <h3 className="font-semibold mb-2">Pickup Address</h3>
                <p>{address}</p>
                <p>{city}, {state} - {pincode}</p>
            </div>
        )}

        <div className="p-4 bg-secondary/50 rounded-lg">
            <h3 className="font-semibold mb-2">Donation Summary</h3>
            {donationType === 'book' && (
                <ul className="space-y-1 list-disc list-inside">
                    {books.map((book, i) => <li key={i}>{book.quantity}x {book.title}</li>)}
                </ul>
            )}
            {donationType === 'pdf' && (
                <div>
                    <p><span className="text-muted-foreground">File:</span> {pdfFile?.name}</p>
                    <p><span className="text-muted-foreground">Title:</span> {pdfTitle}</p>
                </div>
            )}
        </div>
        
        {error && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm font-medium">{error}</p>
            </div>
        )}
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Confirm & Submit Donation'
          )}
        </Button>
      </div>
    </div>
  );
}
