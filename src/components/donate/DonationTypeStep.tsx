'use client';

import { motion } from 'framer-motion';
import { Book, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormData } from '@/app/donate/page';

interface DonationTypeStepProps {
  onUpdate: (data: Partial<FormData>) => void;
  nextStep: () => void;
}

export function DonationTypeStep({ onUpdate, nextStep }: DonationTypeStepProps) {
  const handleSelect = (type: 'book' | 'pdf') => {
    onUpdate({ donationType: type });
    nextStep();
  };

  return (
    <div className="text-center">
      <h2 className="font-heading text-xl font-semibold mb-2">
        What would you like to donate?
      </h2>
      <p className="text-muted-foreground mb-8">
        Choose whether you're donating physical books or a digital PDF.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="w-full h-32 flex-col gap-2 border-2"
            onClick={() => handleSelect('book')}
          >
            <Book className="w-8 h-8" />
            <span className="font-semibold">Physical Book(s)</span>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="w-full h-32 flex-col gap-2 border-2"
            onClick={() => handleSelect('pdf')}
          >
            <FileText className="w-8 h-8" />
            <span className="font-semibold">PDF Document</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
