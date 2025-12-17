"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Gift, 
  Package, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  Calendar
} from "lucide-react";

const steps = [
  { id: 1, title: "Book Details", icon: Package },
  { id: 2, title: "Pickup Info", icon: MapPin },
  { id: 3, title: "Confirmation", icon: CheckCircle },
];

export default function DonatePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [books, setBooks] = useState([{ id: 1, title: "", author: "", category: "", condition: "" }]);

  const addBook = () => {
    setBooks([...books, { id: books.length + 1, title: "", author: "", category: "", condition: "" }]);
  };

  const removeBook = (id: number) => {
    if (books.length > 1) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  return (
    <section className="pt-8 pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium mb-4">
            <Gift className="w-4 h-4" />
            Share the Joy of Reading
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
            Donate Your Books
          </h1>
          <p className="text-muted-foreground mt-3">
            Give your pre-loved books a new home. Every donation helps make reading 
            accessible to everyone in our community.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      currentStep >= step.id 
                        ? "bg-foreground text-background" 
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-sm mt-2 font-medium ${
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-24 lg:w-32 h-[2px] mx-4 ${
                    currentStep > step.id ? "bg-foreground" : "bg-border"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl p-6 lg:p-10">
            {/* Step 1: Book Details */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-xl font-semibold mb-2">Book Details</h2>
                  <p className="text-muted-foreground text-sm">
                    Add information about the books you'd like to donate.
                  </p>
                </div>

                {books.map((book, index) => (
                  <div key={book.id} className="p-6 bg-secondary/50 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Book {index + 1}</h3>
                      {books.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeBook(book.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Book Title *</Label>
                        <Input placeholder="Enter book title" />
                      </div>
                      <div className="space-y-2">
                        <Label>Author Name *</Label>
                        <Input placeholder="Enter author name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Category *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fiction">Fiction</SelectItem>
                            <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="children">Children</SelectItem>
                            <SelectItem value="self-help">Self-Help</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Condition *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="like-new">Like New</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <Label>Upload Images (Optional)</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-muted-foreground transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Drop images here or click to upload
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <Button 
                  variant="outline" 
                  className="w-full rounded-full gap-2"
                  onClick={addBook}
                >
                  <Plus className="w-4 h-4" />
                  Add Another Book
                </Button>
              </div>
            )}

            {/* Step 2: Pickup Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-xl font-semibold mb-2">Pickup Information</h2>
                  <p className="text-muted-foreground text-sm">
                    Provide your address and preferred pickup time.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number *</Label>
                    <Input placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Address Line 1 *</Label>
                  <Input placeholder="House/Flat No., Building Name" />
                </div>

                <div className="space-y-2">
                  <Label>Address Line 2</Label>
                  <Input placeholder="Street, Area, Landmark" />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>City *</Label>
                    <Input placeholder="City" />
                  </div>
                  <div className="space-y-2">
                    <Label>State *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Pincode *</Label>
                    <Input placeholder="400001" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Preferred Pickup Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="date" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Preferred Time Slot *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">9 AM - 12 PM</SelectItem>
                        <SelectItem value="afternoon">12 PM - 3 PM</SelectItem>
                        <SelectItem value="evening">3 PM - 6 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Textarea placeholder="Any special instructions for pickup..." />
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 rounded-full bg-secondary mx-auto flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-foreground" />
                </div>
                
                <div>
                  <h2 className="font-heading text-2xl font-semibold mb-2">
                    Thank You for Your Donation!
                  </h2>
                  <p className="text-muted-foreground">
                    Your donation request has been submitted successfully. 
                    Our team will contact you to confirm the pickup details.
                  </p>
                </div>

                <div className="bg-secondary/50 rounded-xl p-6 text-left">
                  <h3 className="font-medium mb-4">Donation Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Books to Donate</span>
                      <span className="font-medium">{books.length} book(s)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pickup Date</span>
                      <span className="font-medium">Dec 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time Slot</span>
                      <span className="font-medium">9 AM - 12 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-medium text-foreground">Pending Confirmation</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/">
                    <Button className="rounded-full px-8 gap-2">
                      Back to Home
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 3 && (
              <div className="flex justify-between mt-10 pt-6 border-t border-border">
                <Button 
                  variant="outline" 
                  className="rounded-full gap-2"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button 
                  className="rounded-full gap-2"
                  onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                >
                  {currentStep === 2 ? "Submit Donation" : "Continue"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
