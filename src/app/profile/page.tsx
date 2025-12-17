
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  ShieldCheck,
  User,
  Mail,
  Upload,
  AlertCircle,
  Package2,
  Plus,
  MapPin,
  Home,
  Briefcase,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { AppUser, Address } from "@/lib/types";
import { useAddress } from "@/context/AddressContext";
import { AddressForm } from "@/components/AddressForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock user data
const mockUser: AppUser = {
  uid: "12345",
  displayName: "Book Lover",
  email: "user@example.com",
  photoURL:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  isKycVerified: false,
};

const AddressIcon = ({ type }: { type: Address["type"] }) => {
  switch (type) {
    case "Home":
      return <Home className="w-4 h-4 text-muted-foreground" />;
    case "Work":
      return <Briefcase className="w-4 h-4 text-muted-foreground" />;
    default:
      return <MapPin className="w-4 h-4 text-muted-foreground" />;
  }
};

export default function ProfilePage() {
  const { toast } = useToast();
  const { addresses, removeAddress } = useAddress();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Use mock user data
  const user = mockUser;
  const userLoading = false;

  const [isKycVerified, setIsKycVerified] = useState(
    user?.isKycVerified || false
  );

  // Mock orders data
  const [orders] = useState<any[]>([]);
  const [loadingOrders] = useState(false);

  useEffect(() => {
    if (user) {
      setIsKycVerified(user.isKycVerified || false);
    }
  }, [user]);

  const handleKycVerification = () => {
    toast({
      title: "KYC Verification",
      description:
        "In a real app, this would start the document upload process. For now, we'll simulate a successful verification.",
    });
    setTimeout(() => {
      setIsKycVerified(true);
      toast({
        title: "KYC Verified!",
        description: "You can now rent books.",
      });
    }, 2000);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };
  
  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setIsFormOpen(true);
  }

  const handleFormClose = () => {
    setEditingAddress(null);
    setIsFormOpen(false);
  }

  if (userLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userInitial =
    user.displayName?.charAt(0).toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    "U";

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
                <AvatarImage
                  src={user.photoURL ?? ""}
                  alt={user.displayName ?? "User"}
                />
                <AvatarFallback className="text-4xl">{userInitial}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{user.displayName || "User"}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Separator className="my-4" />
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
                    <p className="mb-2">
                      You need to complete KYC verification to be able to rent
                      books from our platform.
                    </p>
                    <Button
                      className="w-full"
                      size="sm"
                      onClick={handleKycVerification}
                    >
                      <Upload className="mr-2 h-4 w-4" />
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
                <User className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{user.displayName || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Addresses</CardTitle>
                <CardDescription>Manage your saved delivery addresses.</CardDescription>
              </div>
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                 <DialogTrigger asChild>
                    <Button size="sm" onClick={handleAddNewAddress}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New
                    </Button>
                 </DialogTrigger>
                 <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
                    </DialogHeader>
                    <AddressForm onSave={handleFormClose} existingAddress={editingAddress} />
                 </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {addresses.length > 0 ? (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="border p-4 rounded-lg flex gap-4">
                      <AddressIcon type={address.type} />
                      <div className="flex-1">
                        <p className="font-semibold">{address.firstName} {address.lastName}</p>
                        <p className="text-sm text-muted-foreground">{address.address}, {address.city}, {address.state} - {address.pincode}</p>
                        <p className="text-sm text-muted-foreground">Phone: {address.phone}</p>
                      </div>
                      <div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditAddress(address)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeAddress(address.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p>You have no saved addresses.</p>
                </div>
              )}
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
                <div className="space-y-4">{/* Order mapping here */}</div>
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
