
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
import type { Address, Order, WishlistItem, UserDownloadedPdf, SbAddress, SbOrder, SbWishlistItem, SbUserDownloadedPdf } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import { AddressForm } from "@/components/AddressForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { format } from "date-fns";
import Image from "next/image";
import { createClient } from "@/lib/supabase";

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
  const { user: authUser, isUserLoading } = useAuth();
  
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [downloadedPdfs, setDownloadedPdfs] = useState<UserDownloadedPdf[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  
  useEffect(() => {
    if (!isUserLoading && !authUser) {
      router.push('/auth?redirect=/profile');
    }
    if (authUser) {
      const fetchUserData = async () => {
        setLoadingData(true);
        const supabase = createClient();

        const [
          addressesRes,
          ordersRes,
          wishlistRes,
          downloadsRes
        ] = await Promise.all([
          supabase.from('addresses').select('*').eq('user_id', authUser.id),
          supabase.from('orders').select('*, order_items(*)').eq('user_id', authUser.id),
          supabase.from('wishlist_items').select('*').eq('user_id', authUser.id),
          supabase.from('user_downloaded_pdfs').select('*').eq('user_id', authUser.id)
        ]);

        if (addressesRes.error) {
            toast.error('Error fetching addresses:', { description: addressesRes.error.message });
        } else if (addressesRes.data) {
            const formattedAddresses: Address[] = addressesRes.data.map((d: SbAddress) => ({
                id: d.id,
                user_id: d.user_id,
                type: d.type,
                firstName: d.first_name,
                lastName: d.last_name,
                address: d.address,
                address2: d.address2 || '',
                city: d.city,
                state: d.state,
                pincode: d.pincode,
                phone: d.phone,
            }));
            setAddresses(formattedAddresses);
        }

        if (ordersRes.error) {
            toast.error('Error fetching orders:', { description: ordersRes.error.message });
        } else if (ordersRes.data) {
             const formattedOrders: Order[] = (ordersRes.data as SbOrder[]).map(o => ({
                ...o,
             }));
             setOrders(formattedOrders);
        }
        
        if (wishlistRes.error) {
          toast.error('Error fetching wishlist:', { description: wishlistRes.error.message });
        } else if (wishlistRes.data) {
          const formattedWishlist: WishlistItem[] = (wishlistRes.data as SbWishlistItem[]).map(item => ({
            id: item.id,
            user_id: item.user_id,
            book_id: item.book_id,
            added_date: item.added_date,
            book_title: item.book_title,
            book_author: item.book_author,
            book_cover_image: item.book_cover_image,
          }));
          setWishlistItems(formattedWishlist);
        }

        if (downloadsRes.error) {
            toast.error('Error fetching downloads:', { description: downloadsRes.error.message });
        } else if(downloadsRes.data) {
            const formattedDownloads: UserDownloadedPdf[] = downloadsRes.data.map((d: SbUserDownloadedPdf) => ({
                id: d.id,
                userId: d.user_id,
                pdfId: d.pdf_id,
                pdfTitle: d.pdf_title,
                downloadDate: d.download_date
            }));
            setDownloadedPdfs(formattedDownloads);
        }

        setLoadingData(false);
      };
      fetchUserData();
    }
  }, [authUser, isUserLoading, router]);

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

  const handleSaveAddress = async (addressData: Omit<Address, 'id' | 'user_id'>) => {
    if (!authUser) return;
    const supabase = createClient();
    
    const dbData = {
      ...addressData,
      user_id: authUser.id,
      first_name: addressData.firstName,
      last_name: addressData.lastName,
    };

    if (editingAddress) {
      const { data, error } = await supabase
        .from('addresses')
        .update(dbData)
        .eq('id', editingAddress.id)
        .select()
        .single();
      if (error) {
        toast.error("Failed to update address", { description: error.message });
      } else if (data) {
        const updatedAddress: Address = {
            id: data.id,
            user_id: data.user_id,
            type: data.type,
            firstName: data.first_name,
            lastName: data.last_name,
            address: data.address,
            address2: data.address2 || '',
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            phone: data.phone,
        };
        setAddresses(prev => prev.map(a => a.id === editingAddress.id ? updatedAddress : a));
        toast.success("Address updated successfully!");
        handleFormClose();
      }
    } else {
      const { data, error } = await supabase
        .from('addresses')
        .insert([dbData])
        .select()
        .single();
      if (error) {
        toast.error("Failed to add address", { description: error.message });
      } else if (data) {
         const newAddress: Address = {
            id: data.id,
            user_id: data.user_id,
            type: data.type,
            firstName: data.first_name,
            lastName: data.last_name,
            address: data.address,
            address2: data.address2 || '',
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            phone: data.phone,
        };
        setAddresses(prev => [...prev, newAddress]);
        toast.success("Address added successfully!");
        handleFormClose();
      }
    }
  }
  
  const removeAddress = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('addresses').delete().eq('id', id);
    if (error) {
      toast.error("Failed to remove address", { description: error.message });
    } else {
      setAddresses(prev => prev.filter(a => a.id !== id));
      toast.info("Address removed.");
    }
  }


  if (isUserLoading || (authUser && loadingData)) {
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
    authUser.user_metadata.full_name?.charAt(0).toUpperCase() ||
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
                  src={authUser.user_metadata.avatar_url ?? ""}
                  alt={authUser.user_metadata.full_name ?? "User"}
                />
                <AvatarFallback className="text-4xl">{userInitial}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{authUser.user_metadata.full_name || "User"}</h2>
              <p className="text-sm text-muted-foreground">{authUser.email}</p>
              <Separator className="my-4" />
               <div className="flex flex-col gap-2 w-full">
                <h3 className="font-semibold text-left">Account Status</h3>
                {authUser.email_confirmed_at ? (
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
                  <p className="font-medium">{authUser.user_metadata.full_name || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{authUser.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{authUser.phone || "Not provided"}</p>
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
                    <AddressForm onSave={handleSaveAddress} existingAddress={editingAddress} />
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
              {orders && orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">Order #{order.id.substring(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(order.created_at), 'PPP')}
                          </p>
                        </div>
                        <Badge>{order.status}</Badge>
                      </div>
                      <Separator className="my-3" />
                      <div className="space-y-2">
                        {order.order_items.map((item) => (
                          <div key={item.id} className="flex gap-3 text-sm">
                            <div className="flex-1">
                              <p className="font-medium">Book ID: {item.book_id.substring(0,8)}... ({item.quantity}x)</p>
                              <p className="text-muted-foreground capitalize">{item.type}</p>
                            </div>
                            <p className="font-medium">₹{item.price_at_purchase.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-3" />
                      <div className="flex justify-end">
                        <p className="font-semibold">Total: ₹{order.total_amount.toFixed(2)}</p>
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
              {wishlistItems && wishlistItems.length > 0 ? (
                <div className="space-y-2">
                  {wishlistItems.map(item => (
                    <div key={item.id} className="flex gap-3 p-2 rounded-md hover:bg-secondary/50 items-center">
                       <Image src={item.book_cover_image} alt={item.book_title} width={40} height={53} className="rounded-sm" />
                       <div className="flex-1">
                          <p className="font-medium text-sm">{item.book_title}</p>
                          <p className="text-xs text-muted-foreground">{item.book_author}</p>
                       </div>
                       <Button variant="ghost" asChild>
                          <Link href={`/book/${item.book_id}`}>View</Link>
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
              {downloadedPdfs && downloadedPdfs.length > 0 ? (
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
