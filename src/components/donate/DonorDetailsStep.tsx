
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FormData } from '@/app/donate/page';

interface DonorDetailsStepProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  nextStep: () => void;
}

export function DonorDetailsStep({ formData, onUpdate, nextStep }: DonorDetailsStepProps) {
    const [name, setName] = useState(formData.donorName);
    const [email, setEmail] = useState(formData.donorEmail);
    const [error, setError] = useState('');

    const handleNext = () => {
        if(!name || !email) {
            setError('Please fill out all fields.');
            return;
        }
        onUpdate({ 
            donorName: name, 
            donorEmail: email, 
        });
        nextStep();
    }

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold mb-2 text-center">
        Your Details
      </h2>
      <p className="text-muted-foreground mb-6 text-center">
        Please provide your details so we can credit you for the donation.
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="donor-name">Full Name</Label>
          <Input id="donor-name" placeholder="e.g. Jane Doe" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
            <Label htmlFor="donor-email">Email Address</Label>
            <Input id="donor-email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        {error && <p className="text-destructive text-sm text-center">{error}</p>}
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
