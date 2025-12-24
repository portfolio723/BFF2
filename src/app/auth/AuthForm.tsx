
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AnimatePresence, motion } from "framer-motion";

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/
);

const signUpSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  email: z.string().email("Invalid email address."),
  phoneNumber: z.string().length(10, "Phone number must be 10 digits."),
  password: z.string().refine((val) => passwordValidation.test(val), {
    message: "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character.",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

export default function AuthForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { signIn, signUp } = useAuth();

  const authBgImage = PlaceHolderImages.find((img) => img.id === "book-cover-2");

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", fullName: "", phoneNumber: "", terms: false },
  });

  const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
    setLoading(true);
    const { error } = await signIn(values.email, values.password);
    if (!error) {
        router.push(redirect);
    }
    setLoading(false);
  };

  const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
    setLoading(true);
    const { error } = await signUp(values.email, values.password, {
        data: {
            full_name: values.fullName,
            phone_number: values.phoneNumber,
        }
    });
    if (!error) {
        setActiveTab("signin");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-start lg:justify-center p-6 pt-16 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
           <AnimatePresence mode="wait">
             <motion.div
                key="auth-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin">
                    <div className="mt-6">
                      <h1 className="text-3xl font-bold font-heading">Welcome Back</h1>
                      <p className="text-muted-foreground mt-1">
                        Sign in to continue your reading journey
                      </p>
                    </div>

                    <Form {...signInForm}>
                      <form
                        onSubmit={signInForm.handleSubmit(handleSignIn)}
                        className="space-y-6 mt-8"
                      >
                        <FormField
                          control={signInForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input placeholder="you@example.com" {...field} type="email" className="pl-10"/>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signInForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Password</FormLabel>
                                <Link href="#" className="text-sm font-medium text-primary hover:underline">
                                  Forgot password?
                                </Link>
                              </div>
                              <FormControl>
                                 <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    placeholder="••••••••"
                                    {...field}
                                    type={showPassword ? "text" : "password"}
                                    className="pl-10 pr-10"
                                  />
                                  <Button 
                                    type="button"
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex items-center">
                           <Checkbox id="remember" />
                           <label
                              htmlFor="remember"
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Remember me
                            </label>
                        </div>

                        <Button type="submit" className="w-full h-12 rounded-full" disabled={loading}>
                          {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
                          {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
                        </Button>
                      </form>
                    </Form>

                    <div className="text-center mt-6">
                      <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
                        Continue as Guest
                      </Link>
                    </div>

                  </TabsContent>
                  <TabsContent value="signup">
                     <div className="mt-6">
                      <h1 className="text-3xl font-bold font-heading">Create an Account</h1>
                      <p className="text-muted-foreground mt-1">
                        Join our community of book lovers.
                      </p>
                    </div>
                    <Form {...signUpForm}>
                      <form
                        onSubmit={signUpForm.handleSubmit(handleSignUp)}
                        className="space-y-6 mt-8"
                      >
                        <FormField
                          control={signUpForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input placeholder="e.g. John Doe" {...field} className="pl-10" />
                                 </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signUpForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input placeholder="you@example.com" {...field} type="email" className="pl-10"/>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={signUpForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <div className="flex items-center justify-center h-10 px-3 rounded-l-md border border-r-0 border-input bg-secondary">
                                      <span className="text-sm font-medium text-muted-foreground">+91</span>
                                  </div>
                                  <Input 
                                      {...field}
                                      type="tel" 
                                      placeholder="98765 43210" 
                                      className="rounded-l-none"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signUpForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Create Password</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    placeholder="••••••••"
                                    {...field}
                                    type={showPassword ? "text" : "password"}
                                    className="pl-10 pr-10"
                                  />
                                   <Button 
                                    type="button"
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={signUpForm.control}
                          name="terms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                   I agree to the <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full h-12 rounded-full" disabled={loading}>
                          {loading ? <Loader2 className="animate-spin"/> : "Create Account"}
                          {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </motion.div>
           </AnimatePresence>
        </div>
      </div>
      <div className="hidden lg:block relative">
        <Image
          src={authBgImage?.imageUrl || "https://picsum.photos/seed/auth/1080/1920"}
          alt="Bookshelf"
          fill
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
        <div className="absolute bottom-10 left-10 right-10 p-6 bg-background/80 backdrop-blur-sm rounded-lg">
          <blockquote className="text-xl font-medium">
            "A room without books is like a body without a soul."
          </blockquote>
          <p className="text-right mt-2 text-muted-foreground">— Marcus Tullius Cicero</p>
        </div>
      </div>
    </div>
  );
}
