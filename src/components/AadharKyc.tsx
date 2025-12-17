"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight, ArrowLeft, CheckCircle, Loader2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface AadharKycProps {
  onComplete: () => void;
  onBack: () => void;
  onSkip: () => void;
}

const AadharKyc = ({ onComplete, onBack, onSkip }: AadharKycProps) => {
  const [aadharNumber, setAadharNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"aadhar" | "otp" | "success">("aadhar");
  const [isLoading, setIsLoading] = useState(false);
  const { setKycVerified } = useAuth();

  const formatAadhar = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 12);
    const parts = [];
    for (let i = 0; i < digits.length; i += 4) {
      parts.push(digits.slice(i, i + 4));
    }
    return parts.join(" ");
  };

  const handleAadharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAadharNumber(formatAadhar(e.target.value));
  };

  const handleSendAadharOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAadhar = aadharNumber.replace(/\s/g, "");
    
    if (cleanAadhar.length !== 12) {
      toast.error("Please enter a valid 12-digit Aadhar number");
      return;
    }

    setIsLoading(true);
    // Simulate API call for Aadhar OTP (in production, this would call actual Aadhar API)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    toast.success("OTP sent to Aadhar-linked mobile number!");
    setStep("otp");
  };

  const handleVerifyAadharOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    // Simulate Aadhar OTP verification (in production, this would verify with actual API)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    // For demo purposes, accept any 6-digit OTP
    setKycVerified(true);
    setStep("success");
    toast.success("Aadhar KYC verified successfully!");
    
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  if (step === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 py-8"
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-semibold">KYC Verified!</h2>
          <p className="text-muted-foreground mt-2">
            Your identity has been verified. Redirecting...
          </p>
        </div>
      </motion.div>
    );
  }

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
        Back
      </Button>

      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-heading text-2xl lg:text-3xl font-semibold">
            Aadhar KYC
          </h2>
        </div>
        <p className="text-muted-foreground">
          {step === "aadhar"
            ? "Verify your identity with Aadhar to rent or buy books"
            : "Enter the OTP sent to your Aadhar-linked mobile"}
        </p>
      </div>

      <div className="p-4 bg-secondary/50 rounded-lg flex gap-3">
        <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium">Secure Verification</p>
          <p className="text-muted-foreground mt-1">
            Your Aadhar data is encrypted and only used for identity verification.
          </p>
        </div>
      </div>

      {step === "aadhar" ? (
        <form onSubmit={handleSendAadharOtp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aadhar">Aadhar Number</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="aadhar"
                placeholder="XXXX XXXX XXXX"
                className="pl-10 tracking-wider"
                value={aadharNumber}
                onChange={handleAadharChange}
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enter your 12-digit Aadhar number
            </p>
          </div>

          <Button type="submit" className="w-full rounded-full gap-2" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Send OTP
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={onSkip}
          >
            Skip for now (Guest mode)
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              disabled={isLoading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={() => setStep("aadhar")}
              className="text-foreground hover:underline font-medium"
              disabled={isLoading}
            >
              Resend
            </button>
          </p>

          <Button
            onClick={handleVerifyAadharOtp}
            className="w-full rounded-full gap-2"
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Verify & Complete KYC
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default AadharKyc;
