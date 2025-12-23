
"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Gift, ArrowRight } from "lucide-react";
import { DonationTypeStep } from "@/components/donate/DonationTypeStep";
import { BookDetailsStep } from "@/components/donate/BookDetailsStep";
import { PickupDetailsStep } from "@/components/donate/PickupDetailsStep";
import { PdfUploadStep } from "@/components/donate/PdfUploadStep";
import { ConfirmationStep } from "@/components/donate/ConfirmationStep";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required."),
  author: z.string().min(1, "Author is required."),
  genre: z.string().min(1, "Genre is required."),
  quantity: z.number().min(1, "Quantity must be at least 1."),
});

const formSchema = z.object({
  donationType: z.enum(["book", "pdf"]),
  books: z.array(bookSchema).min(1, "Please add at least one book."),
  donorName: z.string().min(1, "Your name is required."),
  donorEmail: z.string().email("Please enter a valid email."),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  phone: z.string().optional(),
  file: z.any().optional(),
}).refine(data => {
    if (data.donationType === "book") {
        return (
            !!data.address &&
            !!data.city &&
            !!data.state &&
            !!data.pincode &&
            !!data.phone
        );
    }
    return true;
}, {
    message: "Pickup details are required for physical book donations.",
    path: ["address"],
}).refine(data => {
    if (data.donationType === "pdf") {
        return !!data.file;
    }
    return true;
}, {
    message: "A PDF file is required.",
    path: ["file"],
});


export default function DonatePage() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [donationId, setDonationId] = useState<string | null>(null);

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      donationType: "book" as "book" | "pdf",
      books: [{ title: "", author: "", genre: "Fiction", quantity: 1 }],
      donorName: user?.user_metadata.full_name || "",
      donorEmail: user?.email || "",
    },
  });

  const { trigger, getValues, handleSubmit, formState: { isSubmitting } } = methods;

  const handleNext = async () => {
    const donationType = getValues("donationType");
    let fieldsToValidate: (keyof z.infer<typeof formSchema>)[] = [];
    
    if (currentStep === 0) fieldsToValidate = ["donationType"];
    if (currentStep === 1) fieldsToValidate = ["books", "donorName", "donorEmail"];
    if (currentStep === 2 && donationType === "book") fieldsToValidate = ["address", "city", "state", "pincode", "phone"];
    if (currentStep === 2 && donationType === "pdf") fieldsToValidate = ["file"];
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => setCurrentStep((prev) => prev - 1);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    const { file, ...jsonData } = data;
    formData.append('data', JSON.stringify(jsonData));

    if (data.donationType === 'pdf' && data.file) {
      formData.append('file', data.file);
    }
    
    const toastId = toast.loading("Submitting your donation...");

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }
      
      toast.success("Donation submitted successfully!", { id: toastId });
      setDonationId(result.donationId);
      setCurrentStep((prev) => prev + 1); // Go to final success screen

    } catch (error: any) {
      toast.error("Submission Failed", {
        description: error.message,
        id: toastId,
      });
    }
  };
  
  const steps = [
    { name: "Donation Type", component: <DonationTypeStep /> },
    { name: "Book Details", component: <BookDetailsStep /> },
    { name: "Details", component: getValues("donationType") === "book" ? <PickupDetailsStep /> : <PdfUploadStep /> },
    { name: "Confirmation", component: <ConfirmationStep /> },
  ];
  
  const isFinalStep = currentStep === steps.length;


  return (
    <section className="py-12 lg:py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium mb-4">
            <Gift className="w-4 h-4" />
            Give Books a New Life
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
            Donate Your Books
          </h1>
          <p className="text-muted-foreground mt-3">
            Your pre-loved books can ignite a passion for reading in someone else. Join our mission to make knowledge accessible for all.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
           <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {isFinalStep ? (
                     <div className="bg-card border rounded-2xl p-8 lg:p-12 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                           <Gift className="w-10 h-10" />
                        </motion.div>
                        <h2 className="font-heading text-2xl font-semibold">Thank You for Your Donation!</h2>
                        <p className="text-muted-foreground mt-2">
                            Your submission (ID: <span className="font-mono text-sm">{donationId?.substring(0,8)}</span>) has been received. 
                            {getValues('donationType') === 'book' ? " We will contact you shortly to confirm pickup details." : " The PDF has been added to our library."}
                        </p>
                    </div>
                  ) : (
                    steps[currentStep].component
                  )}
                </motion.div>
              </AnimatePresence>

              {!isFinalStep && (
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                  >
                    Back
                  </Button>
                  
                  {currentStep === steps.length - 1 ? (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Confirm Donation"}
                    </Button>
                  ) : (
                    <Button type="button" onClick={handleNext}>
                      Next <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  )}
                </div>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
