'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { FormData } from '@/app/donate/page';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Megalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

interface PickupDetailsStepProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  nextStep: () => void;
}

export function PickupDetailsStep({ formData, onUpdate, nextStep }: PickupDetailsStepProps) {
    const [name, setName] = useState(formData.donorName);
    const [email, setEmail] = useState(formData.donorEmail);
    const [phone, setPhone] = useState(formData.phone);
    const [address, setAddress] = useState(formData.address);
    const [city, setCity] = useState(formData.city);
    const [state, setState] = useState(formData.state);
    const [pincode, setPincode] = useState(formData.pincode);
    const [error, setError] = useState('');

    const handleNext = () => {
        if(!name || !email || !phone || !address || !city || !state || !pincode) {
            setError('Please fill out all fields.');
            return;
        }
        onUpdate({ 
            donorName: name, 
            donorEmail: email, 
            phone,
            address,
            city,
            state,
            pincode,
        });
        nextStep();
    }

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold mb-2 text-center">
        Pickup Details
      </h2>
      <p className="text-muted-foreground mb-6 text-center">
        Please provide your details for book collection. We will contact you to arrange a pickup within 7 days.
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="donor-name">Full Name</Label>
          <Input id="donor-name" placeholder="e.g. Jane Doe" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div>
             <Label htmlFor="donor-email">Email Address</Label>
             <Input id="donor-email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
           </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="Your contact number" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
        </div>
        <div>
          <Label htmlFor="address">Street Address</Label>
          <Textarea id="address" placeholder="Your full pickup address" value={address} onChange={e => setAddress(e.target.value)} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Hyderabad" value={city} onChange={e => setCity(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Select onValueChange={setState} value={state}>
                <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                    {indianStates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="pincode">PIN Code</Label>
            <Input id="pincode" placeholder="e.g. 500001" value={pincode} onChange={e => setPincode(e.target.value)} />
          </div>
        </div>
        {error && <p className="text-destructive text-sm text-center">{error}</p>}
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
