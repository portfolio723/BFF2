"use client";

import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShieldCheck, User, Mail, Upload, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { AppUser } from "@/lib/types";


export default function ProfilePage() {
  const { user, loading } = useUser() as { user: AppUser | null, loading: boolean };
  const router = useRouter();
  const { toast } = useToast();
  const [isKycVerified, setIsKycVerified] = useState(user?.isKycVerified || false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth?redirect=/profile');
    }
    // In a real app, you'd fetch the KYC status from your backend
    // For now, we'll just use the mock status and allow simulating verification.
    if (user) {
        setIsKycVerified(user.isKycVerified || false);
    }
  }, [user, loading, router]);

  const handleKycVerification = () => {
    // This is a mock verification process.
    toast({
        title: "KYC Verification",
        description: "In a real app, this would start the document upload process. For now, we'll simulate a successful verification.",
    });
    // Simulate updating user state. In a real app, this would be a backend call.
     setTimeout(() => {
      setIsKycVerified(true);
      toast({
        title: "KYC Verified!",
        description: "You can now rent books.",
      });
    }, 2000);
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }
  
  const userInitial = user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U";

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-4xl">
       <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          My Profile
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your account details and view your activity.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
             <Card>
                <CardContent className="pt-6 flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 mb-4">
                        <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                        <AvatarFallback className="text-4xl">{userInitial}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{user.displayName || 'User'}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <Separator className="my-4"/>
                    <div className="flex flex-col gap-2 w-full">
                        <h3 className="font-semibold text-left">KYC Status</h3>
                        {isKycVerified ? (
                            <Badge className="flex items-center gap-2 w-fit bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/50 dark:text-green-300">
                                <ShieldCheck className="h-4 w-4" />
                                Verified
                            </Badge>
                        ) : (
                            <Badge variant="destructive" className="flex items-center gap-2 w-fit">
                                <AlertCircle className="h-4 w-4" />
                                Not Verified
                            </Badge>
                        )}
                         {!isKycVerified && (
                             <div className="text-left mt-2 text-sm text-muted-foreground p-3 bg-secondary rounded-md border">
                                <p className="mb-2">You need to complete KYC verification to be able to rent books from our platform.</p>
                                <Button className="w-full" size="sm" onClick={handleKycVerification}>
                                    <Upload className="mr-2 h-4 w-4"/>
                                    Start KYC Verification
                                </Button>
                             </div>
                        )}
                    </div>
                </CardContent>
             </Card>
        </div>
        <div className="md:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Your personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center">
                        <User className="h-5 w-5 mr-3 text-muted-foreground"/>
                        <div>
                            <p className="text-sm text-muted-foreground">Full Name</p>
                            <p className="font-medium">{user.displayName || "Not provided"}</p>
                        </div>
                    </div>
                     <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3 text-muted-foreground"/>
                        <div>
                            <p className="text-sm text-muted-foreground">Email Address</p>
                            <p className="font-medium">{user.email}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>Your past purchases and rentals.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="text-center py-10 text-muted-foreground">
                        <p>You have no past orders.</p>
                   </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
