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
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  Phone,
  Shield,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const signUpSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

const otpSchema = z.object({
  email: z.string().email("Invalid email address."),
});

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { toast } = useToast();
  const { signIn, signUp, signInWithOtp } = useAuth();

  const authBgImage = PlaceHolderImages.find((img) => img.id === "book-cover-2");

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", fullName: "", phone: "", terms: false },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { email: "" },
  });

  const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
    setLoading(true);
    const { error } = await signIn(values.email, values.password);
    if (error) {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Signed in successfully!" });
      router.push(redirect);
    }
    setLoading(false);
  };

  const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
    setLoading(true);
    const { error } = await signUp(values.email, values.password, values.fullName, values.phone);
    if (error) {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
      });
      setActiveTab("signin");
    }
    setLoading(false);
  };
  
  const handleOtpSignIn = async (values: z.infer<typeof otpSchema>) => {
    setLoading(true);
    const { error } = await signInWithOtp(values.email);
    if (error) {
       toast({
        title: "OTP Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
       toast({
        title: "Check your email",
        description: "We've sent you a magic link to sign in.",
      });
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <BookOpen className="w-6 h-6" />
            <span className="font-semibold text-xl">Books For Fosters</span>
          </Link>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            {/* Sign In Tab */}
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
                        Remember me for 30 days
                      </label>
                  </div>

                  <Button type="submit" className="w-full h-12 rounded-full" disabled={loading}>
                    {loading ? "Signing In..." : "Sign In"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </Form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <Form {...otpForm}>
                  <form onSubmit={otpForm.handleSubmit(handleOtpSignIn)}>
                    <div className="flex gap-2">
                        <FormField
                            control={otpForm.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input placeholder="Enter your email for OTP" {...field} type="email" className="pl-10 h-12"/>
                                </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <Button type="submit" variant="outline" className="h-12" disabled={loading}>
                           {loading ? 'Sending...' : 'Email OTP'}
                        </Button>
                    </div>
                  </form>
              </Form>

              <div className="text-center mt-6">
                <Link href="/books" className="text-sm font-medium text-muted-foreground hover:text-primary">
                  Continue as Guest
                </Link>
              </div>

            </TabsContent>

            {/* Sign Up Tab */}
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                           <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder="+91 98765 43210" {...field} className="pl-10" />
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
                   <Alert className="bg-secondary">
                    <Shield className="h-4 w-4" />
                    <AlertTitle>KYC Verification Required</AlertTitle>
                    <AlertDescription>
                      To rent or buy books, you'll need to verify your identity with Aadhar KYC after registration.
                    </AlertDescription>
                  </Alert>

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
                    {loading ? "Creating Account..." : "Create Account"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="hidden lg:block relative">
        <Image
          src={authBgImage?.imageUrl || "https://picsum.photos/seed/auth/1080/1920"}
          alt="Bookshelf"
          layout="fill"
          objectFit="cover"
          className="opacity-90"
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
