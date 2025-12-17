"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  bookTitle: z.string().min(2, "Book title is required."),
  author: z.string().min(2, "Author is required."),
  condition: z.string({ required_error: "Please select a condition." }),
  name: z.string().min(2, "Your name is required."),
  address: z.string().min(10, "A valid address is required."),
  phone: z.string().length(10, "A 10-digit phone number is required."),
  notes: z.string().optional(),
});

export default function DonatePage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookTitle: "",
      author: "",
      name: "",
      address: "",
      phone: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Donation submitted:", values);
    toast({
      title: "Donation Submitted!",
      description: "Thank you for your generosity. We will contact you shortly to arrange pickup.",
    });
    form.reset();
    router.push("/community");
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 md:px-6 py-8 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-headline text-4xl font-bold tracking-tight">Donate a Book</CardTitle>
          <p className="text-muted-foreground text-center pt-2">
            Give your books a new life. A pickup fee of ₹50 will be applied.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <h3 className="text-lg font-semibold border-b pb-2">Book Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bookTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Book Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., The God of Small Things" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Arundhati Roy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Book Condition</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the condition of the book" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="like-new">Like New</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="worn">Worn</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3 className="text-lg font-semibold border-b pb-2 pt-4">Pickup Details</h3>
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
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
                      <FormLabel>Pickup Address</FormLabel>
                       <FormControl>
                        <Textarea placeholder="Enter your full address in Hyderabad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                 <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                       <FormControl>
                        <Textarea placeholder="Any instructions for pickup, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <Button type="submit" className="w-full">Arrange Pickup</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
