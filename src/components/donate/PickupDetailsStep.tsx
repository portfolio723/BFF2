
"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export function PickupDetailsStep() {
  const { register, control, formState: { errors } } = useFormContext();

  return (
    <div className="bg-card border rounded-2xl p-6 lg:p-8 space-y-6">
       <div>
          <h2 className="font-heading text-xl font-semibold">Pickup Information</h2>
          <p className="text-muted-foreground text-sm mt-1">Where should we collect the book(s) from?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t">
        <div className="space-y-2">
            <Label>Preferred Pickup Date</Label>
            <div className="grid grid-cols-3 gap-2">
                <Input {...register("pickupDay")} placeholder="DD" maxLength={2} />
                <Input {...register("pickupMonth")} placeholder="MM" maxLength={2} />
                <Input {...register("pickupYear")} placeholder="YYYY" maxLength={4} />
            </div>
            {(errors.pickupDay || errors.pickupMonth || errors.pickupYear) && <p className="text-destructive text-sm">A valid date is required.</p>}
        </div>
         <div className="space-y-2">
            <Label htmlFor="phone">Contact Number</Label>
            <Input id="phone" {...register("phone")} placeholder="e.g. 9876543210" />
            {errors.phone && <p className="text-destructive text-sm">{(errors.phone as any).message}</p>}
        </div>
      </div>
      
       <div className="space-y-2">
        <Label htmlFor="address">Street Address</Label>
        <Input id="address" {...register("address")} placeholder="e.g. 123 Main St, Jubilee Hills" />
        {errors.address && <p className="text-destructive text-sm">An address is required.</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" {...register("city")} defaultValue="Hyderabad" />
           {errors.city && <p className="text-destructive text-sm">A city is required.</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Controller
            name="state"
            control={control}
            defaultValue="Telangana"
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
           {errors.state && <p className="text-destructive text-sm">A state is required.</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="pincode">PIN Code</Label>
          <Input id="pincode" {...register("pincode")} />
           {errors.pincode && <p className="text-destructive text-sm">A valid PIN code is required.</p>}
        </div>
      </div>
    </div>
  );
}
