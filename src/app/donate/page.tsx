
"use client";

import { Gift } from "lucide-react";

export default function DonatePage() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-custom">
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-secondary mx-auto flex items-center justify-center mb-6">
            <Gift className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
            Donate Books
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            The donation feature is currently unavailable. Please check back later.
          </p>
        </div>
      </div>
    </section>
  );
}
