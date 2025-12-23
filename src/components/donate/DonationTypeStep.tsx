
"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Book, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function DonationTypeStep() {
  const { control, watch } = useFormContext();
  const donationType = watch("donationType");

  return (
    <div className="bg-card border rounded-2xl p-6 lg:p-8">
      <h2 className="font-heading text-xl font-semibold mb-6">What would you like to donate?</h2>
      <Controller
        name="donationType"
        control={control}
        render={({ field }) => (
          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className="grid sm:grid-cols-2 gap-4"
          >
            <Label htmlFor="type-book" className={cn(
                "flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all",
                donationType === "book" ? "border-foreground bg-secondary" : "border-border"
            )}>
              <RadioGroupItem value="book" id="type-book" className="sr-only" />
              <Book className="w-10 h-10 mb-3" />
              <span className="font-medium text-lg">Physical Book(s)</span>
            </Label>
            <Label htmlFor="type-pdf" className={cn(
                "flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all",
                donationType === "pdf" ? "border-foreground bg-secondary" : "border-border"
            )}>
              <RadioGroupItem value="pdf" id="type-pdf" className="sr-only" />
              <FileText className="w-10 h-10 mb-3" />
              <span className="font-medium text-lg">PDF Document</span>
            </Label>
          </RadioGroup>
        )}
      />
    </div>
  );
}
