"use client";

import { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  ChevronRight, 
  MapPin, 
  CreditCard, 
  Truck, 
  Check,
  Phone,
  Mail,
  Package,
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/context/AppProvider";
import Image from "next/image";

const steps = [
  { id: 1, name: "Address", icon: MapPin },
  { id: 2, name: "Payment", icon: CreditCard },
  { id: 3, name: "Confirm", icon: Check },
];

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryCharge = cart.some(item => item.type ==='rent') ? 50.00 : 0.00;
  const total = cartTotal + deliveryCharge;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
        <section>
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-secondary mx-auto flex items-center justify-center mb-6">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="font-heading text-2xl font-semibold mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Add some books to your cart before checkout.
              </p>
              <Link href="/books">
                <Button className="rounded-full px-8 gap-2">
                  Explore Books
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
    );
  }

  if (orderPlaced) {
    return (
        <section>
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Check className="w-12 h-12" />
              </motion.div>
              
              <h1 className="font-heading text-3xl lg:text-4xl font-semibold mb-4">
                Order Placed Successfully!
              </h1>
              <p className="text-muted-foreground text-lg mb-2">
                Thank you for your order. Your order ID is:
              </p>
              <p className="font-mono text-xl font-semibold mb-8">
                #BFF{Date.now().toString().slice(-8)}
              </p>
              
              <div className="bg-secondary/50 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-medium mb-4">What's Next?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 mt-0.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Order confirmation sent to your email</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="w-4 h-4 mt-0.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Your books will be packed within 24 hours</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="w-4 h-4 mt-0.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Expected delivery in 3-5 business days</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/books">
                  <Button variant="outline" size="lg" className="rounded-full px-8">
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg" className="rounded-full px-8">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
    );
  }

  return (
    <section>
      <div className="container-custom">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/cart" className="hover:text-foreground transition-colors">Cart</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Checkout</span>
        </motion.nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
            Checkout
          </h1>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-full transition-colors",
                    currentStep >= step.id 
                      ? "bg-foreground text-background" 
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  <step.icon className="w-4 h-4" />
                  <span className="font-medium text-sm hidden sm:inline">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-12 lg:w-24 h-0.5 mx-2",
                    currentStep > step.id ? "bg-foreground" : "bg-border"
                  )} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Address */}
              {currentStep === 1 && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-card border border-border rounded-2xl p-6 lg:p-8"
                >
                  <h2 className="font-heading text-xl font-semibold mb-6">Delivery Address</h2>
                  
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="Enter first name" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Enter last name" className="h-12" />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="email" type="email" placeholder="your@email.com" className="h-12 pl-11" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="phone" placeholder="+91 98765 43210" className="h-12 pl-11" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input id="address" placeholder="House no., Building, Street" className="h-12" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address2">Apartment, Suite, etc. (optional)</Label>
                      <Input id="address2" placeholder="Apartment, suite, unit, etc." className="h-12" />
                    </div>
                    
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" placeholder="City" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Select>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {indianStates.map((state) => (
                              <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, '-')}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code *</Label>
                        <Input id="pincode" placeholder="500001" className="h-12" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox id="saveAddress" />
                      <label htmlFor="saveAddress" className="text-sm text-muted-foreground cursor-pointer">
                        Save this address for future orders
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <Button 
                      size="lg" 
                      className="rounded-full px-8"
                      onClick={() => setCurrentStep(2)}
                    >
                      Continue to Payment
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-card border border-border rounded-2xl p-6 lg:p-8"
                >
                  <h2 className="font-heading text-xl font-semibold mb-6">Payment Method</h2>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <div className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                      paymentMethod === "upi" ? "border-foreground bg-secondary" : "border-border"
                    )}>
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex-1 cursor-pointer">
                        <div className="font-medium">UPI</div>
                        <div className="text-sm text-muted-foreground">Pay using GPay, PhonePe, Paytm, etc.</div>
                      </Label>
                    </div>
                    
                    <div className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                      paymentMethod === "card" ? "border-foreground bg-secondary" : "border-border"
                    )}>
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="font-medium">Credit / Debit Card</div>
                        <div className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</div>
                      </Label>
                    </div>
                    
                    <div className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                      paymentMethod === "netbanking" ? "border-foreground bg-secondary" : "border-border"
                    )}>
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="flex-1 cursor-pointer">
                        <div className="font-medium">Net Banking</div>
                        <div className="text-sm text-muted-foreground">All major banks supported</div>
                      </Label>
                    </div>
                    
                    <div className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                      paymentMethod === "cod" ? "border-foreground bg-secondary" : "border-border"
                    )}>
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-muted-foreground">Pay when you receive the books</div>
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === "card" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-6 space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="h-12" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" className="h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" type="password" className="h-12" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input id="nameOnCard" placeholder="As shown on card" className="h-12" />
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="flex justify-between mt-8">
                    <Button 
                      variant="outline"
                      size="lg" 
                      className="rounded-full px-8"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </Button>
                    <Button 
                      size="lg" 
                      className="rounded-full px-8"
                      onClick={() => setCurrentStep(3)}
                    >
                      Review Order
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirm */}
              {currentStep === 3 && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-card border border-border rounded-2xl p-6 lg:p-8"
                >
                  <h2 className="font-heading text-xl font-semibold mb-6">Review Your Order</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-secondary/50 rounded-xl">
                      <h3 className="font-medium mb-2">Delivery Address</h3>
                      <p className="text-sm text-muted-foreground">
                        Address details will be shown here after form submission
                      </p>
                    </div>
                    
                    <div className="p-4 bg-secondary/50 rounded-xl">
                      <h3 className="font-medium mb-2">Payment Method</h3>
                      <p className="text-sm text-muted-foreground capitalize">{paymentMethod}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-4">Order Items</h3>
                      <div className="space-y-3">
                        {cart.map((item) => (
                          <div key={`${item.id}-${item.type}`} className="flex gap-4 p-3 bg-secondary/30 rounded-lg">
                            <Image 
                              src={item.coverImage.url} 
                              alt={item.title}
                              width={48}
                              height={64}
                              className="w-12 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium line-clamp-1">{item.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.type === "rent" ? "Rent" : "Buy"}
                              </p>
                            </div>
                            <p className="font-semibold">
                              ₹{item.type === 'rent' ? item.rentalPrice : item.price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Button 
                      variant="outline"
                      size="lg" 
                      className="rounded-full px-8"
                      onClick={() => setCurrentStep(2)}
                    >
                      Back
                    </Button>
                    <Button 
                      size="lg" 
                      className="rounded-full px-8"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h3 className="font-heading text-lg font-semibold mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.type}`} className="flex gap-3">
                    <Image 
                      src={item.coverImage.url} 
                      alt={item.title}
                      width={48}
                      height={64}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.type === "rent" ? "Rent" : "Buy"}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      ₹{item.type === 'rent' ? item.rentalPrice : item.price}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>₹{deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-lg">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
