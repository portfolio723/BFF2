"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/context/AppProvider";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/firebase";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import type { AppUser } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  address: z.string().min(10, "Address must be at least 10 characters."),
  city: z.string().min(2, "City is required."),
  pincode: z.string().length(6, "Pincode must be 6 digits."),
  phone: z.string().length(10, "Phone number must be 10 digits."),
});

export default function CheckoutPage() {
  const { user, loading: userLoading } = useUser() as { user: AppUser | null, loading: boolean };
  const { cart, cartTotal, clearCart, loading: cartLoading } = useStore();
  const { toast } = useToast();
  const router = useRouter();

  const isKycVerified = user?.isKycVerified || false; // Mocked for now
  const requiresKyc = cart.some(item => item.type === 'rent');

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/auth?redirect=/checkout');
    }
    if (!userLoading && user && requiresKyc && !isKycVerified) {
        toast({
            title: "KYC Verification Required",
            description: "You must complete KYC verification to rent books.",
            variant: "destructive"
        });
        router.push('/profile');
    }
  }, [user, userLoading, router, requiresKyc, isKycVerified, toast]);


  const deliveryCharge = cart.length > 0 ? 50.00 : 0.00;
  const total = cartTotal + deliveryCharge;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.displayName || "",
      address: "",
      city: "Hyderabad",
      pincode: "",
      phone: user?.phoneNumber || "",
    },
  });

   useEffect(() => {
    if (user) {
      form.reset({
        name: user.displayName || "",
        phone: user.phoneNumber || "",
        address: "",
        city: "Hyderabad",
        pincode: "",
      });
    }
  }, [user, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Order placed:", {
      ...values,
      items: cart,
      total: total.toFixed(2),
      userId: user?.uid,
    });
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. You will receive a confirmation shortly.",
    });
    clearCart();
    router.push("/");
  }

  if (userLoading || cartLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user || (requiresKyc && !isKycVerified)) {
    // Redirecting or showing message, so render nothing here.
    return null;
  }
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Checkout</h1>
        <p className="mt-4 text-muted-foreground">Your cart is empty. Add items to checkout.</p>
        <Button onClick={() => router.push('/books')} className="mt-4">Go to Books</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Checkout</h1>
      </header>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Street address, apartment, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="grid grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter pincode" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter 10-digit number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button type="submit" className="w-full mt-6">
                  Place Order
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
           <CardHeader>
                <CardTitle>Your Order</CardTitle>
            </CardHeader>
            <CardContent>
                 <ul className="space-y-4">
                    {cart.map(({book, type}) => (
                        <li key={book.id} className="flex justify-between items-center">
                           <div>
                                <p className="font-medium">{book.title} <span className="text-sm capitalize text-muted-foreground">({type})</span></p>
                                <p className="text-sm text-muted-foreground">Qty: 1</p>
                           </div>
                           <p>₹{type === 'buy' ? book.price.toFixed(2) : book.rentalPrice?.toFixed(2)}</p>
                        </li>
                    ))}
                 </ul>
                 <Separator className="my-4"/>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery</span>
                        <span>₹{deliveryCharge.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2"/>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
