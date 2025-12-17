"use client";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/AppProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X, ShoppingCart, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CartPage() {
  const { user, loading: userLoading } = useUser();
  const { cart, removeFromCart, cartTotal, loading: cartLoading } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/auth?redirect=/cart');
    }
  }, [user, userLoading, router]);

  const deliveryCharge = cart.length > 0 ? 50.00 : 0.00;
  const total = cartTotal + deliveryCharge;

  if (userLoading || cartLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return null; // or a message encouraging login
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Shopping Cart
        </h1>
      </header>
      {cart.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {cart.map(({ book, type }) => (
                    <li key={book.id} className="flex items-start gap-4 p-4">
                      <div className="relative h-28 w-20 flex-shrink-0">
                        <Image
                          src={book.coverImage.url}
                          alt={book.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold">{book.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {book.author.name}
                        </p>
                         <Badge variant={type === 'buy' ? 'default' : 'secondary'} className="mt-2 capitalize">{type}</Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ₹{type === 'buy' ? book.price : book.rentalPrice}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mt-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(book.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>₹{deliveryCharge.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-card rounded-lg border border-dashed">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
          <p className="text-muted-foreground mt-2">
            Add some books to your cart to get started.
          </p>
          <Button asChild className="mt-6">
            <Link href="/books">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
