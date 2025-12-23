
"use client";

import { useFormContext } from "react-hook-form";

export function ConfirmationStep() {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className="bg-card border rounded-2xl p-6 lg:p-8 space-y-6">
        <div>
          <h2 className="font-heading text-xl font-semibold">Confirm Your Donation</h2>
          <p className="text-muted-foreground text-sm mt-1">Please review the details below before submitting.</p>
        </div>

        <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium">Donor Information</h3>
            <div className="text-sm">
                <p><span className="text-muted-foreground">Name:</span> {values.donorName}</p>
                <p><span className="text-muted-foreground">Email:</span> {values.donorEmail}</p>
            </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium">Donation Type</h3>
            <p className="capitalize text-sm">{values.donationType}</p>
        </div>

        <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium">Book(s)</h3>
            <ul className="space-y-2">
                {values.books.map((book: any, index: number) => (
                    <li key={index} className="text-sm p-2 bg-secondary/50 rounded-md">
                        <span className="font-semibold">{book.title}</span> by {book.author} (Qty: {book.quantity})
                    </li>
                ))}
            </ul>
        </div>

        {values.donationType === "book" && (
            <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium">Pickup Details</h3>
                <div className="text-sm">
                    <p><span className="text-muted-foreground">Date:</span> {values.pickupDay}/{values.pickupMonth}/{values.pickupYear}</p>
                    <p><span className="text-muted-foreground">Address:</span> {values.address}, {values.city}, {values.state} - {values.pincode}</p>
                    <p><span className="text-muted-foreground">Phone:</span> {values.phone}</p>
                </div>
            </div>
        )}

        {values.donationType === "pdf" && values.file && (
            <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium">PDF File</h3>
                <p className="text-sm">{values.file.name}</p>
            </div>
        )}
    </div>
  );
}
