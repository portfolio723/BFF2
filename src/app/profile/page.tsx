
"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  User,
  Mail,
  Package2,
  Plus,
  MapPin,
  Home,
  Briefcase,
  Edit,
  Trash2,
  Database,
  Phone,
  Heart,
  Download,
} from "lucide-react";
import type { Address, Order, WishlistItem, UserDownloadedPdf } from "@/lib/types";
import { useAddress } from "@/context/AddressContext";
import { useAuth } from "@/context/AuthContext";
import { useFirestore, useDoc, useCollection, useMemoFirebase } from "@/firebase";
import { AddressForm } from "@/components/AddressForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { seedDatabase } from "@/lib/seed";
import { toast } from "sonner";
import { doc, collection, query } from 'firebase/firestore';
import type { User as AppUser } from '@/lib/types';
import { format } from "date-fns";
import Image from "next/image";


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
  const router = useRouter();
  const { addresses, removeAddress } = useAddress();
  const { user: authUser, isUserLoading } = useAuth();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (firestore && authUser ? doc(firestore, 'users', authUser.uid) : null),
    [firestore, authUser]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<AppUser>(userDocRef);

  const ordersRef = useMemoFirebase(() => (firestore && authUser) ? collection(firestore, 'users', authUser.uid, 'orders') : null, [firestore, authUser]);
  const { data: orders, isLoading: loadingOrders } = useCollection<Order>(ordersRef);

  const wishlistRef = useMemoFirebase(() => (firestore && authUser) ? collection(firestore, 'users', authUser.uid, 'wishlist_items') : null, [firestore, authUser]);
  const { data: wishlistItems, isLoading: loadingWishlist } = useCollection<WishlistItem>(wishlistRef);

  const downloadsRef = useMemoFirebase(() => (firestore && authUser) ? collection(firestore, 'users', authUser.uid, 'user_downloaded_pdfs') : null, [firestore, authUser]);
  const { data: downloadedPdfs, isLoading: loadingDownloads } = useCollection<UserDownloadedPdf>(downloadsRef);


  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !authUser) {
      router.push('/auth?redirect=/profile');
    }
  }, [authUser, isUserLoading, router]);

  const handleSeedDb = async () => {
    setIsSeeding(true);
    try {
        if (firestore) {
            await seedDatabase(firestore);
            toast.success("Database seeded successfully!");
        } else {
            toast.error("Firestore is not initialized.");
        }
    } catch (error: any) {
        toast.error("Database seeding failed", {
            description: error.message
        });
    } finally {
        setIsSeeding(false);
    }
  }

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

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!authUser) {
     return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  const userInitial =
    authUser.displayName?.charAt(0).toUpperCase() ||
    authUser.email?.charAt(0).toUpperCase() ||
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
                  src={authUser.photoURL ?? ""}
                  alt={authUser.displayName ?? "User"}
                />
                <AvatarFallback className="text-4xl">{userInitial}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{authUser.displayName || "User"}</h2>
              <p className="text-sm text-muted-foreground">{authUser.email}</p>
              <Separator className="my-4" />
               <div className="flex flex-col gap-2 w-full">
                <h3 className="font-semibold text-left">Account Status</h3>
                {authUser.emailVerified ? (
                  <Badge className="flex items-center gap-2 w-fit bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/50 dark:text-green-300">
                    Verified
                  </Badge>
                ) : (
                   <Badge variant="destructive" className="flex items-center gap-2 w-fit">
                    Email Not Verified
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
           <Card className="mt-8">
            <CardHeader>
                <CardTitle>Developer</CardTitle>
                <CardDescription>Actions for development.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleSeedDb} disabled={isSeeding || !firestore} className="w-full">
                    {isSeeding ? <Loader2 className="animate-spin mr-2" /> : <Database className="mr-2"/>}
                    {isSeeding ? "Seeding..." : "Seed Database"}
                </Button>
                 <p className="text-xs text-muted-foreground mt-2">
                    This will populate the 'books' and user data in Firestore.
                 </p>
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
                  <p className="font-medium">{userProfile?.userName || authUser.displayName || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{userProfile?.email || authUser.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{userProfile?.phoneNumber || "Not provided"}</p>
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
              ) : orders && orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(order.orderDate), 'PPP')}
                          </p>
                        </div>
                        <Badge>{order.status}</Badge>
                      </div>
                      <Separator className="my-3" />
                      <div className="space-y-2">
                        {order.items.map(item => (
                          <div key={item.id} className="flex gap-3 text-sm">
                            <Image src={item.coverImage} alt={item.title} width={40} height={53} className="rounded-sm" />
                            <div className="flex-1">
                              <p className="font-medium">{item.title}</p>
                              <p className="text-muted-foreground capitalize">{item.type}</p>
                            </div>
                            <p className="font-medium">₹{item.price.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-3" />
                      <div className="flex justify-end">
                        <p className="font-semibold">Total: ₹{order.totalAmount.toFixed(2)}</p>
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

           <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
              <CardDescription>Books you've saved for later.</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingWishlist ? (
                <div className="text-center py-10 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </div>
              ) : wishlistItems && wishlistItems.length > 0 ? (
                <div className="space-y-2">
                  {wishlistItems.map(item => (
                    <div key={item.id} className="flex gap-3 p-2 rounded-md hover:bg-secondary/50">
                       <Image src={item.bookCoverImage} alt={item.bookTitle} width={40} height={53} className="rounded-sm" />
                       <div className="flex-1">
                          <p className="font-medium text-sm">{item.bookTitle}</p>
                          <p className="text-xs text-muted-foreground">{item.bookAuthor}</p>
                       </div>
                       <Button variant="ghost" asChild>
                          <Link href={`/book/${item.bookId}`}>View</Link>
                       </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <Heart className="h-8 w-8 mx-auto mb-2" />
                  <p>Your wishlist is empty.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Downloaded PDFs</CardTitle>
              <CardDescription>Your collection of free reads.</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingDownloads ? (
                <div className="text-center py-10 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </div>
              ) : downloadedPdfs && downloadedPdfs.length > 0 ? (
                <div className="space-y-2">
                  {downloadedPdfs.map(pdf => (
                    <div key={pdf.id} className="flex items-center p-2 rounded-md hover:bg-secondary/50">
                      <Download className="w-4 h-4 mr-3 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{pdf.pdfTitle}</p>
                        <p className="text-xs text-muted-foreground">
                          Downloaded on {format(new Date(pdf.downloadDate), 'PPP')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <Download className="h-8 w-8 mx-auto mb-2" />
                  <p>You haven't downloaded any PDFs yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
