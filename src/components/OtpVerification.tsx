"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface OtpVerificationProps {
  onSuccess: () => void;
  onBack: () => void;
}

const OtpVerification = ({ onSuccess, onBack }: OtpVerificationProps) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithOtp } = useAuth();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      await signInWithOtp(email);
      toast.success("A sign-in link has been sent to your email!");
      // In a real OTP flow you might go to an OTP step.
      // With Firebase email link, the user is directed away.
      // We can just inform them.
      // setStep("otp"); 
    } catch(error: any) {
       toast.error(error.message || "Failed to send verification link");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="gap-2 -ml-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Sign In
      </Button>

      <div>
        <h2 className="font-heading text-2xl lg:text-3xl font-semibold">
          Passwordless Sign-In
        </h2>
        <p className="text-muted-foreground mt-2">
          Enter your email to receive a magic sign-in link.
        </p>
      </div>

      <form onSubmit={handleSendOtp} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp-email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="otp-email"
              type="email"
              placeholder="you@example.com"
              className="pl-10 h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <Button type="submit" className="w-full rounded-full h-12 gap-2" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Send Magic Link
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default OtpVerification;