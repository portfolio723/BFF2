
"use client";

import { FileText } from "lucide-react";

export default function PdfsPage() {
  return (
    <div className="container-custom py-20">
      <div className="text-center py-20 lg:py-32 bg-card rounded-2xl border border-dashed">
        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold font-heading">Section Under Construction</h2>
        <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
          We are working on bringing our PDF library back. Please check again later.
        </p>
      </div>
    </div>
  );
}
