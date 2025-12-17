"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShieldCheck, User, Mail, Upload, AlertCircle, ShoppingBag, Package2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser, useFirestore } from "@/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import type { Order } from "@/lib/types";

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();

  const [isKycVerified, setIsKycVerified] = useState(user?.isKycVerified || false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (user && firestore) {
      setIsKycVerified(user.isKycVerified || false);
      
      const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
          const q = query(
            collection(firestore, "orders"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
          setOrders(userOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
          toast({
            title: "Error",
            description: "Could not fetch order history.",
            variant: "destructive",
          });
        } finally {
          setLoadingOrders(false);
        }
      };

      fetchOrders();
    }
  }, [user, firestore, toast]);

  const handleKycVerification = () => {
    toast({
        title: "KYC Verification",
        description: "In a real app, this would start the document upload process. For now, we'll simulate a successful verification.",
    });
     setTimeout(() => {
      setIsKycVerified(true);
      toast({
        title: "KYC Verified!",
        description: "You can now rent books.",
      });
    }, 2000);
  }
  
  if (userLoading) {
      return (
          <div className="flex justify-center items-center min-h-screen">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      );
  }

  if (!user) {
    router.push('/auth?redirect=/profile');
    return null;
  }
  
  const userInitial = user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U";

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-4xl">
       <header className="mb-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
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
                   {loadingOrders ? (
                       <div className="text-center py-10 text-muted-foreground">
                           <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                           <p className="mt-2">Loading orders...</p>
                       </div>
                   ) : orders.length > 0 ? (
                       <div className="space-y-4">
                           {orders.map(order => (
                               <div key={order.id} className="p-4 border rounded-lg">
                                   <div className="flex justify-between items-center mb-2">
                                       <p className="font-semibold">Order #{order.id.slice(-6)}</p>
                                       <Badge variant={order.status === 'delivered' ? 'secondary' : 'default'} className="capitalize">{order.status}</Badge>
                                   </div>
                                   <p className="text-sm text-muted-foreground">
                                       {new Date(order.createdAt?.toDate()).toLocaleDateString()} - ₹{order.total.toFixed(2)}
                                   </p>
                                   <div className="mt-2 text-sm">
                                      {order.items.map(item => (
                                          <p key={`${item.id}-${item.type}`} className="text-muted-foreground">
                                              {item.quantity} x {item.title} ({item.type})
                                          </p>
                                      ))}
                                   </div>
                               </div>
                           ))}
                       </div>
                   ) : (
                       <div className="text-center py-10 text-muted-foreground">
                            <Package2 className="h-8 w-8 mx-auto mb-2" />
                            <p>You have no past orders.</p>
                       </div>
                   )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
