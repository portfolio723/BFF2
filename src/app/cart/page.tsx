
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/AppProvider";
import { 
  X, 
  ShoppingBag, 
  Truck, 
  Shield, 
  ArrowRight,
  Tag,
  Package,
  Plus,
  Minus
} from "lucide-react";
import { toast } from "sonner";
import type { CartItem } from "@/context/AppProvider";

export default function CartPage() {
  const { cart, removeFromCart, getSubtotal, getDeliveryCharge, getTotal, updateCartQuantity } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const subtotal = getSubtotal();
  const deliveryCharge = getDeliveryCharge();
  const total = getTotal();

  return (
    <section className="py-12 lg:py-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground mt-2">
            You have {cart.length} item(s) in your cart
          </p>
        </motion.div>

        <AnimatePresence>
        {cart.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:col-span-2"
            >
              <div className="space-y-4">
                <AnimatePresence>
                  {cart.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.type}`}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                      transition={{ layout: { type: "spring", stiffness: 300, damping: 30 }, delay: index * 0.05 }}
                      className="bg-card border border-border rounded-xl p-4 lg:p-6"
                    >
                      <div className="flex gap-4 lg:gap-6">
                        {/* Image */}
                        <div className="w-24 lg:w-28 flex-shrink-0">
                          <Image
                            src={item.coverImage.url}
                            alt={item.title}
                            width={112}
                            height={150}
                            data-ai-hint={item.coverImage.hint}
                            className="w-full aspect-[3/4] object-cover rounded-lg shadow-md"
                          />
                        </div>
                        
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-4">
                            <div>
                              <Badge variant={item.type === "rent" ? "secondary" : "default"} className="mb-2 capitalize">
                                {item.type}
                              </Badge>
                              <h3 className="font-heading text-lg font-medium line-clamp-1">
                                {item.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                by {item.author.name}
                              </p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="flex-shrink-0 text-muted-foreground hover:text-destructive h-8 w-8"
                              onClick={() => removeFromCart(item.id, item.type)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                             <div className="flex items-center border border-border rounded-full">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-9 w-9 rounded-full"
                                  onClick={() => updateCartQuantity(item.id, item.type, item.quantity - 1)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-10 text-center font-medium">
                                  {item.quantity}
                                </span>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-9 w-9 rounded-full"
                                  onClick={() => updateCartQuantity(item.id, item.type, item.quantity + 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            {/* Price */}
                            <p className="font-heading text-xl font-semibold">
                              ₹{((item.type === 'rent' ? item.rentalPrice || 0 : item.price) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Continue Shopping */}
              <div className="mt-8">
                <Link href="/books">
                  <Button variant="outline" className="rounded-full gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h3 className="font-heading text-xl font-semibold mb-6">
                  Order Summary
                </h3>

                {/* Promo Code */}
                <div className="flex gap-2 mb-6">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Promo code" 
                      className="pl-10 h-11"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="h-11" onClick={() => toast.info("This is a dummy promo code action.")}>Apply</Button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-medium">₹{deliveryCharge.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base">
                    <span className="font-medium">Total</span>
                    <span className="font-heading text-2xl font-semibold">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full mt-6 rounded-full gap-2 h-12 text-base">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Truck className="w-4 h-4" />
                    <span>Free delivery on orders above ₹500</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Package className="w-4 h-4" />
                    <span>Easy returns within 7 days</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            key="empty-cart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-16 lg:py-24"
          >
            <div className="w-20 h-20 rounded-full bg-secondary mx-auto flex items-center justify-center mb-6">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="font-heading text-2xl font-semibold mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any books yet.
            </p>
            <Link href="/books">
              <Button className="rounded-full px-8 gap-2">
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </section>
  );
};
