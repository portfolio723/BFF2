"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Book, FileText, ArrowLeft, Loader2 } from "lucide-react";
import { DonationTypeStep } from "@/components/donate/DonationTypeStep";
import { BookDetailsStep } from "@/components/donate/BookDetailsStep";
import { PdfUploadStep } from "@/components/donate/PdfUploadStep";
import { PickupDetailsStep } from "@/components/donate/PickupDetailsStep";
import { ConfirmationStep } from "@/components/donate/ConfirmationStep";
import type { DonatedBook } from "@/lib/types";

export type DonationType = "book" | "pdf" | null;

export type FormData = {
  donationType: DonationType;
  books: DonatedBook[];
  pdfFile: File | null;
  pdfTitle: string;
  pdfAuthor: string;
  pdfGenre: string;
  donorName: string;
  donorEmail: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
};

export default function DonatePage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [donationId, setDonationId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    donationType: null,
    books: [{ title: "", author: "", genre: "", quantity: 1 }],
    pdfFile: null,
    pdfTitle: "",
    pdfAuthor: "",
    pdfGenre: "",
    donorName: "",
    donorEmail: "",
    address: "",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "",
    phone: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleUpdate = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);

    const apiFormData = new FormData();

    // Append all text-based data
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'books') {
        apiFormData.append(key, JSON.stringify(value));
      } else if (key !== 'pdfFile' && value !== null) {
        apiFormData.append(key, value as string);
      }
    });

    // Append the file if it exists
    if (formData.pdfFile) {
      apiFormData.append("pdfFile", formData.pdfFile);
    }

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        body: apiFormData, // Sending as FormData for file upload
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }
      
      setDonationId(result.donationId);
      nextStep(); // Move to the final success step
    } catch (error: any) {
      setSubmissionError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, component: <DonationTypeStep onUpdate={handleUpdate} nextStep={nextStep} /> },
    {
      id: 2,
      component:
        formData.donationType === "book" ? (
          <BookDetailsStep formData={formData} onUpdate={handleUpdate} nextStep={nextStep} />
        ) : (
          <PdfUploadStep formData={formData} onUpdate={handleUpdate} nextStep={nextStep} />
        ),
    },
    { id: 3, component: formData.donationType === "book" ? 
        <PickupDetailsStep formData={formData} onUpdate={handleUpdate} nextStep={nextStep} /> : 
        <ConfirmationStep formData={formData} handleSubmit={handleSubmit} isSubmitting={isSubmitting} error={submissionError} /> 
    },
    { id: 4, component: formData.donationType === "book" ? 
        <ConfirmationStep formData={formData} handleSubmit={handleSubmit} isSubmitting={isSubmitting} error={submissionError} /> :
        <div /> // Success step is step 5 for PDF
    },
  ];
  
  const currentStepData = steps[step-1];
  const totalSteps = formData.donationType === 'book' ? 4 : 3;

  return (
    <section className="pb-20 pt-12">
      <div className="container-custom max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Give Books a New Life
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
            Donate Your Books
          </h1>
          <p className="text-muted-foreground mt-3">
            Your pre-loved books can inspire someone new. Join our mission to
            make knowledge accessible to everyone in Hyderabad.
          </p>
        </motion.div>

        <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {step > 1 && step <= totalSteps && (
                        <Button variant="ghost" size="sm" onClick={prevStep} className="absolute top-6 left-6 flex items-center gap-2">
                           <ArrowLeft className="w-4 h-4" />
                           Back
                        </Button>
                    )}
                  {step <= totalSteps ? currentStepData.component : <ConfirmationStep formData={formData} isSuccess={true} donationId={donationId} />}
                </motion.div>
            </AnimatePresence>
            
            {isSubmitting && (
                <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <p className="mt-4 text-muted-foreground">Submitting your donation...</p>
                </div>
            )}
        </div>
      </div>
    </section>
  );
}
