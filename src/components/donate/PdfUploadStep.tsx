
"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";

export function PdfUploadStep() {
  const { control, formState: { errors }, watch } = useFormContext();
  const file = watch("file");

  return (
    <div className="bg-card border rounded-2xl p-6 lg:p-8 space-y-6">
       <div>
          <h2 className="font-heading text-xl font-semibold">Upload Your PDF</h2>
          <p className="text-muted-foreground text-sm mt-1">Please provide the PDF file you wish to donate.</p>
      </div>

       <div className="pt-4 border-t">
        <Controller
            name="file"
            control={control}
            render={({ field }) => (
            <div>
                <Label htmlFor="pdf-upload" className="block mb-2">PDF File</Label>
                <div className="flex items-center justify-center w-full">
                    <label 
                        htmlFor="pdf-upload" 
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-border border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                            {file ? (
                                <p className="font-semibold text-foreground">{file.name}</p>
                            ): (
                                <>
                                 <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                 <p className="text-xs text-muted-foreground">PDF only (MAX. 10MB)</p>
                                </>
                            )}
                        </div>
                        <Input 
                            id="pdf-upload" 
                            type="file" 
                            className="hidden" 
                            accept=".pdf"
                            onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                        />
                    </label>
                </div>
                {errors.file && <p className="text-destructive text-sm mt-2">{(errors.file as any).message}</p>}
            </div>
            )}
        />
      </div>
    </div>
  );
}
