
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddress } from "@/context/AddressContext";
import type { Address } from "@/lib/types";
import { useEffect } from "react";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const addressSchema = z.object({
  type: z.enum(["Home", "Work", "Other"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().length(6, "PIN code must be 6 digits"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface AddressFormProps {
  onSave: (address: Address) => void;
  existingAddress?: Address | null;
}

export function AddressForm({ onSave, existingAddress }: AddressFormProps) {
  const { addAddress, updateAddress } = useAddress();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      type: "Home",
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "",
      phone: "",
    },
  });
  
  useEffect(() => {
    if(existingAddress) {
        reset(existingAddress);
    } else {
        reset({
          type: "Home",
          firstName: "",
          lastName: "",
          address: "",
          address2: "",
          city: "Hyderabad",
          state: "Telangana",
          pincode: "",
          phone: "",
        });
    }
  }, [existingAddress, reset]);

  const onSubmit = (data: AddressFormValues) => {
    if (existingAddress) {
      const updatedAddress = { ...existingAddress, ...data };
      updateAddress(updatedAddress);
      onSave(updatedAddress);
    } else {
      const newAddress = addAddress(data);
      onSave(newAddress);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label>Address Type</Label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Home" id="r-home" />
                <Label htmlFor="r-home">Home</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Work" id="r-work" />
                <Label htmlFor="r-work">Work</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Other" id="r-other" />
                <Label htmlFor="r-other">Other</Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register("firstName")} />
          {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register("lastName")} />
          {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>}
        </div>
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" {...register("phone")} />
        {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <Label htmlFor="address">Street Address</Label>
        <Input id="address" {...register("address")} />
        {errors.address && <p className="text-destructive text-sm mt-1">{errors.address.message}</p>}
      </div>
      
      <div>
        <Label htmlFor="address2">Apartment, Suite, etc. (optional)</Label>
        <Input id="address2" {...register("address2")} />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" {...register("city")} />
          {errors.city && <p className="text-destructive text-sm mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.state && <p className="text-destructive text-sm mt-1">{errors.state.message}</p>}
        </div>
        <div>
          <Label htmlFor="pincode">PIN Code</Label>
          <Input id="pincode" {...register("pincode")} />
          {errors.pincode && <p className="text-destructive text-sm mt-1">{errors.pincode.message}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full">{existingAddress ? 'Save Changes' : 'Save Address'}</Button>
    </form>
  );
}

    