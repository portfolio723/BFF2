
"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

export function BookDetailsStep() {
  const { register, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "books",
  });

  return (
    <div className="bg-card border rounded-2xl p-6 lg:p-8 space-y-6">
      <div>
          <h2 className="font-heading text-xl font-semibold">Tell Us About Your Donation</h2>
          <p className="text-muted-foreground text-sm mt-1">Provide details of the book(s) you are donating.</p>
      </div>
      
      <div className="space-y-4">
        <Label htmlFor="donorName">Your Name</Label>
        <Input 
          id="donorName" 
          {...register("donorName")}
          placeholder="e.g. Jane Doe"
        />
        {errors.donorName && <p className="text-destructive text-sm">{(errors.donorName as any).message}</p>}
      </div>
      
      <div className="space-y-4">
        <Label htmlFor="donorEmail">Your Email</Label>
        <Input 
          id="donorEmail" 
          type="email"
          {...register("donorEmail")}
          placeholder="e.g. jane.doe@example.com"
        />
         {errors.donorEmail && <p className="text-destructive text-sm">{(errors.donorEmail as any).message}</p>}
      </div>

      <div className="pt-4 border-t">
        <h3 className="font-medium">Book(s) to Donate</h3>
        <div className="space-y-6 mt-4">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-secondary/50 relative">
               <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  disabled={fields.length <= 1}
                >
                  <Trash2 className="w-4 h-4" />
              </button>
              <div className="space-y-2">
                <Label htmlFor={`books[${index}].title`}>Title</Label>
                <Input {...register(`books.${index}.title`)} placeholder="e.g. The Great Gatsby" />
                {errors.books?.[index]?.title && <p className="text-destructive text-xs">Required</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`books[${index}].author`}>Author</Label>
                <Input {...register(`books.${index}.author`)} placeholder="e.g. F. Scott Fitzgerald" />
                {errors.books?.[index]?.author && <p className="text-destructive text-xs">Required</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`books[${index}].genre`}>Genre</Label>
                <Input {...register(`books.${index}.genre`)} placeholder="e.g. Fiction" />
                 {errors.books?.[index]?.genre && <p className="text-destructive text-xs">Required</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`books[${index}].quantity`}>Quantity</Label>
                <Input type="number" {...register(`books.${index}.quantity`, { valueAsNumber: true })} min="1" />
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => append({ title: "", author: "", genre: "Fiction", quantity: 1 })}
        >
          <Plus className="mr-2 w-4 h-4" />
          Add Another Book
        </Button>
      </div>
    </div>
  );
}
